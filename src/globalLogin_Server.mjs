const consoleLog = true;

console.log("LOADED:- globalLoginServer.mjs is loaded",new Date().toLocaleString());
export function globalLoginServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const loginRouter = Router();
    import fs from 'fs';
    // import * as projectSQLite from './projectSQLite.mjs'
    // import {accessDb} from './SQLite_ServerSide.mjs'
    import { randomInt, randomBytes } from "crypto";
    import { sendMail } from './global_Server.mjs'
    import { loginEmailHtml } from './projectConfig_Server.mjs'
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
        dotenv.config({path:`./config/projectServer.env`});
    import { trace} from "./global_Server.mjs";
    // import { postLoginActions_serverSide } from "./projectServer.mjs";
    import { optPer, insertDataRecord, insertFormDataRecord, getRecord, initDB, setupSchema, updateDataRecord, updateFormDataRecord } from "./projectSQLite_Server.mjs";
    import * as cookie from "cookie";
    import { isValidJSONString } from "./global_Server.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

loginRouter.post("/isLoginRequired", (req, res) => {
    // if(consoleLog===true){console.log(trace(),"\nrouter.get('/isLoginRequired");}
    // ❗❗❗const isLoginRequired = process.env.IS_LOGIN_REQUIRED; // DOESN'T WORK! it stores a text value of true, not the boolean.
        const isLoginRequired = process.env.IS_LOGIN_REQUIRED?.toLowerCase() === "true"; // Handles case variations
    // ❗❗❗const isLoginRequired = process.env.IS_LOGIN_REQUIRED; // DOESN'T WORK! it stores a text value of true, not the boolean.
    // if(consoleLog===true){console.log(trace(),'\nisLoginRequired:- ',isLoginRequired);}
    if(isLoginRequired===true){
        // res.send({"message":true});
        res.send({isLoginRequired:true});
    }else{
        // res.send({"message":false});
        res.send({isLoginRequired:false});
    }
});

loginRouter.post("/fileExists", (req, res) => {
    if(consoleLog===true){console.log(trace(),"fileExists req.body:-\n",req.body);}
    // const filePath = `./data/${loginEmailAddressInputValue}/${loginEmailAddressInputValue}.db`;
    const fileToFind = `${process.env.APP_PATH_TO_DATA}${req.body.fileName}.db`;
    if(consoleLog===true){console.log(trace(),fileToFind);}
    if (fs.existsSync(fileToFind)) {
        if(consoleLog===true){console.log(trace(),`🟢 File exists - ${fileToFind}`);}
        res.send({message:`File "${fileToFind}" found.`,fileExists:true});
    } else {
        if(consoleLog===true){console.log(trace(),`🔴 File not found - ${fileToFind}`);}
        res.send({message:`File "${fileToFind}" not found.`,fileExists:false});
    }
});

loginRouter.post("/emailCode", async (req, res) => {
    if(consoleLog===true){console.log(trace(),"Login: req.body:-",req.body);}
    // generate securityCode START
        const securityCode = randomInt(100000, 999999); // 6-digit code
        if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCode:- ${securityCode}`);}
        const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
        if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCodeX:- ${securityCodeX}`);}
    // save the code in users.db; table logIns; schema: 
        optPer("users"); // optimise database performance
        const insertedId = await insertDataRecord(
            "users",
            "logins",
            [
                "login_date",
                "login_time",
                "login_email",
                "login_code"
            ],
            [
                new Date().toLocaleDateString(),
                new Date().toLocaleTimeString(),
                req.body.loginEmailAddress,
                securityCode
            ]
        );
        console.log(trace(),"Inserted ID:", insertedId);
    // send code by email START
        const from = process.env.SMTP_USER;
        const to = req.body.loginEmailAddress;
        const subject = `${process.env.APP_NAME} Login Code`;
        const html = await loginEmailHtml(securityCode);
        const text = `Please enter the code below to log in to ${process.env.APP_NAME}\n\n${securityCode}`;
        // const loginCode = securityCode;
        // console.log(trace(),from,to,subject,html,text);
        const mailSent = await sendMail(from,to,subject,html,text);
        console.log(`${trace()}mailSent:- `,mailSent);
        if(mailSent === true){
            const answer = `Login code has been emailed to ${req.body.loginEmailAddressInputValue}.`
            res.send({loginCodeEmailed:true,loginsDBinsertedID:insertedId});
        }else{
            if(typeof mailSent === "undefined"){
                const answer = `Login code email to ${req.body.loginEmailAddressInputValue} has failed.`
                res.send({loginCodeEmailed:false,loginsDBinsertedID:insertedId});
            }else{
                const answer = `Login code email to ${req.body.loginEmailAddressInputValue} has failed.`
                res.send({loginCodeEmailed:false,loginsDBinsertedID:insertedId});
            }
        }
});

loginRouter.post("/loginCodeSubmit", async (req, res) => {
    console.log(trace(),"loginCodeSubmit: req.body:-\n",req.body);
    const x = req.body.loginCodeSubmit;
    console.log(trace(),"/loginCodeSubmit:",typeof req.body.loginCodeSubmit); // "string"? "function"?
    const dbFileName = "users"; // Ensure this matches the actual database file
    const table = "logins";
    const condition = "id = ?";
    const values = [req.body.loginsDBinsertedID]; // Example query parameter        
    const records = await getRecord(dbFileName, table, condition, values);
    console.log(trace(),"/loginCodeSubmit:",records);
    console.log(trace(),"/loginCodeSubmit:",records[0].id);
    console.log(trace(),"/loginCodeSubmit:",x);
    if(x.toString().toLowerCase().trim() === records[0].login_code.toString().toLowerCase().trim()){
        // update sessions file
            const parsed = cookie.parse(req.headers.cookie);
            fs.readFile('./sessions/' + parsed.connectSID + '.json','utf8',(errASync,fileContentsASync) => {
                if (errASync){
                    console.log('/loginCodeSubmit: login errASync:- error');
                } else {
                    console.log('/loginCodeSubmit: login fileContentsASync:-\n',fileContentsASync);
                    console.log('/loginCodeSubmit: login fileContentsASync:- isJSON()?',isValidJSONString(fileContentsASync));
                    // res.json(fileContentsASync);
                    // res.end();
                }
            });
        // update users.db table: logins
            // updateRecord(fileName, tableName, updates, conditionField, conditionComparison, conditionValue)
            // updateRecord(fileName, tableName, updates, conditions)
            // This allows comparisons like =, !=, >, <, LIKE, etc. Then build the condition string accordingly.
            const login_code_submitted = x.toString().toLowerCase().trim();
            const jso =
            {
                fileName: "users",
                tableName: "logins",
                updates: 
                {
                    login_code_submitted: login_code_submitted,
                    login_status: "authenticated"
                },
                where: 
                {
                    conditions: [
                        { field: "id", operator: "=", value: records[0].id },
                        { field: "login_email", operator: "=", value: req.body.loginEmailAddress }
                    ],
                    logic: "AND" // or "OR" if needed
                }
            }
            console.log(trace(),"/loginCodeSubmit:","🔒🔑{ c o d e  s u b m i t t e d  S T A R T }🔑🔒");
            console.log(trace(),"/loginCodeSubmit:","jso to update users database:-\n",JSON.stringify(jso,null,2));
            for (const [key, value] of Object.entries(req.body)) {
                console.log(`🔹 ${key}:`, typeof value === 'object' ? JSON.stringify(value, null, 2) : value);
            }
            console.log(trace(),"/loginCodeSubmit:","🔒🔑{ c o d e  s u b m i t t e d  E N D }🔑🔒");
            updateDataRecord(jso); // no await, let it run in the background
        // send response to client
            res.send({message:`Login approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:true});
            console.log(`${trace()}🔒🔑🟢 /loginCodeSubmit: login success 🟢🔑🔒`);
    }else{
        res.send({message:`Login not approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:false});
        console.log(`${trace()}🔒🔑🔴 /loginCodeSubmit: login fail 🔴🔑🔒`,req.body.loginCodeEmailed,records[0].login_code);
    }
});

loginRouter.post("/createNewAccount", async (req, res) => {
    console.log(trace(),"🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦 createNewAccount START 🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦");
    console.log(trace(),"createNewAccount: req.body:-\n",req.body);
    const dbFileName = req.body.fileName; // Ensure this matches the actual database file
    // const dbSchema = 
    // `CREATE TABLE IF NOT EXISTS photos (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     image BLOB,
    //     image_date TEXT,
    //     image_time TEXT,
    //     image_address TEXT,
    //     image_notes TEXT,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    // );
    // CREATE INDEX IF NOT EXISTS idx_photos ON photos(image_address);`
    const dbSchema = 
    `CREATE TABLE IF NOT EXISTS "photos" (
        image_id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_record_created_at TEXT DEFAULT (datetime('now', 'localtime')),
        image_date TEXT,
        image_time TEXT,
        image_address TEXT,
        image_notes TEXT,
        image_blob BLOB,
        image_dd TEXT,
        image_mm TEXT,
        image_yyyy TEXT,
        image_yyyymmdd TEXT,
        image_status TEXT,
        image_record_last_edit_date TEXT,
        image_record_last_edit_time TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_photos ON photos(image_address);
    CREATE INDEX IF NOT EXISTS idx_photos_yyyymmdd ON photos(image_yyyymmdd);`
    try{
        await initDB(dbFileName); // file extension of the database file is added by initDB
        await setupSchema(dbFileName,dbSchema);
        // send response to client
            res.send({message:`Account created for ${req.body.fileName}.`});
            console.log(`${trace()}📚📗 account creation success`);
    }catch{
        res.send({message:`Account not created for ${req.body.fileName}.`});
        console.log(`${trace()}📚📕 account creation fail`,req.body.loginCodeEmailed,records[0].login_code);
    }
});


export default loginRouter;
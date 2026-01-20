console.log("LOADED:- globalLoginServer.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const loginRouter = Router();
    import * as fsCore from 'fs';
    import * as fsPromises from 'fs/promises';
    import { randomInt, randomBytes } from "crypto";
    import { sendMail } from './global_Server.mjs'
    import { loginEmailHtml } from '../config/projectConfig_Server.mjs'
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
        dotenv.config({path:`./config/projectServer.env`});
    import { trace, maskString, dataFilePathName} from "./global_Server.mjs";
    import { updateUsersLogins, optPer, insertDataRecord, insertFormDataRecord, getRecord, setupSchema, updateDataRecord, updateFormDataRecord } from "./projectSQLite_Server.mjs";
    import * as cookie from "cookie";
    import { isValidJSONString } from "./global_Server.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

loginRouter.post("/fileExists", (req, res) => {
    // check if user's data file exists
        console.log(trace(),"fileExists req.body:-\n",req.body);
        const dataFile = dataFilePathName(req.body.loginEmailAddress);
        console.log(trace(),dataFile);
        console.log(`${trace()} 🟢❔ File to find:- ${dataFile.filePath}${dataFile.fileName}`);
        if (fsCore.existsSync(`${dataFile.filePath}${dataFile.fileName}`)) {
            console.log(trace(),`🟢✅ File exists - ${dataFile.filePath}${dataFile.fileName}`);
            res.send({message:`File "${dataFile.filePath}${dataFile.fileName}" found.`,fileExists:true});
        } else {
            console.log(trace(),`🔴❌ File not found - ${dataFile.filePath}${dataFile.fileName}`);
            res.send({message:`File "${dataFile.filePath}${dataFile.fileName}" not found.`,fileExists:false});
        }
});

loginRouter.post("/emailCode", async (req, res) => {
    console.log(trace(),"Login: req.body:-",req.body);
    // generate securityCode START
        const securityCode = randomInt(100000, 999999); // 6-digit code
        console.log(trace(),`Login: session regen - Session securityCode:- ${securityCode}`);
        const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
        console.log(trace(),`Login: session regen - Session securityCodeX:- ${securityCodeX}`);
    // save the code in users_1000.db; table logIns; schema: 
        const dataFile = dataFilePathName("users");
        const filePath = dataFile.filePath;
        const fileName = dataFile.fileName;
        optPer(`${filePath}${fileName}`); // optimise database performance
        // const insertedId = await insertDataRecord(
        const insertedId = await updateUsersLogins(
            `${filePath}${fileName}`,
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
    console.log(trace(),"/loginCodeSubmit: variable 'loginCodeSubmit' is typeof: ",typeof req.body.loginCodeSubmit); // "string"? "function"?
    // const dataFile = dataFilePathName("users_1000")
    // const dbFileName = `${dataFile.filePath}${dataFile.fileName}`; // Ensure this matches the actual database file
    const table = "logins";
    const condition = "id = ?";
    const values = [req.body.loginsDBinsertedID]; // Example query parameter        
    const records = await getRecord("users", table, condition, values);
    console.log(trace(),"/loginCodeSubmit:",records);
    console.log(trace(),"/loginCodeSubmit:",records[0].id);
    console.log(trace(),"/loginCodeSubmit:",x);
    if(x.toString().toLowerCase().trim() === records[0].login_code.toString().toLowerCase().trim()){
        // update sessions file
            const parsed = cookie.parse(req.headers.cookie);
            await fsPromises.readFile('./sessions/' + parsed.connectSID + '.json','utf8',(errASync,fileContentsASync) => {
                if (errASync){
                    console.log(trace(),'/loginCodeSubmit: login errASync:- error');
                } else {
                    console.log(trace(),'/loginCodeSubmit: login fileContentsASync:-\n',fileContentsASync);
                    console.log(trace(),'/loginCodeSubmit: login fileContentsASync:- isJSON()?',isValidJSONString(fileContentsASync));
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
    // 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ START
        const fileName = `${req.body.fileName}`;
        const filePath = `${process.env.APP_PATH_TO_DATA}${fileName}`;
        // fs.writeFileSync(filePath, '');
        await fsPromises.writeFile(filePath, '');
    // 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ 🗃️ n d j s o n 🗃️ END
    // 💽 d a t a b a s e 💽 💽 d a t a b a s e 💽 💽 d a t a b a s e 💽 START
        const dbFileName = `${filePath}${fileName}`; // Ensure this matches the actual database file
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
            await getDB(dbFileName); // file extension of the database file is added by initDB
            await setupSchema(dbFileName,dbSchema);
            // send response to client
                res.send({message:`Account created for ${req.body.fileName}.`});
                console.log(`${trace()}📚📗 account creation success`);
        }catch{
            res.send({message:`Account not created for ${req.body.fileName}.`});
            console.log(`${trace()}📚📕 account creation fail`,req.body.loginCodeEmailed,records[0].login_code);
        }
    // 💽 d a t a b a s e 💽 💽 d a t a b a s e 💽 💽 d a t a b a s e 💽 END
});

export default loginRouter;
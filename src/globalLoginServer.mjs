const consoleLog = true;

if(consoleLog===true){console.log("LOADED:- globalLoginServer.mjs is loaded",new Date().toLocaleString());}
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
    import {randomInt, randomBytes} from "crypto";
    import {sendMail} from './globalServer.mjs'
    import {loginEmailHtml} from './projectConfig_Server.mjs'
    import dotenv from "dotenv";
        dotenv.config({path:`./config/globalServer.env`});
        dotenv.config({path:`./config/projectServer.env`});
    import {trace} from "./globalServer.mjs";
    import { postLoginActions_serverSide } from "./projectServer.mjs";
    import { optPer, insertRecord, getRecord } from "./SQLite_ServerSide.mjs";
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
    const fileToFind = `${req.body.filePath}${req.body.fileName}`;
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
    if(consoleLog===true){console.log(trace(),"req.body:-\n",req.body);}
    // generate securityCode START
        const securityCode = randomInt(100000, 999999); // 6-digit code
        if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCode:- ${securityCode}`);}
        const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
        if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCodeX:- ${securityCodeX}`);}
    // save the code in users.db; table logIns; schema: 
        optPer("users"); // optimise database performance
        const insertedId = await insertRecord(
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
        console.log("Inserted ID:", insertedId);
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
    console.log(trace(),"loginCodeSubmit req.body:-\n",req.body);
    const x = await req.body.loginCodeSubmit;
    const dbFileName = "users"; // Ensure this matches the actual database file
    const table = "logins";
    const condition = "id = ?";
    const values = [req.body.loginsDBinsertedID]; // Example query parameter        
    const records = await getRecord(dbFileName, table, condition, values);
    console.log(records);        
    console.log(records[0].id);
    if(x.toString().toLowerCase().trim() === records[0].login_code.toString().toLowerCase().trim()){
        // update session with authenticated user details
            req.session.user = {
                email: req.body.loginEmailAddressInputValue,
                authenticated: true
            };
        // ensure session is saved
            req.session.save(err => {
                if (err) {
                    console.error(`${trace()}🔒🔴 Failed to save session:`, err);
                } else {
                    console.log(`${trace()}🔒🟢 Session saved successfully.${JSON.stringify(req.session,null,2)}`);
                }
            });
        // send response to client
            res.send({message:`Login approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:true});
            console.log(`${trace()}🔒🟢 login success`);
    }else{
        res.send({message:`Login not approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:false});
        console.log(`${trace()}🔒🔴 login fail`,req.body.loginCodeEmailed,records[0].login_code);
    }
});





// ROUTER login_step1
    loginRouter.post("/login_step1", (req, res) => {
        // login_step1 is all done at the client
    });

// ROUTER login_step2 - check if database exists
    loginRouter.post("/login_step2", (req, res) => {
        if(consoleLog===true){console.log(trace(),"login_step2 req.body:-\n",req.body);}
        // const filePath = `./data/${loginEmailAddressInputValue}/${loginEmailAddressInputValue}.db`;
        const filePath = `./db/${req.body.loginEmailAddressInputValue}.db`;
        if(consoleLog===true){console.log(trace(),filePath);}
        if (fs.existsSync(filePath)) {
            if(consoleLog===true){console.log(trace(),`🟢 File exists - ${filePath}`);}
            res.send({message:`File named "${req.body.loginEmailAddressInputValue}.db" found.`,loginEmailAddressInputValue:req.body.loginEmailAddressInputValue,createNewAccount:false,loginCodeEmailed:false});
        } else {
            if(consoleLog===true){console.log(trace(),`🔴 File not found - ${filePath}`);}
            res.send({message:`File named "${req.body.loginEmailAddressInputValue}.db" not found.`,loginEmailAddressInputValue:req.body.loginEmailAddressInputValue,createNewAccount:true,loginCodeEmailed:false});
        }
    });

// ROUTER login_step3
    loginRouter.post("/login_step3", async (req, res) => {
        if(consoleLog===true){console.log(trace(),"✅login_step3 req.body:-\n",req.body);}
        // generate securityCode 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
            const securityCode = randomInt(100000, 999999); // 6-digit code
            if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCode:- ${securityCode}`);}
            const securityCodeX = randomBytes(4).toString("hex"); // Hex-based code, more complex code if needed
            if(consoleLog===true){console.log(trace(),`Login: session regen - Session securityCodeX:- ${securityCodeX}`);}
        // regenerate session & add security code to regenerated session
            // console.log("🔴 Before regen:", req.sessionID);
            const sessionID_preRegen = req.sessionID;
            const sessionRegenOK = await req.session.regenerate(err => {
                if (err) {
                    console.error(trace(),"🔴 Login: session regen - Session regen error:\n", err);
                } else {
                    const securityCodeTTL = 10; // minutes
                    req.session.securityCode = {
                        code: securityCode.toString(),
                        codeX: securityCodeX.toString(),
                        expiresAt: Date.now() + securityCodeTTL * 60 * 1000 // expiry in securityCodeTTL minutes
                            // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                            // When validating the code, check if it has expired:
                                // if (Date.now() > req.session.securityCode.expiresAt) {
                                //     return res.status(400).json({ message: "Security code expired. Please request a new one." });
                                // }
                            // When validating the code, check if it has expired:
                            // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                    };
                    // Schedule automatic removal of securityCode after expiry
                        setTimeout(() => {
                            if (req.session.securityCode && Date.now() > req.session.securityCode.expiresAt) {
                                delete req.session.securityCode;
                                console.log(trace(),"🔴🟢❓ Login: session regen - Security code expired and removed!");
                            }
                        }, ( securityCodeTTL + 1 ) * 60 * 1000);
                    if(consoleLog===true){console.log(trace(),"Login: session regen - Session regen ok.");}
                    if(consoleLog===true){console.log(trace(),"Login: session regen - Session securityCode updated.");}
                    if(consoleLog===true){console.log(trace(),"Login: session regen - req.session:-",JSON.stringify(req.session, null, 2));}
                    if(consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode:-",JSON.stringify(req.session.securityCode, null, 2));}
                    if(consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode.code:-",JSON.stringify(req.session.securityCode.code, null, 2));}
                    const sessionID_postRegen = req.sessionID;
                    if(sessionID_preRegen === sessionID_postRegen){
                        console.log(`${trace()}🔒🔴 Login: session regen - Session regen failed: ${sessionID_preRegen} === ${sessionID_postRegen}`); // Should be different!
                    }else{
                        console.log(`${trace()}🔒🟢 Login: session regen - Session regen success: ${sessionID_preRegen} != ${sessionID_postRegen}`); // Should be different!
                        console.log(`${trace()}🔒🟢 req.session: ${JSON.stringify(req.session,null,2)}`);
                        req.session.save(err => {
                            if (err) {
                                console.error(`${trace()}🔒🔴 Failed to save session:`, err);
                            } else {
                                console.log(`${trace()}🔒🟢 Session saved successfully.`);
                            }
                        });
                        console.log(`${trace()}🔒🟢 req.session: ${JSON.stringify(req.session,null,2)}`);
                    }
                }
            });
            if(sessionRegenOK===true){console.log(trace(),`🟢 Session regen ok!`);}
        // 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
        // send code by email
            const from = process.env.SMTP_USER;
            const to = req.body.loginEmailAddressInputValue;
            const subject = `${process.env.APP_NAME} Login Code`;
            const html = await loginEmailHtml(securityCode);
            const text = `Please enter the code below to log in to ${process.env.APP_NAME}\n\n${securityCode}`;
            // const loginCode = securityCode;
            const mailSent = await sendMail(from,to,subject,html,text);
            console.log(`${trace()}mailSent:- `,mailSent);
            if(mailSent === true){
                const answer = `Login code has been emailed to ${req.body.loginEmailAddressInputValue}.`
                res.send({loginEmailAddressInputValue:req.body.loginEmailAddressInputValue,createNewAccount:req.body.createNewAccount,loginCodeEmailed:true});
            }else{
                if(typeof mailSent === "undefined"){
                    const answer = `Login code email to ${req.body.loginEmailAddressInputValue} has failed.`
                    res.send({loginEmailAddressInputValue:req.body.loginEmailAddressInputValue,createNewAccount:req.body.createNewAccount,loginCodeEmailed:false});
                }else{
                    const answer = `Login code email to ${req.body.loginEmailAddressInputValue} has failed.`
                    res.send({loginEmailAddressInputValue:req.body.loginEmailAddressInputValue,createNewAccount:req.body.createNewAccount,loginCodeEmailed:false});
                }
            }
    });

// ROUTER login_step4
    loginRouter.post("/login_step4", async (req, res) => {
        if(consoleLog===true){console.log(trace(),"login_step4 req.body:-\n✅",req.body);}
        if(consoleLog===true){console.log(trace(),"login_step4 req.session\n✅",JSON.stringify(req.session, null, 2));}
        if(typeof req.session.securityCode === "undefined"){
            if(consoleLog===true){console.log(trace(),"\n🔴",JSON.stringify(req.session.securityCode, null, 2));}
        }else{
            if(consoleLog===true){console.log(trace(),"\n✅",JSON.stringify(req.session.securityCode, null, 2));}
        }
        if(consoleLog===true){console.log(trace(),"\nreq.session.securityCode:-",JSON.stringify(req.session.securityCode.code, null, 2));}
        if(req.body.loginCodeInputValue.toLowerCase().trim()===req.session.securityCode.code.toString().toLowerCase().trim()){
            // update session with authenticated user details
                req.session.user = {
                    email: req.body.loginEmailAddressInputValue,
                    authenticated: true
                };
            // ensure session is saved
                req.session.save(err => {
                    if (err) {
                        console.error(`${trace()}🔒🔴 Failed to save session:`, err);
                    } else {
                        console.log(`${trace()}🔒🟢 Session saved successfully.${JSON.stringify(req.session,null,2)}`);
                    }
                });
            // send response to client
                res.send({message:`Login approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:true});
                console.log(`${trace()}🔒🟢 login success`);
            // Extract session ID from cookie
            //     const rawSessionId = req.cookies["connect.sid"]; 
            // console.log(`${trace()}🔒🟢 cookie connect.sid:- `,rawSessionId);
            // req.session.name = req.body.loginEmailAddressInputValue;
            // req.session.userId = req.body.loginEmailAddressInputValue;
            // req.session.save(err => {
            //     if (err) console.error("🪣 Session failed to save:", err);
            // });
            console.log(trace(),"req.session:-\n",JSON.stringify(req.session,null,2));
            postLoginActions_serverSide(req, res); // Call the post-login actions function
        }else{
            res.send({message:`Login not approved for ${req.body.loginEmailAddressInputValue}.`,loginApproved:false});
            console.log(`${trace()}🔒🔴 login fail`);
        }
    });

export default loginRouter;
const consoleLog = true;

console.log("LOADED:- globalSessionsServer.mjs is loaded",new Date().toLocaleString());
export function globalSessionsServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const sessionsRouter = Router();
    import { trace } from "./global_Server.mjs";
    import * as cookie from "cookie";
    import fs from "fs";
    import crypto from 'crypto'
    import { closeDB } from "./projectSQLite_Server.mjs";
import session from "express-session";
    // import { randomUUID } from 'crypto'; // randomUUID is a named export from crypto
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    // LOGOUT 🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️
        sessionsRouter.post("/sessionLogout", async (req, res) => {
            //         return res.status(500).send({"logoutConfirmed":false});
            try{
                // 1. Remove session file from server
                    const parsed = cookie.parse(req.headers.cookie);
                    const sessionIdOld = parsed.connectSID;
                    fs.unlinkSync(`./sessions/${sessionIdOld}.json`);
                    console.log(trace(),"Session deleted from server OK!");
                // 1.1 close DB connection if applicable
                    await closeDB(req.body.userEmailAddress);
                // 2. Clear cookie from client
                    // res.cookie('session_id', '', { expires: new Date(0), path: '/' }); // MUST use same path and other options as when the cookie was set
                    res.clearCookie("connectSID"); // Remove session cookie
                // 3. Confirm logout to client
                    res.status(200).json({success: true, logoutConfirmed: true, silent: req.body.silent});
                    console.error(trace(),"🟢 Logout: success.  Cookie removed.  Session file deleted.");
            }catch(err){
                res.status(500).json({success: false, logoutConfirmed: false});
                console.error(trace(),"🔴 Logout: Error during logout process:\n", err);
            }
        });

    // SESSION REGENERATION ®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️START
        sessionsRouter.post("/sessionRegen", async (req, res) => {
            // regenerate session & add security code to regenerated session START
                const sessionID_preRegen = req.sessionID;
                const sessionRegenOK = await req.session.regenerate(err => {
                    if (err) {
                        console.error(trace(),"🔴 Login: session regen - Session regen error:\n", err);
                    } else {
                        const securityCodeTTL = 10; // allow x minutes for th euser to complete the login
                        req.session.securityCode = {
                            // code: securityCode.toString(),
                            // codeX: securityCodeX.toString(),
                            expiresAt: Date.now() + securityCodeTTL * 60 * 1000 // securityCode will expire in securityCodeTTL minutes
                                // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                                    // When validating the code, check if it has expired:
                                        // if (Date.now() > req.session.securityCode.expiresAt) {
                                        //     return res.status(400).json({ message: "Security code expired. Please request a new one." });
                                        // }
                                    // When validating the code, check if it has expired:
                                // 💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬💬
                        };
                        // // Schedule automatic removal of securityCode after expiry
                        //     setTimeout(() => {
                        //         if (req.session.securityCode && Date.now() > req.session.securityCode.expiresAt) {
                        //             delete req.session.securityCode;
                        //             console.log(trace(),"🔴🟢❓ Login: session regen - Security code expired and removed!");
                        //         }
                        //     }, ( securityCodeTTL + 1 ) * 60 * 1000);
                        if(window.consoleLog===true){console.log(trace(),"Login: session regen - Session regen ok.");}
                        // if(window.consoleLog===true){console.log(trace(),"Login: session regen - Session securityCode updated.");}
                        if(window.consoleLog===true){console.log(trace(),"Login: session regen - req.session:-",JSON.stringify(req.session, null, 2));}
                        // if(window.consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode:-",JSON.stringify(req.session.securityCode, null, 2));}
                        // if(window.consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode.code:-",JSON.stringify(req.session.securityCode.code, null, 2));}
                        const sessionID_postRegen = req.sessionID;
                        let sessionRegenOK = false; // Set to false to indicate regen failure
                        if(sessionID_preRegen === sessionID_postRegen){
                            console.log(`${trace()}🔒🔴 Login: session regen - Session regen failed: ${sessionID_preRegen} === ${sessionID_postRegen}`); // Should be different!
                            sessionRegenOK = false; // Set to false to indicate regen failure
                            res.send({sessionRegenOK:sessionRegenOK});
                        }else{
                            console.log(`${trace()}🔒🟢 Login: session regen - Session regen success: ${sessionID_preRegen} != ${sessionID_postRegen}`); // Should be different!
                            console.log(`${trace()}🔒🟢 req.session: ${JSON.stringify(req.session,null,2)}`);
                            req.session.save(err => {
                                if (err) {
                                    console.error(`${trace()}🔒🔴 Failed to save session:`, err);
                                    sessionRegenOK = false; // Set to false to indicate save failure
                                    res.send({sessionRegenOK:sessionRegenOK});
                                } else {
                                    console.log(`${trace()}🔒🟢 Session saved successfully.`);
                                    sessionRegenOK = true; // Set to true to indicate save success
                                    res.send({sessionRegenOK:sessionRegenOK});
                                }
                            });
                            console.log(`${trace()}🔒🟢 req.session: ${JSON.stringify(req.session,null,2)}`);
                        }
                    }
                });
                if(sessionRegenOK===true){console.log(trace(),`🟢 Session regen ok!`);}
                // regenerate session & add security code to regenerated session END
        });
    // SESSION REGENERATION ®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️END
        sessionsRouter.post("/sessionInit", async (req, res) => {
            console.log(trace(),"i n i t i a l i s e   s e s s i o n   f o r   l o g i n   u s e r   S T A R T");
            console.log(trace(),new Date().toLocaleString());
            const parsed = cookie.parse(req.headers.cookie);
            // console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie.connectSID`,parsed.connectSID);
            // const connectSidExists = fs.readFileSync(`./sessions/${parsed.connectSID}.json`);
            // const authenticated = connectSidExists? true : false;            
            const sessionIdOld = parsed.connectSID;
            try {
                if(sessionIdOld===undefined){
                    console.log(trace(),"No existing session ID found in cookies.");
                    // return res.status(400).json({sessionInitOK:false, message: "No existing session ID found in cookies."});
                }else{
                    fs.unlinkSync(`./sessions/${sessionIdOld}.json`);
                    console.log(trace(),"Session deleted from server OK!");
                }
            } catch (err) {
                console.log(trace(),"Session deleted from server FAILED!",err);
            }
            const sessionId = crypto.randomBytes(32).toString("hex");
            const sessionData = JSON.stringify(
                {
                    user: req.body.loginEmailAddress,
                    createdAt: Date.now(),
                    milisecondsDuration: (60 * 60 * 1000), // 60 * 60 * 1000 = 1 hour
                    authorisedAccess: false
                }
            );
            await fs.writeFile('./sessions/' + sessionId + '.json', sessionData, (err) => {
                if (err){
                    console.log(`${trace()} 🗝️ /sessionInit store created?`,false,err);
                } else {
                    console.log(`${trace()} 🗝️ /sessionInit store created?`,true);
                }
            });
            function buildCookie(name, value, options = {}) {
            const {
                path = "/",
                httpOnly = true,
                secure = true,
                sameSite = "None"
            } = options;
                return `${name}=${value}; Path=${path}; ${httpOnly ? "HttpOnly;" : ""} ${secure ? "Secure;" : ""} SameSite=${sameSite}`;
            }
            const cookies = [
                buildCookie("connectSID", sessionId),
            ];
            res.setHeader("Set-Cookie", cookies);
            const sessionInitOK = true; // Set to true to indicate save success
            res.send({sessionInitOK:sessionInitOK});
            console.log(`${trace()} 🗝️ /sessionInit cookie set.`,cookies);
            console.log(trace(),"i n i t i a l i s e   s e s s i o n   f o r   l o g i n   u s e r   E N D");
        });


export default sessionsRouter;
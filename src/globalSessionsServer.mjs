const consoleLog = true;

console.log("LOADED:- globalSessionsServer.mjs is loaded",new Date().toLocaleString());
export function globalSessionsServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const sessionsRouter = Router();
    import {trace} from "./globalServer.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    // LOGOUT
        sessionsRouter.post("/sessionLogout", (req, res) => {
            req.session.destroy((err) => {
                if (err){
                    if(consoleLog===true){console.log(("🛑").repeat(60));}
                    if(consoleLog===true){console.log(trace());}
                    if(consoleLog===true){console.log(`${trace()} logout failed:- `,err);}
                    return res.status(500).send({"logoutConfirmed":false});
                }
                res.clearCookie("connect.sid"); // Remove session cookie
                res.send({"logoutConfirmed":true});
            });
        });

    // SESSION REGENERATION
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
                        if(consoleLog===true){console.log(trace(),"Login: session regen - Session regen ok.");}
                        // if(consoleLog===true){console.log(trace(),"Login: session regen - Session securityCode updated.");}
                        if(consoleLog===true){console.log(trace(),"Login: session regen - req.session:-",JSON.stringify(req.session, null, 2));}
                        // if(consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode:-",JSON.stringify(req.session.securityCode, null, 2));}
                        // if(consoleLog===true){console.log(trace(),"Login: session regen - req.session.securityCode.code:-",JSON.stringify(req.session.securityCode.code, null, 2));}
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
                // regenerate session & add security code to regenerated session START
            // generate securityCode END 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
        });


export default sessionsRouter;
const consoleLog = true;

if(consoleLog===true){console.log(trace(),"\nLOADED:- globalSessionsServer.mjs is loaded",new Date().toLocaleString());}
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
        
export default sessionsRouter;
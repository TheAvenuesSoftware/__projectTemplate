console.log("LOADED:- globalSessionsServer.mjs is loaded",new Date().toLocaleString());
export function globalSessionsServerMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const sessionsRouter = Router();
    import { trace, maskString } from "./global_Server.mjs";
    import * as cookie from "cookie";
    import * as fsCore from "fs";
    import * as fsPromises from 'fs/promises';
    import crypto from 'crypto';
    import { closeDB } from "./projectSQLite_Server.mjs";
    import { join } from 'node:path';
    // import { randomUUID } from 'crypto'; // randomUUID is a named export from crypto
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// /**
//  * Helper to verify if a user has permission to access a specific resource.
//  * @param {Object} req - The incoming request object
//  * @param {String} resourceOwnerId >>> userEmailAddress - The ID of the user who owns the data being requested
//  * @param {String} userEmailAddress - The ID of the user who owns the data being requested
//  * @returns {Object} The decoded user object if authorized
//  * @throws {Error} If authentication or authorization fails
//  */
export async function isAuthorised_JWT(req, userEmailAddress) {
    // 1. Extract the token (usually from Authorization header)
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Unauthenticated: No token provided');
        }else{
            console.log(trace(),"✅ Authorization header found in request.",authHeader);
        }

        const token = authHeader.split(' ')[1];

    try {
    // 2. Verify the token (e.g., using JWT)
        // This ensures the user is who they say they are.
            const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);

    // 3. Perform the Authorization check (The "Ownership" check)
        // Check if the logged-in user's ID matches the owner of the data.
        // We also allow 'admin' roles to bypass this.
        const isOwner = String(decodedUser.id) === String(userEmailAddress);
        const isAdmin = decodedUser.role === 'admin';

        if (!isOwner && !isAdmin) {
            throw new Error('Unauthorized: You do not have permission to view this resource');
        }

    return decodedUser;
    } catch (err) {
        throw new Error('Access Denied: Invalid credentials');
    }
}

export async function isAuthorised_cookie(req){
    // This function must be asynchronous because reading a file (fs.readFile) is an I/O operation 
    // and should not block the Node.js event loop.

    // Define the directory where your session files are stored
    const SESSION_DIR = join(process.cwd(), 'sessions');

    // /**
    //  * Checks if the request is authorized by looking up a session file 
    //  * named after the 'connectSID' cookie value.
    //  *
    //  * @param {object} req - The request object, containing cookies.
    //  * @returns {Promise<boolean>} True if the session file exists, is readable, and contains authorization data; false otherwise.
    //  */
    // 1. Get the Session ID (connectSID)
        const sessionId = req.cookies?.['connectSID'];
        // Check if the session ID exists in the cookies
        if (!sessionId) {
            console.log(trace(),"❌ connectSID NOT FOUND in request cookies.");
            return false;
        }else{
            console.log(trace(),"✅ connectSID found in request cookies:-",sessionId)
        }
    // 2. Define the full path to the session file
        // Example path: /path/to/project/sessions/somesecurestring.json
        const filePath = join(SESSION_DIR, `${sessionId}.json`);
        try {
            // 3. Attempt to Read the File
                // The file must exist and be readable for this to succeed.
                // We use { encoding: 'utf8' } to get the file contents as a string.
                const fileContent = await fsPromises.readFile(filePath, { encoding: 'utf8' });
            // 4. Parse the JSON content
                const sessionData = JSON.parse(fileContent);
                console.log(`${trace()} sessionData:-\n` ,sessionData);
            // 5. Check Authorization Status (The specific check will depend on the file content)
                // Assume the file contains a structure like: { user: { id: 123, role: 'admin' } }
                // The check is simply: Does the session data contain a valid, logged-in user?
                if (sessionData.user===req.body.userEmailAddress && sessionData.authorisedAccess===true ) {
                    console.log(`${trace()} 💚🎉🥂🍾💚 user: ${sessionData.user} authorisedAccess 💚🎉🥂🍾💚 ${sessionData.authorisedAccess} 💚🎉🥂🍾💚`)
                    return true;
                } else {
                    console.log(trace(),`Session file exists for ${sessionId}, but is missing required authorization data.`);
                    return false;
                }
        } catch (error) {
            // 6. Handle Errors (File not found is the most common expected error)
                // ENOENT means "Error NO ENTry" (File or directory not found)
                if (error.code === 'ENOENT') {
                    console.log(trace(),`Authorization failed: Session file not found for SID: ${sessionId}`);
                    return false; // File doesn't exist, so user is not authorized
                }
                // Handle other file system errors (e.g., EACCES - Permission denied, EINVAL - Invalid argument)
                console.error(trace(),`An unexpected file system error occurred for SID: ${sessionId}`, error);
                return false;
        }
}

    // LOGOUT 🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️🚪➡️
        // Example of the essential Server-Side Logout Logic
            sessionsRouter.post("/sessionLogout", async (req, res) => {
                const parsedCookies = cookie.parse(req.headers.cookie || "");
                const sessionIdToDestroy = parsedCookies.connectSID;

                // 0. Close DB connection if applicable
                    await closeDB(req.body.userEmailAddress);

                // 1. Delete the server-side session file (Non-blocking)
                    if (sessionIdToDestroy) {
                        try {
                            await fsPromises.unlink(`./sessions/${sessionIdToDestroy}.json`);
                        } catch (err) {
                            // Log, but ignore 'ENOENT' (file not found)
                        }
                    }

                // 2. Destroy the client-side cookie by setting expiration to the past
                    const expiredCookieHeader = [
                        // MUST use the exact same cookie parameters (Path, Domain, Secure, SameSite) 
                        // to correctly overwrite the existing cookie in the browser.
                        `connectSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=None`
                    ];

                res.setHeader("Set-Cookie", expiredCookieHeader);
                
                // 3. Send success response back to the client
                    res.send({ logoutConfirmed: true });
            });

    // SESSION REGENERATION ®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️START
        // Helper function to read current session ID from cookies
            function getSessionIdFromReq(req) {
                const parsed = cookie.parse(req.headers.cookie || "");
                return parsed.connectSID;
            }

        // 💎 =========================================================================================
        // Helper function to read session file data START
            // -----------------------------------------------------------------------------------------
                // // OBSOLETE CODE - REPLACED WITH EXPIRATION CHECK CODE
                    //     async function readSessionData(sessionId) {
                    //         try {
                    //             const filePath = `./sessions/${sessionId}.json`;
                    //             const data = await fsPromises.readFile(filePath, 'utf8');
                    //             return JSON.parse(data);
                    //         } catch (err) {
                    //             if (err.code === 'ENOENT') {
                    //                 return null; // File not found, session doesn't exist
                    //             }
                    //             throw err;
                    //         }
                    //     }
                // // OBSOLETE CODE - REPLACED WITH EXPIRATION CHECK CODE
            // -----------------------------------------------------------------------------------------
            // /**
            // * Reads session data from disk, performs expiration check, and cleans up if expired.
            // * @param {string} sessionId The session ID to look up.
            // * @returns {Promise<object|null>} The session data object, or null if not found or expired.
            // */
            // 🕰️ Enforcing Server-Side Session Expiration
            // const fsPromises = require('fs').promises;
            // const path = require('path');

            // // Assuming a helper like trace() exists for logging
            // const trace = () => `[${new Date().toISOString()}]`;

            // /**
            //  * Reads session data from disk, performs expiration check, and cleans up if expired.
            //  * @param {string} sessionId The session ID to look up.
            //  * @returns {Promise<object|null>} The session data object, or null if not found or expired.
            //  */
            async function readSessionData(sessionId) {
                // const filePath = path.join('./sessions', `${sessionId}.json`);
                const filePath = `./sessions/${sessionId}.json`;
                
                try {
                    // 1. Read the file
                    const fileContent = await fsPromises.readFile(filePath, 'utf8');
                    const sessionData = JSON.parse(fileContent);

                    // 2. Perform the Expiration Check
                    // If 'expiresAt' exists and the current time is after the expiration time
                    if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
                        
                        console.log(`${trace()}🚨 Session Expired! Cleaning up: ${sessionId}`);
                        
                        // 3. Clean up the expired file
                        try {
                            await fsPromises.unlink(filePath);
                        } catch (cleanupError) {
                            // Log cleanup error but continue, the session is still invalid
                            console.error(`${trace()}⚠️ Error cleaning up expired session file:`, cleanupError.message);
                        }
                        
                        // Return null, treating it as if the session never existed
                        return null;
                    }

                    // 4. Session is valid
                    return sessionData;

                } catch (error) {
                    // Handle file not found (Error code 'ENOENT') or other errors
                    if (error.code === 'ENOENT') {
                        return null; // File not found, session doesn't exist
                    }
                    
                    // Handle JSON parse errors or other I/O issues
                    console.error(`${trace()}🔴 Error reading session file ${sessionId}:`, error.message);
                    throw error;
                }
            }

            // Example usage:
            // const sessionData = await readSessionData(sessionIdOld);
            // if (!sessionData) { /* Session expired or not found */ }
            // 💎 =========================================================================================
                // How This Enforces the 1.5-Hour Limit
                // 1. Regeneration Writes: When you regenerate the session, the new file is written with expiresAt: 
                //    Date.now() + 5400000 (1.5 hours in milliseconds).
                // 2. Subsequent Requests: On every subsequent request using that new session ID, your system must 
                //    call readSessionData(sessionId).
                // 3. The Check: If the current time (Date.now()) is greater than the recorded expiresAt, the if block triggers.
                // 4. Security Action: The session file is deleted from the server, and null is returned.
                // 5. Handling: Your main route handler (sessionsRouter.post("/sessionRegen", ...) 
                //    and any other authenticated routes) sees null and responds with a status like 404 ("Old session not found on server") or 401 ("Unauthorized"), forcing the client to re-authenticate.
            // 💎 =========================================================================================
        // Helper function to read session file data END
        // 💎 =========================================================================================

        // sessionsRouter.post("/sessionRegen" OBSOLETE_on_2025-12-12, async (req, res) => {
        //     console.log(`${trace()} s e s s i o n R e g e n   S T A R T`);
        // 
        //     const sessionIdOld = getSessionIdFromReq(req);
        //             
        //     if (!sessionIdOld) {
        //         // If there's no cookie, treat this as an unauthenticated request.
        //             return res.status(401).send({ sessionRegenOK: false, message: "No session ID to regenerate." });
        //     }
        // 
        //     try {
        //         // 1. Read Old Data
        //             const sessionDataOld = await readSessionData(sessionIdOld);
        //             if (!sessionDataOld) {
        //                 return res.status(404).send({ sessionRegenOK: false, message: "Old session not found on server." });
        //             }
        // 
        //         // 2. Generate New ID and Prepare New Data
        //             const sessionIdNew = crypto.randomBytes(32).toString("hex");
        // 
        //             // Define 1.5 hours in milliseconds
        //                 const ONE_AND_A_HALF_HOURS_MS = 1.5 * 60 * 60 * 1000;
        //                 const SESSION_DURATION_MS = 1.5 * 60 * 60 * 1000;
        //                 const sessionExpiresAt = Date.now() + SESSION_DURATION_MS;
        //       
        //             // This is the "upgrade" part—retaining old data but adding/changing new state
        //                 const securityCodeTTL = 10;
        //                 const sessionDataNew = {
        //                     ...sessionDataOld, // Keep existing data (like user ID, if set)
        //                     sessionExpiresAt: sessionExpiresAt, // server side session expiry time
        //                     securityCode: {   // Add the new security state
        //                         expiresAt: Date.now() + securityCodeTTL * 60 * 1000
        //                     },
        //                     // If this is the *final* upgrade, you would set: authorisedAccess: true,
        //                         authorisedAccess: true
        //             };
        //             const sessionDataJson = JSON.stringify(sessionDataNew);
        // 
        //         // 3 <<< 4. Write New Session File
        //             await fsPromises.writeFile(`./sessions/${sessionIdNew}.json`, sessionDataJson);
        //             console.log(`${trace()}🔒 New session file created: ${sessionIdNew}`);
        // 
        //         // 4 <<< 3. Delete Old File (Crucial for preventing session fixation)
        //             await fsPromises.unlink(`./sessions/${sessionIdOld}.json`);
        //             console.log(`${trace()}🔒 Old session file deleted: ${sessionIdOld}`);
        //                 
        //         // 5. Send New Cookie to Client
        //             function buildCookie(name, value, options = {}) {
        //             const {
        //                 path = "/",
        //                 httpOnly = true,
        //                 secure = true,
        //                 sameSite = "None",
        //                 maxAge
        //             } = options;
        //                 // return `${name}=${value}; Path=${path}; ${httpOnly ? "HttpOnly;" : ""} ${secure ? "Secure;" : ""} SameSite=${sameSite}`;
        //                 // **👇 New Max-Age attribute added to cookie string**
        //                 let cookieString = `${name}=${value}; Path=${path}; ${httpOnly ? "HttpOnly;" : ""} ${secure ? "Secure;" : ""} SameSite=${sameSite}`;
        //                 if (maxAge !== undefined) {
        //                     cookieString += `; Max-Age=${maxAge}`;
        //                 }
        //                 return cookieString;                        
        //             }
        //             const SESSION_MAX_AGE_SECONDS = 5400; // 1.5 hours
        //             const newCookieHeader = [
        //                 // buildCookie("connectSID", sessionIdNew),
        //                 buildCookie("connectSID", sessionIdNew, { maxAge: SESSION_MAX_AGE_SECONDS }), // <-- Pass maxAge option
        //             ];
        //             res.setHeader("Set-Cookie", newCookieHeader);
        // 
        //             // Crucially, even if a user keeps their browser open longer than 1.5 hours, the server 
        //             // will check the expiresAt value in the session file (in your middleware/auth logic) 
        //             // and treat the session as invalid after that time. This is the most important security mechanism
        //             //  for session longevity.
        //             // To fully implement this, you would also need to ensure that your readSessionData 
        //             // (or a related middleware function) checks the expiresAt value and deletes the file if it has passed.
        //                     
        //         // 6. Success Response
        //             console.log(`${trace()}🔒🟢 ${newCookieHeader}`);
        //             console.log(`${trace()}🔒🟢 SESSION_MAX_AGE_SECONDS: ${SESSION_MAX_AGE_SECONDS} = ${SESSION_MAX_AGE_SECONDS / 60} minutes.`);
        //             console.log(`${trace()}🔒🟢 S e s s i o n   r e g e n e r a t e d   a n d   s a v e d   s u c c e s s f u l l y.`);
        //             res.send({ sessionRegenOK: true });
        //                     
        //     } catch (err) {
        //         console.error(trace(), "🔴 S e s s i o n   r e g e n e r a t i o n   F A I L E D :\n", err);
        //         res.status(500).send({ sessionRegenOK: false, message: "Server error during session regeneration." });
        //     }
        // });
            sessionsRouter.post("/sessionRegen", async (req, res) => {
                console.log(`${trace()}🔒🟢 s e s s i o n R e g e n   f o r   s i g n e d   i n   u s e r s   S T A R T`);                
                const sessionIdOld = getSessionIdFromReq(req);
                console.log(`${trace()} sessionIdOld: `,maskString(sessionIdOld,20,20));
                if (!sessionIdOld) {
                    // If there's no cookie, treat this as an unauthenticated request.
                        console.log(`${trace()} sessionIdOld: ?  no session to regenerate: `,sessionIdOld);                
                        return res.status(401).send({ sessionRegenOK: false, message: "No session ID to regenerate." });
                }
                let sessionDataOld; // Define outside try to allow access in outer catch if needed
                try {
                    // 1. Read Old Data
                        sessionDataOld = await readSessionData(sessionIdOld);
                        if (!sessionDataOld) {
                            return res.status(404).send({ sessionRegenOK: false, message: "Old session not found on server." });
                        }
                    // 2. Generate New ID and Prepare New Data
                        const sessionIdNew = crypto.randomBytes(32).toString("hex");
                        // Clarity Fix: Use only one constant
                            const SESSION_DURATION_MS = 1.5 * 60 * 60 * 1000; 
                            const sessionExpiresAt = Date.now() + SESSION_DURATION_MS;                
                        // This is the "upgrade" part
                            const securityCodeTTL = 10; // minutes
                            const sessionDataNew = {
                                ...sessionDataOld,
                                sessionExpiresAt: sessionExpiresAt,
                                securityCode: { 
                                    expiresAt: Date.now() + securityCodeTTL * 60 * 1000
                                },
                                authorisedAccess: true
                            };
                            const sessionDataJson = JSON.stringify(sessionDataNew);
                    // --- File Operations: Write-Before-Delete Pattern START ---
                        // 3. Write New Session File (CRUCIAL: Write first for fault tolerance)
                            await fsPromises.writeFile(`./sessions/${sessionIdNew}.json`, sessionDataJson);
                            console.log(`${trace()}🔒 New session file created: ${maskString(sessionIdNew,20,20)}`);
                        // 4. Delete Old File (Crucial for preventing session fixation)
                            try {
                                await fsPromises.unlink(`./sessions/${sessionIdOld}.json`);
                                console.log(`${trace()}🔒 Old session file deleted: ${maskString(sessionIdOld,20,20)}`);
                            } catch (deleteError) {
                                // New session is written, client gets new cookie. Log the error 
                                // but continue the response. Old session file is now a 'zombie' 
                                // but the new session is active.
                                    console.warn(`${trace()}⚠️ WARNING: Failed to delete old session file ${sessionIdOld}. It may be a stale file on disk.`, deleteError.message);
                            }
                    // --- File Operations: Write-Before-Delete Pattern END ---                    
                    // 5. Send New Cookie to Client
                        function buildCookie(name, value, options = {}) {
                            const {
                                path = "/",
                                httpOnly = true,
                                secure = true,
                                sameSite = "None",
                                maxAge
                            } = options;
                            // ... (rest of the buildCookie function remains the same) ...
                                let cookieString = `${name}=${value}; Path=${path}; ${httpOnly ? "HttpOnly;" : ""} ${secure ? "Secure;" : ""} SameSite=${sameSite}`;
                                if (maxAge !== undefined) {
                                    cookieString += `; Max-Age=${maxAge}`;
                                }
                                return cookieString;
                        }
                        const SESSION_MAX_AGE_SECONDS = 5400; // 1.5 hours
                        const newCookieHeader = [
                            buildCookie("connectSID", sessionIdNew, { maxAge: SESSION_MAX_AGE_SECONDS }),
                        ];
                        res.setHeader("Set-Cookie", newCookieHeader);
                    // 6. Success Response
                        console.log(`${trace()}🔒🟢 ${newCookieHeader}`);
                        const cookieValue = newCookieHeader[0];
                        const parts = cookieValue.split('; ');
                        console.log(`${trace()}🔒🟢 Cookie Breakdown:`);
                        parts.forEach(part => console.log(`   🔒🟢 ${part}`));
                        console.log(`${trace()}🔒🟢 s e s s i o n R e g e n   f o r   s i g n e d   i n   u s e r s   s u c c e s s.`);
                        console.log(`${trace()}🔒🟢 s e s s i o n R e g e n   f o r   s i g n e d   i n   u s e r s   E N D`);                
                        res.send({ sessionRegenOK: true });            
                } catch (err) {
                    // This outer catch block now primarily handles errors from:
                    // - readSessionData
                    // - crypto.randomBytes
                    // - fsPromises.writeFile (new session file creation)
                        console.error(trace(), "🔴 S e s s i o n   r e g e n e r a t i o n   F A I L E D :", err);
                        res.status(500).send({ sessionRegenOK: false, message: "Server error during session regeneration." });
                }
            });
    // SESSION REGENERATION ®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️®️END
        sessionsRouter.post("/sessionInit", async (req, res) => {
            // 1. Logs and Safe Cookie Parsing
                console.log(trace(),"i n i t i a l i s e   s e s s i o n   f o r   l o g i n   u s e r   S T A R T");
                console.log(trace(),new Date().toLocaleString());
                const parsed = cookie.parse(req.headers.cookie || "");
                const sessionIdOld = parsed.connectSID;

            // 2. Delete Old Session (Non-Blocking and Graceful)
                if (sessionIdOld) {
                    try {
                        // Use the non-blocking Promise-based unlink
                            await fsPromises.unlink(`./sessions/${sessionIdOld}.json`);
                            console.log(trace(), "Old session deleted from server OK!");
                    } catch (err) {
                        // Only log if it's NOT a "file not found" error
                            if (err.code !== 'ENOENT') { 
                                console.log(trace(), "Session deletion FAILED unexpectedly:", err);
                            }
                    }
                } else {
                    console.log(trace(), "No existing session ID found in cookies.");
                }

            // 3. Create New Session
                const sessionId = crypto.randomBytes(32).toString("hex");
                const sessionData = JSON.stringify(
                    {
                        user: req.body.loginEmailAddress,
                        createdAt: Date.now(),
                        milisecondsDuration: (60 * 60 * 1000), 
                        authorisedAccess: false
                    }
                );

            // 4. Write New Session (Awaited and Non-Blocking)
                try {
                    // Await the Promise-based writeFile to ensure the file is saved before responding
                    await fsPromises.writeFile('./sessions/' + sessionId + '.json', sessionData);
                    console.log(`${trace()} 🗝️ /sessionInit store created?`, true);
                } catch (err) {
                    console.log(`${trace()} 🗝️ /sessionInit store created?`, false, err);
                    // CRITICAL: If session creation fails, you must stop here and send an error response
                    return res.status(500).json({ sessionInitOK: false, message: "Server error creating session." });
                }

            // 5. Send Response
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
                const cookieValue = cookies[0];
                const parts = cookieValue.split('; ');
                console.log(`${trace()}🔒🟢 Cookie Breakdown:`);
                parts.forEach(part => console.log(`   🔒🟢 ${part}`));
                console.log(trace(),"i n i t i a l i s e   s e s s i o n   f o r   l o g i n   u s e r   E N D");
        });


export default sessionsRouter;
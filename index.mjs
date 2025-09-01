// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->
// ~ Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// ~ Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// ~ Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// ~ Modules: Often kebab-case for filenames (e.g., user-profile.mjs)
// ~ Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// ~ Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

let myDate;
myDate = new Date();
console.log(("🔰").repeat(60));
console.log(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🔰`);
myDate = new Date();
console.log(`🔰 ${myDate}${(" ").repeat(118-(`🎾 ${myDate}`).length)}🔰`);
process.env.APP_TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
console.log(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}${(" ").repeat(118-(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`).length)}🔰`);
console.log(("🔰").repeat(60));

export function trace(whoCalled="") {
    try {
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();
        const x = firstLine.lastIndexOf("/");
        const y = firstLine.lastIndexOf("/",x - 1);
        const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
        return `▶️Trace: [${whoCalled? whoCalled : ""}] ${fileName_rowNumber_position} ▶️`;
    } catch (error) {
        return '▶️🔴 Trace: NOT AVAILABLE▶️',error;
    }
};

const consoleLog = false;

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 1️⃣ import statements
    // // axios
    //     import axios from 'axios';
    // OS ~ operatingSystem
        import os from 'os';
    // FS ~ fileSystem
        import fs from 'fs';
        // import fs from 'fs/promises';
            // ~ fs.writeFile from 'fs' expects a callback (cb), which is why you're getting the "cb argument must be of type function" error.
            // ~ The 'fs/promises' version works natively with async/await, so no callback is needed.
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
            // Get the current file path
                const __filename = fileURLToPath(import.meta.url);
            // Get the directory name
                const __dirname = path.dirname(__filename);
    // ENVironment variables
        import dotenv from "dotenv";
    // https
        import https from 'https'; // For making HTTPS requests
    // EXPRESS
        import express from "express";
    // // COOKIE ...this is not middleware, but a utility to parse cookies
    //     import * as cookie from "cookie";
    // // COOKIE PARSER
        import cookieParser from 'cookie-parser';
    // JSONWEBTOKE for user authentication
        import jwt from 'jsonwebtoken';
    // CRYPTO
        import crypto from 'crypto'
        import { randomUUID } from 'crypto'; // randomUUID is a named export from crypto
    // // SESSIONS
    //     import session from 'express-session'; // dropped on 31 July 2025
    // CORS handling START
        import cors from 'cors';
    // SQLite
        // async await environment
            import sqlite3 from "sqlite3"; //The core Node.js SQLite package (handles database operations).
            import { open } from "sqlite"; // The SQLite package that provides a promise-based API for database operations.
    // busboy
        import busboy from 'busboy'; // For handling file uploads in Express.js
    // RATE LIMITER
        import { rateLimit } from 'express-rate-limit';         
    // SANITIZE INPUTS
        import sanitizeHtml from "sanitize-html";
        const userInput = "<script>alert('Hacked!');</script><p>Hello</p>";
        const cleanInput = sanitizeHtml(userInput);
        console.log(`${trace()} 🟢 sanitizeHtml() functionality is in place:- ${cleanInput}`); // Output: "<p>Hello</p>";
        // examples
            // 1
                // const cleanInput = sanitizeHtml(userInput, {
                //     allowedTags: ["p", "strong", "a"],
                //     allowedAttributes: {
                //         "a": ["href"]
                //     }
                // });
                // console.log(cleanInput); // Only keeps `<p>`, `<strong>`, and `<a>`
    // ROUTERS
        import dbRouter from "./src/projectSQLite_Server.mjs";
        import loginRouter from './src/globalLogin_Server.mjs';
        import globalRouter from './src/global_Server.mjs'; 
        import projectRouter from './src/project_Server.mjs';
        import sessionsRouter from './src/globalSessions_Server.mjs';
        import googleAPIsRouter from './src/projectGoogleAPIs_Server.mjs';
    // SQLite CRUD
        // import { insertFormDataRecord, getRecord, updateRecord, deleteRecord } from "./src/SQLite_ServerSide.mjs";
    // // Trace()
    //     import { trace } from "./src/global_Server.mjs";
        
    // function checkImports(){
        try{
            // console.log("Imported axios:", axios ? "✅ " : "❌ Failed");
            console.log("Imported os:", os ? "✅ " : "❌ Failed");
            console.log("Imported fs:", fs ? "✅ " : "❌ Failed");
            console.log("Imported path:", path ? "✅ " : "❌ Failed");
            console.log("Imported url { fileURLToPath }:", fileURLToPath ? "✅ " : "❌ Failed");
            console.log("Imported dotenv:", dotenv ? "✅ " : "❌ Failed");
            console.log("Imported express:", express ? "✅ " : "❌ Failed");
            // console.log("Imported cookie / cookie:", cookie ? "✅ " : "❌ Failed"); ... this is not middleware, but a utility to parse cookies
            console.log("Imported cookieParser / cookie-parser:", cookieParser ? "✅ " : "❌ Failed");
            console.log("Imported jwt / jsonwebtoken:", jwt ? "✅ " : "❌ Failed");
            console.log("Imported crypto:", crypto ? "✅ " : "❌ Failed");
            console.log("Imported crypto { randomUUID }:", randomUUID ? "✅ " : "❌ Failed");
            // console.log("Imported session / express-session:", session ? "✅ " : "❌ Failed");
            console.log("Imported cors:", cors ? "✅ " : "❌ Failed");
            console.log("Imported sqlite3:", sqlite3 ? "✅ " : "❌ Failed");
            console.log("Imported sqlite { open }:", open ? "✅ " : "❌ Failed");
            console.log("Imported busboy:", busboy ? "✅ " : "❌ Failed");
            console.log("Imported dbRouter:", dbRouter ? "✅ " : "❌ Failed");
            console.log("Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");
            console.log("Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");
            console.log("Imported projectRouter:", projectRouter ? "✅ " : "❌ Failed");
            console.log("Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");
            console.log("Imported googleAPIsRouter:", googleAPIsRouter ? "✅ " : "❌ Failed");
            // console.log("Imported {insertFormDataRecord} from SQLite_ServerSide.mjs:", insertFormDataRecord ? "✅ " : "❌ Failed");
            // console.log("Imported {getRecord} from SQLite_ServerSide.mjs:", getRecord ? "✅ " : "❌ Failed");
            // console.log("Imported {updateRecord} from SQLite_ServerSide.mjs:", updateRecord ? "✅ " : "❌ Failed");
            // console.log("Imported {deleteRecord} from SQLite_ServerSide.mjs:", deleteRecord ? "✅ " : "❌ Failed");
            console.log("Imported {trace} from globalServer.mjs:", trace ? "✅ " : "❌ Failed");
        }
        catch (error) {
            console.log("imports error:",error);
        }     
    // }
    // checkImports();

if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 2️⃣ environment configuration
    // .ENV;  .MJS
        // globalServer.env
            try{
                const envPath = "./config/globalServer.env";
                if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath });
                    if(consoleLog===true){console.log(trace(),`\n   Global environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:-\n`, result.parsed);}  
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);  //  DO NOT LOG ~ SECRET INDO !!!
                        if(consoleLog===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Global environment variables loaded.`);
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
            }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
        // project.env
            try{
                const envPath = "./config/projectServer.env";
                if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath });
                    if(consoleLog===true){console.log(trace(),`\n   Project environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath });
                    // if(consoleLog===true){console.log(trace(),`\n${envPath}:`, result);}                
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);  //  DO NOT LOG ~ SECRET INDO !!!
                        if(consoleLog===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Project environment variables loaded.`);
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
            }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 3️⃣ create express app
    const app = express();
    // exceptional placement - place this middleware right after express() START
        app.use(express.json()); // Middleware to parse JSON data
        app.use(express.json({ limit: "10mb" })); // Middleware to parse JSON data // Increase JSON request size limit
        app.use(cookieParser()); // Enables reading of cookies, express specific cookie parser
    // exceptional placement - place this middleware right after express() END
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 5️⃣ MOUNT EXTERNAL ROUTERS
        // function mountRouters() {
            try{
                app.use("/dbRouter", dbRouter);
                app.use("/loginRouter", loginRouter);
                app.use("/globalRouter", globalRouter);
                app.use("/projectRouter", projectRouter);
                app.use("/sessionsRouter", sessionsRouter);
                app.use("/googleAPIsRouter", googleAPIsRouter);
                console.log(`${trace()}🟢 Routers mounted ~ must be done after Authentication is setup.`);
            }
            catch (error) {
                console.log(error);
            }
        // }
        // mountRouters();
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
    // 🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
        // uuid4() vs randomUUID() START
            // const { v4: uuidv4 } = require('uuid');
            // When comparing uuid4() and randomUUID(), the key is to understand that:
            // uuid4() is a function typically found in Python (uuid.uuid4()).
            // randomUUID() is often used in Java (UUID.randomUUID()).
            // Both generate version 4 UUIDs, which are randomly generated and compliant with the UUID standard (RFC 4122).
        // uuid4() vs randomUUID() END
        app.use((req, res, next) => {
            // console.log(("🍪").repeat(60));
            // console.log(`🍪 ${trace()} Ensure Guest Cookie is set START.`);
            // console.log(`🍪 ${trace()} req.url:-`,req.url);
            // assign a guestId if no guestId cookie is present START
                // set the cookie START
                    function setGuestCookie(){
                            // const guestId = uuidv4(); // uuid4() is typically found in Python
                            const guestId = randomUUID();
                            // SETTING THE GUEST COOKIE start
                                // OPTION 1 - set cookie manually START
                                    let cookieStr;
                                    if(process.env.APP_SERVER_MODE_PRODUCTION.toLowerCase()==="true"){
                                        cookieStr = `guestId=${guestId}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${30 * 24 * 60 * 60 * 1000};`; // 30 days
                                        cookieStr = `guestId=${guestId}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${1 * 60 * 60 * 1000};`; // 1 hour
                                    }else{
                                        cookieStr = `guestId=${guestId}; Path=/; Max-Age=${30 * 24 * 60 * 60 * 1000}; SameSite=Lax`; // 30 days
                                        cookieStr = `guestId=${guestId}; Path=/; Max-Age=${1 * 60 * 60 * 1000}; SameSite=Lax`; // 1 hour
                                    }
                                    console.log(`🍪 ${trace()} ➡️➡️➡️ Guest Cookie details are ➡️➡️➡️ ${cookieStr}`);
                                    res.setHeader("Set-Cookie", cookieStr);
                                // OPTION 1 - set cookie manually END
                                // // OPTION 2 - express server alternative START
                                //     res.cookie("guestId", guestId, {
                                //         sameSite: "lax",
                                //         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                                //     });
                                // // OPTION 2 - express server alternative END
                            // SETTING THE GUEST COOKIE end
                            req.guestId = guestId;
                            console.log(`🍪 ${trace()} ➡️➡️➡️ Guest Cookie set to ➡️➡️➡️ ${guestId}`);
                    }
                // set the cookie END
                if (!req.cookies) {
                    setGuestCookie();
                } else {
                    if (!req.cookies.guestId) {
                        setGuestCookie();
                    }else{
                        // console.log(`🍪 ${trace()} 🟢🟢🟢 Guest Cookie is already set. 🟢🟢🟢`);
                        req.guestId = req.cookies.guestId;
                    }
                }
            // assign a guestId if no guestId cookie is present END
            // console.log(`🍪 ${trace()} Ensure Guest Cookie is set END.`);
            // console.log(("🍪").repeat(60));
            next();
        });
    // 🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓
    // authentication START
        app.use((req, res, next) => {
            // console.log(("🔒").repeat(60));
            // console.log(`🔒 ${trace()} Authentication middleware START.`);
            // console.log(`🔒 ${trace()} req.url`,req.url);
            // console.log(`🔒 ${trace()} req.body`,req.body);
            const safeURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).safe_URLs;
                if (!safeURLs.includes(req.url)) {
                    const allowedRouters = ["/tinymce/", "/dbRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/", "/googleAPIsRouter/"];
                    if (allowedRouters.some(prefix => req.url.startsWith(prefix))) {
                        // console.log("Request is allowed");
                        console.warn(`🪣 ${trace()}🔑✅🟢 Access allowed to router:- ${req.url}`);
                    } else {
                        // console.log("Access denied");
                        console.warn(`🪣 ${trace()}🔑❌🔴 Access denied due to session inconsistency:- ${req.url}`);
// console.log(trace(),"Cookie SID:", req.cookies.sid);
// console.log(trace(),"Headers SID:", req.headers["sid"]);
// console.log(trace(),"Session ID:", req.sessionID);
                        return res.status(403).send({message:"Access denied due to session inconsistency.",status:false});
                    }
                }else{
                    console.warn(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                }
            // console.log(`🔒 ${trace()} Authentication middleware END.`);
            // console.log(("🔒").repeat(60));
            next();
        });
    // authentication END
// 🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓🔒🔓
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
// ⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️
    // manual session managament START
        app.use((req, res, next) => {
            // console.log(("⛹️").repeat(60));
            next();
        });
    // manual session managament END
// ⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️⛹️
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 3️⃣➖1️⃣ middleware
    app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app
    app.set('trust proxy', 1) // trust first proxy
    app.use(express.urlencoded({ limit: "10mb", extended: true })); // ✅ Parses text fields from FormData
    // app.use(cookie()); // Enables reading of cookies ...this is not middleware, but a utility to parse cookies
    app.use(express.raw({ type: "image/jpeg", limit: "10mb" })); // ✅ Captures Blob data

    app.use('/tinymce', express.static(__dirname + '/node_modules/tinymce'));

    // const staticFolders = ['config', 'db', 'media', 'public', 'src', 'styles'];
    // try{
    //     staticFolders.forEach(folder => {
    //         app.use(express.static(folder));
    //         app.use(`./${folder}`,express.static(folder));
    //         console.log(`mapped folder:- ${folder}`);
    //     });
    //     console.log(`${trace()}🟢 Project folders mapped.`);
    // }
    // catch{
    //     console.log(`🔴 map to folder failed:- ${folder}`);
    // }

    // const staticFolders = ['config', 'db', 'public', 'src', 'styles'];
    const staticFolders = ['config', 'db', 'media', 'public', 'src', 'styles'];
    try{
        staticFolders.forEach(folder => {
            app.use(express.static(folder));
            app.use(`/${folder}`, express.static(path.join(__dirname, folder), {
                setHeaders: (res, filePath) => {
                    if (filePath.endsWith('.mjs')) {
                        res.setHeader('Content-Type', 'application/javascript');
                    }
                }
            }));
            console.log(`mapped folder:- ${path.join(__dirname,folder)}`);
        });
        console.log(`${trace()}🟢 Project folders mapped.`);
    }
    catch{
        console.log(`🔴 map to folder failed:- ${folder}`);
    }
    // // server media folder separately START
    //     // Serve static assets like this with caching:
    //     // This will tell the browser to cache the image and avoid repeated downloads.
    //     app.use('/media', express.static(path.join(__dirname, 'media'), {
    //         maxAge: '30d', // Cache for 30 days
    //         etag: true
    //     }));
    // // server media folder separately END
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
    // RATE LIMITER
        const rateLimitNumber = 5
        const rateLimitDuration = 15; // minutes
        const limiter = rateLimit({
            windowMs: rateLimitDuration * 60 * 1000,
            limit: rateLimitNumber,
            handler: (req, res) => {
                res.send('<h1>stop!</>');
                // res.status(429).json({
                //     error: "Rate limit exceeded",
                //     retryAfter: "15 minutes"
                // });
            }
        });
        console.log(`${trace()}🟢 Rate limiter set to a limit of ${rateLimitNumber} requests every ${rateLimitDuration} minutes.`);
        // app.use(limiter);
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
    // CORS handling
        if (process.env.APP_SERVER_MODE_DEVELOPMENT === "true") {
            console.log(`${trace()}🔒✅ CORS headers set up for Development commenced.`);
            const PORT = process.env.APP_PORT; 
            const corsDevelopmentOrigin = `http://localhost:${PORT}`;
            app.use(cors({

                    origin: corsDevelopmentOrigin,
                    // origin: '*', // blocks cookies when credentials is set to true

                    credentials: true,

                    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],

                    allowedHeaders: ['Content-Type', 'Authorization'],

                    optionsSuccessStatus: 204, // Avoids extra response headers in preflight requests

            }));
            console.log(`${trace()}🔒✅ CORS headers set up for Development completed.`);
        } else if (process.env.APP_SERVER_MODE_PRODUCTION === "true") {
            console.log(`${trace()}🔒✅ CORS headers set up for Production commenced.`);
            app.use(cors({

                    origin: ["https://netit.au", "https://www.netit.au"],

                    credentials: true,

                    methods: ["GET", "POST", "PUT", "DELETE"],

                    allowedHeaders: ["Content-Type", "Authorization"],

                    optionsSuccessStatus: 204

            }));
            console.log(`${trace()}🔒✅ CORS headers set up for Production completed.`);
        } else {
            console.log(`${trace()}🔒🔴 CORS headers set up failed. Neither development nor production mode is set.`);
            throw new Error("Invalid configuration: Neither development nor production mode is set.");
        }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
    // // 4️⃣ session management
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
                    // let sessionInitialised=false;
                    // app.use(async (req, res, next) => {
                    //     console.log(("❓").repeat(60));
                    //     console.log(`${trace()} Request received.`);
                    //     console.log(`${trace()}req.Headers:-\n`, req.headers);
                    //     console.log(`${trace()}req.URL:-`, req.url);
                    //     console.log(`${trace()}req.Body:-`, req.body);
                    //     console.log(("❓").repeat(60));
                    //     if(sessionInitialised===false){
                    //         console.log(("🍪").repeat(60));
                    //         console.log(`${trace()} Initialise cookies.`);
                    //         const sessionId = crypto.randomBytes(32).toString("hex");
                    //         const sessionData = JSON.stringify(
                    //             {
                    //                 user: "guest",
                    //                 createdAt: Date.now(),
                    //                 milisecondsDuration: (60 * 60 * 1000) // 60 * 60 * 1000 = 1 hour
                    //             }
                    //         );
                    //         await fs.writeFile('./sessions/' + sessionId + '.json', sessionData, (err) => {
                    //             if (err){
                    //                 console.log(`${trace()} 🗝️ Session store created?`,false,err);
                    //             } else {
                    //                 console.log(`${trace()} 🗝️ Session store created?`,true);
                    //             }
                    //         });
                    //         function buildCookie(name, value, options = {}) {
                    //             const {
                    //                 path = "/",
                    //                 httpOnly = true,
                    //                 secure = true,
                    //                 sameSite = "None"
                    //             } = options;
                    //             const cookieParts = [
                    //                 `${name}=${value}`,
                    //                 `Path=${path}`,
                    //                 sameSite ? `SameSite=${sameSite}` : "",
                    //                 httpOnly ? "HttpOnly" : "",
                    //                 secure ? "Secure" : ""
                    //             ];
                    //             return cookieParts.filter(Boolean).join("; ");
                    //         }
                    //         const cookies = [
                    //             buildCookie("connectSID", sessionId),
                    //             buildCookie("theme", "dark"),
                    //             buildCookie("token", "XYZ456"),
                    //             buildCookie("mode", "auto", { sameSite: "Lax", secure: false })
                    //         ];
                    //         res.setHeader("Set-Cookie", cookies);
                    //         sessionInitialised=true;
                    //         console.log(("🍪").repeat(60));
                    //     }
                    //     next(); // next(); // Proceed to the next middleware or route handler
                    // });
    // const fs = require('fs').promises;
    // const path = require('path');
    // const crypto = require('crypto');
    // const cookie = require('cookie');

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// authentication specific routes - must be ahead of app.use middleware ??? better check if that's correct Donald



app.post('/login', (req, res) => {
  const user = authenticate(req.body.username, req.body.password);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  // Issue authToken
  res.cookie('authToken', generateJwt(user.id), {
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  // Optionally clear guest cookie
  res.clearCookie('guestId');
  res.send('Login successful');
});

app.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  // Optionally reassign guestId (if app needs anonymous session)
  const newGuestId = uuidv4();
  res.cookie('guestId', newGuestId, {
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  res.send('Logged out');
});


    app.use(async (req, res) => {
    // app.get('/session-reset?reload=true', async (req, res) => {
        if(req.url==='/session-reset?reload=true'){
            console.log(("🔻").repeat(60));
            console.log("🔻     S E S S I O N     I N I T / R E S E T     - /session-reset?reload=true -     S T A R T");
            myDate = new Date();
            console.log("🔻    ",trace(),myDate.toLocaleDateString(), myDate.toLocaleTimeString());
            // console.log(`🔻${trace()}\n🔻req.cookies:-\n🔻`,req.cookies);
            // if (Object.keys(req.cookies).length === 0) {
            //     console.log('🔻No cookies received.');
            //     // res.send('No cookies received.');
            // } else {
            //     console.log(`🔻Cookies received: ${JSON.stringify(req.cookies,null,2)}`);
            //     // res.send(`Cookies received: ${JSON.stringify(cookies)}`);
            // }
            // console.log(`🔻${trace()}req.query:-`,req.query);
            // const { reload } = req.query;
            // console.log(`🔻${trace()}{ reload }:-`,reload);
            // const sessionId = req.cookies.connectSID;
            // if (req.query.reload === 'true' && !sessionId) { 
            //     console.log(`🔻${trace()}sessionAction: INIT, reload: ${reload}, sessionId: ${sessionId}`);                 
            // }
            // if (reload === 'true' && sessionId) {
            //     console.log(`🔻${trace()}sessionAction: RESET, reload: ${reload}, sessionId: ${sessionId}`);                 
            //     const sessionPath = path.join(__dirname, 'sessions', `${sessionId}.json`);
            //     console.log(`🔻${trace()}sessionPath: ${sessionPath}`);                 
            //     // try {
            //     //     await fs.access(sessionPath); // checks existence + permissions
            //     //     await fs.unlink(sessionPath);
            //     //     res.setHeader('Set-Cookie', 'connectSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
            //     //     console.log(`${trace()}🔁 Session cleared due to reload.`);
            //     // } catch (err) {
            //     //     console.warn(`${trace()}⚠️ Could not delete session file: ${sessionPath}`);
            //     //     console.warn(`${trace()}⚠️ ${err.message}`);
            //     // }

            //     // import fs from 'fs';
            //     // import path from 'path';
            //     // const sessionPath = path.join(__dirname, 'sessions', `${sessionId}.json`);
            //     fs.unlink(sessionPath, (err) => {
            //         if (err) {
            //             console.warn(`🔻⚠️ Could not delete session file: ${sessionPath}`, err.message);
            //             // return res.status(500).json({ success: false, error: err.message });
            //         }
            //         res.setHeader(
            //             'Set-Cookie',
            //             'connectSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
            //         );
            //         console.log('🔻✅ Session file deleted:', sessionPath);
            //         //   return res.json({ success: true });
            //     });
            // }
            console.log("🔺     S E S S I O N     I N I T / R E S E T     - /session-reset?reload=true -     E N D");
            console.log((`🔺${trace()}`,"🔺").repeat(60));
        }else{
        }
    });
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}


    // app.use(async (req, res, next) => {
    //                     console.log(("❓⬇️").repeat(30));
    //                     console.log("H A N D L E     A L L     R E Q U E S T S");
    //                     console.log(`${trace()} Request received.`);
    //                     console.log(`${trace()}req.Headers:-\n`, req.headers);
    //                     console.log(`${trace()}req.URL:-`, req.url);
    //                     console.log(`${trace()}req.Body:-`, req.body);
    //                     // const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    //                     // let sessionId = cookies.connectSID;

    //                     // // Ignore irrelevant requests (e.g. DevTools or health checks) START
    //                     //     if (req.url.startsWith('/.well-known')) {
    //                     //         console.log(`${trace()}IGNOREing:-`, req.url);
    //                     //         return next();
    //                     //     }
    //                     // // Ignore irrelevant requests (e.g. DevTools or health checks) END
    // 
    //     let sessionId = req.cookies.connectSID;
    //                     // // if(sessionId){
    //                         console.log(`${trace()}req sessionID:-`, sessionId);
    //                     // // }else{
    //                     // //     console.log(`${trace()}req sessionID:-`, "... not set");
    //                     // // }
    //                     // // console.log(`${trace()}req.query.reload:`, req.query.reload, typeof req.query.reload);
    //                     // console.log(`${trace()} Query reload:`, req.query.reload); // should show 'true'
    //                     // if (req.query.reload === `true` && sessionId) {
    //                     //     try {
    //                     //         await fs.unlink(path.join(__dirname, 'sessions', `${sessionId}.json`));
    //                     //         res.setHeader("Set-Cookie", "connectSID=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    //                     //         console.log(`${trace()}🔁 Session cleared due to reload.`);
    //                     //     } catch (e) {
    //                     //         console.warn(`${trace()}⚠️ Failed to delete session file:`, e);
    //                     //     }
    //                     // }
    //                     console.log(("❓⬆️").repeat(30));
    //     let sessionFilePath;
    //     let sessionData;
    //     if (sessionId) {
    //         console.log(("🍪").repeat(60));
    //         sessionFilePath = path.join(__dirname, 'sessions', `${sessionId}.json`);
    //         try {
    //             const file = await fs.readFile(sessionFilePath, 'utf-8');
    //             sessionData = JSON.parse(file);
    //             console.log(`${trace()} 1🍪 Loaded existing session:`, sessionId);
    //         } catch (err) {
    //             console.log(`${trace()} ⚠️🍪 Session file not found or corrupted. Creating new session.`);
    //             sessionId = null;
    //         }
    //     }
    //     if (!sessionId) {
    //                         console.log(("🍪").repeat(60));
    //                         console.log(`${trace()} Initialise cookies.`);
    //         // Create new session
    //         sessionId = crypto.randomBytes(32).toString('hex');
    //         sessionFilePath = path.join(__dirname, 'sessions', `${sessionId}.json`);
    //         sessionData = JSON.stringify({
    //             user: 'guest',
    //             createdAt: Date.now(),
    //             duration: 60 * 60 * 1000 // 1 hour
    //         });
    //         try {
    //             // await fs.writeFile(sessionFilePath, JSON.stringify(sessionData));
    //             await fs.writeFile('./sessions/' + sessionId + '.json', sessionData, (err) => {
    //                 if (err) {
    //                     console.log(`${trace()} 🗝️🍪 Session store created?`,false,err);
    //                 }else {
    //                     console.log(`${trace()} 🗝️🍪 Session store created?`,true);
    //                 }
    //             });
    //             console.log(`${trace()} 0🍪 Created new session:`, sessionId);
    //         } catch (err) {
    //             console.error(`${trace()} ❌🍪 Failed to write session file`, err);
    //             return res.status(500).send("Could not create session");
    //         }
    //         // const cookieStr = `connectSID=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Secure`;
    //         // res.setHeader("Set-Cookie", cookieStr);
    //                         function buildCookie(name, value, options = {}) {
    //                             const {
    //                                 path = "/",
    //                                 httpOnly = true,
    //                                 secure = true,
    //                                 sameSite = "None"
    //                             } = options;
    //                             const cookieParts = [
    //                                 `${name}=${value}`,
    //                                 `Path=${path}`,
    //                                 sameSite ? `SameSite=${sameSite}` : "",
    //                                 httpOnly ? "HttpOnly" : "",
    //                                 secure ? "Secure" : ""
    //                             ];
    //                             return cookieParts.filter(Boolean).join("; ");
    //                         }
    //                         const cookies = [
    //                             buildCookie("connectSID", sessionId),
    //                             buildCookie("theme", "dark"),
    //                             buildCookie("token", "XYZ456"),
    //                             buildCookie("mode", "auto", { sameSite: "Lax", secure: false })
    //                         ];
    //                         res.setHeader("Set-Cookie", cookies);
    //                         // sessionInitialised=true;
    //                         console.log(("🍪").repeat(60));
    //     }
    //     // Attach session to request
    //     req.session = sessionData;
    //     req.sessionID = sessionId;
    //     next();
    // });
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹


    // app.get('/api/init-session', (req, res) => {
    //     if (req.cookies.cookieSID) {
    //         console.log(trace(),`🚦🟢 Session already exists with ID: ${req.cookies.cookieSID}`);
    //         res.status(200).json({ ready: true });
    //     } else {
    //         // Could create one here as fallback, or just inform client
    //         console.log(trace(),`🚦🔴 No session found, cookieSID not set.`);
    //         res.status(200).json({ ready: false });
    //     }
    // });


// 🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪
// // AUTHENTICATE USER
//     console.log(`${trace()}🔒✅ Authentication setup.  START.`);
//     // const safePaths = JSON.parse(fs.readFileSync("safe_paths.json", "utf8")).allowedPaths;
//     const safeURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).safe_URLs;
//     console.log(`${trace()}🔒✅ Authentication setup.  Ignore safeURLs`);
//     const startupURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).startup_URLs;
//     console.log(`${trace()}🔒✅ Authentication setup.  Ignore startupURLs`);

//     app.use((req, res, next) => {
//         console.log(("🔒").repeat(60));
//         console.log(`🪣 ${trace()}🔒 Authenticate user START`);

//         // skip startup URLs
//             if (startupURLs.includes(req.url)) {
//                 console.warn(`🪣 ${trace()}🔒🟢 Startup URL:- ${req.url}..., by-pass authentication.`);
//                 return next(); // next(); // Proceed to the next middleware or route handler
//             }

//         // // NRL, use the guest session cookie to authenticate logins START
//         //     // Skip authentication for login
//         //         const publicRoutes = ["/loginRouter/login_step2", "/loginRouter/login_step3", "/loginRouter/login_step4"];
//         //         if (publicRoutes.includes(req.path)) {
//         //             console.log(`🪣 ${trace()}🔒✅ Loggoing in..., by-pass authentication.`);
//         //             return next(); // next(); // Proceed to the next middleware or route handler
//         //         }
//         // // NRL, use the guest session cookie to authenticate logins END

//         // 
//             if (req.headers.cookie) {
//                 console.log(`🪣 ${trace()}🔒✅ Cookies found in req.headers:-`,req.headers.cookie);
//             } else {
//                 console.log(`🪣 ${trace()}🔒🔴 Cookies not found req.headers:-`,req.headers);
//             }
//             // if (req.headers.authorization) {
//             //     console.log(`🪣 ${trace()}🔒✅ Authorization header found:-`,req.headers.authorization);
//             // } else {
//             //     console.log(`🪣 ${trace()}🔒🔴 Authorization header not found:-`,req.headers.cookie);
//             // }

//         // verify connect.sid/connectSID
//             // const parsed = cookie.parse(req.headers.cookie); ... this line NLR "cookie" is not middleware, but a utility to parse cookies
//             // const parsed = req.headers.cookie;
//             const parsed = req.cookies; // Express automatically populates req.cookies with parsed cookies
//             console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie(s)`,parsed);
//             console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie.connectSID`,parsed.connectSID);
//             const connectSidExists = fs.readFileSync(`./sessions/${parsed.connectSID}.json`);
//             const authenticated = connectSidExists? true : false;
//             console.log(`🪣 ${trace()}🔒 ⁉️authenticated?`,authenticated);
//             if(authenticated){
//                 console.log(`🪣 ${trace()}🔒✅ User authentication successful!`);
//                 return next(); // next(); // Proceed to the next middleware or route handler
//             }else{
//                 res.send({message:`Authentication invalid, denied!`,status:false});
//                 res.end();
//             }

// //             const rawCookieSessionId = req.cookies["connect.sid"];
// //                 if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookie connect.sid:-              `,rawCookieSessionId);}
// //                 if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie:-`,req.headers.cookie);}
// //             const cookieSid = (req.cookies["connect.sid"] || "").replace(/^s:/, "");
// //             const headerSid_raw = (req.headers.cookie || "").match(/connect\.sid=s%3A([^;]+)/)?.[1];
// //             const headerSid_decoded = headerSid_raw ? decodeURIComponent(headerSid_raw) : "🔴...could not decode [headerSid_raw]";
// //                 if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookieSid:-`,cookieSid);}
// //                 if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️headerSid_decoded:-`,headerSid_decoded);}
// //             if (cookieSid !== headerSid_decoded) {
// //                 console.warn(`🪣 ${trace()}🔒⚠️Session ID mismatch detected, cookieSid != headersSid:-\n🪣 ${cookieSid} v \n🪣 ${headerSid_decoded}`);
// //                 console.warn(`🪣 ${trace()}🔒⚠️Session ID mismatch detected for ${req.url}`);
// //                 if (!safeURLs.includes(req.url)) {
// //                     const allowedRouters = ["/dbRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/", "/googleAPIsRouter/"];
// //                     if (allowedRouters.some(prefix => req.url.startsWith(prefix))) {
// //                         // console.log("Request is allowed");
// //                         console.warn(`🪣 ${trace()}🔒⚠️🟢 Access allowed to router:- ${req.url}`);
// //                     } else {
// //                         // console.log("Access denied");
// //                         console.warn(`🪣 ${trace()}🔒⚠️🔴 Access denied due to session inconsistency:- ${req.url}`);
// // // console.log(trace(),"Cookie SID:", req.cookies.sid);
// // // console.log(trace(),"Headers SID:", req.headers["sid"]);
// // // console.log(trace(),"Session ID:", req.sessionID);
// //                         return res.status(403).send({message:"Access denied due to session inconsistency.",status:false});
// //                     }
// //                 }else{
// //                     console.warn(`🪣 ${trace()}🔒⚠️🟢 Access allowed to safe path:- ${req.url}`);
// //                 }
// //             }

//         // check expiry
//             // console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session\n`,req.session);
//             console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.cookie.expires:- `,new Date(req.session.cookie.expires).toLocaleString());
        
//         // authentication
//             console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.securityCode.code:- `,req.session.securityCode? req.session.securityCode.code : "...not yet issued.");
//             console.log(`🪣 ${trace()}🔒✅ Authenticating....req.cookies.securityCode:- `,req.cookies.securityCode? req.cookies.securityCode : "...not yet received.");
//             console.log(`🪣 ${trace()}🔒✅ Authenticating user...`);
//             if (req.session.user && req.session.user.authenticated) { // the value stored at authenticated is either true or false
//                 // console.log(`🪣 ${trace()}🔒✅ authenticating user...`);
//                 // if (req.session.securityCode.code === req.cookies.securityCode) {
//                     console.log(`🪣 ${trace()}🔒✅ User authentication successful!`);
//                     return next(); // next(); // Proceed to the next middleware or route handler
//                 // } else {
//                 //     console.log(`🪣 ${trace()}🔒🔴 Security code mismatch — authentication failed!`,req.session.securityCode.code,req.cookies.securityCode);
//                 //     // res.status(401).send("Unauthorized");
//                 //     res.send({message:`Access denied.`,status:false});
//                 //     res.end();
//                 // }
//             } else {
//                 console.log(`🪣 ${trace()}🔒🔴 Missing user details — authentication denied!`);
//                 // console.log(`🪣 ${trace()}🔒🔴 req.headers.cookie:-`,req.headers.cookie);
//                 // res.status(401).send("Unauthorized");
//                 res.send({message:`Missing user details ~ authentication denied!`,status:false});
//                 res.end();
//             }
//         console.log(("🔒").repeat(60));
//     });
//     console.log(`${trace()}🔒✅ Authentication setup END.`);
//    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 6️⃣ routes AND business logic
    // log REQuest START
        async function logREQuest(req){
            console.log(`🪣 ${trace()}🟢 log REQuest summary commenced.`);
            try{
                // log the REQuest to "logs/request_yy-mm-ddThh-mm-ss.999Z.txt" START
                    const reqData = {
                        method: req.method,
                        url: req.url,
                        headers: req.headers,
                        body: req.body,
                        params: req.params,
                        query: req.query
                    };
                    // Convert to a nicely formatted string
                        const reqString = JSON.stringify(reqData, null, 2);
                    // Create a timestamped log file
                        myDate = new Date();
                        const REQuestLogFileName = `logs/REQuest/REQuest_${myDate.toISOString().replace(/:/g, '-')}.txt`;
                    // Write the request data to a log file
                        const retries = 3;
                        const delay = 500;
                        for (let attempt = 1; attempt <= retries; attempt++) {
                            try{
                                // await fs.writeFile(REQuestLogFileName, reqString);
                                await fs.promises.writeFile(REQuestLogFileName, reqString);
                                console.log(`🪣 ${trace()}🟢 Log REQuest summary to file "${REQuestLogFileName}" completed after ${attempt} attempt(s).`);
                                return;
                            } catch (error) {
                                console.warn(`🪣 ${trace()} ⚠️ Writing REQuest log on attempt ${attempt} failed:`, error.message);
                                if (attempt < retries) {
                                    await new Promise(res => setTimeout(res, delay * 2 ** (attempt - 1))); // Exponential backoff
                                }else{
                                    throw new Error(`🪣🔴🚫 All ${retries} attempts to write REQuest log failed.`);
                                }
                            }
                        }
                // log the REQuest to "logs/request_yy-mm-ddThh-mm-ss.999Z.txt" END
            } catch (error) {
                console.error(`🪣 ${trace()}🔴 Catch! Error writing REQuest log:`, error);  
            }
        }
    // log REQuest END
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
    app.use((req, res, next) => {

        console.log("\n");
        console.log(("🪣").repeat(60));

        // sanitize any HTML in the request body
            if (req.body && req.body.content) {
                req.body.content = sanitizeHtml(req.body.content);
            }

        // REQuest summary
            myDate = new Date();
            console.log(`🪣 ${trace("")}\n🪣     DATE:   ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n🪣     METHOD: ${req.method}\n🪣     URL:   ${req.url}`);

        // REQuest credentials received
            // req.headers.cookie? console.log(`🪣 ${trace()}🟢 REQuest credentials received [req.headers.cookie]: ${true}`) : console.log(`🪣 ${trace()}🔴 REQuest credentials received [req.headers.cookie]: ${false}`);
            console.log(`🪣 ${trace()}📫 REQuest headers received:`, req.headers? true : false);
            console.log(`🪣 ${trace()}📫 Cookie in REQuest headers:`, req.headers.cookie? true : false);
            console.log(`🪣 ${trace()}📫 Session in REQuest:`, req.session? true : false);
            if(req.session){
                console.log(`🪣 ${trace()}📫 Cookie in REQuest session:`, req.session.cookie? true : false);
            }
            if(req.session && req.headers.cookie){
                console.log(`🪣 ${trace()}📫 🟢 Credentials received.`,JSON.stringify(req.session,null,2),JSON.stringify(req.headers,null,2));
            }else{
                console.log(`🪣 ${trace()}📫 🔴 Credentials NOT received.  req.headers:-\n${JSON.stringify(req.headers,null,2)}`);
            }

        // // set session creation timestamp
        //     // console.log(`🪣 Session object before try/catch:`, req.session);
        //     // console.log("🪣 Before try/catch—this should appear!");
        //     try{
        //         if (!req.session.createdAt) {
        //             req.session.createdAt = Date.now(); // Store creation timestamp
        //             console.log(`🪣 ${trace()}📫 Session create time set to:`, req.session.createdAt);
        //         }
        //     } catch (error) {
        //         console.log(`🪣 ${trace()}📫🔴 Session create time could not be set:`, error);
        //     }
        //     // Extract session ID from cookie
        //     const rawSessionId = req.cookies["connect.sid"]; 
        //     console.log(`🪣 ${trace()}📫 cookie connect.sid:- `,rawSessionId);
        //     const createdAtMilliseconds = req.session.createdAt;
        //     console.log(`🪣 ${trace()}📫 req.session.createdAt:-`,new Date(createdAtMilliseconds).toLocaleDateString(),new Date(createdAtMilliseconds).toLocaleTimeString());

        next(); // next(); // Proceed to the next middleware or route handler

    });
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    app.post("/establish-session", (req, res) => {
    // app.get("/establish-session", (req, res) => {
    if (req.session) {
        console.log(`🪣 ${trace()}🔒🟢 req.session:-\n`,req.session);
        // update session with authenticated user details
        req.session.user = {
            id: req.cookies["connect.sid"],
            name: "guest",
            email: "",
            authenticated: false
        };
        console.log(`${trace()}📦 Response headers:\n`, res.getHeaders());
        // res.json({ sessionEstablished: true });
        // ensure session is saved START
            req.session.save(err => {
                if (err) {
                    console.error(`${trace()}🔒🔴 Failed to save session:`, err);
                    res.json({ sessionEstablished: true, sessionName: "error saving req.session.user"});
                } else {
                    console.log(`${trace()}🔒🟢 Session saved successfully.${JSON.stringify(req.session,null,2)}`);
                    res.json({ sessionEstablished: true, sessionName: req.session.user.name});
                }
            });
        // ensure session is saved END
    } else {
        console.log(`🪣 ${trace()}🔒🔴 req.session:-\n`,req.session);
        res.json({ sessionEstablished: false,sessionName: "error creating session" });
    }
    });
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
        app.post("/heartbeat-session-extension", (req, res) => {    
            if (req.session) {
                try{
                    req.session.createdAt = Date.now();
                    console.log(trace(),{ message: "Session extended!", status: true });
                    res.json({ message: "Session extended!", status: true });
                } catch (error) {
                    console.log(trace(),{ message: "Session cookie not found.", status: false });
                    res.json({ message: "Session cookie not found.", status: false });
                }
            } else {
                console.log(trace(),{ message: "Session not found.", status: false });
                res.json({ message: "Session not found.", status: false });
            }
        });
    // Client heartbeat detected, extend session.💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙💙
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
myDate = new Date();
// if(consoleLog===true){console.log(`${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);}
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// monitor memory usage
    const formatMemoryUsage = (data) => `${(data / 1024 / 1024).toFixed(2)} MB`;
    setInterval(() => {
        const memoryUsage = process.memoryUsage();
        // console.clear(); // Clears previous logs for readability
        let myText = "";
        myText += ("__").repeat(55);
        myText += `\n🖥️ Memory Usage Monitor`;
        myText += `\n1️⃣ RSS: Resident Size Set\n- The total memory allocated to your Node.mjs process, including:\n- Heap memory\n- Stack memory\n- Code segment\n- Why it matters:\n- This gives an overview of how much RAM your application is consuming. If RSS keeps increasing, it could indicate a memory leak.`;
        myText += `\n${(" ").repeat(5)}RSS: ${formatMemoryUsage(memoryUsage.rss)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n2️⃣ Heap Used\n- What it is: The amount of actively used memory in the JavaScript heap.\n- Why it matters: This is the actual memory being used to store variables, objects, and function executions.\n- Key observation: If heapUsed keeps growing without dropping, it could signal inefficient memory management.`;
        myText += `\n${(" ").repeat(5)}Heap Used: ${formatMemoryUsage(memoryUsage.heapUsed)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n3️⃣ Heap Total\n- What it is: The total allocated memory for the heap.\n- Why it matters: Node.mjs expands this dynamically, so a growing heap might indicate high memory demand.`;
        myText += `\n${(" ").repeat(5)}Heap Total: ${formatMemoryUsage(memoryUsage.heapTotal)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\n4️⃣ External\n- What it is: Memory used by objects managed outside of the JavaScript heap, such as:\n- Buffer allocations (Buffer.from())\n- WebAssembly objects\n- Native C++ extensions\n- Why it matters: If your app uses a lot of Buffers (e.g., file handling or network requests), external might be a significant factor.`;
        myText += `\n${(" ").repeat(5)}External: ${formatMemoryUsage(memoryUsage.external)}`;
        myText += `\n${(" ").repeat(5)}${("~~").repeat(15)}`;
        myText += `\nHow to Use These Stats\n✅ If RSS is too high, your app might need optimization or might be consuming too much memory.\n✅ If heapUsed > heapTotal, it suggests memory saturation, potentially slowing performance.\n✅ If external memory spikes, you may have large Buffer allocations affecting memory usage.\n🚀`;
        myText += `\n${("__").repeat(55)}`;
        // Write the memory usage data to a log fie
            myDate = new Date();
            const logFileName2 = `logs/memory_${myDate.toISOString().replace(/:/g, '-')}.txt`;
            fs.writeFile(logFileName2, myText, (err) => {
                if (err) {
                    console.error(`${trace()}🔴 Error writing Memory statistics log:`, err);
                } else {
                    console.log(`${trace()}🟢 Memory statistics logged: ${logFileName2}`);
                }
            });
    },  60 * 60 * 1000);

const formatMemoryBar = (value, max) => {
    const barLength = Math.floor((value / max) * 40);
    return '█'.repeat(barLength).padEnd(40, ' ');
};
setInterval(() => {
    const memory = process.memoryUsage();
    // let myDate;
    myDate = new Date();
    // console.clear();
    console.log(`🖥️ Memory Usage Monitor ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`);
    let memoryUsagePercent = (memory.rss / os.totalmem()) * 100;
    console.log(`RSS:        ${formatMemoryBar(memory.rss, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.rss / 1024 / 1024).toFixed(1)} MB`);
    memoryUsagePercent = (memory.heapUsed / os.totalmem()) * 100;
    console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} [1Gb bar length] % of total memory used:- ${memoryUsagePercent.toFixed(2)}% ${(memory.heapUsed / 1024 / 1024).toFixed(1)} MB`);
    // if(consoleLog===true){console.log(`Heap Used:  ${formatMemoryBar(memory.heapUsed, 100000000)} ${memory.heapUsed / 1024 / 1024} MB`);}
    console.log(("~~").repeat(55));
}, 1000 * 60 * 60);
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 7️⃣ start server START
    function logServerStartup(){
        console.log(`${trace()}🔍 SERVER MODE = production:`, isProduction);
        console.log(`${trace()}🔍 SERVER MODE = development:`, isDevelopment);
        console.log(("🎾").repeat(60));
        // console.log(`${trace()}\nServer is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
        console.log(`🎾 ${trace()}${(" ").repeat(118-(`🎾 ${trace()}`).length)}🎾`);
        myDate = new Date();
        console.log(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🎾`);
        console.log(`🎾 Server is running on port:${PORT}.${(" ").repeat(118-(`🎾 Server is running on port:${PORT}.`).length)}🎾`);
        console.log(isProduction==="true" ?
            `🎾 Server is running in Production mode. ${(" ").repeat(117-(`🎾 Server is running in Production mode.`).length)}🎾` : 
            `🎾 Server is running in Development mode. ${(" ").repeat(117-(`🎾 Server is running in Development mode.`).length)}🎾`);
        // console.log(`🎾 Server is running on port # ${process.env.APP_PORT}${(" ").repeat(118-(`🎾 Server is running on port # ${process.env.APP_PORT}`).length)}🎾`);
        console.log(("🎾").repeat(60));
    };
    const PORT = process.env.APP_PORT;
    const DEV_IP_ADDRESS = process.env.APP_DEV_IP_ADDRESS;
    const isProduction = process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase() === "true";
    const isDevelopment = process.env.APP_SERVER_MODE_DEVELOPMENT?.toLowerCase() === "true";
    if (isProduction==="true") {
        app.listen(PORT, '0.0.0.0', () => {
            // Logging for production...
            logServerStartup();
        });
    } else {
        // const options = {
        //     key: fs.readFileSync("serverGITignore.key"),
        //     cert: fs.readFileSync("serverGITignore.cert")
        // };
        // console.log(`${trace()}🔍 Development mode options:`, options);
        // https.createServer(options, app).listen(PORT, () => {
        //     // Logging for development...
        //     logServerStartup();
        // });
        app.listen(PORT, () => {
            // Logging for development...
            logServerStartup();
        });
    }
// 7️⃣ start server END
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹

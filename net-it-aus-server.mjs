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

// express-rate-limit
    const useExpressRateLimit = false;

let myDate;

import { trace } from "./src/global_Server.mjs";
import { maskString } from "./src/global_Server.mjs";

// export function trace(whoCalled="") {
//     try {
//         myDate = new Date();
//         const stack = new Error().stack;
//         const firstLine = stack.split('\n')[2].trim();
// 
//         const R = firstLine.lastIndexOf(":");
//         const RR = firstLine.lastIndexOf(":",R-1);
//         const rowNumber = firstLine.slice(RR+1,R);
//         // console.log("rowNumber:-",rowNumber,);
// 
//         const x = firstLine.lastIndexOf("/");
//         const y = firstLine.lastIndexOf("/",x - 1);
//         const fileName = firstLine.slice(y,RR);
//         // console.log("fileName:-",fileName);
// 
//         const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
//         // return `▶️${whoCalled? whoCalled : ""} ${fileName_rowNumber_position} ▶️`;
// 
//         return `▶️${whoCalled? whoCalled : ""} ${fileName} ${rowNumber} ▶️[${myDate.toLocaleTimeString()}]▶️`;
//     } catch (error) {
//         return '▶️🔴 Trace: NOT AVAILABLE▶️',error;
//     }
// };

const logAll = true; // Set to false to disable all console logs

myDate = new Date();

console.log(("🔰").repeat(45));
console.log(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(88-(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🔰`);
console.log(`🔰 ${myDate}${(" ").repeat(88-(`🔰 ${myDate}`).length)}🔰`);
// IMPORTANT put this code in the batch file that starts your node app START
    // this line in your batch file won't work START
        // process.env.APP_TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
    // this line in your batch file won't work END
    // Environment variables like TZ must be set before the Node.js process starts.
    // By the time your server file (TheAvenuesSoftware.mjs) is running, Node.js has already read the environment — it's too late to change TZ and expect date/time functions to behave differently.
    // batch file line START:
        // set TZ=Australia/Sydney
    // batch file line END
// IMPORTANT put this code in the batch file that starts your node app END
console.log(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}${(" ").repeat(88-(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`).length)}🔰`);
console.log(("🔰").repeat(45));

// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 1️⃣ import packages START
    console.log((`🚀  I M P O R T   P A C K A G E S`));
    // TLS
        import tls from 'tls'; // used to check SSL certificates
    // EXPRESS
        import express from "express";
        // const { getTollDataAxios } = require('./tollService'); // Import your service function
        // import { getTollDataAxios } from './tollServiceNSW.mjs';
    // https
        import https from 'https'; // For making HTTPS requests
    // helmet
        import helmet from 'helmet'; // Set various HTTP headers for security
    // axios
        import axios from 'axios';
    // OS ~ operatingSystem
        import os from 'os';
    // FS ~ fileSystem
        // import fs from 'fs';
        // // import fs from 'fs/promises';
        //     // ~ fs.writeFile from 'fs' expects a callback (cb), which is why you're getting the "cb argument must be of type function" error.
        //     // ~ The 'fs/promises' version works natively with async/await, so no callback is needed.
        // Gemini:
            // By switching to import fs from 'fs/promises';, every method in the fs object is now a Promise, 
            // ensuring that your await keywords correctly pause execution until the disk operation is complete.
            // 1. For Promise-based I/O (readFile, writeFile, unlink, etc.)
                import * as fsPromises from 'fs/promises'; 
                    // fsPromises.readFile()	fs.readFile() (callback)	Reads the entire contents of a file. Best for reading small config files or user uploads in a non-blocking way.
                    // fsPromises.writeFile()	fs.writeFile() (callback)	Writes data to a file, replacing the file if it already exists.
                    // fsPromises.appendFile()	fs.appendFile() (callback)	Appends data to a file.
                    // fsPromises.unlink()	fs.unlink() (callback)	Deletes a file.
                    // fsPromises.mkdir()	fs.mkdir() (callback)	Creates a directory (folder).
                    // fsPromises.rm()	fs.rm() (callback)	Deletes files and directories (recursively if specified).
                    // fsPromises.rename()	fs.rename() (callback)	Renames or moves a file or directory.
                    // fsPromises.stat()	fs.stat() (callback)	Gets file status (size, permissions, creation date, etc.).
                    // When working with fs/promises, you should always use 
                        // await 
                        // (or chain .then() and .catch()
            // 2. For Stream I/O (createReadStream, createWriteStream, etc.)
                import * as fsCore from 'fs'; 
                    // fsCore.readFile(path,         [options], ❕callback❕)	Reads the entire contents of a file. Use this for most reading tasks where you can wait for the result.
                    // fsCore.writeFile(path, data,  [options], ❕callback❕)	Writes data to a file, replacing the file if it already exists.
                    // fsCore.appendFile(path, data, [options], ❕callback❕)	Appends data to a file.
                    // fsCore.unlink(path,                      ❕callback❕)	Deletes a file.
                    // fsCore.mkdir(path,            [options], ❕callback❕)	Creates a directory (folder).
                    // fsCore.rm(path,               [options], ❕callback❕)	Deletes files and directories (the modern, often preferred way over rmdir).
                    // fsCore.rename(oldPath, newPath,          ❕callback❕)	Renames or moves a file or directory.
                    // fsCore.stat(path,                        ❕callback❕)	Gets file status (size, permissions, creation date, etc.).
            // 3. For the stream pipeline utility (to await stream completion)
                import { pipeline } from 'stream/promises';
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
            // Get the current file path
                const __filename = fileURLToPath(import.meta.url);
            // Get the directory name
                const __dirname = path.dirname(__filename);
    // ENVironment variables
        import dotenv from "dotenv";
    // // COOKIE ...this is not middleware, but a utility to parse cookies
    //     import * as cookie from "cookie";
    // // COOKIE PARSER
        import cookieParser from 'cookie-parser';
    // JSONWEBTOKEN for user authentication
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
        const cleanedInput = sanitizeHtml(userInput);
        console.log(`${trace()} 🟢 userInput   :- ${userInput}`); // Output: "<p>Hello</p>";
        console.log(`${trace()} 🟢 cleanedInput:- ${cleanedInput}`); // Output: "<p>Hello</p>";
        console.log(`${trace()} ⚠️ Ensure all HTML requests are sent as REQ.BODY.HTML`);
        console.log(`${trace()} ⚠️ and then use sanitizeHtml(req.body.html) server side.`);
        // examples
            // 1
                // const cleanInput = sanitizeHtml(userInput, {
                //     allowedTags: ["p", "strong", "a"],
                //     allowedAttributes: {
                //         "a": ["href"]
                //     }
                // });
                // console.log(cleanInput); // Only keeps `<p>`, `<strong>`, and `<a>`
    // ROUTERS - import router files
        import globalRouter from './src/global_Server.mjs'; 
        import loginRouter from './src/globalLogin_Server.mjs';
        import sessionsRouter from './src/globalSessions_Server.mjs';
        // import SQLiteRouter from "./src/projectSQLite_Server.mjs";
        // import projectRouter from './src/project_Server.mjs';
        // import googleAPIsRouter from './src/projectGoogleAPIs_Server.mjs';
        // import trackerRouter from './src/tracker_Server.mjs';
                let projectRouter;
                    try {
                        // Dynamic import returns a promise, so we await it
                        const module = await import("./src/project_Server.mjs");
                        projectRouter = module.default;
                    } catch (error) {
                        // 1. Log the error for internal debugging
                            console.warn(`[System Notice] Optional module 'projectRouter' failed to load. Operating in limited mode.`);                
                        // 2. Set a fallback or null so the rest of your code doesn't crash
                            projectRouter = null; 
                    }
                    if (projectRouter) {
                        // Attach routes
                    } else {
                        console.log("Project features are currently unavailable.");
                    }
                let SQLiteRouter;
                    try {
                        // Dynamic import returns a promise, so we await it
                        const module = await import("./src/projectSQLite_Server.mjs");
                        SQLiteRouter = module.default;
                    } catch (error) {
                        // 1. Log the error for internal debugging
                            console.warn(`[System Notice] Optional module 'projectRouter' failed to load. Operating in limited mode.`);                
                        // 2. Set a fallback or null so the rest of your code doesn't crash
                            SQLiteRouter = null; 
                    }
                    if (SQLiteRouter) {
                        // Attach routes
                    } else {
                        console.log("Project features are currently unavailable.");
                    }
                let googleAPIsRouter;
                    try {
                        // Dynamic import returns a promise, so we await it
                        const module = await import("./src/projectGoogleAPIs_Server.mjs");
                        googleAPIsRouter = module.default;
                    } catch (error) {
                        // 1. Log the error for internal debugging
                            console.warn(`[System Notice] Optional module 'projectRouter' failed to load. Operating in limited mode.`);                
                        // 2. Set a fallback or null so the rest of your code doesn't crash
                            googleAPIsRouter = null; 
                    }
                    if (googleAPIsRouter) {
                        // Attach routes
                    } else {
                        console.log("Project features are currently unavailable.");
                    }
                let trackerRouter;
                    try {
                        // Dynamic import returns a promise, so we await it
                        const module = await import("./src/tracker_Server.mjs");
                        trackerRouter = module.default;
                    } catch (error) {
                        // 1. Log the error for internal debugging
                            console.warn(`[System Notice] Optional module 'projectRouter' failed to load. Operating in limited mode.`);                
                        // 2. Set a fallback or null so the rest of your code doesn't crash
                            trackerRouter = null; 
                    }
                    if (trackerRouter) {
                        // Attach routes
                    } else {
                        console.log("Project features are currently unavailable.");
                    }
    // SQLite CRUD
        // import { insertFormDataRecord, getRecord, updateRecord, deleteRecord } from "./src/SQLite_ServerSide.mjs";
    // // Trace()
    //     import { trace } from "./src/global_Server.mjs";
        
    function checkImports(){
        try{
            // console.log(trace(),"Imported axios:", axios ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported os:", os ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported fsCore:", fsCore ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported fsPromises:", fsPromises ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported path:", path ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported url { fileURLToPath }:", fileURLToPath ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported dotenv:", dotenv ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported express:", express ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported cookie / cookie:", cookie ? "✅ " : "❌ Failed"); ... this is not middleware, but a utility to parse cookies
            console.log(trace(),"Imported cookieParser / cookie-parser:", cookieParser ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported jwt / jsonwebtoken:", jwt ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported crypto:", crypto ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported crypto { randomUUID }:", randomUUID ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported session / express-session:", session ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported cors:", cors ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported sqlite3:", sqlite3 ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported sqlite { open }:", open ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported busboy:", busboy ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported SQLiteRouter:", SQLiteRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported projectRouter:", projectRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported googleAPIsRouter:", googleAPIsRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported trackerRouter:", trackerRouter ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported {insertFormDataRecord} from SQLite_ServerSide.mjs:", insertFormDataRecord ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported {getRecord} from SQLite_ServerSide.mjs:", getRecord ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported {updateRecord} from SQLite_ServerSide.mjs:", updateRecord ? "✅ " : "❌ Failed");
            // console.log(trace(),"Imported {deleteRecord} from SQLite_ServerSide.mjs:", deleteRecord ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported {trace} from globalServer.mjs:", trace ? "✅ " : "❌ Failed");
        }
        catch (error) {
            console.log(trace(),"imports error:",error);
        }     
    }
    checkImports();
// 1️⃣ import packages END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 2️⃣ setup environment variables START
    console.log((`🚀  S E T U P   E N V I R O N M E N T   V A R I A B L E S`));
    // .ENV;  .MJS
        // globalServer.env
            try{
                const envPath = "./config/globalServer.env";
                // console.log(envPath,"Exists?", fs.existsSync(envPath)); // Should be true
                // if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath, quiet: true, debug: false });
                    if(logAll===true){console.log(trace(),`\n   Global environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath, quiet: true, debug: false });
                    // if(logAll===true){console.log(trace(),`\n${envPath}:-\n`, result.parsed);}  
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);  //  DO NOT LOG ~ SECRET INDO !!!
                        if(logAll===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Global environment variables loaded.`);
                // } else {
                //     console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                // }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${error}`);
            }
        // projectServer.env
            try{
                const envPath = "./config/projectServer.env";
                // console.log(envPath,"Exists?", fs.existsSync(envPath)); // Should be true
                // if (fs.existsSync(envPath)) {
                    dotenv.config({ path: envPath, quiet: true, debug: false });
                    if(logAll===true){console.log(trace(),`\n   Project environment variables:- ${envPath}`);}
                    const result = dotenv.config({ path: envPath, quiet: true, debug: false });
                    // if(logAll===true){console.log(trace(),`\n${envPath}:`, result);}                
                    const envVar = result.parsed;
                    Object.keys(envVar).forEach(key => {
                        // console.log(`key:- ${key} :- ${envVar[key]}`);  //  DO NOT LOG ~ SECRET INDO !!!
                        if(logAll===true){console.log(`      key:- ${key}`);}
                    }); 
                    console.log(`${trace()}🟢 Project environment variables loaded.`);
                // } else {
                //     console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                // }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${error}`);
            }
// 2️⃣ setup environment variables END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 🟦 setup & configuration START
        // 2. CRITICAL CONFIG LOAD (Your Code Block)
        // This runs once and halts startup if the config is bad.
        let safeURLs;
        try {
            const data = fsCore.readFileSync("knownURLs.json", "utf8");
            safeURLs = JSON.parse(data).safe_URLs;
            console.log(trace(),"Known URLs loaded successfully.");
        } catch (error) {
            console.error(trace(),"CRITICAL ERROR: Failed to load safe URLs config and server cannot start.");
            // Crash the process if essential config is missing
            process.exit(1); 
        }
// 🟦 setup & configuration END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 3️⃣ setup Express app START
    console.log((`🚀  S E T U P   E X P R E S S   A P P   &   C O R S   &   M I D D L E W A R E`));
    const app = express();
    // ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
        // 3️⃣ setup CORS immediately after "const app = express();" START
            console.log((`🚀  S E T U P   C O R S`));
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
                        origin: "https://netit.au", // use just one, don't use ["https://ridesharedriver.com.au", "https://www.ridesharedriver.com.au"] 
                        credentials: true,
                        methods: ["GET", "POST", "PUT", "DELETE"],
                        allowedHeaders: ["Content-Type", "Authorization"],
                        optionsSuccessStatus: 204 // 204 avoids extra response headers in preflight requests
                }));
                console.log(`${trace()}🔒✅ CORS headers set up for Production completed.`);
            } else {
                console.log(`${trace()}🔒🔴 CORS headers set up failed. Neither development nor production mode is set.`);
                throw new Error("Invalid configuration: Neither development nor production mode is set.");
            }
        // 3️⃣ setup CORS immediately after "const app = express();" END
    // ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖
    // exceptional placement - place this middleware right after [const app = express()] START
        console.log((`🚀  S E T U P   S E C U R I T Y`));
        // app.use(
        //     helmet({
        //         contentSecurityPolicy: false, // disable CSP if you're not ready for it
        //         crossOriginEmbedderPolicy: false,
        //     })
        // );
        // // ✅✅✅ Set various HTTP headers for security START ✅✅✅
        //     app.use(helmet()); // Set various HTTP headers for security
        // // ✅✅✅ Set various HTTP headers for security END ✅✅✅
        // app.use(
        //     helmet.contentSecurityPolicy({
        //         useDefaults: true,
        //         // reportOnly: true, DANGER DANGER ❗❗❗ dont't un-comment this line❗❗❗
        //         directives: {
        //             "default-src": [
        //                 "'self'"
        //             ],
        //             "script-src": [
        //                 "'self'",
        //                 // "'unsafe-inline'", // only if you're using inline scripts ❗❗❗REMOVE FOR PRODUCTION❗❗❗
        //                 "https://apis.google.com",
        //                 "https://accounts.google.com",
        //                 // wildcards must be at the subdomain level only START
        //                     // "https://*.gstatic.com", // wildcards must be at the subdomain level only
        //                     "https://gstatic.com", // or "https://maps.gstatic.com"
        //                     "https://maps.gstatic.com",
        //                     "https://fonts.gstatic.com",
        //                 // wildcards must be at the subdomain level only END
        //                 "https://maps.googleapis.com",
        //                 "https://unpkg.com"

        //             ],
        //             "style-src": [
        //                 "'self'",
        //                 // "'unsafe-inline'", // only if you're using inline styles ❗❗❗REMOVE FOR PRODUCTION❗❗❗
        //                 "https://fonts.googleapis.com",
        //                 // // Hashes for Google places; Google maps START
        //                 //     "'sha256-cwZgAPm2CTAW2GLDlL0o2J5isI4Gr0wno+xO/MvtT3s='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-mmA4m52ZWPKWAzDvKQbF7Qhx9VHCZ2pcEdC0f9Xn/Po='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-pzRbDTkOofZpG91nLe+vEuUeKxXX9yPEAiFygDXB4h4='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-/VVOq+Ws/EiUxf2CU6tsqsHdOWqBgHSgwBPqCTjYD3U='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-zZp8BI/LRCsExnI71KZA79vRfTQ/33qQr5GcSWAOwto='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-j69g0Z+HAbHBMIzQNFis9uADYR6LPo2LYlSo6DI4wy0='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-g/+r3r7IhgvloBqpNntHVylYT3vrqlLIZ5V0tTv7Cvg='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-IaM8xvcujDol1nAtq0BzSXIFdWOl+DiuhOV5dqL9STo='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-PNsPul0zQFUiYu9XLVKzTdD5Cz5ghp1MT4H5/zAeI3Q='", // this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-bSUb8oATdiRWGj6+osFexUukuqc+3yxgEYRAj67mELQ='", //this hash applies to "https://fonts.googleapis.com"
        //                 //     "'sha256-vNrevWaq6uKv3XSoEo/8TU13p1HYuC7oFmoCZ3zHhGM='",  // this hash is for iframe
        //                 // // Hashes for Google places; Google maps END
        //                 "https://unpkg.com",
        //                 // // Hashes for Google places; Google maps START
        //                 //     "'sha256-q9E3uJt6VaWA6NbBsNGiQFL53qQemURrA3kR1EX+vvY='", //this hash applies to "https://fonts.googleapis.com"
        //                 // // Hashes for Google places; Google maps END
        //             ],
        //             "font-src": [
        //                 "'self'",
        //                 "https://fonts.gstatic.com"
        //             ],
        //             "connect-src": [ //controls what URLs your frontend JavaScript can connect to (e.g., via fetch, XHR, WebSockets, etc.).
        //                 "'self'",
        //                 "https://fonts.googleapis.com",
        //                 "https://fonts.gstatic.com",
        //                 "https://maps.googleapis.com",
        //                 "https://dns.google",
        //                 "https://nominatim.openstreetmap.org",
        //                 "https://router.project-osrm.org",
        //                 "https://photon.komoot.io",
        //                 "https://unpkg.com"
        //             ],
        //             "frame-src": [
        //                 "'self'",
        //                 "https://www.google.com", // for Google map in iframe
        //             ],
        //             "img-src": [
        //                 "'self'",
        //                 "data:",
        //                 "https:",
        //                 "https://maps.gstatic.com",
        //                 "https://*.tile.openstreetmap.org"
        //             ],
        //             "report-uri": ["/csp-violation-report-endpoint"], // NOTE report-uri is deprecated
        //             "report-to": ["csp-endpoint"],
        //         },
        //         // You set both to false because you want your page to work with external scripts, fonts, Google Maps, etc. without requiring them to send special headers.
        //         // If you were building a high-security, fully isolated page (e.g., using SharedArrayBuffer), you would set these to "require-corp" and "same-origin".
        //         // For most websites, especially with third-party content, leaving them false is necessary to prevent breakage.
        //             crossOriginEmbedderPolicy: false,
        //             crossOriginResourcePolicy: false,
        //                 // With these two set to false:
        //                     // You allow all third-party scripts, fonts, maps to load.
        //                     // No isolation is enforced — your CSP still controls inline scripts, etc.
        //                     // Browser won’t block Google Maps, fonts.googleapis.com, or other external content.
        //             //           ┌──────────────────────────────┐
        //             //           │        Your Page             │
        //             //           │ (crossOriginEmbedderPolicy?) │
        //             //           └───────────┬──────────────────┘
        //             //                       │
        //             //       Browser decides if it can load resources
        //             //                       │
        //             //         ┌─────────────┴─────────────┐
        //             //         │                           │
        //             //         │                           │
        //             //  ┌──────▼───────┐           ┌───────▼────────┐
        //             //  │ Resource from│           │ Resource from  │
        //             //  │ Same-Origin  │           │ Third-Party    │
        //             //  │ (your server)│           │ Server         │
        //             //  └──────┬───────┘           └───────┬────────┘
        //             //         │                           │
        //             //         │                           │
        //             //         │                           │
        //             //  ┌──────▼───────┐           ┌───────▼────────┐
        //             //  │CORP Header?  │           │CORP Header?    │
        //             //  │(Cross-Origin │           │(Cross-Origin   │
        //             //  │ Resource     │           │ Resource       │
        //             //  │ Policy)      │           │ Policy)        │
        //             //  └──────┬───────┘           └───────┬────────┘
        //             //         │                           │
        //             //         │                           │
        //             //         │ Browser allows            │ Browser blocks
        //             //         │ resource                  │ resource
        //             //         ▼                           ▼
        //             // Page loads successfully     Resource blocked (CSP/COEP violation)
        //             // Key Points from Diagram
        //             // COEP (Cross-Origin-Embedder-Policy)
        //                 // Tells the browser how strict to enforce cross-origin resource isolation on your page.
        //                 // If false → browser doesn’t enforce extra restrictions → third-party resources load normally.
        //                 // If "require-corp" → only loads cross-origin resources that explicitly allow it (via Cross-Origin-Resource-Policy).
        //             // CORP (Cross-Origin-Resource-Policy)
        //                 // Tells the browser if this resource can be loaded by another origin.
        //                 // "same-origin" → only your own pages can load it.
        //                 // "cross-origin" → anyone can load it.
        //                 // false → header not set → default browser behavior.
        //             // Interaction
        //                 // COEP is page-level → controls what the page can load.
        //                 // CORP is resource-level → controls who can use the resource.
        //                 // For a third-party resource to load on a page with COEP "require-corp", the resource must have CORP "same-origin" or "cross-origin".
        //     })
        // );
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true, // Start with Helmet's sensible defaults
    directives: {
      "default-src": ["'self'"],
      "script-src": [
        "'self'", 
        // "'unsafe-inline'", // only if you're using inline scripts ❗❗❗REMOVE FOR PRODUCTION❗❗❗
        "https://maps.googleapis.com",
        "https://unpkg.com"              // ✅ Trust Leaflet JS
    ],
    "connect-src": [
        "'self'", 
        "https://dns.google",           // 👈 Added for your MX record lookups
        "https://maps.googleapis.com",
        "https://*.googleapis.com", // For Places and Geocoding APIs
        "https://nominatim.openstreetmap.org",
        "https://router.project-osrm.org",
        "https://photon.komoot.io",
        "https://unpkg.com"
      ],
      "img-src": [
        "'self'", 
        "data:", 
        "blob:", // allows image uploads of type blob
        "https:",
        "https://maps.gstatic.com", 
        "https://*.googleapis.com"
      ],
      "style-src": [
        "'self'", 
        "'unsafe-inline'", // ✅🆗 Required for Google Maps UI styling
        "https://fonts.googleapis.com",
        "https://unpkg.com"
      ],
      "font-src": [
        "'self'", 
        "https://fonts.gstatic.com"
      ],
      "worker-src": [
        "'self'", 
        "blob:"
      ], // Required for fluid map movement
      "frame-src": [
        "'self'", 
        "https://www.google.com"
      ], // If using the embed iframe
    },
  })
);
        app.use((req, res, next) => {
            res.setHeader(
                "Report-To",
                JSON.stringify({
                    group: "csp-endpoint",
                    max_age: 10886400, // 18 weeks
                    endpoints: [{ url: "https://netit.au/csp-violation-report-endpoint" }],
                })
            );
            next();
        });
        app.use(helmet.frameguard({ action: 'sameorigin' })); // Prevents your site from being embedded in iframes — use 'DENY' or 'SAMEORIGIN'.
        app.use(helmet.hidePoweredBy()); // Removes the X-Powered-By: Express header to obfuscate stack.  Minor security-through-obscurity — avoids disclosing you use Express (which can aid attackers).
        app.use(
            helmet.hsts({
                maxAge: 31536000, // 1 year in seconds
                includeSubDomains: true, // Apply to subdomains
                preload: true, // Enable preload eligibility
            })
        ); // Enforces HTTPS via Strict-Transport-Security.  Prevents downgrade attacks; only works over HTTPS; include preload flag to submit to HSTS preload.
        // Enable DNS prefetching if desired
        app.use(helmet.dnsPrefetchControl({ allow: false })); // allow: true → Enables DNS prefetching (faster page loads, lower privacy). allow: false or omitted → Disables DNS prefetching (slightly slower, better privacy). Default behavior in Helmet: false (privacy-focused).
        app.use(helmet.noSniff()); // Without this header: Browsers (especially older ones) may "guess" file types based on content. A file served as text/plain could be executed as text/html or application/javascript — a major security risk.
        app.use(helmet.originAgentCluster()); // What Does Origin-Agent-Cluster Do? It tells the browser to split your origin into separate “agent clusters”. This means: Each tab or iframe runs in a separate isolated process, even if they share the same origin. This improves site isolation, making side-channel attacks harder or impossible. ⚠️ Important Notes This can increase memory usage because your site uses more isolated processes. Only effective in browsers that support it (mostly Chromium-based browsers currently). Helps mitigate Spectre-class side-channel attacks but does not replace other security measures like CSP or secure coding.
        app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' })); // Send full URL for same-origin, only origin for cross-origin HTTPS, no referrer for HTTPS → HTTP. Recommended default; balances privacy and analytics.
            // Header hardening: You’ve covered all major Helmet modules (, , , , etc.).
            console.log(`${trace()} ✅ [app.use(helmet());]\n${trace()}    :- Set various HTTP headers for security.`);
        app.disable('x-powered-by'); // Hide Express fingerprint
            console.log(`${trace()} ✅ [app.disable('x-powered-by');]\n${trace()}    :- Hide Express fingerprint.`);
        app.set('trust proxy', 1);   // Trust reverse proxy like NGINX
            // By setting it to 1, you are telling Express: "Trust the first hop in the X-Forwarded-For header."
            // If you just set it to true, Express will trust every IP in that header. This can be dangerous because a clever hacker can "spoof" their own header to look like they are coming from a different IP. By setting it to 1, you ensure you are getting the IP that your proxy (NGINX) reported.
            // If you ever deploy to a service like Cloudflare, they use a specific header called cf-connecting-ip. In that specific case, you would keep trust proxy on, but you might occasionally see that header mentioned in documentation. For NGINX and general use, your current line is the industry gold standard.
            console.log(`${trace()} ✅ [app.set('trust proxy', 1);]\n${trace()}    :- Trust reverse proxy like NGINX.`);
        // RATE LIMITER start
            if(useExpressRateLimit===true){
                (() => { 
            // If you're using a rate limiter, put it early to block abusers before they hit your routes:
                const rateLimitNumber = 5
                const rateLimitDuration = 1; // minutes
                const limiter = rateLimit({
                    windowMs: rateLimitDuration * 60 * 1000,
                    limit: rateLimitNumber,
                    handler: (req, res) => {
                        // res.send('<html><head><title>Rate Limit Exceeded</title></head><body style="font-family: sans-serif; text-align: center; padding: 2em;"><h1>⏳ Too Many Requests</h1><p>You’ve hit the limit. Please wait a minute before trying again.</p><p><small>Retry after: ${new Date(Date.now() + 60 * 1000).toLocaleTimeString()}</small></p></body></html>');
                        res.send('<html><head><title>Rate Limit Exceeded</title></head><body style="font-family: sans-serif; text-align: center; padding: 2em;"><h1>⏳ Too Many Requests</h1><p>You’ve hit the limit. Please wait a minute before trying again.</p><p><small>Retry after: ${new Date(Date.now() + 60 * 1000).toLocaleTimeString()}</small></p></body></html>');
                        // res.set('Retry-After', '60').status(429).send({
                        //     error: "Rate limit exceeded.  Try again after 1 minute.",
                        //     retryAfter: "15 minutes",
                        //     retryAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
                        // });
                        //     res.set('Retry-After', '60').status(429).send(`
                        //         <html>
                        //             <head><title>Rate Limit Exceeded</title></head>
                        //             <body style="font-family: sans-serif; text-align: center; padding: 2em;">
                        //             <h1>⏳ Too Many Requests</h1>
                        //             <p>You’ve hit the limit. Please wait a minute before trying again.</p>
                        //             <p><small>Retry after: ${new Date(Date.now() + 60 * 1000).toLocaleTimeString()}</small></p>
                        //             </body>
                        //         </html>
                        //     `);
                    }
                });
                // Applies to all requests, causes issues with static assets/images/icons START
                    // if (process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase() == 'true') {
                    //     // app.use(limiter); // ✅ Applies to all requests, causes issues with static assets/images/icons
                    //     // console.log(`${trace()} ✅ RATE LIMITER [app.use(limiter);]\n${trace()}    :- enables rate limiting for all requests.`);
                    // }
                    // app.use('/', limiter); // ✅ Applies to ALL traffic
                // Applies to all requests, causes issues with static assets/images/icons END
                // app.use('/api', limiter); // ✅ Applies to API traffic only
                // Apply rate limiter to individual routers START
                    app.use("/SQLiteRouter", limiter);
                    app.use("/loginRouter", limiter);
                    app.use("/globalRouter", limiter);
                    app.use("/projectRouter", limiter);
                    app.use("/sessionsRouter", limiter);
                    app.use("/googleAPIsRouter", limiter);
                    app.use("/trackerRouter", limiter);
                    console.log(`${trace()} 🟢 🏃‍♂️🏃‍♂️‍➡️ RATE LIMITER Rate limiter set to a limit of ${rateLimitNumber} requests every ${rateLimitDuration} minutes.`);
                })();
            }else{
                console.log(`${trace()} 🔴 🏃‍♂️🏃‍♂️‍➡️ RATE LIMITER not used.\n${trace()}    :-`);
            }
        // RATE LIMITER end
        // MIDDLEWARE to parse incoming request bodies START
            app.use(express.json({ limit: "10mb" })); // Middleware to parse JSON data // Increase JSON request size limit
                console.log(`${trace()} ✅ [app.use(express.json({ limit: "10mb" }));]\n${trace()}    :- increases JSON request size limit from default 100kb.`);
            app.use(express.urlencoded({ limit: "10mb", extended: true }));
                console.log(`${trace()} ✅ [app.use(express.urlencoded({ limit: "10mb", extended: true }));]\n${trace()}    :- increases URL-encoded request size limit from default 100kb.`);
            app.use(express.raw({ type: "image/jpeg", limit: "10mb" })); // For raw image data end points
                console.log(`${trace()} ✅ [app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));]\n${trace()}    :- enables raw image data handling.`);
            app.use(cookieParser()); // Enables reading of cookies, express specific cookie parser
                console.log(`${trace()} ✅ [app.use(cookieParser());]\n${trace()}    :- enables reading of cookies, express specific cookie parser.`);
        // MIDDLEWARE to parse incoming request bodies END
    // exceptional placement - place this middleware right after [const app = express()] END
    // // static assets for third party libraries START
        app.use('/tinymce', express.static(__dirname + '/node_modules/tinymce'));
            console.log(`${trace()} ✅ [app.use('/tinymce', express.static(__dirname + '/node_modules/tinymce'));]\n${trace()}    :- text editor package plugin.`);
    // static assets for third party libraries END
// 3️⃣ setup Express app END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 4️⃣ mount external routers START
    console.log((`🚀  M O U N T   E X T E R N A L   R O U T E R S`));
    // Order matters here!
    // IF the entire router (or all its routes) should be protected and only accessible to authenticated users,
    // then yes — it makes sense to mount it after your authentication middleware.
    // IF a router includes public routes (e.g., login, signup, health checks, static files, etc.),
    // then it should not be mounted after global authentication — otherwise users can’t access it
    // without being logged in (which creates a chicken-and-egg problem).
        app.use("/globalRouter", globalRouter);
        app.use("/loginRouter", loginRouter);
        app.use("/sessionsRouter", sessionsRouter);
        console.log(trace()," ✅ /globalRouter");
        console.log(trace()," ✅ /loginRouter");
        console.log(trace()," ✅ /sessionsRouter");
        if (projectRouter) {
            app.use("/projectRouter", projectRouter);
            console.log(trace()," ✅ /projectRouter");
        }
        if (SQLiteRouter) {
            app.use("/SQLiteRouter", SQLiteRouter);
            console.log(trace()," ✅ /SQLiteRouter");
        }else{
            console.log(trace()," ⚠️ /SQLiteRouter NOT mounted - router is undefined.");
        }
        if (googleAPIsRouter) {
            app.use("/googleAPIsRouter", googleAPIsRouter);
            console.log(trace()," ✅ /googleAPIsRouter");
        }else{
            console.log(trace()," ⚠️ /googleAPIsRouter NOT mounted - router is undefined.");
        }
        if (trackerRouter) {
            app.use("/trackerRouter", trackerRouter);
            console.log(trace()," ✅ /trackerRouter");
        }else{
            console.log(trace()," ⚠️ /trackerRouter NOT mounted - router is undefined.");
        }
// 4️⃣ mount external routers END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 3️⃣ map static folders START
    console.log((`🚀  S E T U P   S T A T I C   F O L D E R S`));
    const staticFolders = ['config', 'db', 'media', 'public', 'schema', 'src', 'styles'];
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
// 3️⃣ map static folders END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// middleware, placed ahead of all routes, to log incoming requests
    app.use((req, res, next) => {
        // Feature                         Feature	app.use()	                                app.all()
        // ~~~~~~~~~~~~~~~~~               ~~~~~~~~~~~~~~~~~                                   ~~~~~~~~~~~~~~~~~
        // Purpose	                Global logic (Logging, Security, Body Parsing).	    Handling all HTTP methods for a specific URL.
        // Path matching	        Matches the start of the path (Prefix matching).	Matches the exact path (or pattern).
        // Common usage	            app.use(express.json()) or Logging.	                app.all('/api/admin/*', checkAdmin)
        // Middleware compatible	Yes, highly optimized for it.	                    No, expects a route handler.
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        console.log(`🌐 ${trace()} 🌐 Incoming request: ${req.method} 🌐 ${req.originalUrl} 🌐 from IP: ${ip} 🌐`);
        next();
    });
// 5️⃣ set guestToken and guestCookie START 🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪 
    app.post("/api/initGuest", (req, res) => {
        //   ❗   T H I S   S H O U L D   B E   T H E   F I R S T   A P I   ❗
        console.log(`✅🗑️🪙🍪 ${trace()} G U E S T   I N I T   S T A R T  `);
        console.log(`✅🗑️🪙🍪 ${trace()} Deleting old cookies if they exist...`);
        const isProd = process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase() === "true";
        const now = new Date();
        const nowDate = now.toLocaleDateString();
        const nowTime = now.toLocaleTimeString();
        // Clear old cookies & tokens START 🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪
            try {
                // clear signed-in-user token & guest tokens & guest cookie
                    // DON'T clear signed-in-user token here, as it logs the user out
                    // res.clearCookie('connectSID', {path: "/", httpOnly: true, secure: true, sameSite: isProd ? "strict" : "lax"});
                    //     console.log(`✅🗑️🪙 ${trace()} ✅🗑️🪙 Cleared any existing signed-in-user Token.`);
                    // DON'T clear signed-in-user token here, as it logs the user out
                    res.clearCookie('guestToken', {path: "/", httpOnly: true, secure: true, sameSite: isProd ? "strict" : "lax"});
                        console.log(`✅🗑️🪙 ${trace()} ✅🗑️🪙 Cleared any existing guestToken.`);
                    res.clearCookie('guestCookie', {path: "/", httpOnly: false, secure: true, sameSite: isProd ? "strict" : "lax"});
                        console.log(`✅🗑️🍪 ${trace()} ✅🗑️🍪 Cleared any existing guestCookie.`);
            } catch (error) {
                console.log(`❌🗑️🪙🍪 ${trace()} ❌🗑️🪙🍪 Error clearing old cookies:`, error);
            }
        // Clear old cookies & tokens END   🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪🗑️🧕🪙🍪
        // ---- Set new guestToken cookie START  🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
            // const guestTokenId = `guestToken__${Date.now()}__${randomUUID()}`;
            const guestTokenId = `guestToken__${nowDate}_${nowTime.replace(/\s/g, '')}__${randomUUID()}`;
            const maxAgeSeconds = 90 * 60; // 90 minutes ~ 1.5 hours
            // Order matters!  1) jwtPayload 2) jwtSecret 3) jwtOptions
            // 1) jwtPayload ~ custom metadata
            // 2) jwtSecret ~ the JWT_SECRET_KEY
            // 3) jwtOptions ~ use for standard claims like expiration and issuer
            const tokenPayload = jwt.sign(
                { 
                    guest: true, 
                    guestTokenId 
                },
                JWT_SECRET_KEY,
                { 
                    expiresIn: '1.5h', // will set exp automatically.  iat is always set automatically.
                    jwtid: guestTokenId // a single user can have many tokens, so this is different to a userId.
                }
            );
            // Decode without verifying (fast) just to read the 'exp' claim
                const decoded = jwt.decode(tokenPayload);
            // 'exp' is a Unix timestamp in SECONDS, so multiply by 1000 for JS Date
                const expiryDate = new Date(decoded.exp * 1000);
            res.cookie(
                "guestToken", 
                tokenPayload, 
                {
                    path: "/",
                    httpOnly: true,
                    secure: isProd,
                    sameSite: isProd ? "strict" : "lax",
                    maxAge: maxAgeSeconds * 1000
                }
            );
            // ❗❗❗NEVER LOG THE FULL JWT❗❗❗ console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload:-\n${JSON.stringify(jwt.verify(tokenPayload,JWT_SECRET_KEY))}`);
            const jwtJSO = jwt.verify(tokenPayload,JWT_SECRET_KEY);
            console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload guest:-${jwtJSO.guest}`);
            console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload guestTokenId:-${maskString(jwtJSO.guestTokenId,10,5)}`); // ❗❗❗NEVER LOG THE FULL ID❗❗❗
            console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload expires: ${expiryDate.toLocaleString()}`);
        // ---- Set new guestToken cookie END    🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙
        // ---- Set new guestCookie START   🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
            // const guestCookieId = randomUUID();
            const guestCookieId = `guestCookie__${nowDate}_${nowTime.replace(/\s/g, '')}__${randomUUID()}`;
            const exp = Date.now() + (maxAgeSeconds * 1000);
            const expReadable = new Date(exp).toLocaleString();
            const cookiePayload = JSON.stringify({ guest: true, 
                guestCookieId, 
                exp,
                expReadable
            });
            // Order matters!  1) cookieName 2) cookiePayload 3) cookieOptions
            // 1) cookieName ~ for example "guestCookie"
            // 2) cookiePayload ~ custom metadata
            // 3) cookieOptions ~ standard options only: 
            // Domain,   ~ What it does: Sets the domain the cookie is valid for. Default: The current domain (no subdomains).
            // Path,     ~ What it does: Defines the URL path the cookie applies to. Default: '/' (entire domain).
            // Expires   ~ What it does: Sets the cookie's expiration as a fixed Date. Alternative: Use maxAge for relative time. expires: new Date(Date.now() + 3600000) // expires in 1 hour
            // Max-Age,  ~ What it does: Cookie lifespan in milliseconds from now. maxAge: 60000 // 1 minute
            // HttpPnly, ~ What it does: Makes the cookie inaccessible to JavaScript (document.cookie). Use it: For security (prevents XSS stealing cookies).
            // Secure,   ~ What it does: Cookie is only sent over HTTPS. Recommended: Always use this in production.
            // SameSite, ~ What it does: Controls whether the cookie is sent in cross-site requests.
            //              Values:
            //              'strict' → never sent on cross-site requests (most secure)
            //              'lax' → sent on top-level navigations (like a link click)
            //              'none' → sent always, must also set secure: true
            // Priority  ~ What it does: Sets eviction priority in Chrome when cookie storage is full. Values: 'low', 'medium', 'high'. Only Chrome supports this right now; it’s mostly about memory pressure. 
            //              priority: 'high'
            res.cookie("guestCookie", cookiePayload, {
                path: "/",
                httpOnly: false,
                secure: isProd,
                sameSite: isProd ? "strict" : "lax",
                maxAge: maxAgeSeconds * 1000
            });
            // console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload:-\n${cookiePayload}`);
            console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${JSON.parse(cookiePayload).guest}`);
            console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${maskString(JSON.parse(cookiePayload).guestCookieId,10,5)}`);
            console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${JSON.parse(cookiePayload).expReadable}`);
            console.log(`✅🗑️🪙🍪 ${trace()} G U E S T   I N I T   E N D  `);
        // ---- Set new guestCookie END     🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
        res.status(204).end(); // This satisfies the browser, resolves the Promise, and avoids errors — while keeping the payload zero.
    });
// 5️⃣ set guestToken and guestCookie END  🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪
// 5️⃣   R E F R E S H   guestToken and guestCookie   S T A R T   🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪
    app.post("/api/refreshGuest", async (req, res) => {
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        console.log(`✅🗑️🪙🍪 ${trace()} G U E S T   R E F R E S H   S T A R T  `);
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
        const isProd = process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase() === "true";
        const nowDate = new Date().toLocaleDateString();
        const nowTime = new Date().toLocaleTimeString();

        const guestTokenOld = req.cookies.guestToken; // Assuming you have cookie-parser middleware
        if (!guestTokenOld) {
            console.log(`🔃🪙🪙🪙 ${trace()} ❌ No guest token was found, unable to refresh:`,guestTokenOld);
            return res.status(401).send({ message: "No guest token was found, unable to refresh." });
        }
        const guestCookieOld = req.cookies.guestCookie; // Assuming you have cookie-parser middleware
        if (!guestCookieOld) {
            console.log(`🔃🍪🍪🍪 ${trace()} ❌ No guest cookie was found, unable to refresh:`,guestCookieOld);
            return res.status(401).send({ message: "No guest cookie was found, unable to refresh." });
        }

        try {
            // 1. Verify the signature of the old token (ignore expiration for refresh flow)
                // **IMPORTANT: Must handle the possibility of the token being expired here.**
                    const guestTokenOldJWT = jwt.verify(guestTokenOld, JWT_SECRET_KEY, { ignoreExpiration: true });
                    const expiryDateOld = new Date(guestTokenOldJWT.exp * 1000);
                console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayloadOld guest:-${guestTokenOldJWT.guest}`);
                console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayloadOld guestTokenId:-${maskString(guestTokenOldJWT.guestTokenId,10,5)}`); // ❗❗❗NEVER LOG THE FULL ID❗❗❗
                console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayloadOld expires: ${(expiryDateOld).toLocaleString()}`);
            
            // --- 2. Create New JWT Token ---
                const maxAgeSeconds = 90 * 60; // 90 minutes ~ 1.5 hours
                const guestTokenIdNew = `guestToken__${nowDate}_${nowTime.replace(/\s/g, '')}__${randomUUID()}`;
                const guestTokenPayloadNew = jwt.sign(
                    { 
                        guest: true, 
                        guestTokenId: guestTokenIdNew 
                    },
                    JWT_SECRET_KEY,
                    { 
                        expiresIn: '1.5h',
                        jwtid: guestTokenIdNew 
                    }
                );
                // Decode without verifying (fast) just to read the 'exp' claim
                    const decoded = jwt.decode(guestTokenPayloadNew);
                    // 'exp' is a Unix timestamp in SECONDS, so multiply by 1000 for JS Date
                        const expiryDateNew = new Date(decoded.exp * 1000);
            // --- 3. Set New guestToken Cookie (HttpOnly) ---
                res.cookie("guestToken", guestTokenPayloadNew, {
                    path: "/",
                    httpOnly: true,
                    secure: true,
                    sameSite: isProd ? "strict" : "lax",
                    maxAge: maxAgeSeconds * 1000
                });
                // ❗❗❗NEVER LOG THE FULL JWT❗❗❗ console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload:-\n${JSON.stringify(jwt.verify(tokenPayload,JWT_SECRET_KEY))}`);
                const jwtJSO = jwt.verify(guestTokenPayloadNew,JWT_SECRET_KEY);
                console.log(`🪙 ${trace()} 🪙 Guest JWT guestTokenPayloadNew guest:-${jwtJSO.guest}`);
                console.log(`🪙 ${trace()} 🪙 Guest JWT guestTokenPayloadNew guestTokenId:-${maskString(jwtJSO.guestTokenId,10,5)}`); // ❗❗❗NEVER LOG THE FULL ID❗❗❗
                console.log(`🪙 ${trace()} 🪙 Guest JWT guestTokenPayloadNew expires: ${expiryDateNew.toLocaleString()}`);

            // --- 4. Set New guestCookie (Data Cookie) ---
                // 4.1 Parse the old data cookie to find the ID the UI is using
                const guestCookieOldParsed = JSON.parse(guestCookieOld);
                const persistentId = guestCookieOldParsed.guestCookieId; // This is the ID we want to keep
                const guestCookieIdReused = persistentId; // Reuse the old ID for continuity. By grabbing persistentId from the old cookie, you ensure that if the guest had items in a temporary "cart" or had specific UI settings, they won't lose them just because the token refreshed.
                const expTimestamp = Date.now() + (maxAgeSeconds * 1000);
                const expReadable = new Date(expTimestamp).toLocaleString();
                const cookiePayload = { 
                    guest: true, 
                    guestCookieId: guestCookieIdReused, 
                    exp: expTimestamp,          // Keep this for JS math/logic
                    expiresAt: expReadable      // Human readable: "12/26/2025, 10:30:00 AM" 
                };
                res.cookie("guestCookie", JSON.stringify(cookiePayload), {
                    path: "/",
                    httpOnly: false, // Client-readable cookie
                    secure: true,
                    sameSite: isProd ? "strict" : "lax",
                    maxAge: maxAgeSeconds * 1000
                });
                console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${cookiePayload.guest}`);
                console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${maskString(cookiePayload.guestCookieId,10,5)}`);
                console.log(`🍪 ${trace()} 🍪 Guest cookie cookiePayload guest:-${cookiePayload.expiresAt}`);

                console.log(`✅🗑️🪙🍪 ${trace()} G U E S T   R E F R E S H   E N D  `);

                res.status(204).end();
            
        } catch (err) {
            // Handles if the signature is invalid (attacker token)
            console.error(trace(),"❌🪙🍪⛔ Guest refresh failed. ⛔🍪🪙❌ ", err);
            // Force a full re-initialization by deleting cookies and returning 401
            res.clearCookie('guestToken');
            res.clearCookie('guestCookie');
            return res.status(401).send({ message: `Guest refresh failed.  ${err.message}` });
        }
    });
// 5️⃣   R E F R E S H   guestToken and guestCookie   E N D  🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// // 6️⃣ log each REQuest START
//     console.log((`🚀  L O G   A L L   R E Q U E S T S`));
//     // Middleware to log each request
//         app.use((req, res, next) => {
//             const now = new Date();
//             const localISO = now.toLocaleString('en-AU', {
//                 year: 'numeric',
//                 month: '2-digit',
//                 day: '2-digit',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: false,
//                 timeZoneName: 'short'
//             });
//             console.log(`🪵 ${trace()} 🪵🪵🪵 LOG date/time (local): ${now.toLocaleString()} | (ISO): ${localISO}`);
//             function toLocalISOString(date = new Date()) {
//                 const pad = n => n.toString().padStart(2, '0');
//                 const yyyy = date.getFullYear();
//                 const mm = pad(date.getMonth() + 1);
//                 const dd = pad(date.getDate());
//                 const hh = pad(date.getHours());
//                 const min = pad(date.getMinutes());
//                 const ss = pad(date.getSeconds());
//
//                 return `${yyyy}-${mm}-${dd}, ${hh}:${min}:${ss}`;
//             }
//             console.log(`🪵 ${trace()} 🪵🪵🪵 LOG date/time (local): ${now.toLocaleString()} | (ISO): ${toLocalISOString()}`);
//             const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
//             console.log(`🪵 ${trace()} 🪵 req.method:      ${req.method}`);
//             console.log(`🪵 ${trace()} 🪵 req.originalUrl: ${req.originalUrl}`);
//             console.log(`🪵 ${trace()} 🪵 req.url:         ${req.url}`);
//             console.log(`🪵 ${trace()} 🪵 Origin IP:                            ${req.ip}`);
//             console.log(`🪵 ${trace()} 🪵 Origin req.headers['x-forwarded-for'] ${ip}`);
//             console.log(`🪵 ${trace()} 🪵 User-Agent: ${req.headers['user-agent']}`);
//             const authHeader = req.headers['authorization'];
//             // JWT decode START
//                 let jwtPayload = null;
//                 let jwtLog = null;
//                 const guestToken = req.cookies?.guestToken;
//                 if (guestToken) {
//                     try {
//                         jwtPayload = jwt.decode(guestToken); // decode without verifying
//                         const issuedAtDate = new Date(jwtPayload.iat * 1000);
//                         const expiresAtDate = new Date(jwtPayload.exp * 1000);
//                         console.log(`🪵 ${trace()} 🪙 JWT guest?:${jwtPayload.guest}`);
//                         console.log(`🪵 ${trace()} 🪙 JWT guest id:${jwtPayload.guestTokenId}`);
//                         console.log(`🪵 ${trace()} 🪙 JWT iat:${issuedAtDate.toLocaleString()}`);
//                         console.log(`🪵 ${trace()} 🪙 JWT exp:${expiresAtDate.toLocaleString()}`);
//                     } catch (err) {
//                         console.warn(`❌ Failed to decode guest JWT:`, err.message);
//                     }
//                 }
//             // JWT decode END
//             // guestCookie decode START
//                 let guestCookiePayload = null;
//                 let guestCookieLog = null;
//                 const guestCookie = req.cookies?.guestCookie;
//                 if (guestCookie) {
//                     try {
//                         guestCookiePayload = JSON.parse(guestCookie); // parse the JSON string
//                         const issuedAtDate = new Date(guestCookiePayload.iat);
//                         const expiresAtDate = new Date(guestCookiePayload.exp);
//                         // guestCookieLog = `🪵 Cookie guest?:${guestCookiePayload.guest}\n🪵 Cookie exp:${expiresAtDate.toLocaleString()}`;
//                         console.log(`🪵 ${trace()} 🍪 Cookie guest?:${guestCookiePayload.guest}`);
//                         console.log(`🪵 ${trace()} 🍪 Cookie guest id?:${guestCookiePayload.guestCookieId}`);
//                         console.log(`🪵 ${trace()} 🍪 Cookie guest iat:${expiresAtDate.toLocaleString()}`);
//                         console.log(`🪵 ${trace()} 🍪 Cookie guest exp:${expiresAtDate.toLocaleString()}`);
//                     } catch (err) {
//                         console.warn(`❌ Failed to parse guestCookie:`, err.message);
//                         }
//                     }
//             // guestCookie decode END
//             setTimeout(()=>{
//                 // logREQuest(req);
//                 console.log(`🪵 ${trace()} ✒️✒️✒️ ⏰ 1 second delay before writing to logFile.`);
//             },1000);
//             next();
//         });
// // 6️⃣ log each REQuest END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 7️⃣ authenticate users START
    // Middleware to authenticate users based on JWT token in cookies
        app.use((req, res, next) => {
            console.log((`🚀   A U T H E N T I C A T E   G U E S T   U S E R S   S T A R T`));
            // safeURLs START
                console.log((`🚀   C H E C K   k n o w n U R L s . j s o n`));
                if (!safeURLs.includes(req.url)) {
                    const allowedRouters = ["/tinymce/", "/SQLiteRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/", "/googleAPIsRouter/", "/trackerRouter/"];
                    if (allowedRouters.some(prefix => req.url.startsWith(prefix))) {
                        console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to router:- ${req.url}`);
//                     } else {
//                         // console.log("Access denied");
//                         console.log(`🪣 ${trace()}🔑❌🔴 Access denied due to session inconsistency:- ${req.url}`);
// // console.log(trace(),"Cookie SID:", req.cookies.sid);
// // console.log(trace(),"Headers SID:", req.headers["sid"]);
// // console.log(trace(),"Session ID:", req.sessionID);
//                         return res.status(403).send({message:"Access denied.",status:false});
                    }
                }else{
                    console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                    next();
                }

            // safeURLs END
            // const publicPaths = [
            //     '/loginRouter/login',
            //     '/loginRouter/signup',
            //     '/loginRouter/forgotPassword',
            //     '/loginRouter/resetPassword',
            //     '/loginRouter/verifyEmail',
            //     '/globalRouter/publicInfo',
            //     '/projectRouter/getPublicData',
            //     '/sessionsRouter/createSession',
            //     '/sessionsRouter/getSession',
            //     '/sessionsRouter/deleteSession',
            //     '/googleAPIsRouter/getGooglePublicData',
            //     // Add other public paths here
            //     // Also consider static files, health checks, etc.
            // ];
            // if (publicPaths.includes(req.path) || req.path.startsWith('/public/') || req.path.startsWith('/static/')) {
            //     // Public path, skip authentication
            //     return next();
            // }
            // JWT authentication START
                console.log((`🚀   A U T H E N T I C A T E   G U E S T   U S E R S   ~   J W T`));
                if (!safeURLs.includes(req.url)) {
                    // Authenticate using JWT token from cookies NOT headers
                        const token = req.cookies.guestToken;
                    if (!token) {
                        console.log(`🔒 ${trace()} 🔒🔒🔒 No token provided. Access denied to ${req.path}`);
                        return res.status(401).json({ message: 'Access denied. No token provided.' });
                    }
                    try {
                        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                        // Check if this is a guest or a full user
                            if (decoded.guest) {
                                req.isGuest = true;
                            }
                        req.user = decoded;
                        // console.log(`🔓 ${trace()} 🔓🔓🔓 Token verified. User authenticated for ${req.path}`);
                        console.log(`🔓 ${trace()} Token verified for: ${maskString(decoded.guestTokenId,10,5) || maskString(decoded.userId,10,5)}`);
                        next();
                    } catch (error) {
                        if (error.name === 'TokenExpiredError') {
                            console.log(`⏳ ${trace()} Token expired at ${error.expiredAt}`);
                            // 401 tells the client "Time to call triggerGuestRefresh()"
                                return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
                        }
                        // console.log(`🔒 ${trace()} 🔒🔒🔒 Invalid token. Access denied to ${req.path}`, error);
                        // return res.status(400).json({ message: 'Invalid token.' });
                        console.error(`🔒 ${trace()} Security Alert: Invalid Token Signature`, error.message);
                        return res.status(403).json({ message: 'Invalid token.' });
                    }
                }else{
                    console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                }
            // JWT authentication END
            // authenticate using the JWT only!  The guestCookie is httpOnly false and can be tampered with by the client.
                // // COOKIE authenticate START
                //     console.log((`🚀   A U T H E N T I C A T E   G U E S T   U S E R S   ~   C O O K I E`));
                //     if (!safeURLs.includes(req.url)) {
                //         const guestCookie = req.cookies.guestCookie;
                //         if (!guestCookie) {
                //             console.log(`🔒 ${trace()} 🔒🔒🔒 No cookie provided. Access denied to ${req.path}`);
                //             return res.status(401).json({ message: 'Access denied. No cookie provided.' });
                //         }
                //         try {
                //             // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                //             // req.user = decoded;
                //             console.log(`🔓 ${trace()} 🔓🔓🔓 Cookie verified. User authenticated for ${req.path}`);
                //             next();
                //         } catch (error) {
                //             console.log(`🔒 ${trace()} 🔒🔒🔒 Invalid cookie. Access denied to ${req.path}`, error);
                //             return res.status(400).json({ message: 'Invalid cookie.' });
                //         }
                //     }else{
                //         console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                //     }
                // // COOKIE authenticate END
            // authenticate using the JWT only!  The guestCookie is httpOnly false and can be tampered with by the client.
            console.log((`🚀   A U T H E N T I C A T E   G U E S T   U S E R S   E N D`));
        });
// 7️⃣ authenticate users END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟
// 👟 S N E A K   I N   T H E   O D D   A P I   E N D   P O I N T
    app.post("/api/tollCalcNSW", (req, res) => {
        // T H I S   S H O U L D   B E   T H E   F I R S T   A P I
        console.log(`${trace()} 🛣️🛣️🛣️ Toll Calculation NSW API called.`);
        console.log(`${trace()} 🛣️🛣️🛣️.`, req.body);
        const response = getTollDataAxios(req.body.originText, req.body.destinationText, req.body.vehicleClass = 'Class A',req.body.f)
        res.send(response);
    });
    app.post("/api/ping", async (req, res) => {
        // keep-alive / health check / heartbeat endpoint
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        console.log(`🏓 ${trace()} 🏓🏓🏓 Ping API called.`);
        res.status(200).send({ status: "ok" }); // standard response, overkill and wastes bandwidth
        // res.status(204).send(); // minimalist response, best for keep-alive checks
    });
// 👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟👟
// S S L   C E R T I F I C A T E   C H E C K   📃📃📃📃📃📃📃📃📃📃📃📃📃   S T A R T
        async function getCertificateExpiry(domain, port) {
            console.log(`${trace()} 📃📃📃 checking expiry of SSL Certificates`);
            return new Promise((resolve, reject) => {
                const socket = tls.connect(port, domain, { servername: domain }, () => {
                    const cert = socket.getPeerCertificate();
                    if (!cert || !cert.valid_to) {
                        reject(new Error('No certificate found'));
                    } else {
                        resolve(new Date(cert.valid_to));
                    }
                    socket.end();
                });
                socket.on('error', reject);
            });
        }
        async function checkSSL() {
            try {
                const expiryDate = await getCertificateExpiry(process.env.SSL_CHECK_DOMAIN, process.env.SSL_CHECK_PORT);
                const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
                // console.log(daysLeft , parseFloat(process.env.SSL_CHECK_EXPIRY_WARNING_DAYS));
                if (daysLeft <= parseFloat(process.env.SSL_CHECK_EXPIRY_WARNING_DAYS)){
                    console.warn(`${trace()} 📃📃📃 ⚠️⚠️⚠️ SSL certificate for ${process.env.SSL_CHECK_DOMAIN}\n${trace()} 📃📃📃 ⚠️⚠️⚠️ expires in ${daysLeft} days\n${trace()} 📃📃📃 ⚠️⚠️⚠️ on (${expiryDate})`);
                    // await sendEmailAlert(daysLeft, expiryDate);
                } else {
                    console.log(`${trace()} 📃📃📃 ✅✅✅ SSL certificate for ${process.env.SSL_CHECK_DOMAIN} is valid (${daysLeft} days left, expires ${expiryDate})`);
                }
            } catch (err) {
                console.error(`${trace()} 📃📃📃 🔴🟥🚩❗🔴🟥🚩❗🔴🟥🚩❗\n${trace()} 📃📃📃 Validating SSL certificate FAILED:\n`, err,`\n${trace()} 📃📃📃 🔴🟥🚩❗🔴🟥🚩❗🔴🟥🚩❗`);
            }
        }
        checkSSL();
// S S L   C E R T I F I C A T E   C H E C K   📃📃📃📃📃📃📃📃📃📃📃📃📃   E N D
// // 🔴 DON'T USE, IT'S A HEADACHE     C S P   r e p o r t s   S T A R T 🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐
//         app.post("/csp-violation-report-endpoint", (req, res) => {
//             // app.post("/csp-violation-report-endpoint", express.json({ type: ["application/json", "application/csp-report"] }), (req, res) => {
//             console.log(`${trace()} ❌❗🚩❌❗🚩❌❗🚩❌❗🚩❌❗🚩 CSP Violation:`, req.body);
//             res.status(204).end(); // no response needed
//         });
// //  🔴 DON'T USE, IT'S A HEADACHE     C S P   r e p o r t s   E N D     🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐📃🔐
// 7️⃣ start server START 🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾
    async function logServerStartup(){
        const serverIcon = process.env.SERVER_ICON || "🚗";
        console.log(("🧑‍🔧").repeat(45));
        console.log(`🧑‍🔧 S T A R T   S E R V E R${(" ").repeat(91-("🧑‍🔧 S T A R T   S E R V E R").length)}🧑‍🔧`);
        // console.log(`🧑‍🔧 SERVER MODE = production: ${isProduction}.${(" ").repeat(88-("🧑‍🔧 SERVER MODE = production: false.").length)}🧑‍🔧`);
        // console.log(`🧑‍🔧 SERVER MODE = development:${isDevelopment}.${(" ").repeat(88-("🧑‍🔧 SERVER MODE = production: true.").length)}🧑‍🔧`);
        myDate = new Date();
        console.log(`${serverIcon} ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(91-(`${serverIcon} ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}${serverIcon}`);
        console.log(`${serverIcon} Server is running on port:${PORT}.${(" ").repeat(91-(`${serverIcon} Server is running on port:${PORT}.`).length)}${serverIcon}`);
        console.log(isProduction==="true" ?
            `${serverIcon} Server is running in Production mode. ${(" ").repeat(91-(`${serverIcon} Server is running in Production mode. `).length)}${serverIcon}` : 
            `${serverIcon} Server is running in Development mode. ${(" ").repeat(91-(`${serverIcon} Server is running in Development mode. `).length)}${serverIcon}`);
        // console.log(`${serverIcon} Server is running on port # ${process.env.APP_PORT}${(" ").repeat(118-(`${serverIcon} Server is running on port # ${process.env.APP_PORT}`).length)}${serverIcon}`);
        console.log(`${serverIcon} Server data folder is:${dataFolder}.${(" ").repeat(91-(`${serverIcon} Server data folder is:${dataFolder}.`).length)}${serverIcon}`);
        console.log(`${serverIcon} Server root folder is:${__dirname}.${(" ").repeat(91-(`${serverIcon} Server root folder is:${__dirname}.`).length)}${serverIcon}`);
        console.log((serverIcon).repeat(45));
    };
    const PORT = process.env.APP_PORT;
    const DEV_IP_ADDRESS = process.env.APP_DEV_IP_ADDRESS;
    const isProduction = process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase();
    const isDevelopment = process.env.APP_SERVER_MODE_DEVELOPMENT?.toLowerCase();
    const onWebServer = process.env.APP_HOSTED_ON_WEB_SERVER?.toLowerCase();
    const onDevelopmentMachine = process.env.APP_HOSTED_ON_DEVELOPMENT_MACHINE?.toLowerCase();
    const dataFolder = process.env.APP_PATH_TO_DATA?.toLowerCase();

    if (isProduction==="true") {
        if(onWebServer==="true"){
            //   P R O D U C T I O N   M O D E   D E P L O Y E D   O N   S E R V E R
                app.listen(PORT, '0.0.0.0', () => {
                    console.log(`${trace()}🔍 Production mode deployed on server port:- ${PORT}`);
                    // Logging for production...
                    logServerStartup();
                });
            //   P R O D U C T I O N   M O D E   D E P L O Y E D   O N   S E R V E R
        }else{
            //   P R O D U C T I O N   M O D E   H O S T E D   L O C A L L Y
                console.log(`${trace()}🔍 Production mode hosted locally at HTTPS://localhost:${PORT}`);
                const options = {
                    // key: fs.readFileSync("serverGITignore.key"),
                    // cert: fs.readFileSync("serverGITignore.cert")
                    key: await fsCore.readFileSync("serverGITignore.key"),
                    cert: await fsCore.readFileSync("serverGITignore.cert")
                };
                console.log(`${trace()}🔍 Production Key Snippet:`, maskString(String(options.key),22,22));
                console.log(`${trace()}🔍 Production Cert Snippet:`, maskString(String(options.cert),22,22));
                https.createServer(options, app).listen(PORT, () => {
                    // Logging for development...
                    logServerStartup();
                });
            //   P R O D U C T I O N   M O D E   H O S T E D   L O C A L L Y
        }
    } else {
        if(onDevelopmentMachine==="true"){
            //   D E V E L O P M E N T   M O D E   H O S T E D   L O C A L L Y
                app.listen(PORT, () => {
                    console.log(`${trace()}🔍 Development mode hosted locally at HTTP://localhost:${PORT}`);
                    // Logging for development...
                    logServerStartup();
                });
            //   D E V E L O P M E N T   M O D E   H O S T E D   L O C A L L Y
        }
    }
// 7️⃣ start server END   🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾🎾
// 🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫
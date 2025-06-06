// <!-- collapse all     Ctrl + k + 0 -->
// <!-- expand all       Ctrl + k + j -->
// <!-- format           Alt + Shift + F (USE WITH CAUTION)-->
// <!-- word wrap toggle Alt + z -->
// - Variables & Functions: Use camelCase (e.g., getUserName(), totalAmount)
// - Classes & Constructors: Use PascalCase (e.g., UserModel, DataProcessor)
// - Constants: Use UPPER_CASE_SNAKE_CASE (e.g., API_KEY, MAX_LIMIT)
// - Modules: Often kebab-case for filenames (e.g., user-profile.mjs)
// - Event & Callback Handlers: Prefix with on (e.g., onClick, onDataReceived)
// - Private Variables: Some use leading _ to indicate private properties (_hiddenProperty)

let myDate;
myDate = new Date();
console.log(("🔰").repeat(60));
console.log(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🔰 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🔰`);
myDate = new Date();
console.log(`🔰 ${myDate}${(" ").repeat(118-(`🎾 ${myDate}`).length)}🔰`);
process.env.APP_TZ = "Australia/Sydney"; // 🌏 Sets the server timezone
console.log(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}${(" ").repeat(118-(`🔰 Server running in timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`).length)}🔰`);
console.log(("🔰").repeat(60));

const consoleLog = false;

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 1️⃣ import statements
    // // axios
    //     import axios from 'axios';
    // OS - operatingSystem
        import os from 'os';
    // FS - fileSystem
        import fs from 'fs';
        // import fs from 'fs/promises';
            // - fs.writeFile from 'fs' expects a callback (cb), which is why you're getting the "cb argument must be of type function" error.
            // - The 'fs/promises' version works natively with async/await, so no callback is needed.
    // PATH
        import path from 'path';
        import { fileURLToPath } from 'url';
            // Get the current file path
                const __filename = fileURLToPath(import.meta.url);
            // Get the directory name
                const __dirname = path.dirname(__filename);
    // ENVironment variables
        import dotenv from "dotenv";
    // EXPRESS
        import express from "express";
    // COOKIE PARSER
        import cookieParser from 'cookie-parser';
    // JSONWEBTOKE for user authentication
        import jwt from 'jsonwebtoken';
    // CRYPTO
        import crypto from 'crypto'
        import { randomUUID } from 'crypto'; // randomUUID is a named export from crypto
    // SESSIONS
        import session from 'express-session';
        // CORS handling START
        import cors from 'cors';
        // SQLite
            // async await environment
                import sqlite3 from "sqlite3"; //The core Node.js SQLite package (handles database operations).
                import { open } from "sqlite"; // The SQLite package that provides a promise-based API for database operations.
        // ROUTERS
        // import dbRouter, * as dbFunctions from "./src/SQLite_ServerSide.mjs";
        // import loginRouter, * as loginFunctions from './src/globalLoginServer.mjs';
        // import globalRouter, * as globalFunctions from './src/globalServer.mjs'; 
        // import projectRouter, * as projectFunctions from './src/projectServer.mjs';
        // import sessionsRouter, * as sessionsFunctions from './src/globalSessionsServer.mjs';
        import dbRouter from "./src/SQLite_ServerSide.mjs";
        import loginRouter from './src/globalLoginServer.mjs';
        import globalRouter from './src/globalServer.mjs'; 
        import projectRouter from './src/projectServer.mjs';
        import sessionsRouter from './src/globalSessionsServer.mjs';
        import googleAPIsRouter from './src/googleAPIs_ServerSide.mjs';
        // SQLite CRUD
        import { insertRecord, getRecord, updateRecord, deleteRecord } from "./src/SQLite_ServerSide.mjs";
        import { trace } from "./src/globalServer.mjs";
        
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

    // function checkImports(){
        try{
            if(consoleLog===true){console.log("Imported axios:", axios ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported os:", os ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported fs:", fs ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported path:", path ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported url { fileURLToPath }:", fileURLToPath ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported dotenv:", dotenv ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported express:", express ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported cookieParser / cookie-parser:", cookieParser ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported jwt / jsonwebtoken:", jwt ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported crypto:", crypto ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported crypto { randomUUID }:", randomUUID ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported session / express-session:", session ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported cors:", cors ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sqlite3:", sqlite3 ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sqlite { open }:", open ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported dbRouter:", dbRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported projectRouter:", projectRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported googleAPIsRouter:", googleAPIsRouter ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {insertRecord} from SQLite_ServerSide.mjs:", insertRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {getRecord} from SQLite_ServerSide.mjs:", getRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {updateRecord} from SQLite_ServerSide.mjs:", updateRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {deleteRecord} from SQLite_ServerSide.mjs:", deleteRecord ? "✅ " : "❌ Failed");}
            if(consoleLog===true){console.log("Imported {trace} from globalServer.mjs:", trace ? "✅ " : "❌ Failed");}
        }
        catch (error) {
            console.log("imports error:",error);
        }     
    // }
    // checkImports();
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
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
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
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
                        // console.log(`key:- ${key} :- ${envVar[key]}`);
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
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 3️⃣ create express app AND middleware
    const app = express();
    app.use(express.json());
    app.disable('x-powered-by'); // Reduce fingerprinting by hiding that this is an ExpressJS app
    app.set('trust proxy', 1) // trust first proxy
    app.use(express.json({ limit: "10mb" })); // Middleware to parse JSON data // Increase JSON request size limit
    app.use(express.urlencoded({ limit: "10mb", extended: true }));
    app.use(cookieParser()); // Enables reading of cookies
    const staticFolders = ['config', 'db', 'media', 'public', 'src', 'styles'];
    try{
        staticFolders.forEach(folder => {
            app.use(express.static(folder));
            app.use(`/${folder}`,express.static(folder));
            if(consoleLog===true){console.log(`mapped folder:- ${folder}`);}
        });
        console.log(`${trace()}🟢 Project folders mapped.`);
    }
    catch{
        console.log(`🔴 map to folder failed:- ${folder}`);
    }
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
        // app.use(
        //         cors(
        //         {
        //             origin: '*',                         // ❌ ONLY for development only !!!!
        //             // origin: 'https://yourdomain.com', // ✔️ USE THIS when in production !!!
        //             methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        //             allowedHeaders: ['Content-Type', 'Authorization'],
        //             optionsSuccessStatus: 204, // Avoids extra response headers in preflight requests
        //             credentials: true // true if your app requires authentication with cookies or Authorization headers
        //         }
        //     )
        // );
        // console.log(`${trace()}🟢 CORS headers are set.`);

        if (process.env.APP_SERVER_MODE_DEVELOPMENT === "true") {
            const PORT = process.env.APP_PORT; 
            const corsDevelopmentOrigin = `http://localhost:${PORT}`;
            app.use(cors({
                // origin: corsDevelopmentOrigin,
                    origin: '*',

                    credentials: true,

                    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],

                    allowedHeaders: ['Content-Type', 'Authorization'],

                    optionsSuccessStatus: 204, // Avoids extra response headers in preflight requests
            }));
            console.log(`${trace()}🔒✅ CORS headers set up for Development completed.`);
        } else if (process.env.APP_SERVER_MODE_PRODUCTION === "true") {
            app.use(cors({

                    origin: "https://myproductiondomain.com",

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
    // 4️⃣ session management
        // retrieve the session key OR create one if can't be retrieved
            // const crypto = require("crypto");
                // const sessionKey = crypto.randomBytes(32).toString("hex");
                const sessionKey = process.env.APP_SESSION_KEY || crypto.randomBytes(32).toString("hex");
                console.log(`${trace()}🔒✅ sessionKey created.`); // DON'T LOG THE KEY!!!  KEEP IT SECURE!!!
            // express-session - set up the Express session middleware
                // console.log(`${trace()}🔒✅ Session management set up commenced.`);
                // app.use(
                //     session(
                //         {
                //             // store: redisStore, // redisStore seems to be unreliable, so let's not use it
                //             // Generate a unique session ID
                //                 genid: (req) => randomUUID(),
                //             // START ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                //                 secret: process.env.APP_SESSION_KEY || 'your-secret-key', // Replace with your secret or fallback value
                //                 resave: false, // false:- ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                //                 saveUninitialized: true, // true:- ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                //             // END ensures a session is created even if no data is set, - anew session ID is issued when a user does not yet have a session cookie.
                //             cookie: 
                //                 {
                //                     // domain
                //                         // domain: process.env.APP_DEV_IP_ADDRESS,
                //                     // secure
                //                         // secure: true,    // Set to true for HTTPS in production, false for development
                //                         // secure: false,    // Set to true for HTTPS in production, false for development
                //                         secure: process.env.APP_NODE_ENV === "production",
                //                     // httpOnly
                //                         // httpOnly: true,   // Helps mitigate XSS - set to false for development, true for production
                //                         httpOnly: false,   // Helps mitigate XSS - set to false for development, true for production
                //                     // sameSite
                //                         sameSite: "Strict", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                //                         // sameSite: "Lax", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                //                         // sameSite: "None", // Helps mitigate CSRF - "Strict" for development; "Lax" for standard; "None" for cross-origin requests with Secure true.
                //                             // SameSite Options:
                //                             //     - 'Strict' → Only sends the cookie for same-site requests (highest security).
                //                             //     - 'Lax' → Sends the cookie for same-site requests + top-level navigation (default).
                //                             //     - 'None' → Allows cross-site cookies but requires Secure: true (useful for APIs).
                //                     // maxAge
                //                         maxAge: 15 * 60 * 1000, // Session expires after 15 minutes
                //                 },
                //         }
                //     )
                // );
                // console.log(`${trace()}🔒✅ Session management is set up.`);

                if (process.env.APP_SERVER_MODE_DEVELOPMENT === "true") {
                    console.log(`${trace()}🔒✅ Session management set up for Development commenced.`);
                    app.use(session({
                        // Generate a unique session ID
                            genid: (req) => randomUUID(),

                            secret: process.env.APP_SESSION_SECRET || "defaultSecret",

                            resave: false,

                        // saveUninitialized if true, a session starts on the first request, even if the user doesn’t interact with it, ensuring the session ID is available early. 
                        // saveUninitialized if false, a session is only created when something is stored in it, reducing unnecessary session storage usage
                            saveUninitialized: true,
   
                            cookie:
                            {

                                    secure: false, // Allow HTTP in development

                                // httpOnly: true,   // Helps mitigate XSS - set to false for development, true for production
                                    httpOnly: true,

                                //     - 'strict' → Only sends the cookie for same-site requests (highest security).
                                //     - 'lax' → Sends the cookie for same-site requests + top-level navigation (default).
                                //     - 'none' → Allows cross-site cookies but requires Secure: true (useful for APIs).
                                    // if sameSite is set to none, secure must be set to true
                                    sameSite: "lax"
                            }
                    }));
                    console.log(`${trace()}🔒✅ Session management set up for Development completed.`);
                } else if (process.env.APP_SERVER_MODE_PRODUCTION === "true") {
                    console.log(`${trace()}🔒✅ Session management set up for Production commenced.`);
                    app.use(session({
                       // Generate a unique session ID
                            genid: (req) => randomUUID(),

                           secret: process.env.APP_SESSION_SECRET || "defaultSecret",

                           resave: false,

                        // saveUninitialized if true, a session starts on the first request, even if the user doesn’t interact with it, ensuring the session ID is available early. 
                        // saveUninitialized if false, a session is only created when something is stored in it, reducing unnecessary session storage usage
                           saveUninitialized: true,

                           cookie: 
                            {

                                    secure: true, // Requires HTTPS in production

                                // httpOnly: true,   // Helps mitigate XSS - set to false for development, true for production
                                    httpOnly: true,

                                    sameSite: "strict", // Prevents cross-site cookie access for security

                                    maxAge: 60 * 60 * 1000 // 1-hour session expiration
                            }
                    }));
                    console.log(`${trace()}🔒✅ Session management set up for Production completed.`);
                } else {
                    console.log(`${trace()}🔒🔴 Session management set up failed.  Neither development nor production mode is set.`);
                    throw new Error("Invalid configuration: Neither development nor production mode is set.");
                }
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪🚪
// AUTHENTICATE USER
    console.log(`${trace()}🔒✅ Authentication setup START.`);
    // const safePaths = JSON.parse(fs.readFileSync("safe_paths.json", "utf8")).allowedPaths;
    const safeURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).safe_URLs;
    const startupURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).startup_URLs;

    app.use((req, res, next) => {
        console.log(("🔒").repeat(60));
        console.log(`🪣 ${trace()}🔒 ⁉️req.url:-`,req.url);

        // skip startup URLs
            if (startupURLs.includes(req.url)) {
                console.warn(`🪣 ${trace()}🔒🟢 Startup URL:- ${req.url}..., by-pass authentication.`);
                return next();
            }

        // Skip authentication for public routes
            const publicRoutes = ["/loginRouter/login_step2", "/loginRouter/login_step3", "/loginRouter/login_step4"];
            if (publicRoutes.includes(req.path)) {
                console.log(`🪣 ${trace()}🔒✅ Loggoing in..., by-pass authentication.`);
                return next(); 
            }

        // 
            if (req.headers.cookie) {
                console.log(`🪣 ${trace()}🔒✅ Cookies found in req.headers:-`,req.headers.cookie);
            } else {
                console.log(`🪣 ${trace()}🔒🔴 Cookies not found req.headers:-`,req.headers);
            }
            // if (req.headers.authorization) {
            //     console.log(`🪣 ${trace()}🔒✅ Authorization header found:-`,req.headers.authorization);
            // } else {
            //     console.log(`🪣 ${trace()}🔒🔴 Authorization header not found:-`,req.headers.cookie);
            // }

        // verify connect.sid
            const rawCookieSessionId = req.cookies["connect.sid"];
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookie connect.sid:-              `,rawCookieSessionId);}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️req.headers.cookie:-`,req.headers.cookie);}
            const cookieSid = (req.cookies["connect.sid"] || "").replace(/^s:/, "");
            const headerSid_raw = (req.headers.cookie || "").match(/connect\.sid=s%3A([^;]+)/)?.[1];
            const headerSid_decoded = headerSid_raw ? decodeURIComponent(headerSid_raw) : "🔴...could not decode [headerSid_raw]";
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️cookieSid:-`,cookieSid);}
                if(consoleLog===true){console.log(`🪣 ${trace()}🔒 ⁉️headerSid_decoded:-`,headerSid_decoded);}
            if (cookieSid !== headerSid_decoded) {
                console.warn(`🪣 ${trace()}🔒⚠️Session ID mismatch detected, cookieSid != headersSid:-\n🪣 ${cookieSid} v \n🪣 ${headerSid_decoded}`);
                console.warn(`🪣 ${trace()}🔒⚠️Session ID mismatch detected for ${req.url}`);
                if (!safeURLs.includes(req.url)) {
                    const allowedRouters = ["/dbRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/", "/googleAPIsRouter/"];
                    if (allowedRouters.some(prefix => req.url.startsWith(prefix))) {
                        // console.log("Request is allowed");
                        console.warn(`🪣 ${trace()}🔒⚠️🟢 Access allowed to router:- ${req.url}`);
                    } else {
                        // console.log("Access denied");
                        console.warn(`🪣 ${trace()}🔒⚠️🔴 Access denied due to session inconsistency:- ${req.url}`);
// console.log(trace(),"Cookie SID:", req.cookies.sid);
// console.log(trace(),"Headers SID:", req.headers["sid"]);
// console.log(trace(),"Session ID:", req.sessionID);
                        return res.status(403).send({message:"Access denied due to session inconsistency.",status:false});
                    }
                }else{
                    console.warn(`🪣 ${trace()}🔒⚠️🟢 Access allowed to safe path:- ${req.url}`);
                }
            }

        // check expiry
            // console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session\n`,req.session);
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.cookie.expires:- `,new Date(req.session.cookie.expires).toLocaleString());
        
        // authentication
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.session.securityCode.code:- `,req.session.securityCode? req.session.securityCode.code : "...not yet issued.");
            console.log(`🪣 ${trace()}🔒✅ Authenticating....req.cookies.securityCode:- `,req.cookies.securityCode? req.cookies.securityCode : "...not yet received.");
            console.log(`🪣 ${trace()}🔒✅ Authenticating user...`);
            if (req.session.user && req.session.user.authenticated) { // the value stored at authenticated is either true or false
                // console.log(`🪣 ${trace()}🔒✅ authenticating user...`);
                // if (req.session.securityCode.code === req.cookies.securityCode) {
                    console.log(`🪣 ${trace()}🔒✅ User authentication successful!`);
                    return next();
                // } else {
                //     console.log(`🪣 ${trace()}🔒🔴 Security code mismatch — authentication failed!`,req.session.securityCode.code,req.cookies.securityCode);
                //     // res.status(401).send("Unauthorized");
                //     res.send({message:`Access denied.`,status:false});
                //     res.end();
                // }
            } else {
                console.log(`🪣 ${trace()}🔒🔴 Missing user details — authentication denied!`);
                // console.log(`🪣 ${trace()}🔒🔴 req.headers.cookie:-`,req.headers.cookie);
                // res.status(401).send("Unauthorized");
                res.send({message:`Missing user details — authentication denied!`,status:false});
                res.end();
            }
        console.log(("🔒").repeat(60));
    });
    console.log(`${trace()}🔒✅ Authentication setup END.`);
//    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪    🚪
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 5️⃣ MOUNT EXTERNAL ROUTERS
        // function mountRouters() {
            try{
                app.use("/dbRouter", dbRouter);
                app.use("/loginRouter", loginRouter);
                app.use("/globalRouter", globalRouter);
                app.use("/projectRouter", projectRouter);
                app.use("/sessionsRouter", sessionsRouter);
                app.use("/googleAPIsRouter", googleAPIsRouter);
                console.log(`${trace()}🟢 Routers mounted - must be done after Authentication is setup.`);
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
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
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
            // next(); // Proceed to the next middleware or route handler

        // REQuest summary
            const myDate = new Date();
            console.log(`🪣 ${trace("")}\n🪣     DATE:   ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}\n🪣     METHOD: ${req.method}\n🪣     URL:   ${req.url}`);

        // REQuest credentials received
            // req.headers.cookie? console.log(`🪣 ${trace()}🟢 REQuest credentials received [req.headers.cookie]: ${true}`) : console.log(`🪣 ${trace()}🔴 REQuest credentials received [req.headers.cookie]: ${false}`);
            console.log(`🪣 ${trace()}📫 REQuest headers received:`, req.headers? true : false);
            console.log(`🪣 ${trace()}📫 Cookie in REQuest headers:`, req.headers.cookie? true : false);
            console.log(`🪣 ${trace()}📫 Session in REQuest:`, req.session? true : false);
            console.log(`🪣 ${trace()}📫 Cookie in REQuest session:`, req.session.cookie? true : false);
            if(req.session && req.headers.cookie){
                console.log(`🪣 ${trace()}📫 🟢 Credentials received.`,JSON.stringify(req.session,null,2),JSON.stringify(req.headers,null,2));
            }else{
                console.log(`🪣 ${trace()}📫 🔴 Credentials NOT received. ${JSON.stringify(req.session,null,2)} != ${JSON.stringify(req.headers,null,2)}`);
            }

        // set session creation timestamp
            // console.log(`🪣 Session object before try/catch:`, req.session);
            // console.log("🪣 Before try/catch—this should appear!");
            try{
                if (!req.session.createdAt) {
                    req.session.createdAt = Date.now(); // Store creation timestamp
                    console.log(`🪣 ${trace()}📫 Session create time set to:`, req.session.createdAt);
                }
            } catch (error) {
                console.log(`🪣 ${trace()}📫🔴 Session create time could not be set:`, error);
            }
            // Extract session ID from cookie
            const rawSessionId = req.cookies["connect.sid"]; 
            console.log(`🪣 ${trace()}📫 cookie connect.sid:- `,rawSessionId);
            const createdAtMilliseconds = req.session.createdAt;
            console.log(`🪣 ${trace()}📫 req.session.createdAt:-`,new Date(createdAtMilliseconds).toLocaleDateString(),new Date(createdAtMilliseconds).toLocaleTimeString());

        next();

    });
// 🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣🪣
if(consoleLog===true){console.log(("<>").repeat(60));}
if(consoleLog===true){console.log(trace());}
if(consoleLog===true){console.log(("<>").repeat(60));}
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.get("/session-check", (req, res) => {
if (req.session) {
    console.log(`🪣 ${trace()}🔒🟢 req.session:-\n`,req.session);
    // update session with authenticated user details
    req.session.user = {
        id: req.cookies["connect.sid"],
        name: "guest",
        email: "",
        authenticated: false
    };
    // ensure session is saved
    req.session.save(err => {
        if (err) {
            console.error(`${trace()}🔒🔴 Failed to save session:`, err);
            res.json({ sessionExists: true, sessionUpdated: false });
        } else {
            console.log(`${trace()}🔒🟢 Session saved successfully.${JSON.stringify(req.session,null,2)}`);
            res.json({ sessionExists: true, sessionUpdated: true });
        }
    });
} else {
    console.log(`🪣 ${trace()}🔒🔴 req.session:-\n`,req.session);
    res.json({ sessionExists: false });
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
    let myDate;
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
// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
// 7️⃣ start server
    // Start the server
        const PORT = process.env.APP_PORT;
        const DEV_IP_ADDRESS = process.env.APP_DEV_IP_ADDRESS;
        app.listen(PORT,'0.0.0.0', () => {
            console.log(("🎾").repeat(60));
            // console.log(`${trace()}\nServer is running on port:${PORT}\nAccessible on the server at either http://localhost:${PORT} or http://${DEV_IP_ADDRESS}:${PORT}.\nAccessible on the LAN at http://${DEV_IP_ADDRESS}:${PORT}.`);
            console.log(`🎾 ${trace()}${(" ").repeat(118-(`🎾 ${trace()}`).length)}🎾\n🎾 Server is running on port:${PORT}.${(" ").repeat(118-(`🎾 Server is running on port:${PORT}.`).length)}🎾`);
            myDate = new Date();
            console.log(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(118-(`🎾 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🎾`);
            console.log(("🎾").repeat(60));
        });
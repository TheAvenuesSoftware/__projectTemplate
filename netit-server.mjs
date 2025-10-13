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

// export function trace(whoCalled="") {
//     try {
//         myDate = new Date();
//         const stack = new Error().stack;
//         const firstLine = stack.split('\n')[2].trim();

//         const R = firstLine.lastIndexOf(":");
//         const RR = firstLine.lastIndexOf(":",R-1);
//         const rowNumber = firstLine.slice(RR+1,R);
//         // console.log("rowNumber:-",rowNumber,);

//         const x = firstLine.lastIndexOf("/");
//         const y = firstLine.lastIndexOf("/",x - 1);
//         const fileName = firstLine.slice(y,RR);
//         // console.log("fileName:-",fileName);

//         const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
//         // return `▶️${whoCalled? whoCalled : ""} ${fileName_rowNumber_position} ▶️`;

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
    // EXPRESS
        import express from "express";
    // https
        import https from 'https'; // For making HTTPS requests
    // helmet
        import helmet from 'helmet'; // Set various HTTP headers for security
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
        
    function checkImports(){
        try{
            // console.log(trace(),"Imported axios:", axios ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported os:", os ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported fs:", fs ? "✅ " : "❌ Failed");
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
            console.log(trace(),"Imported dbRouter:", dbRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported loginRouter:", loginRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported globalRouter:", globalRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported projectRouter:", projectRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported sessionsRouter:", sessionsRouter ? "✅ " : "❌ Failed");
            console.log(trace(),"Imported googleAPIsRouter:", googleAPIsRouter ? "✅ " : "❌ Failed");
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
                console.log(envPath,"Exists?", fs.existsSync(envPath)); // Should be true
                if (fs.existsSync(envPath)) {
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
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${error}`);
            }
        // projectServer.env
            try{
                const envPath = "./config/projectServer.env";
                console.log(envPath,"Exists?", fs.existsSync(envPath)); // Should be true
                if (fs.existsSync(envPath)) {
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
                } else {
                    console.log(`${trace()}🔴 ERROR:- ${envPath} not found!`);
                }
            } catch (error) {
                console.log(`${trace()}🔴 ERROR:- ${error}`);
            }
// 2️⃣ setup environment variables END
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
                        origin: "https://ridesharedriver.com.au", // use just one, don't use ["https://ridesharedriver.com.au", "https://www.ridesharedriver.com.au"] 
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
        app.use(
            helmet.contentSecurityPolicy({
                useDefaults: true,
                directives: {
                    "default-src": [
                        "'self'"
                    ],
                    "script-src": [
                        "'self'",
                        // "'unsafe-inline'", // only if you're using inline scripts ❗❗❗REMOVE FOR PRODUCTION❗❗❗
                        "https://apis.google.com",
                        "https://accounts.google.com",
                        // wildcards must be at the subdomain level only START
                            // "https://*.gstatic.com", // wildcards must be at the subdomain level only
                            "https://gstatic.com", // or "https://maps.gstatic.com"
                        // wildcards must be at the subdomain level only END
                        "https://maps.googleapis.com"
                    ],
                    "style-src": [
                        "'self'",
                        // "'unsafe-inline'", // only if you're using inline styles ❗❗❗REMOVE FOR PRODUCTION❗❗❗
                        "https://fonts.googleapis.com",
                        // Hashes for Google places; Google maps START
                            "'sha256-cwZgAPm2CTAW2GLDlL0o2J5isI4Gr0wno+xO/MvtT3s='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-mmA4m52ZWPKWAzDvKQbF7Qhx9VHCZ2pcEdC0f9Xn/Po='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-pzRbDTkOofZpG91nLe+vEuUeKxXX9yPEAiFygDXB4h4='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-/VVOq+Ws/EiUxf2CU6tsqsHdOWqBgHSgwBPqCTjYD3U='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-zZp8BI/LRCsExnI71KZA79vRfTQ/33qQr5GcSWAOwto='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-j69g0Z+HAbHBMIzQNFis9uADYR6LPo2LYlSo6DI4wy0='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-g/+r3r7IhgvloBqpNntHVylYT3vrqlLIZ5V0tTv7Cvg='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-IaM8xvcujDol1nAtq0BzSXIFdWOl+DiuhOV5dqL9STo='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-PNsPul0zQFUiYu9XLVKzTdD5Cz5ghp1MT4H5/zAeI3Q='", // this hash applies to "https://fonts.googleapis.com"
                            "'sha256-bSUb8oATdiRWGj6+osFexUukuqc+3yxgEYRAj67mELQ='", //this hash applies to "https://fonts.googleapis.com"
                            "'sha256-vNrevWaq6uKv3XSoEo/8TU13p1HYuC7oFmoCZ3zHhGM='"  // this hash is for iframe
                        // Hashes for Google places; Google maps END
                    ],
                    "font-src": [
                        "'self'",
                        "https://fonts.gstatic.com"
                    ],
                    "connect-src": [
                        "'self'",
                        "https://fonts.googleapis.com",
                        "https://fonts.gstatic.com",
                        "https://maps.googleapis.com",
                        "https://dns.google"
                    ],
                    "frame-src": [
                        "'self'",
                        "https://www.google.com", // for Google map in iframe
                    ],
                    "img-src": [
                        "'self'",
                        "data:",
                        "https:",
                        "https://maps.gstatic.com"
                    ],
                },
            })
        );
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
                                res.send({success: false, message: "Too many attempts.  Please wait 5 minutes."});
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
                            app.use("/dbRouter", limiter);
                            app.use("/loginRouter", limiter);
                            app.use("/globalRouter", limiter);
                            app.use("/projectRouter", limiter);
                            app.use("/sessionsRouter", limiter);
                            app.use("/googleAPIsRouter", limiter);
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
        app.use("/dbRouter", dbRouter);
        app.use("/loginRouter", loginRouter);
        app.use("/globalRouter", globalRouter);
        app.use("/projectRouter", projectRouter);
        app.use("/sessionsRouter", sessionsRouter);
        app.use("/googleAPIsRouter", googleAPIsRouter);
        console.log(trace()," ✅ /dbRouter");
        console.log(trace()," ✅ /loginRouter");
        console.log(trace()," ✅ /globalRouter");
        console.log(trace()," ✅ /projectRouter");
        console.log(trace()," ✅ /sessionsRouter");
        console.log(trace()," ✅ /googleAPIsRouter");
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
// 5️⃣ set guestToken and guestCookie START 🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪 
    app.post("/api/initGuest", (req, res) => {
        // T H I S   S H O U L D   B E   T H E   F I R S T   A P I
        console.log(`🥠 ${trace()} Deleting old cookies if they exist...`);
        const isProd = process.env.APP_SERVER_MODE_PRODUCTION?.toLowerCase() === "true";
        // Clear old cookies START 🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️
            res.clearCookie('guestToken', {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: isProd ? "strict" : "lax",
            });
            console.log(`🥠 🚮 ${trace()} 🥠 🚮 Cleared any existing guestToken.`);
            res.clearCookie('guestCookie', {
                path: "/",
                httpOnly: false,
                secure: true,
                sameSite: isProd ? "strict" : "lax",
            });
            console.log(`🥠 🚮 ${trace()} 🥠 🚮 Cleared any existing guestCookie.`);
        // Clear old cookies END   🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️🚮🗑️
        // ---- Set new guestToken cookie START 🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
            const guestTokenId = `guestToken__${Date.now()}__${randomUUID()}`;
            const maxAgeSeconds = 60 * 60;
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
                    expiresIn: '1h', // will set exp automatically.  iat is always set automatically.
                    jwtid: guestTokenId // a single user can have many tokens, so this is different to a userId.
                }
            );
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
            console.log(`🪙 ${trace()} 🪙 Guest JWT tokenPayload:-\n${JSON.stringify(jwt.verify(tokenPayload,JWT_SECRET_KEY))}`);
        // ---- Set new guestToken cookie END  🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙🪙
        // ---- Set new guestCookie START 🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
            const guestCookieId = randomUUID();
            const exp = Date.now() + (maxAgeSeconds * 1000);
            const cookiePayload = JSON.stringify({ guest: true, guestCookieId, exp });
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
                httpOnly: isProd,
                secure: isProd,
                sameSite: isProd ? "strict" : "lax",
                maxAge: maxAgeSeconds * 1000
            });
            console.log(`🍪 ${trace()} Guest cookie cookiePayload:-\n${cookiePayload}`);
        // ---- Set new guestCookie END  🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
        res.status(204).end(); // This satisfies the browser, resolves the Promise, and avoids errors — while keeping the payload zero.
    });
// 5️⃣ set guestToken and guestCookie END  🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪🪙🍪
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 6️⃣ log each REQuest START
    console.log((`🚀  L O G   A L L   R E Q U E S T S`));
    // Middleware to log each request
        app.use((req, res, next) => {
            const now = new Date();
            const localISO = now.toLocaleString('en-AU', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZoneName: 'short'
            });
            console.log(`🪵 ${trace()} 🪵🪵🪵 LOG date/time (local): ${now.toLocaleString()} | (ISO): ${localISO}`);
            function toLocalISOString(date = new Date()) {
                const pad = n => n.toString().padStart(2, '0');
                const yyyy = date.getFullYear();
                const mm = pad(date.getMonth() + 1);
                const dd = pad(date.getDate());
                const hh = pad(date.getHours());
                const min = pad(date.getMinutes());
                const ss = pad(date.getSeconds());

                return `${yyyy}-${mm}-${dd}, ${hh}:${min}:${ss}`;
            }
            console.log(`🪵 ${trace()} 🪵🪵🪵 LOG date/time (local): ${now.toLocaleString()} | (ISO): ${toLocalISOString()}`);
            const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
            console.log(`🪵 ${trace()} 🪵 req.method:      ${req.method}`);
            console.log(`🪵 ${trace()} 🪵 req.originalUrl: ${req.originalUrl}`);
            console.log(`🪵 ${trace()} 🪵 req.url:         ${req.url}`);
            console.log(`🪵 ${trace()} 🪵 Origin IP:                            ${req.ip}`);
            console.log(`🪵 ${trace()} 🪵 Origin req.headers['x-forwarded-for'] ${ip}`);
            console.log(`🪵 ${trace()} 🪵 User-Agent: ${req.headers['user-agent']}`);
            const authHeader = req.headers['authorization'];
            // JWT decode START
                let jwtPayload = null;
                let jwtLog = null;
                const guestToken = req.cookies?.guestToken;
                if (guestToken) {
                    try {
                        jwtPayload = jwt.decode(guestToken); // decode without verifying
                        const issuedAtDate = new Date(jwtPayload.iat * 1000);
                        const expiresAtDate = new Date(jwtPayload.exp * 1000);
                        console.log(`🪵 ${trace()} 🪙 JWT guest?:${jwtPayload.guest}`);
                        console.log(`🪵 ${trace()} 🪙 JWT guest id:${jwtPayload.guestTokenId}`);
                        console.log(`🪵 ${trace()} 🪙 JWT iat:${issuedAtDate.toLocaleString()}`);
                        console.log(`🪵 ${trace()} 🪙 JWT exp:${expiresAtDate.toLocaleString()}`);
                    } catch (err) {
                        console.warn(`❌ Failed to decode guest JWT:`, err.message);
                    }
                }
            // JWT decode END
            // guestCookie decode START
                let guestCookiePayload = null;
                let guestCookieLog = null;
                const guestCookie = req.cookies?.guestCookie;
                if (guestCookie) {
                    try {
                        guestCookiePayload = JSON.parse(guestCookie); // parse the JSON string
                        const issuedAtDate = new Date(guestCookiePayload.iat);
                        const expiresAtDate = new Date(guestCookiePayload.exp);
                        // guestCookieLog = `🪵 Cookie guest?:${guestCookiePayload.guest}\n🪵 Cookie exp:${expiresAtDate.toLocaleString()}`;
                        console.log(`🪵 ${trace()} 🍪 Cookie guest?:${guestCookiePayload.guest}`);
                        console.log(`🪵 ${trace()} 🍪 Cookie guest id?:${guestCookiePayload.guestCookieId}`);
                        console.log(`🪵 ${trace()} 🍪 Cookie guest iat:${expiresAtDate.toLocaleString()}`);
                        console.log(`🪵 ${trace()} 🍪 Cookie guest exp:${expiresAtDate.toLocaleString()}`);
                    } catch (err) {
                        console.warn(`❌ Failed to parse guestCookie:`, err.message);
                        }
                    }
            // guestCookie decode END
            setTimeout(()=>{
                // logREQuest(req);
                console.log(`🪵 ${trace()} ✒️✒️✒️ ⏰ 1 second delay before writing to logFile.`);
            },1000);
            next();
        });
// 6️⃣ log each REQuest END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 7️⃣ authenticate users START
    console.log((`🚀  A U T H E N T I C A T E   U S E R S`));
    // Middleware to authenticate users based on JWT token in cookies
        app.use((req, res, next) => {
            // safeURLs START
                console.log((`🚀   C H E C K   k n o w n U R L s . j s o n`));
                const safeURLs = JSON.parse(fs.readFileSync("knownURLs.json", "utf8")).safe_URLs;
                if (!safeURLs.includes(req.url)) {
                    const allowedRouters = ["/tinymce/", "/dbRouter/", "/projectRouter/", "/globalRouter/", "/loginRouter/", "/sessionsRouter/", "/googleAPIsRouter/"];
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
                console.log((`🚀   A U T H E N T I C A T E   U S E R S   ~   J W T`));
                if (!safeURLs.includes(req.url)) {
                    const token = req.cookies.guestToken;
                    if (!token) {
                        console.log(`🔒 ${trace()} 🔒🔒🔒 No token provided. Access denied to ${req.path}`);
                        return res.status(401).json({ message: 'Access denied. No token provided.' });
                    }
                    try {
                        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                        req.user = decoded;
                        console.log(`🔓 ${trace()} 🔓🔓🔓 Token verified. User authenticated for ${req.path}`);
                        next();
                    } catch (error) {
                        console.log(`🔒 ${trace()} 🔒🔒🔒 Invalid token. Access denied to ${req.path}`, error);
                        return res.status(400).json({ message: 'Invalid token.' });
                    }
                }else{
                    console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                }
            // JWT authentication END
            // COOKIE authenticate START
                console.log((`🚀   A U T H E N T I C A T E   U S E R S   ~   C O O K I E`));
                if (!safeURLs.includes(req.url)) {
                    const guestCookie = req.cookies.guestCookie;
                    if (!guestCookie) {
                        console.log(`🔒 ${trace()} 🔒🔒🔒 No cookie provided. Access denied to ${req.path}`);
                        return res.status(401).json({ message: 'Access denied. No cookie provided.' });
                    }
                    try {
                        // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
                        // req.user = decoded;
                        console.log(`🔓 ${trace()} 🔓🔓🔓 Cookie verified. User authenticated for ${req.path}`);
                        next();
                    } catch (error) {
                        console.log(`🔒 ${trace()} 🔒🔒🔒 Invalid cookie. Access denied to ${req.path}`, error);
                        return res.status(400).json({ message: 'Invalid cookie.' });
                    }
                }else{
                    console.log(`🪣 ${trace()}🔑✅🟢 Access allowed to safe path:- ${req.url}`);
                }
            // COOKIE authenticate END
        });
// 7️⃣ authenticate users END
// ➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕➕
// 7️⃣ start server START
    function logServerStartup(){
        console.log(("🚗").repeat(45));
        console.log(`🚗 S T A R T   S E R V E R${(" ").repeat(88-("🚗 S T A R T   S E R V E R").length)}🚗`);
        // console.log(`🚗 SERVER MODE = production: ${isProduction}.${(" ").repeat(88-("🚗 SERVER MODE = production: false.").length)}🚗`);
        // console.log(`🚗 SERVER MODE = development:${isDevelopment}.${(" ").repeat(88-("🚗 SERVER MODE = production: true.").length)}🚗`);
        myDate = new Date();
        console.log(`🚗 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}${(" ").repeat(88-(`🚗 ${myDate.toLocaleDateString()} ${myDate.toLocaleTimeString()}`).length)}🚗`);
        console.log(`🚗 Server is running on port:${PORT}.${(" ").repeat(88-(`🚗 Server is running on port:${PORT}.`).length)}🚗`);
        console.log(isProduction==="true" ?
            `🚗 Server is running in Production mode. ${(" ").repeat(88-(`🚗 Server is running in Production mode. `).length)}🚗` : 
            `🚗 Server is running in Development mode. ${(" ").repeat(88-(`🚗 Server is running in Development mode. `).length)}🚗`);
        // console.log(`🚗 Server is running on port # ${process.env.APP_PORT}${(" ").repeat(118-(`🚗 Server is running on port # ${process.env.APP_PORT}`).length)}🚗`);
        console.log(`🚗 Server data folder is:${dataFolder}.${(" ").repeat(88-(`🚗 Server data folder is:${dataFolder}.`).length)}🚗`);
        console.log(`🚗 Server root folder is:${__dirname}.${(" ").repeat(88-(`🚗 Server root folder is:${__dirname}.`).length)}🚗`);
        console.log(("🚗").repeat(45));
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
                    key: fs.readFileSync("serverGITignore.key"),
                    cert: fs.readFileSync("serverGITignore.cert")
                };
                console.log(`${trace()}🔍 Production mode options key:- `, options.key.slice(0,15));
                console.log(`${trace()}🔍 Production mode options cert:-`, options.cert.slice(0,15));
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
// 7️⃣ start server END
// 🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫🛑⛔🚫
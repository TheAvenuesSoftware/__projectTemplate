console.log("LOADED:- globalServer.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export function trace(whoCalled="") {
    try {
        const myDate = new Date();
        const stack = new Error().stack;
        const firstLine = stack.split('\n')[2].trim();

        const R = firstLine.lastIndexOf(":");
        const RR = firstLine.lastIndexOf(":",R-1);
        const rowNumber = firstLine.slice(RR+1,R);
        // console.log("rowNumber:-",rowNumber,);

        const x = firstLine.lastIndexOf("/");
        const y = firstLine.lastIndexOf("/",x - 1);
        const fileName = firstLine.slice(y,RR);
        // console.log("fileName:-",fileName);

        const fileName_rowNumber_position = firstLine.slice(y + 1,firstLine.length);
        // return `▶️${whoCalled? whoCalled : ""} ${fileName_rowNumber_position} ▶️`;

        return `▶️${whoCalled? whoCalled : ""} ${fileName} ${rowNumber} ▶️[${myDate.toLocaleTimeString().replace(" ","")}]▶️`;
    } catch (error) {
        return '▶️🔴 Trace: NOT AVAILABLE▶️',error;
    }
};

export function maskString(str,firstX,lastX) {
    if (!str) return "null";
    // Shows only the first 6 and last 6 characters
        return `${str.substring(0, firstX)}...${str.slice(-lastX)}`;
}

export function dataFilePathName(emailAddress){
    const filePrefix = process.env.DATA_FILE_PREFIX
        ? process.env.DATA_FILE_PREFIX.endsWith('_')
        ? process.env.DATA_FILE_PREFIX
        : `${process.env.DATA_FILE_PREFIX}_`
        : '';
    const fileSuffix = process.env.DATA_FILE_SUFFIX
        ? process.env.DATA_FILE_SUFFIX.startsWith('_')
        ? process.env.DATA_FILE_SUFFIX
        : `_${process.env.DATA_FILE_SUFFIX}`
        : '';
    const fileExtension = process.env.DATA_FILE_EXTENSION
        ? process.env.DATA_FILE_EXTENSION.startsWith('.')
        ? process.env.DATA_FILE_EXTENSION
        : `.${process.env.DATA_FILE_EXTENSION}`
        : '';
    return {filePath: process.env.APP_PATH_TO_DATA, fileName: `${filePrefix}${emailAddress}${fileSuffix}${fileExtension}`};
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
    import { Router } from "express";
    const globalRouter = Router();
    import nodemailer from 'nodemailer';
    import * as fsCore from 'fs';
    import * as fsPromises from 'fs/promises';
    import path from 'path';
    import { join } from 'node:path';
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// ===========================================================================================================================

// check if JSONstring is valid
    export function isValidJSONString(data) {
        if (typeof data !== 'string') return false;
        try {
            JSON.parse(data);
            return true;
        } catch {
            return false;
        }
    }

// nodemailer sendMail START
    export async function sendMail(from="",to="",subject="",html="",text=""){
        console.log(`${trace()}from:- ${from}`);
        console.log(`${trace()}to:-${to}`);
        console.log(`${trace()}subject:- ${subject}`);
        // console.log(`${trace()}html:- ${html}`);
        console.log(trace(),'Login Email HTML:',maskString(html,100,100).replace(/\s+/g, ' ').trim());
        console.log(`${trace()}Login email generated for ${to}`);
        console.log(`${trace()}${text.replace(/\s+/g, ' ').trim()}`);
        // console.log(`${trace()}\nfrom:- ${from}\nto:-${to}\nsubject:- ${subject}\nhtml:- ${html.replace(" ","")}\ntext:- ${text}\n`);}
        // data validation START
                if ([from, to, subject, html, text].some(val => !val)) {
                    console.error(trace(),`🔴 Something went wrong. Missing or undefined values`);
                    return false;
                }
                if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
                    console.error(trace(),`🔴 SMTP credentials are missing`);
                    return false;
                }
        // // data validation END
        // Create a transporter object using SMTP transport START
            const transporter = await nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                // secure settings
                // non-secure settings
                    port: 587,
                    secure: false, // true for 465, false for other ports
                        // // secure settings
                        //     port: 465,
                        //     secure: true, // uses SSL
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                },
                tls: {
                    // rejectUnauthorized: false // set to true for better security
                    rejectUnauthorized: true // set to true for better security
                }
            });
            // 🔴🔴🔴 KEEP PRIVATE 🔴🔴🔴 
                // console.log(`log(trace()\nSMTP_HOST:- ${process.env.SMTP_HOST}\nSMTP_USER:- ${process.env.SMTP_USER}\nSMTP_PASS:- ${process.env.SMTP_PASS}\n`);}
            // 🔴🔴🔴 KEEP PRIVATE 🔴🔴🔴 
        // Create a transporter object using SMTP transport END
        // send mail START
            try {
                const mailOptions = {
                    from: from,
                    to: to,
                    subject: subject,
                    html: html,
                    text: text
                }
                const info = await transporter.sendMail(mailOptions)
                console.log(`${trace()}🟢 Nodemailer info.response:- ${info.response}`);
                console.log(`${trace()}🟢 Nodemailer success.`);
                return true;
            } catch (error) {
                console.error(trace(),'🔴 Nodemailer error sending email:- ',error);
                return false;
            }
        // send mail END
    }
// nodemailer sendMail END

// convert image data to image file START
    // Required modules
        // import fs from 'fs'; // MUST BE DONE IN Node.mjs environment
        // import path from 'path'; // MUST BE DONE IN Node.mjs environment
    // API endpoint to receive image data
        export async function convertImageData(req, res){
            try {
                // Extract image data and filename from the request body
                    const { imageData, filename } = req.body;
                    if (!imageData || !filename) {
                        return res.status(400).json({ error: 'Image data and filename are required' });
                    }
                // Decode base64 image data
                    const buffer = Buffer.from(imageData, 'base64');
                // Specify the save path on the server
                    const savePath = path.join(__dirname, 'images', filename);
                // Write the image file to the server
                    await fsPromises.writeFile(savePath, buffer, (err) => {
                        if (err) {
                            console.error('Error saving the image:', err);
                            return res.status(500).json({ error: 'Failed to save the image' });
                        }
                        console.log(`Image saved successfully at ${savePath}`);
                        res.status(200).json({ message: 'Image uploaded successfully', path: savePath });
                    });
            } catch (error) {
                console.error('Error handling image upload:', error);
                res.status(500).json({ error: 'Server error' });
            }
        // convert image data to image file END
        }

globalRouter.post("/getGlobalFooter", (req, res) => {
    // console.log("globalRouter.get('/getGlobalFooter...");
    const moment = new Date();
    const myHtml = `
        <div class=global-footer-content>
            <p>&copy; ${moment.getFullYear()} The Avenues Software. All rights reserved.</p>
            <nav>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    `
    res.send(myHtml);
    // const myHtml = `<div>...footer</div>`;
    // res.send(myHtml);
});

// 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
    globalRouter.post("/getProjectFunctionsMap", (req, res) => {
        console.log(`${trace()} globalRouter.post("/getProjectFunctionsMap") called.`);
        const projFunc = JSON.parse(fs.readFile("src/global_Client__projectFunctions.JSON", "utf8")).actions;
        console.log(`🪣 ${trace()} 📖 Project functions:-\n`,projFunc);
        res.send({message:`Project Functions Map retrieved successfully.`,actions:projFunc});
    });
//    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹    🔹


export default globalRouter;
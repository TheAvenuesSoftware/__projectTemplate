// project settings for the server - also see project.env
// 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚

console.log("LOADED:- projectConfig_Server.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  SERVER SIDE IMPORTS ONLY
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export function projectServerConfigMJSisLoaded(){
    return true;
}

// commented out 2025-10-07 START
    // // const sessionWarningDelay = (60 * 60 * 1000);
    // // const sessionExpiredDelay = (65 * 60 * 1000);
    export const serverConfigSettings = {
        SERVER_APP_NAME: "Tradie Photo", // used for emails to users
    //     SERVER_API_KEY: "your-key-here", // public key only!!!
    //     SERVER_BASE_URL: "http://192.168.1.117:3000",
    //     SERVER_DATES_ALLOW_FUTURE: false,
    //     SERVER_DATES_ALLOW_ANY_PAST: false,
    //     // SERVER_SESSION_WARNING_DELAY: sessionWarningDelay,
    //     // SERVER_SESSION_EXPIRED_DELAY: sessionExpiredDelay,
    };
    // console.log('Project server configuration variables, from projectServerConfig.mjs:-\n',serverConfigSettings);
    // console.log('Project server configuration variables, from projectServerConfig.mjs:- SERVER_APP_NAME\n',serverConfigSettings.SERVER_APP_NAME);
// commented out 2025-10-07 END

// loginEmailHtml
    export function loginEmailHtml(loginCode){
        const myDate = new Date();
        const myYear = myDate.getFullYear();
        const loginEmailHtml =  `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .container {
                                        width: 100%;
                                        max-width: 600px;
                                        margin: 0 auto;
                                        background-color: #ffffff;
                                        padding: 20px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .header {
                                        background-color:rgb(76, 102, 175);
                                        color: #ffffff;
                                        padding: 10px 0;
                                        text-align: center;
                                        font-size:2em;
                                    }
                                    .content {
                                        padding: 20px;
                                    }
                                    .footer {
                                        background-color: #f4f4f4;
                                        color: #888888;
                                        text-align: center;
                                        padding: 10px 0;
                                        font-size: 12px;
                                    }
                                    .button {
                                        display: inline-block;
                                        padding: 10px 20px;
                                        margin: 20px 0;
                                        background: linear-gradient(135deg, #4A90E2, #1440AF);
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 5px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <div class="header">
                                        <p>${serverConfigSettings.SERVER_APP_NAME} Access Code</p>
                                    </div>
                                    <div class="content">
                                        <p>Dear User,</p>
                                        <p><strong>${loginCode}</strong> is your access code.</p>
                                        <p>Use this code to access your ${serverConfigSettings.SERVER_APP_NAME} account.</p>
                                        <p style="color:red"><b>DELETE THIS EMAIL WHEN DONE. A code will be issued each time you log in.</b></p>
                                        <p>This method of sign-in is secure so long as your email account is secure, a password is not necessary.</p>
                                        <p>If you believe your email account is insecure or if you believe your emails are being intercepted, DO NOT use your ${serverConfigSettings.SERVER_APP_NAME} account untill your email account is secure.</p>
                                    </div>
                                    <div class="footer">
                                        <p>&copy; ${myYear} The Avenues Software. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>`;
                            return loginEmailHtml;
    }
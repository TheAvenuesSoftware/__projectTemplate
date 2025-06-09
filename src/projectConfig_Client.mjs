// project settings for the client
// 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚

const consoleLog = false

console.log("LOADED:- projectConfig_Client.mjs is loaded",new Date().toLocaleString());
export function projectClientConfigJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

const clientSessionWarningDelay = (60 * 60 * 1000);
const clientSessionExpiredDelay = (65 * 60 * 1000);
export const clientConfigSettings = {
    // CLIENT_APP_NAME: "Personal Expense Tracker",
    CLIENT_API_KEY: "your-key-here", // public key only!!!
    CLIENT_BASE_URL: "http://192.168.1.117:3000",
    CLIENT_DATES_ALLOW_FUTURE: false,
    CLIENT_DATES_ALLOW_ANY_PAST: false,
    CLIENT_SESSION_WARNING_DELAY: clientSessionWarningDelay,
    CLIENT_SESSION_EXPIRED_DELAY: clientSessionExpiredDelay,
    CLIENT_SESSION_HEARTBEAT_INTERVAL: 5, // minutes
    CLIENT_SESSION_IDLE_LOGOUT_AFTER: 20, // minutes
    CLIENT_SESSION_CREDENTIALS: "include"
        // # Valid Options for credentials
            // # - "include" → Sends cookies and authentication headers for both same-origin and cross-origin requests.
            // # - "same-origin" → Only sends credentials if the request is to the same origin.
            // # - "omit" → Does not send credentials at all (cookies and headers excluded).

}
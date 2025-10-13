// project settings for the client
// 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚

if(window.consoleLog===true){console.log("LOADED:- projectConfig_Client.mjs is loaded",new Date().toLocaleString());}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export function projectClientConfigJSisLoaded(){
    return true;
}

export const clientConfigSettings = {
    CLIENT_LOG_TO_CONSOLE: true,
    CLIENT_DATES_ALLOW_FUTURE: false,
    CLIENT_DATES_ALLOW_ANY_PAST: false,
    CLIENT_FETCH_CREDENTIALS: "include",
    CLIENT_NOT_SIGNED_IN_TEXT: "...not signed in"
        // # Valid Options for credentials
            // # - "include" → Sends cookies and authentication headers for both same-origin and cross-origin requests.
            // # - "same-origin" → Only sends credentials if the request is to the same origin.
            // # - "omit" → Does not send credentials at all (cookies and headers excluded).

}
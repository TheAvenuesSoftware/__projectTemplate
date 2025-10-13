window.consoleLog = false;
if(window.consoleLog===true){console.log('window.consoleLog setting is, log to the cobsole: ',window.consoleLog);}
window.consoleLogErros = true;
if(window.consoleLogErrors===true){console.log('window.consoleLogErrors setting is, log to the cobsole: ',window.consoleLogErrors);}

// global settings for the client
// 💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚💚

if(window.consoleLog===true){console.log("LOADED:- globalConfig_Client.mjs is loaded",new Date().toLocaleString());}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

export function globalClientConfigMJSisLoaded(){
    return true;
}
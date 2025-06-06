const consoleLog = true;

if(consoleLog===true){console.log("LOADED:- globalLoginClient.mjs is loaded",new Date().toLocaleString());}
export function globalLoginClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
//     // import * as globalClientMJS from './globalClient.mjs';
    import {universalFetchII} from './globalClient.mjs';
    import {sessionLogout} from './globalSessionsClient.mjs';
    import {clientConfigSettings} from "./projectConfig_Client.mjs";
    import {postLoginActions_clientSide} from "./projectClient.mjs";
    // ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

function login_stepOne(){
    // get email address
    // goto login_stepTwo(loginEmailAddress);
    const loginEmailAddress = document.getElementById("loginEmailAddress").value;
    window.sessionStorage.setItem("loginEmailAddress", loginEmailAddress);
    login_stepTwo(loginEmailAddress);
}
function login_stepTwo(loginEmailAddress){
    // verify email address format
        if(consoleLog===true){console.log(`isValidEmailFormat(${loginEmailAddress})`);}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmailFormat = emailRegex.test(loginEmailAddress);
        // if true; goto stepThree
        // if false; display error; cancel login process
        if(validEmailFormat===true){
            login_stepThree(loginEmailAddress);
        }else{
            login_cancel("Invalid email format. Please try again.");
        }
}
async function login_stepThree(loginEmailAddress) {
    // verify mx domain for the email address
        if(consoleLog===true){console.log(`isDomainValid(${loginEmailAddress})`);}
            const domain = loginEmailAddress.split('@')[1];
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            const data = await response.json();
            if(consoleLog===true){console.log(data);}
            // return data.Answer && data.Answer.length > 0; // Checks if MX records exist
            if(consoleLog===true){console.log('data.Status:- ',data.Status);} // 0 (Success) or 3 (Name Error)
            if(consoleLog===true){console.log('data.Question:- ',data.Question);} // Checks if MX records exist, 15
            if(consoleLog===true){console.log('data.Question.type:- ',data.Question[0].type);} // Checks if MX records exist, 15
            if(consoleLog===true){console.log('data.Answer:- ',data.Answer);} //
            if(data.Status!=0){
                if(consoleLog===true){console.log('data.Status:- ',data.Status);}
                // return false;
                login_cancel("Domain does not exist. Please check the email address and try again.");
                return;
            }
            if(data.Question[0].type!=15){
                // return false;
                // login_cancel("Domain does not have MX records. Please check the email address and try again.");
                login_cancel("Domain does not support email. Please check the email address and try again.");
                return;
            }
            if(typeof data.Answer === "undefined"){
                // return false;
                // login_cancel("Domain does not have MX records. Please check the email address and try again.");
                login_cancel("Domain does not support email. Please check the email address and try again.");
                return;
            }else{
                // return true;
                login_stepFour(loginEmailAddress);
                return;
            }
            // Common Response Keys
                // | Key        | Example Value                 | Explanation | 
                // | Status     | 0 (Success) or 3 (Name Error) | Indicates the result of the query. 0 means success, 3 means the domain doesn't exist. | 
                // | TC         | false                         | Stands for "Truncated". If true, the response was too large and got cut off. | 
                // | RD         | true                          | "Recursion Desired". If true, the server tried to resolve the query recursively. | 
                // | RA         | true                          | "Recursion Available". If true, the server supports recursive queries. | 
                // | AD         | false                         | "Authenticated Data". If true, the response is verified as secure. | 
                // | CD         | false                         | "Checking Disabled". If true, DNSSEC validation was skipped. | 
                // | Question   | [{"name": "example.com", "type": 1}]                                      | Contains the domain name and query type (e.g., 1 for A records, 15 for MX records). | 
                // | Answer     | [{"name": "example.com", "type": 1, "TTL": 300, "data": "93.184.216.34"}] | The actual DNS response, including the resolved IP address or MX records. | 
                // | Authority  | [...] | Lists authoritative name servers for the domain. | 
                // | Additional | [...] | Provides extra information, such as related DNS records. | 
        } catch {
            // return false;
            // login_cancel("Error fetching DNS records. Please check your internet connection or try again later.");
            login_cancel("Error fetching email domain records. Please check your internet connection or try again later.");
            return;
        }
    // if true; goto stepFour(loginEmailAddress);
    // if false; display error; goto stepOne
}
async function login_stepFour(loginEmailAddress){
    // check if account exists for the loginEmailAddress: look for file named "<loginEmailAddress>.db"
    // set boolean for variable accountExists: true = account exists, false = account does not exist
    // goto login_stepFive(loginEmailAddress, accountExists);
    const fetchUrl = `/loginRouter/fileExists`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body: JSON.stringify({          // Converts object to JSON for request
                filePath:"./db/",
                fileName:loginEmailAddress + ".db"
            })
        }
    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const jso = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(`fileExists?:- `,jso);} // Logs correctly? Great!
            if(jso.fileExists===true){
                window.sessionStorage.setItem("accountExists",true);
                login_stepFive(loginEmailAddress, true); // Account exists
            }else{
                window.sessionStorage.setItem("accountExists",false);
                login_stepFive(loginEmailAddress, false); // Account does not exist
            }
    } catch (error) {
        console.error("Error fetching /loginRouter/fileExists:",error.message);
        login_cancel("Error checking if account exists. Please try again later.");
    }
}
function login_stepFive(loginEmailAddress, accountExists){
    // if account exists,   set boolean for variable "createNewAccount": false = do not create new account, goto stepSix
    // else ask user if they wish to create a new account,
        // if yes,              set boolean for variable "createNewAccount": true = create new account, goto stepSix
        // if no,               cancel login process
    if(accountExists===true){
        const createNewAccount = false; // Account exists === true; createNewAccount === false
        window.sessionStorage.setItem("createNewAccount",false);
        login_stepSix(loginEmailAddress, accountExists, createNewAccount); // Account exists === true; createNewAccount === false 
        // document.querySelectorAll('.login-page').forEach(el => {
        //     const classList = el.classList;
        //     if (classList.contains('page7')) {
        //     }else{
        //         el.style.transition = "opacity 0.5s";
        //         el.style.opacity = "0";
        //         setTimeout(() => el.remove(), 500);
        //     }
        // }); 
    }else{
        // window.sessionStorage.setItem("loginEmailAddress", loginEmailAddress);
        // window.sessionStorage.setItem("accountExists", false);
        document.querySelectorAll('.login-page').forEach(el => {
            const classList = el.classList;
            if (classList.contains('page5')) {
            }else{
                el.style.transition = "opacity 0.5s";
                el.style.opacity = "0";
                setTimeout(() => el.remove(), 500);
            }
        }); 
    }
}
async function login_stepSix(loginEmailAddress,accountExists, createNewAccount){
    // generate login code
    // regenerate the session
    // email code to loginEmailAddress
    const fetchUrl = `/loginRouter/emailCode`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body: JSON.stringify({          // Converts object to JSON for request
                loginEmailAddress:loginEmailAddress,
                createNewAccount:createNewAccount,
                filePath:"./db/",
                fileName:loginEmailAddress + ".db"
            })
        }
    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const jso = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(`emailCode:- `,jso);} // Logs correctly? Great!
            if(jso.loginCodeEmailed===true){
                login_stepSeven(loginEmailAddress, accountExists,createNewAccount,jso.loginCodeEmailed,jso.loginsDBinsertedID);
            }else{
                login_cancel(`Problem generating login code. ${jso.loginCodeEmailed}`);
            }
    } catch (error) {
        // console.error("Error fetching HTML from:",fetchUrl, error.message);
        console.error("Error sending email:",error.message);
        login_cancel(`${jso.loginCodeEmailed}`);
    }

}
async function login_stepSeven(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID){
    // if successful, ask user to submit loginCode
    // if unsuccessful, display error and goto stepOne
    // alert("working login_stepSeven");
    const fetchUrl = `/sessionsRouter/sessionRegen`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body: JSON.stringify({          // Converts object to JSON for request
                loginEmailAddress:loginEmailAddress
            })
        }
    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const jso = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(`sessionRegen:- `,jso);}
            if(jso.sessionRegenOK===true){
                // login_stepEight(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID);
                window.sessionStorage.setItem("loginsDBinsertedID", loginsDBinsertedID);
                document.querySelectorAll('.login-page').forEach(el => {
                    const classList = el.classList;
                    if (classList.contains('page7')) {
                    }else{
                        el.style.transition = "opacity 0.5s";
                        el.style.opacity = "0";
                        setTimeout(() => el.remove(), 500);
                    }
                }); 
            }else{
                login_cancel(`Problem generating login code. ${jso.sessionRegenOK}`);
            }
    } catch (error) {
        console.error("Error in sessionRegen:",error.message);
        login_cancel(`${jso.sessionRegenOK}`);
    }

}
async function login_stepEight(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID){
    // verify loginCodeInputValue
        // if successful, set boolean for variable "loginApproved": true = login approved, goto stepNine
        // if unsuccessful, display error and goto stepOne
    const fetchUrl = `/loginRouter/loginCodeSubmit`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body: JSON.stringify({          // Converts object to JSON for request
                loginEmailAddress:loginEmailAddress,
                accountExists:accountExists,
                createNewAccount:createNewAccount,
                loginCodeSubmit:document.getElementById("loginCode").value,
                loginsDBinsertedID:loginsDBinsertedID
            })
        }
    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const jso = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(`sessionRegen:- `,jso);}
            if(jso.loginApproved===true){
                alert("🟢 Secure login is successful.");
                // login_stepEight(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID);
            }else{
                alert("🔴 Secure login failed, incorrect login code submitted.");
                // login_cancel(`Problem generating login code. ${jso.sessionRegenOK}`);
            }
    } catch (error) {
        alert("🔴 Error checking login code submitted, please try again.");
        console.error("Error in sessionRegen:",error.message);
        login_cancel(`${jso.sessionRegenOK}`);
    }

}
function login_cancel(message=""){
    // cancel login process
    alert("Login process cancelled.\n" + message);
    document.querySelectorAll('.login-pages-container').forEach(el => {
        el.style.transition = "opacity 0.5s";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 500);
    });
}

// isLoginRequired
export async function isLoginRequired() {
    if(consoleLog===true){console.log('isLoginRequired()');}
    const fetchUrl = `/loginRouter/isLoginRequired`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body: JSON.stringify({          // Converts object to JSON for request
                a:"a",
            })
        }
    if(consoleLog===true){console.log(fetchUrl);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            const data = await response.json(); // Fetch JSON object
            if(consoleLog===true){console.log(`isLoginRequired():- `,data);} // Logs correctly? Great!
            // if(consoleLog===true){console.log(`isLoginRequi red():- `,data.message);} // Logs correctly? Great!
            if(data.message===true){
                // login_step1:- loginEmailAddressInputValue, createNewAccount, loginCodeEmailed, loginApproved
                login_step1();
            }
    } catch (error) {
        // console.error("Error fetching HTML from:",fetchUrl, error.message);
        console.error("Error fetching HTML from:",error.message);
    }
}
async function login_step4(loginEmailAddressInputValue,createNewAccount,loginCodeEmailed,loginCodeInputValue){
    alert("login_step4");
    if(consoleLog===true){console.log('login_step4(✅)');}
    try{
        const fetchUrl = "/loginRouter/login_step4";
        const fetchOptions = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',             // Prevents caching issues
                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                headers: {
                    'Content-Type': 'application/json',  // Sets content type
                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                },
                body: JSON.stringify({          // Converts object to JSON for request
                    loginEmailAddressInputValue:loginEmailAddressInputValue,
                    createNewAccount:createNewAccount,
                    loginCodeEmailed:loginCodeEmailed,
                    loginCodeInputValue:loginCodeInputValue
                })
            }
        if(consoleLog===true){console.log(JSON.stringify(fetchOptions,null,2));}
        // const data = await universalFetchII(fetchUrl,fetchOptions);
        const response = await fetch(fetchUrl,fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jso = await response.json(); // converts fetch response from JSON to a JSO
        console.log('🟢 Request Success:', jso);

        if(consoleLog===true){console.log(jso);}
        if(consoleLog===true){console.log(jso.message,jso.loginApproved);}

        if(jso.loginApproved===true){
            document.querySelectorAll('.overlay').forEach(el => {
                el.style.transition = "opacity 0.5s";
                el.style.opacity = "0";
                setTimeout(() => el.remove(), 500);
            });
            alert("🟢 Secure login is successful.");
            document.getElementById("sign-in-out-button").innerHTML = "Log Out";
            document.getElementById("sign-in-out-button").classList.add("sign-out-button");
            document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
            document.getElementById("user-email-address").textContent = loginEmailAddressInputValue;
            postLoginActions_clientSide();
        }else{
            document.querySelectorAll('.overlay').forEach(el => {
                el.style.transition = "opacity 0.5s";
                el.style.opacity = "0";
                setTimeout(() => el.remove(), 500);
            });
            alert("🔴 Secure login failed, please try again");
            document.getElementById("sign-in-out-button").innerHTML = "Log In";
            document.getElementById("sign-in-out-button").classList.add("sign-in-button");
            document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
        }
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
async function login_step3(loginEmailAddressInputValue,createNewAccount,loginCodeEmailed){
    alert("login_step3");
    if(consoleLog===true){console.log('login_step3(✅)');}
    if(consoleLog===true){console.log(loginEmailAddressInputValue,createNewAccount);}
    try{
        const fetchUrl = "/loginRouter/login_step3";
        const fetchOptions = {
                method: 'POST',                // Specifies a POST request
                mode: 'cors',                  // Ensures cross-origin requests are handled
                cache: 'no-cache',             // Prevents caching issues
                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                headers: {
                    'Content-Type': 'application/json',  // Sets content type for req.
                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                },
                body: JSON.stringify({          // Converts js object to JSON for request
                    loginEmailAddressInputValue:loginEmailAddressInputValue,
                    createNewAccount:createNewAccount
                })
            }
        if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
        const response = await fetch(fetchUrl,fetchOptions);
        const jso = await response.json(); // converts fetch response from JSON to a JSO
        console.log('🟢 Request Success:', jso);
        if(jso.loginCodeEmailed===true){
            alert(jso.loginEmailAddressInputValue,jso.loginCodeEmailed);
            login_step1(jso.loginEmailAddressInputValue,jso.createNewAccount,jso.loginCodeEmailed);
        }
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
async function login_step2(loginEmailAddressInputValue,createNewAccount){ // send loginEmailAddressInputValue to server; receive login code || create new user
    alert("login_step2");
    if(consoleLog===true){console.log('login_step2(✅)');}
    if(consoleLog===true){console.log(loginEmailAddressInputValue);}
    try{
        const fetchUrl = `/loginRouter/login_step2`;
        const fetchOptions = {
                method: 'POST',                // Specifies a POST request
                mode: 'cors',                  // Ensures cross-origin requests are handled
                cache: 'no-cache',             // Prevents caching issues
                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                headers: {
                    'Content-Type': 'application/json',  // Sets content type
                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                },
                body: JSON.stringify({          // Converts object to JSON for request
                    loginEmailAddressInputValue:loginEmailAddressInputValue,
                    createNewAccount:createNewAccount
                })
            }
        if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
        // const data = await universalFetchII(fetchUrl,fetchOptions);
        const response = await fetch(fetchUrl,fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jso = await response.json();
        console.log('🟢 Request Success:', jso);

        if(consoleLog===true){console.log(jso);}
        if(consoleLog===true){console.log(jso.message);}
        if(consoleLog===true){console.log(jso.createNewAccount);}
        if(consoleLog===true){console.log(jso.loginCodeEmailed);}
        login_step1(jso.loginEmailAddressInputValue,jso.createNewAccount);
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
// ⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨
function login_step1(
    loginEmailAddressInputValue="",
    createNewAccount=null,
    loginCodeEmailed=false,
    loginCodeInputValue="",
    loginApproved=false){

    if(consoleLog===true){console.log(`login_step1(✅ emailAddress: ${loginEmailAddressInputValue},createNewAccount:${createNewAccount},loginCodeEmailed:${loginCodeEmailed},loginApproved:${loginApproved})`);}

    document.querySelectorAll('.overlay').forEach(el => {
        el.style.transition = "opacity 0.5s";
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 500);
    });

    const overlay = document.createElement("div");
    const dialog = document.createElement("div");
    const emailAddressInput = document.createElement("input");
    const loginCodeInput = document.createElement("input");
    const submitButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const br1 = document.createElement("br");
    const br2 = document.createElement("br");
    const br3 = document.createElement("br");
    const br4 = document.createElement("br");
    const focusOnMe = document.createElement("input")

    focusOnMe.style.display = "none";
    br1.style.display = "none";
    br2.style.display = "none";

    // 
        overlay.id = "overlay";
        overlay.classList.add("login-overlay", "overlay");
    
    // 
        dialog.id = "dialog";
        dialog.classList.add("dialog");

    //
        p1.classList.add("normal-prompt");
        p1.innerHTML = "Please enter your login email address.";
        if(createNewAccount===true && loginCodeEmailed===false){
            p1.innerHTML = `No account exists for ${loginEmailAddressInputValue}<br>Create an account?`;
        }
        if(loginCodeEmailed===true){
            p1.innerHTML = `Please check your email account ${loginEmailAddressInputValue}<br>and enter the login code below.`;
        }

    // EMAIL ADDRESS INPUT ⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨
        emailAddressInput.id = "user-email-address";
        if(createNewAccount===true || loginCodeEmailed===true){
            if(consoleLog===true){console.log('createNewAccount:- ',createNewAccount,'loginCodeEmailed:- ',loginCodeEmailed);}
            emailAddressInput.value = loginEmailAddressInputValue;
            emailAddressInput.disabled = true;
            emailAddressInput.readOnly = true;
            emailAddressInput.style.background = "rgba(255,255,255,1)";
            setTimeout(() => {
                emailAddressInput.blur();
                focusOnMe.focus();
                focusOnMe.select();
            }, 100); // 50ms delay
        }

    // LOGIN CODE INPUT ⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨
        loginCodeInput.id = "user-login-code";
        loginCodeInput.style.display = "none";
        if(loginCodeEmailed===true){
            if(consoleLog===true){console.log('loginCodeEmailed:- ',loginCodeEmailed);}
            setTimeout(() => {
                loginCodeInput.style.display = "block";
                // br1.style.display = "block";
                // br2.style.display = "block";
                emailAddressInput.style.display = "none";
            }, 100); // 50ms delay
        }

    // Create login button
        submitButton.textContent = "Log-in";
        if(createNewAccount===true){
            submitButton.textContent = "Create account";
        }
        if(loginCodeEmailed===true){
            submitButton.textContent = "Submit code";
        }
        

    // Create cancel button
        cancelButton.textContent = "Cancel";

    // 
        p2.innerHTML = `&nbsp`;
        p2.classList.add("error-prompt");

    // Append elements together
        dialog.appendChild(p1);
        dialog.appendChild(emailAddressInput );
        dialog.appendChild(br1);
        dialog.appendChild(br2);
        dialog.appendChild(loginCodeInput);
        dialog.appendChild(br3);
        dialog.appendChild(submitButton);
        dialog.appendChild(cancelButton);
        // dialog.appendChild(br4);
        dialog.appendChild(p2);
        dialog.appendChild(focusOnMe);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        emailAddressInput.focus();
        emailAddressInput.select();

    // add event listeners
        // emailAddressInput
            emailAddressInput.addEventListener("focus", () => {
                setTimeout(() => {
                    // p2.innerHTML = "&nbsp";
                    p2.classList.add("fade-out");
                }, 500); // 500ms delay
                emailAddressInput.select();
                if(createNewAccount===true || loginCodeEmailed===true){
                    emailAddressInput.blur();
                    focusOnMe.focus();
                    focusOnMe.select();
                }
            });
        // SUBMIT BUTTON 🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️🖱️
            submitButton.addEventListener("mouseover", () => {
                submitButton.style.backgroundColor = "#0056b3";
            });
            submitButton.addEventListener("mouseout", () => {
                submitButton.style.backgroundColor = "#007bff";
            });
            submitButton.addEventListener("click", async () => {
                if(loginCodeInputValue.length > 0){
                    alert("loginCodeEmailed===true:- "+loginCodeEmailed);
                    setTimeout(() =>{
                        login_step4(emailAddressInput.value,createNewAccount,loginCodeEmailed,loginCodeInput.value); // submite login code for validation at server
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                if(createNewAccount != null){
                    alert("typeof createNewAccount===null:- "+createNewAccount);
                    setTimeout(() =>{
                        login_step3(emailAddressInput.value,createNewAccount,loginCodeEmailed); // generate login code and email to user
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                // if(createNewAccount===false){
                //     setTimeout(() =>{
                //         login_step3(emailAddressInput.value,createNewAccount,loginCodeEmailed); // generate login code and email to user
                //     },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                //     popupBusyAnimation();
                //     document.body.removeChild(overlay);
                //     return;
                // }
                // VALIDATE EMAIL ADDRESS { x = a + bx} { x = a + bx} { x = a + bx} { x = a + bx} { x = a + bx}
                    if(emailAddressInput.value.length > 0){
                        const validEmailFormat = await isValidEmailFormat(emailAddressInput.value);
                        if(validEmailFormat===true){
                            if(consoleLog===true){console.log('validEmailFormat:- ',validEmailFormat);}
                            const validDomain = await isDomainValid(emailAddressInput.value);
                            if(consoleLog===true){console.log('validDomain:- ',validDomain);}
                            if(validDomain===true){
                                if(consoleLog===true){console.log(`emailAddressInput.value: ${emailAddressInput.value}`);}
                                setTimeout(() =>{
                                    alert("login_step2");
                                    login_step2(emailAddressInput.value,createNewAccount); // send emailAddressInput to server; receive login code || create new user
                                },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                                popupBusyAnimation();
                                document.body.removeChild(overlay);
                                // document.querySelectorAll('.overlay').forEach(el => {
                                //     el.style.transition = "opacity 0.5s";
                                //     el.style.opacity = "0";
                                //     setTimeout(() => el.remove(), 500);
                                // });
                            }else{
                                p2.textContent = "Email domain is not valid.  Please try again.";
                                p2.classList.remove("fade-out");
                                p2.classList.add("fade-in");
                            }
                        }else{
                                p2.textContent = "Email address is not valid.  Please try again.";
                                p2.classList.remove("fade-out");
                                p2.classList.add("fade-in");
                        }
                    }else{
                        document.body.removeChild(overlay);
                    }
            });
        // cancelButton
            cancelButton.addEventListener("mouseover", () => {
                cancelButton.style.backgroundColor = "rgba(0, 86, 179, 1)";
            });    
            cancelButton.addEventListener("mouseout", () => {
                cancelButton.style.backgroundColor = "rgba(0, 123, 255, 1)";
            });    
            cancelButton.addEventListener("click", () => {
                document.body.removeChild(overlay);
            });
    
}

// popup busy animation
    function popupBusyAnimation(){

        const overlay= document.createElement("div");
        const animation = document.createElement("div");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        const span3 = document.createElement("span");

        overlay.id = "overlay";
        overlay.classList.add("busy-animation", "overlay");

        // animation.id = "busy-animation-container";
            animation.classList.add("container");

        span1.classList.add("dot");
        span2.classList.add("dot");
        span3.classList.add("dot");

        overlay.appendChild(animation);
        animation.appendChild(span1);
        animation.appendChild(span2);
        animation.appendChild(span3);
        // animation.appendChild(overlay);
            document.body.appendChild(overlay);

    }


    export function doAfterDOMandWindowLoad_globalLoginClient(){
        // 1️⃣🔹2️⃣ START // doAfterDOMandWindowLoad_globalLoginClient()
        // 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹

            if(consoleLog===true){console.log('doAfterDOMandWindowLoad_globalLoginClient() launched.',Date.now());}

            // if LOGIN REQUIRED
                isLoginRequired();
            // if LOGIN REQUIRED

            // signin-out button START
                document.getElementById("sign-in-out-button").addEventListener("click", (e) => {
                    console.log("sign-in-out-button clicked");
                    console.log(e.target.textContent);
                    if(e.target.textContent.toLowerCase()==="log in"){
                        login_step1();
                    }
                    if(e.target.textContent.toLowerCase()==="log out"){
                        sessionLogout();
                    }
                });
            // signin-out button START

            // displayLoginPage(loginPageNumber) START
                let loginPageNumber = 1; // initialise at 1
                const loginPageNumberMax = 7; // initialise at total number of pages
                document.querySelectorAll(".back-btn").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("BACK Button clicked:", this.textContent);
                        loginPageNumber += -1
                        if(loginPageNumber < 1){loginPageNumber = 1;}
                        console.log("loginPageNumber:- ",loginPageNumber);
                        const ee = document.querySelector(`.page${loginPageNumber}`);
                        // ee.classList.remove("flip-page");
                        ee.classList.remove("fade-in");
                        ee.classList.remove("fade-out");
                        ee.style.zIndex = 10; // show the previous page
                        // document.querySelector(`.page${loginPageNumber}`).classList.remove("flip-page");
                        // document.querySelector(`.page${loginPageNumber}`).classList.remove("flip-page");
                    });
                });
                document.querySelectorAll(".next-btn").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("NEXT Button clicked:", this.textContent);
                        loginPageNumber += 1
                        if(loginPageNumber > loginPageNumberMax){loginPageNumber = loginPageNumberMax;}
                        console.log("loginPageNumber:- ",loginPageNumber);
                        const ee = document.querySelector(`.page${loginPageNumber*1-1}`);
                        // ee.classList.add("flip-page");
                        ee.classList.add("fade-out");
                        ee.style.zIndex = -1; // hide the previous page
                        // document.querySelector(`.page${loginPageNumber-1}`).classList.add("flip-page");
                        // document.querySelector(`.page${loginPageNumber-1}`).classList.add("flip-page");
                    });
                });
            // displayLoginPage(loginPageNumber) END

            // login event listeners START
                document.querySelectorAll(".login-stepOne").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepOne Button clicked:", this.textContent);
                        login_stepOne();
                    });
                });
                document.querySelectorAll(".login-stepTwo").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepTwo Button clicked:", this.textContent);
                        login_stepTwo();
                    });
                });
                document.querySelectorAll(".login-stepThree").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepThree Button clicked:", this.textContent);
                        login_stepThree();
                    });
                });
                document.querySelectorAll(".login-stepFour").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepFour Button clicked:", this.textContent);
                        login_stepFour();
                    });
                });
                document.querySelectorAll(".login-stepFive").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepFive Button clicked:", this.textContent);
                        const createNewAccount = true; // createNewAccount === true;
                        window.sessionStorage.setItem("createNewAccount",true);
                        login_stepSix(
                            window.sessionStorage.getItem("loginEmailAddress"),
                            window.sessionStorage.getItem("accountExists"),
                            true // createNewAccount
                        );
                    });
                });
                document.querySelectorAll(".login-stepSix").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepSix Button clicked:", this.textContent);
                        login_stepSix();
                    });
                });
                document.querySelectorAll(".login-stepSeven").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-stepSeven Button clicked:", this.textContent);
                        // login_stepEight(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID);
                        login_stepEight(
                            window.sessionStorage.getItem("loginEmailAddress"),
                            window.sessionStorage.getItem("accountExists"),
                            window.sessionStorage.getItem("createNewAccount"),
                            document.getElementById("loginCode").value,
                            window.sessionStorage.getItem("loginsDBinsertedID")
                        );

                    });
                });
                document.querySelectorAll(".login-cancel").forEach(button => {
                    button.addEventListener("click", function() {
                        console.log("login-cancel Button clicked:", this.textContent);
                        login_cancel();
                    });
                });

        // 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
        // 1️⃣🔹2️⃣ END // doAfterDOMandWindowLoad_globalLoginClient()
    }

    
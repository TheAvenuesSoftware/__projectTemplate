const consoleLog = false;

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
    import {postLoginActions} from "./projectClient.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

        // document.addEventListener("DOMContentLoaded", () => {
        //     if(consoleLog===true){console.log('globalOoginClient DOMContentLoaded successsful.',Date.now());}
        //         window.addEventListener("load", () => { 
        //         if(consoleLog===true){console.log('globalOoginClient window load successsful.',Date.now());}
        //     });
        // });

            export function doAfterDOMandWindowLoad_globalLoginClient(){

                if(consoleLog===true){console.log('doAfterDOMandWindowLoad_globalLoginClient() launched.',Date.now());}

                isLoginRequired();

                document.getElementById("sign-in-out-button").addEventListener("click", (e) => {
                    console.log("sign-in-out-button clicked");
                    console.log(e.target.textContent);
                    if(e.target.textContent.toLowerCase()==="sign in"){
                        login_step1();
                    }
                    if(e.target.textContent.toLowerCase()==="sign out"){
                        sessionLogout();
                    }
                });
            }

// check email address
    function isValidEmailFormat(email) {
        if(consoleLog===true){console.log(`isValidEmailFormat(${email})`);}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
// check if email domain is valid
    async function isDomainValid(email) {
        if(consoleLog===true){console.log(`isDomainValid(${email})`);}
        // if (!isValidEmailFormat(email)) {
        //     console.error('Invalid email format.');
        //     return false;
        // }
        const domain = email.split('@')[1];
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
                return false;
            }
            if(data.Question[0].type!=15){return false;}
            if(typeof data.Answer === "undefined"){return false;}
            return true;
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
            return false;
        }
    }

// isLoginRequired
async function isLoginRequired() {
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
                // login_step1:- emailAddress, createNewAccount, userLoginCodeSent, loginApproved
                login_step1();
            }
    } catch (error) {
        // console.error("Error fetching HTML from:",fetchUrl, error.message);
        console.error("Error fetching HTML from:",error.message);
    }
}
async function login_step4(userEmailAddress,createNewAccount,userLoginCode){
    if(consoleLog===true){console.log('login_step4(✅)');}
    // const fetchUrl = `/loginRouter/login_step4`;
    // const fetchType = `POST`;
    // const fetchPayload = {userEmailAddress:userEmailAddress,createNewAccount:createNewAccount,userLoginCode:userLoginCode};
    // if(consoleLog===true){console.log(fetchPayload);}
    // if(consoleLog===true){console.log(JSON.stringify(fetchPayload));}
    // const data = await universalFetch(fetchUrl,fetchType,JSON.stringify(fetchPayload));
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
                    userEmailAddress:userEmailAddress,
                    createNewAccount: createNewAccount,
                    userLoginCode:userLoginCode
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
            document.getElementById("sign-in-out-button").innerHTML = "Sign Out";
            document.getElementById("sign-in-out-button").classList.add("sign-out-button");
            document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
            postLoginActions();
        }else{
            document.querySelectorAll('.overlay').forEach(el => {
                el.style.transition = "opacity 0.5s";
                el.style.opacity = "0";
                setTimeout(() => el.remove(), 500);
            });
            alert("🔴 Secure login failed, please try again");
            document.getElementById("sign-in-out-button").innerHTML = "Sign In";
            document.getElementById("sign-in-out-button").classList.add("sign-in-button");
            document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
        }
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
async function login_step3(userEmailAddress,createNewAccount=false){
    if(consoleLog===true){console.log('login_step3(✅)');}
    if(consoleLog===true){console.log(userEmailAddress,createNewAccount);}
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
                    userEmailAddress:userEmailAddress,
                    createNewAccount:createNewAccount
                })
            }
        if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
        const response = await fetch(fetchUrl,fetchOptions);
        // await fetch(fetchUrl,fetchOptions)
        // .then(response => response.text())
        // .then(data => console.log(data))
        // .catch(error => console.log(error));
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
// async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
//     console.log(url, options, retries, delay);
//     for (let attempt = 1; attempt <= retries; attempt++) {
//         let res;
//         try {
//             console.log(`🔹   fetch ${attempt} of ${retries} to url:-`, url);
//             const response = await fetch(url, options);
//             console.log(`🔹🔹  fetch ${attempt} of ${retries} response:-`, response);
//             // if (!response.ok) throw new Error(`🔶 Attempt ${attempt} failed`);
//             const jso = await response.json(); // converts fetch response from JSON to a JSO
//             console.log('🔹🔹🔹 fetch returns:-', jso);
//             clearTimeout(res);
//             return jso; // Success
//             // return response; // Success
//         } catch (error) {
//             // console.warn(`🔴 Fetch attempt ${attempt} failed: ${error.message}`);
//             console.log(`🔴 Fetch attempt ${attempt} failed: ${error.message}`);
//             if (attempt < retries) await new Promise(res => setTimeout(res, delay)); // Wait before retrying
//         }
//     }
//     throw new Error(`All ${retries} attempts failed`);
// }
// const response = await fetchWithRetry(fetchUrl,fetchOptions,3,1000);
        const jso = await response.json(); // converts fetch response from JSON to a JSO
        console.log('🟢 Request Success:', jso);
        if(jso.userLoginCodeSent===true){
            login_step1(userEmailAddress,false,jso.userLoginCodeSent,false);
        }
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
async function login_step2(userEmailAddress){ // send userEmailAddress to server; receive login code || create new user
    if(consoleLog===true){console.log('login_step2(✅)');}
    if(consoleLog===true){console.log(userEmailAddress);}
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
                    userEmailAddress:userEmailAddress
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
        login_step1(userEmailAddress,jso.createNewAccount,false,false);
    }
    catch (error) {
        console.error('🔴 Request Failed:', error);
        return null;
    }
}
// ⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨⌨
function login_step1(
    emailAddress="",
    createNewAccount=false,
    userLoginCodeSent=false,
    loginApproved=false){

    if(consoleLog===true){console.log(`login_step1(✅ emailAddress: ${emailAddress},createNewAccount:${createNewAccount},userLoginCodeSent:${userLoginCodeSent},loginApproved:${loginApproved})`);}

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
        if(createNewAccount===true){
            p1.innerHTML = `No account exists for ${emailAddress}<br>Create an account?`;
        }
        if(userLoginCodeSent===true){
            p1.innerHTML = `Please check your email account ${emailAddress}<br>and enter the login code below.`;
        }

    // 
        emailAddressInput.id = "user-email-address";
        if(createNewAccount===true || userLoginCodeSent===true){
            if(consoleLog===true){console.log('createNewAccount:- ',createNewAccount,'userLoginCodeSent:- ',userLoginCodeSent);}
            emailAddressInput.value = emailAddress;
            emailAddressInput.disabled = true;
            emailAddressInput.readOnly = true;
            emailAddressInput.style.background = "rgba(255,255,255,1)";
            setTimeout(() => {
                emailAddressInput.blur();
                focusOnMe.focus();
                focusOnMe.select();
            }, 100); // 50ms delay
        }

    // 
        loginCodeInput.id = "user-login-code";
        loginCodeInput.style.display = "none";
        if(userLoginCodeSent===true){
            if(consoleLog===true){console.log('userLoginCodeSent:- ',userLoginCodeSent);}
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
        if(userLoginCodeSent===true){
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
                if(createNewAccount===true || userLoginCodeSent===true){
                    emailAddressInput.blur();
                    focusOnMe.focus();
                    focusOnMe.select();
                }
            });
        // loginButton
            submitButton.addEventListener("mouseover", () => {
                submitButton.style.backgroundColor = "#0056b3";
            });    
            submitButton.addEventListener("mouseout", () => {
                submitButton.style.backgroundColor = "#007bff";
            });
            submitButton.addEventListener("click", async () => {
                if(createNewAccount===true){
                    setTimeout(() =>{
                        login_step3(emailAddressInput.value,createNewAccount); // generate login code and email to user
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                if(userLoginCodeSent===true){
                    setTimeout(() =>{
                        login_step4(emailAddressInput.value,createNewAccount,loginCodeInput.value); // submite login code for validation at server
                    },1000); // used in development to mimic delayed response from server, maybe not necessary in production
                    popupBusyAnimation();
                    document.body.removeChild(overlay);
                    return;
                }
                if(emailAddressInput.value.length > 0){
                    const validEmailFormat = await isValidEmailFormat(emailAddressInput.value);
                    if(validEmailFormat===true){
                        if(consoleLog===true){console.log('validEmailFormat:- ',validEmailFormat);}
                        const validDomain = await isDomainValid(emailAddressInput.value);
                        if(consoleLog===true){console.log('validDomain:- ',validDomain);}
                        if(validDomain===true){
                            if(consoleLog===true){console.log(`emailAddressInput.value: ${emailAddressInput.value}`);}
                            setTimeout(() =>{
                                login_step2(emailAddressInput.value); // send emailAddressInput to server; receive login code || create new user
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
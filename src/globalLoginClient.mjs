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

const popupHTML = 
    `<div id="popup-overlay" class="popup-overlay">
        <div id="popup-container" class="popup-container">
            <p id="popup-heading" class="popup-heading">This is a popup message.</p>
            <p id="popup-message" class="popup-message"></p>
            <input id="popup-input" class="popup-input" type="text" placeholder="Enter your input here...">
            <button id="popup-button-1" class="popup-button">Button 1</button>
            <button id="popup-button-2" class="popup-button">Button 2</button>
            <button id="popup-button-3" class="popup-button">Button 3</button>
            <p id="popup-error-message" class="popup-error-message"></p>
            <input id="popup-focus-select-nodisplay" style="display:none" type="text" placeholder="Focus Select No Display">
        </div>
    </div>`

const busyAnimationHTML = 
    `<div id="busy-animation-overlay" class="busy-animation-overlay">
        <div class="container">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>`

function login_stepOne(){
    // get email address
    // goto login_stepTwo(loginEmailAddress);
    // const loginEmailAddress = document.getElementById("loginEmailAddress").value;
    // window.sessionStorage.setItem("loginEmailAddress", loginEmailAddress);
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    document.getElementById("popup-heading").textContent = "Login";
    document.getElementById("popup-message").textContent = "Please enter your email address to log in.";
    document.getElementById("popup-input").value = "";
    document.getElementById("popup-input").placeholder = "Enter your email address here...";
    document.getElementById("popup-input").focus();
    document.getElementById("popup-input").select();
    document.getElementById("popup-button-1").textContent = "Submit.";
    document.getElementById("popup-button-2").textContent = "Cancel.";
    document.getElementById("popup-button-3").textContent = "";
    document.getElementById("popup-button-3").style.display = "none";
    document.getElementById("popup-error-message").innerHTML = "&nbsp";

    function popupButton1(){
        document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
        document.getElementById("popup-overlay").classList.add("fade-out");
        document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
        const loginEmailAddress = document.getElementById("popup-input").value;
        window.sessionStorage.setItem("loginEmailAddress", loginEmailAddress);
        login_stepTwo(loginEmailAddress);
    }
    document.getElementById("popup-button-1").addEventListener("click", popupButton1);

    function popupButton2(){
        document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
        document.getElementById("popup-overlay").remove();
    }
    document.getElementById("popup-button-2").addEventListener("click", popupButton2);

    function popupButton3(){
        document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
    }
    document.getElementById("popup-button-3").addEventListener("click", popupButton3);
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
            let validDomain = true;
            if(data.Status!=0){
                if(consoleLog===true){console.log('data.Status:- ',data.Status);}
                // return false;
                login_cancel("Domain does not exist. Please check the email address and try again.");
                validDomain = false;
            }
            if(data.Question[0].type!=15){
                // return false;
                // login_cancel("Domain does not have MX records. Please check the email address and try again.");
                login_cancel("Domain does not support email. Please check the email address and try again.");
                validDomain = false;
            }
            if(typeof data.Answer === "undefined"){
                // return false;
                // login_cancel("Domain does not have MX records. Please check the email address and try again.");
                login_cancel("Domain does not support email. Please check the email address and try again.");
                validDomain = false;
            }
            if(validDomain===true){
                login_stepFour(loginEmailAddress);
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
            // return;
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
    const createNewAccount = false; // Account exists === true; createNewAccount === false
    if(accountExists===true){
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
        // // window.sessionStorage.setItem("loginEmailAddress", loginEmailAddress);
        // // window.sessionStorage.setItem("accountExists", false);
        // document.querySelectorAll('.login-page').forEach(el => {
        //     const classList = el.classList;
        //     if (classList.contains('page5')) {
        //     }else{
        //         el.style.transition = "opacity 0.5s";
        //         el.style.opacity = "0";
        //         setTimeout(() => el.remove(), 500);
        //     }
        // }); 
        document.getElementById("popup-overlay").classList.add("fade-in");
        document.getElementById("popup-overlay").classList.remove("fade-out");
        document.getElementById("busy-animation-overlay").remove();
        document.getElementById("popup-heading").textContent = "Create New Account";
        document.getElementById("popup-message").textContent = "Account for email address not found.  Create a new account?";
        document.getElementById("popup-input").value = "";
        document.getElementById("popup-input").style.display = "none";
        document.getElementById("popup-input").focus();
        document.getElementById("popup-input").select();
        document.getElementById("popup-button-1").textContent = "Yes";
        document.getElementById("popup-button-2").textContent = "Cancel.";
        document.getElementById("popup-button-3").textContent = "";
        document.getElementById("popup-button-3").style.display = "none";
        document.getElementById("popup-error-message").innerHTML = "&nbsp";

        function popupButton1(){
            document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
            document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
            createNewAccount = true; // createNewAccount === true;
            window.sessionStorage.setItem("createNewAccount",true);
            document.getElementById("popup-overlay").classList.add("fade-out");
            login_stepSix(
                window.sessionStorage.getItem("loginEmailAddress"),
                window.sessionStorage.getItem("accountExists"),
                true // createNewAccount
            );
        }
        document.getElementById("popup-button-1").addEventListener("click", popupButton1);

        function popupButton2(){
            document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
            document.getElementById("popup-overlay").remove();
        }
        document.getElementById("popup-button-2").addEventListener("click", popupButton2);

        function popupButton3(){
            document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
        }
        document.getElementById("popup-button-3").addEventListener("click", popupButton3);
    }
}
async function login_stepSix(loginEmailAddress, accountExists, createNewAccount){
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
                window.sessionStorage.setItem("loginsDBinsertedID", jso.loginsDBinsertedID);
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
                // // login_stepEight(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID);
                // document.querySelectorAll('.login-page').forEach(el => {
                //     const classList = el.classList;
                //     if (classList.contains('page7')) {
                //     }else{
                //         el.style.transition = "opacity 0.5s";
                //         el.style.opacity = "0";
                //         setTimeout(() => el.remove(), 500);
                //     }
                // }); 
                document.getElementById("popup-overlay").classList.add("fade-in");
                document.getElementById("popup-overlay").classList.remove("fade-out");
                document.getElementById("busy-animation-overlay").remove();
                document.getElementById("popup-heading").textContent = "Submit Login Code";
                document.getElementById("popup-message").textContent = "Please enter the login code that has been emailed to you.";
                document.getElementById("popup-input").value = "";
                document.getElementById("popup-input").placeholder = "Enter your login code here...";
                document.getElementById("popup-input").focus();
                document.getElementById("popup-input").select();
                document.getElementById("popup-button-1").textContent = "Submit";
                document.getElementById("popup-button-2").textContent = "Cancel.";
                document.getElementById("popup-button-3").textContent = "";
                document.getElementById("popup-button-3").style.display = "none";
                document.getElementById("popup-error-message").innerHTML = "&nbsp";

                function popupButton1(){
                    document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
                    document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
                    const createNewAccount = true; // createNewAccount === true;
                    window.sessionStorage.setItem("createNewAccount",true);
                    document.getElementById("popup-overlay").classList.add("fade-out");
                    login_stepEight(
                        loginEmailAddress,
                        accountExists,
                        createNewAccount,
                        loginCodeEmailed,
                        loginsDBinsertedID
                    );
                }
                document.getElementById("popup-button-1").addEventListener("click", popupButton1);

                function popupButton2(){
                    document.getElementById("popup-overlay").remove();
                    document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
                }
                document.getElementById("popup-button-2").addEventListener("click", popupButton2);

                function popupButton3(){
                    document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
                }
                document.getElementById("popup-button-3").addEventListener("click", popupButton3);

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
                // loginCodeSubmit:document.getElementById("loginCode").value,
                loginCodeSubmit:document.getElementById("popup-input").value,
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
                document.getElementById("busy-animation-overlay").remove();
                document.getElementById("popup-overlay").remove();
                document.getElementById("sign-in-out-button").innerHTML = "Log Out";
                document.getElementById("sign-in-out-button").classList.add("sign-out-button");
                document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
                postLoginActions_clientSide();
            }else{
                alert("🔴 Secure login failed, incorrect login code submitted.");
                document.getElementById("sign-in-out-button").innerHTML = "Log In";
                document.getElementById("sign-in-out-button").classList.add("sign-in-button");
                document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
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
    console.log("Login process cancelled.\n" + message);
    // document.querySelectorAll('.login-pages-container').forEach(el => {
    //     el.style.transition = "opacity 0.5s";
    //     el.style.opacity = "0";
    //     setTimeout(() => el.remove(), 500);
    // });
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
        // 1️⃣🔹2️⃣ START // doAfterDOMandWindowLoad_globalLoginClient() START
        // 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹

            if(consoleLog===true){console.log('doAfterDOMandWindowLoad_globalLoginClient() launched.',Date.now());}

            // if LOGIN REQUIRED
                isLoginRequired();
            // if LOGIN REQUIRED

            // signin-out button START
                document.getElementById("sign-in-out-button").addEventListener("click", (e) => {
                    console.log("sign-in-out-button clicked");
                    console.log(e.target.textContent);
                    if(e.target.textContent.toLowerCase()==="log in"){
                        // login_step1();
                        login_stepOne();
                    }
                    if(e.target.textContent.toLowerCase()==="log out"){
                        sessionLogout();
                    }
                });
            // signin-out button END

            // // displayLoginPage(loginPageNumber) START
            //     let loginPageNumber = 1; // initialise at 1
            //     const loginPageNumberMax = 7; // initialise at total number of pages
            //     document.querySelectorAll(".back-btn").forEach(button => {
            //         button.addEventListener("click", function() {
            //             console.log("BACK Button clicked:", this.textContent);
            //             loginPageNumber += -1
            //             if(loginPageNumber < 1){loginPageNumber = 1;}
            //             console.log("loginPageNumber:- ",loginPageNumber);
            //             const ee = document.querySelector(`.page${loginPageNumber}`);
            //             // ee.classList.remove("flip-page");
            //             ee.classList.remove("fade-in");
            //             ee.classList.remove("fade-out");
            //             ee.style.zIndex = 10; // show the previous page
            //             // document.querySelector(`.page${loginPageNumber}`).classList.remove("flip-page");
            //             // document.querySelector(`.page${loginPageNumber}`).classList.remove("flip-page");
            //         });
            //     });
            //     document.querySelectorAll(".next-btn").forEach(button => {
            //         button.addEventListener("click", function() {
            //             console.log("NEXT Button clicked:", this.textContent);
            //             loginPageNumber += 1
            //             if(loginPageNumber > loginPageNumberMax){loginPageNumber = loginPageNumberMax;}
            //             console.log("loginPageNumber:- ",loginPageNumber);
            //             const ee = document.querySelector(`.page${loginPageNumber*1-1}`);
            //             // ee.classList.add("flip-page");
            //             ee.classList.add("fade-out");
            //             ee.style.zIndex = -1; // hide the previous page
            //             // document.querySelector(`.page${loginPageNumber-1}`).classList.add("flip-page");
            //             // document.querySelector(`.page${loginPageNumber-1}`).classList.add("flip-page");
            //         });
            //     });
            // // displayLoginPage(loginPageNumber) END

            // login event listeners START
                // document.querySelectorAll(".login-stepOne").forEach(button => {
                //     button.addEventListener("click", function() {
                //         console.log("login-stepOne Button clicked:", this.textContent);
                //         login_stepOne();
                //     });
                // });
                // document.querySelectorAll(".login-stepTwo").forEach(button => {
                //     button.addEventListener("click", function() {
                //         console.log("login-stepTwo Button clicked:", this.textContent);
                //         login_stepTwo();
                //     });
                // });
                // document.querySelectorAll(".login-stepThree").forEach(button => {
                //     button.addEventListener("click", function() {
                //         console.log("login-stepThree Button clicked:", this.textContent);
                //         login_stepThree();
                //     });
                // });
                // document.querySelectorAll(".login-stepFour").forEach(button => {
                //     button.addEventListener("click", function() {
                //         console.log("login-stepFour Button clicked:", this.textContent);
                //         login_stepFour();
                //     });
                // });
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
                // document.querySelectorAll(".login-stepSix").forEach(button => {
                //     button.addEventListener("click", function() {
                //         console.log("login-stepSix Button clicked:", this.textContent);
                //         login_stepSix();
                //     });
                // });
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

        // 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
        // 1️⃣🔹2️⃣ END // doAfterDOMandWindowLoad_globalLoginClient() END
    }
const consoleLog = false

console.log("LOADED:- globalLoginClient.mjs is loaded",new Date().toLocaleString());
export function globalLoginClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { sessionLogout } from './globalSessions_Client.mjs';
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

const popupHTML = 
    `<div id="popup-overlay" class="popup-overlay">
        <div id="popup-container" class="popup-container">
            <p id="popup-heading" class="popup-heading">This is a popup message.</p>
            <p id="popup-message" class="popup-message"></p>
            <input id="popup-input" class="popup-input" type="text" placeholder="Enter your input here..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
            <form id="passcodeForm" class="passcodeForm">
                <div class="code-input-container">
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <input class="passcodeInput code-input-input" type="text" inputmode="numeric" pattern="\d*" maxlength="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                </div>
                // <button class="passcodeSubmit" type="submit" disabled>Submit</button>
            </form>
            <button id="popup-button-1" class="popup-button">Button 1</button>
            <button id="popup-button-2" class="popup-button">Button 2</button>
            <button id="popup-button-3" class="popup-button">Button 3</button>
            <p id="popup-error-message" class="popup-error-message"></p>
            <input id="popup-focus-select-nodisplay" style="display:none" type="text" placeholder="Focus Select No Display" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
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
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    document.getElementById("popup-heading").textContent = "Login";
    document.getElementById("popup-message").textContent = "Please enter your email address to log in.";
    document.getElementById("popup-input").value = window.localStorage.getItem("loginEmailAddress") || "";
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
        document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
        document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
        const loginEmailAddress = document.getElementById("popup-input").value;
        window.localStorage.setItem("loginEmailAddress", loginEmailAddress);
        login_stepTwo(loginEmailAddress);
    }
    document.getElementById("popup-button-1").addEventListener("click", popupButton1);

    function popupButton2(){
        document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
        document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
        document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
        document.getElementById("popup-overlay").remove();
    }
    document.getElementById("popup-button-2").addEventListener("click", popupButton2);

    function popupButton3(){
        document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
        document.getElementById("popup-overlay").classList.add("fade-out");
        document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
        document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
        document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
    }
    document.getElementById("popup-button-3").addEventListener("click", popupButton3);

}

function login_stepTwo(loginEmailAddress){
    // verify email address format
        if(consoleLog===true){console.log(`isValidEmailFormat(${loginEmailAddress})`);}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmailFormat = emailRegex.test(loginEmailAddress);
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
                login_cancel("Domain does not exist. Please check the email address and try again.");
                validDomain = false;
            }
            if(data.Question[0].type!=15){
                login_cancel("Domain does not support email. Please check the email address and try again.");
                validDomain = false;
            }
            if(typeof data.Answer === "undefined"){
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
            login_cancel("Error fetching email domain records. Please check your internet connection or try again later.");
        }
}
async function login_stepFour(loginEmailAddress){
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
                window.localStorage.setItem("accountExists",true);
                login_stepFive(loginEmailAddress, true); // Account exists
            }else{
                window.localStorage.setItem("accountExists",false);
                login_stepFive(loginEmailAddress, false); // Account does not exist
            }
    } catch (error) {
        console.error("Error fetching /loginRouter/fileExists:",error.message);
        login_cancel("Error checking if account exists. Please try again later.");
    }
}
function login_stepFive(loginEmailAddress, accountExists){
    let createNewAccount = false; // Account exists === true; createNewAccount === false
    if(accountExists===true){
        window.localStorage.setItem("createNewAccount",false);
        document.getElementById("popup-input").value = "";
        document.getElementById("popup-input").style.display = "none";
        document.getElementById("popup-input").focus();
        document.getElementById("popup-input").select();
        login_stepSix(loginEmailAddress, accountExists, createNewAccount); // Account exists === true; createNewAccount === false 
    }else{
        createNewAccount = true; // Account exists === false; createNewAccount === true
        window.localStorage.setItem("createNewAccount",true);
        document.getElementById("popup-overlay").classList.add("fade-in");
        document.getElementById("popup-overlay").classList.remove("fade-out");
        document.getElementById("busy-animation-overlay").remove();
        document.getElementById("popup-heading").textContent = "Create New Account";
        document.getElementById("popup-message").textContent = `Account for email address ${loginEmailAddress} not found.  Create a new account?`;
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
            document.getElementById("popup-overlay").classList.add("fade-out");
            document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
            document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
            document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
            createNewAccount = true; // createNewAccount === true;
            window.localStorage.setItem("createNewAccount",true);
            login_stepSix(
                window.localStorage.getItem("loginEmailAddress"),
                window.localStorage.getItem("accountExists"),
                window.localStorage.getItem("createNewAccount")
            );
        }
        document.getElementById("popup-button-1").addEventListener("click", popupButton1);

        function popupButton2(){
            document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
            document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
            document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
            document.getElementById("popup-overlay").remove();
        }
        document.getElementById("popup-button-2").addEventListener("click", popupButton2);

        function popupButton3(){
            document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
            document.getElementById("popup-overlay").remove();
            document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
            document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
            document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
        }
        document.getElementById("popup-button-3").addEventListener("click", popupButton3);
    }
}
async function login_stepSix(loginEmailAddress, accountExists, createNewAccount){
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
                loginEmailAddress:loginEmailAddress
                // createNewAccount:createNewAccount,
                // filePath:"./db/",
                // fileName:loginEmailAddress + ".db"
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
                window.localStorage.setItem("loginsDBinsertedID", jso.loginsDBinsertedID);
                login_stepSeven(loginEmailAddress, accountExists,createNewAccount,jso.loginCodeEmailed,jso.loginsDBinsertedID);
            }else{
                login_cancel(`Problem generating login code. ${jso.loginCodeEmailed}`);
            }
    } catch (error) {
        console.error("Error sending email:",error.message);
        login_cancel(`${jso.loginCodeEmailed}`);
    }

}

function passcodeEntry() {
    const form = document.getElementById('passcodeForm');
    form.style.position = 'unset'; // Show the form
    const inputs = form.querySelectorAll('.passcodeInput');
    const submitButton = form.querySelector('.passcodeSubmit');

    const updateSubmitState = () => {
        console.log("Updating submit button state...");
        const allFilled = Array.from(inputs).every(input => input.value.match(/^\d$/)); // 0-9 required
        console.log("Updating submit button state...", allFilled);
        submitButton.disabled = !allFilled;
        if (allFilled) {
            const code = Array.from(inputs).map(input => input.value).join('');
            console.log('Passcode entered:', code); 
            document.getElementById("popup-input").value = code; // Update the popup input with the passcode
            document.getElementById("popup-button-1").click();
        } else {
        }
    };
    // const updateSubmitState = () => {
    //     console.log("Updating submit button state...");
    //     const allFilled = Array.from(inputs).every(input => input.value.trim() !== ""); // Check if all inputs are filled
    //     submitButton.disabled = !allFilled;
    // };

    inputs[0].focus();

    inputs.forEach((input, index) => {
        console.log(`Input ${index} initialized.`);
        input.addEventListener('input', () => {
            if (/^\d$/.test(input.value) && index < inputs.length - 1) {
                if(index <= 5){
                    inputs[index + 1].focus();
                    inputs[index + 1].select();
                }else{
                    console.log("Last input reached, no next input to focus.");
                }
            } else if (!/^\d$/.test(input.value)) {
                  input.value = '';
            }
            updateSubmitState();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, inputs.length);
            paste.split('').forEach((char, i) => {
                inputs[i].value = char;
            });
            if (paste.length < inputs.length) {
                inputs[paste.length].focus();
            }
            updateSubmitState();
        });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = Array.from(inputs).map(input => input.value).join('');
      if (code.length === 6) {
        // Example: send code to server or log
        console.log('Passcode submitted:', code);

        // Example fetch (replace with your API endpoint)
        /*
        fetch('/submit-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode: code })
        }).then(res => {
          // handle response
        });
        */
        alert('Passcode submitted: ' + code);
      }
    });

}

async function login_stepSeven(loginEmailAddress, accountExists, createNewAccount, loginCodeEmailed,loginsDBinsertedID){
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
                passcodeEntry(); // Initialize passcode entry functionality
                document.getElementById("popup-overlay").classList.add("fade-in");
                document.getElementById("popup-overlay").classList.remove("fade-out");
                document.getElementById("busy-animation-overlay").remove();
                document.getElementById("popup-heading").textContent = "Submit Login Code";
                document.getElementById("popup-message").textContent = "Please enter the login code that has been emailed to you.";
                // document.getElementById("popup-input").value = "";
                // document.getElementById("popup-input").placeholder = "Enter your login code here...";
                // document.getElementById("popup-input").style.display = "block";
                document.getElementById("popup-input").focus();
                document.getElementById("popup-input").select();
                document.getElementById("popup-button-1").textContent = "Submit";
                document.getElementById("popup-button-2").textContent = "Cancel.";
                document.getElementById("popup-button-3").textContent = "";
                document.getElementById("popup-button-3").style.display = "none";
                document.getElementById("popup-error-message").innerHTML = "&nbsp";

                function popupButton1(){
                    document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
                    document.getElementById("popup-overlay").classList.add("fade-out");
                    document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
                    document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
                    document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
                    window.localStorage.setItem("createNewAccount",true);
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
                    document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
                    document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
                    document.getElementById("popup-button-3").removeEventListener("click", popupButton3);
                    document.getElementById("popup-overlay").remove();
                }
                document.getElementById("popup-button-2").addEventListener("click", popupButton2);

                function popupButton3(){
                    document.body.insertAdjacentHTML("beforeend", busyAnimationHTML);
                    document.getElementById("popup-overlay").classList.add("fade-out");
                    document.getElementById("popup-button-1").removeEventListener("click", popupButton1);
                    document.getElementById("popup-button-2").removeEventListener("click", popupButton2);
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
                postLoginActions({createNewAccount:createNewAccount,loginEmailAddress:loginEmailAddress});
            }else{
                alert("🔴 Secure login failed, incorrect login code submitted.");
                document.getElementById("busy-animation-overlay").remove();
                document.getElementById("popup-overlay").remove();
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
                login_stepOne();
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

            // // if LOGIN REQUIRED
            //     isLoginRequired();
            // // if LOGIN REQUIRED

            // signin-out button START
                document.getElementById("sign-in-out-button").addEventListener("click", (e) => {
                    console.log("sign-in-out-button clicked");
                    console.log(e.target.textContent);
                    if(e.target.textContent.toLowerCase().trim().replace(" ","")==="login"){
                        login_stepOne();
                    }
                    if(e.target.textContent.toLowerCase().trim().replace(" ","")==="logout"){
                        sessionLogout();
                    }
                });
            // signin-out button END

        // 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
        // 1️⃣🔹2️⃣ END // doAfterDOMandWindowLoad_globalLoginClient() END
    }

    // postLoginActions
        export async function postLoginActions(jso){
            // place "PROJECT SPECIFIC" actions to take post secure login here
            document.getElementById("user-email-address").textContent = jso.loginEmailAddress;
            console.log("Create new account? ",jso.createNewAccount);
            if(jso.createNewAccount===true){
                    const fetchUrl = `/loginRouter/createNewAccount`;
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
                                fileName:jso.loginEmailAddress // file extension is added server side + ".db"
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl);}
                    try {
                        // fetch
                            const response = await fetch(fetchUrl,fetchOptions);
                            if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                            const data = await response.json(); // Fetch JSON object
                            if(consoleLog===true){console.log(`/createNewAccount:- `,data);}
                    } catch (error) {
                        // console.error("Error fetching HTML from:",fetchUrl, error.message);
                        console.error("Error creating new account:-",error.message);
                    }
            }
        }

    // postLogoutActions
        export function postLogoutActions(){
            if(consoleLog===true){console.log('postLogoutActions() launched.',Date.now().toLocaleString());}
            // place "PROJECT SPECIFIC" actions to take post secure logout here
        }
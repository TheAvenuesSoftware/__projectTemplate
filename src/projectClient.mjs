const consoleLog = false;

if(consoleLog===true){console.log("\nLOADED:- projectClient.mjs is loaded",new Date().toLocaleString());}
export function projectMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    // import * as globalClientJS from "./globalClient.mjs";
    import {getGlobalFooter} from "./globalClient.mjs";
    import {doAfterDOMandWindowLoad_globalLoginClient} from "./globalLoginClient.mjs";
    import {sessionLogout} from "./globalSessionsClient.mjs";
    import {clientConfigSettings} from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    document.addEventListener("DOMContentLoaded", () => {
        if(consoleLog===true){console.log('projectClient DOMContentLoaded successsful.',Date.now());}
        window.addEventListener("load", async () => {
            if(consoleLog===true){console.log('projectClient window load successsful.',Date.now());}
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad_projectClient();
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad_globalLoginClient();

            // dynamically set fetch credentials mode START 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
                const fetchUrl = "/session-check";
                const fetchOptions = {
                        method: 'GET',
                        mode: 'cors',                  // Ensures cross-origin requests are handled
                        cache: 'no-cache',             // Prevents caching issues
                        credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                        headers: {
                            'Content-Type': 'application/json',  // Sets content type
                            // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                            // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                        }
                    }
                if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                try {
                    const response = await fetch(fetchUrl, fetchOptions);                
                    // if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                    // const data = await response.json();
                    const jso = await response.json(); // converts fetch response from JSON to a JSO
                    console.log('🟢 Response received:-\n', JSON.stringify(jso,null,2));
                    if(jso.sessionExists===true){
                        clientConfigSettings.CLIENT_SESSION_CREDENTIALS = "include";
                        console.log("Session is active!", jso.sessionExists);
                    }else{
                        clientConfigSettings.CLIENT_SESSION_CREDENTIALS = "omit";
                        console.log("No session detected.", jso.sessionExists);
                    }
                } catch (error) {
                    if(consoleLog===true){console.error("Error sending POST request:", error.message);}
                }
            // dynamically set fetch credentials mode END 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹

            // idle tracking START 🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
                let lastActivity = Date.now();
                // const updateActivity = () => {
                function updateActivity(){
                    lastActivity = Date.now();
                    console.log('🟢 User activety detected.',Date.now());
                };
                document.addEventListener("mousemove", updateActivity);
                document.addEventListener("keydown", updateActivity);
                document.addEventListener("click", updateActivity);
                const heartBeatInterval = clientConfigSettings.CLIENT_SESSION_HEARTBEAT_INTERVAL;
                const logoutAfter = clientConfigSettings.CLIENT_SESSION_IDLE_LOGOUT_AFTER;
                console.log('heartBeatInterval:- ',heartBeatInterval,'logoutAfter:- ',logoutAfter)
                const idleTracking_IntervalId = setInterval(async() => {
                    if (Date.now() - lastActivity < logoutAfter * 60 * 1000) { // Active in last 15 min?
                        try {
                            await fetch('/heartbeat-session-extension', {
                                    method: 'POST', 
                                    credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                                    headers: { 'Content-Type': 'application/json' }
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log('🟢 Heartbeat:', data)
                                });
                                // .catch(error => console.error('🔴 Heartbeat error:', error));
                        } catch (error) {
                            console.log(`/heartbeat-session-extension error:-`,error);
                        }
                    } else {
                        console.log('🔴 User inactive, consider logging out.');
                        // Trigger logout function here
                            document.removeEventListener("mousemove", updateActivity);
                            document.removeEventListener("keydown", updateActivity);
                            document.removeEventListener("click", updateActivity);
                            clearInterval(idleTracking_IntervalId); 
                            sessionLogout(); //in globalSessionsClient.mjs
                    }
                }, heartBeatInterval * 60 * 1000); // Runs every 5 min
            // idle tracking END🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
        });
    });

    // doAfterDOMandWindowLoad()
        function doAfterDOMandWindowLoad_projectClient(){

            if(consoleLog===true){console.log('doAfterDOMandWindowLoad_projectClient() launched.',Date.now());}

            // getAllExpenses0()
                async function getAllExpenses0(){
                    // document.getElementById('fetchExpenses').addEventListener('click', async () => {
                    try {
                        // Step 1: Fetch data from the server
                        // const response = await fetch('http://localhost:3000/getAllExpenses');
                        const response = await fetch('http://process.env.LOCALHOST:3000/getAllExpenses');
                        if (!response.ok) {
                            throw new Error(`Server Error: ${response.statusText}`);
                        }
                        const data = await response.json();

                        // Step 2: Process the response data (e.g., filtering or formatting)
                        const processedData = data.map(expense => ({
                            ...expense,
                            formattedAmount: `$${expense.amount.toFixed(2)}` // Format amounts as currency
                        }));

                        // Step 3: Update the UI
                        const outputDiv = document.getElementById('output');
                        outputDiv.innerHTML = processedData.map(expense =>
                            `<p>${expense.item}: ${expense.formattedAmount}</p>`
                        ).join('');
                    } 
                    catch (error) {
                        console.error('Error fetching expenses:', error.message);
                    }
                    // });
                }

            // getAllExpenses()
                async function getAllExpenses(){
                    if(consoleLog===true){console.log(getAllExpenses());}
                    const v_data = JSON.stringify(
                        {
                            x: "y"
                        }
                    );
                    const v_options = {method: 'POST', headers: {'Content-Type': 'application/json'},body:v_data};
                    // await fetch('http://localhost:3000/getAllExpenses',v_options)
                    await fetch('http://process.env.LOCALHOST:3000/getAllExpenses',v_options)
                    .then(res => {
                        if(consoleLog===true){console.log(res);}
                        // Note that despite the method being named json(), 
                        // the result is not JSON but is instead the result of 
                        // taking JSON as input and parsing it to produce a JavaScript object.
                        return res.json();
                    })
                    .then(res =>{
                        // if(consoleLog===true){console.log(res);}
                        const myDate = new Date(res).toLocaleString();
                        // if(consoleLog===true){console.log(myDate);}
                        // document.getElementById("versionNumber").innerHTML = myDate.slice(0,10) + " " + res.slice(11,19);
                        document.getElementById("versionNumber").innerHTML = myDate.slice(0,10) + "<br>" + myDate.slice(11,myDate.length);
                    })
                }

            // add event listeners START
            try{
                document.getElementById("date").addEventListener('blur', () => {
                    const date = document.getElementById("date");
                    async function validate_date() {
                        const fetchUrl = "/projectRouter/validate_date";
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
                                    date: date.value
                                })
                            }
                        if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                        try {
                            const response = await fetch(fetchUrl, fetchOptions);                
                            // if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                            // const data = await response.json();
                            const jso = await response.json(); // converts fetch response from JSON to a JSO
                            console.log('🟢 Response received:- ', jso);
                            // if(consoleLog===true){console.log("Response:", data.response);}
                        } catch (error) {
                            if(consoleLog===true){console.error("Error sending POST request:", error.message);}
                        }
                    }
                    validate_date();
                });
            } catch (error) {
            }
            try{
                document.getElementById("amount").addEventListener('click', () => {
                });
            } catch (error) {
            }
            try{
                document.getElementById("category").addEventListener('click', () => {
                });
            } catch (error) {
            }
            try{
                document.getElementById("description").addEventListener('click', () => {
                });
            } catch (error) {
            }
            try{
                document.getElementById("submitData").addEventListener('click', () => {
                });
            } catch (error) {
            }

            // ###################################################################################################
                // globalClientJS.getGlobalFooter();
                getGlobalFooter();
        }

    // postLoginActions
        export function postLoginActions(){
            if(consoleLog===true){console.log('postLoginActions() launched.',Date.now().toLocaleString());}
            // place "project specific" actions to take post secure login here
        }

    // postLogoutActions
        export function postLogoutActions(){
            if(consoleLog===true){console.log('postLogoutActions() launched.',Date.now().toLocaleString());}
            // place "project specific" actions to take post secure logout here
        }
const consoleLog = true;

console.log("LOADED:- globalSessions_Client.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(consoleLog===true){console.log('DOMContentLoaded successsful ~ globalSessions_Client.',Date.now().toLocaleString());}

        window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
            if(consoleLog===true){console.log('Window load successsful ~ globalSessions_Client.',Date.now().toLocaleString());}

            // // dynamically set fetch "credentials mode" START 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
            //     const fetchUrl = "/establish-session";
            //     const fetchOptions = {
            //             method: 'POST',
            //             mode: 'cors',                  // Ensures cross-origin requests are handled
            //             cache: 'no-cache',             // Prevents caching issues
            //             credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            //             headers: {
            //                 'Content-Type': 'application/json',  // Sets content type
            //                 // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
            //                 // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            //             },
            //             body: JSON.stringify({          // Converts object to JSON for request
            //                 sessionCheck:"retrieve 'fetch() credentials:' mode from server"
            //             })
            //         }
            //     // if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
            //     try {
            //         const response = await fetch(fetchUrl, fetchOptions);                
            //         // if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            //         // const data = await response.json();
            //         const jso = await response.json(); // converts fetch response from JSON to a JSO
            //         console.log('🟢 Response received:-\n', JSON.stringify(jso,null,2));
            //         if(jso.sessionEstablished===true){
            //             clientConfigSettings.CLIENT_SESSION_CREDENTIALS = "include";
            //             console.log("Session active?", jso.sessionEstablished,"  Session user name:", jso.sessionName,"  Credentials mode:",clientConfigSettings.CLIENT_SESSION_CREDENTIALS);
            //         }else{
            //             clientConfigSettings.CLIENT_SESSION_CREDENTIALS = "omit";
            //             console.log("Session active?", jso.sessionEstablished,"  Session user name:", jso.sessionName,"  Credentials mode:",clientConfigSettings.CLIENT_SESSION_CREDENTIALS);
            //         }
            //     } catch (error) {
            //         if(consoleLog===true){console.error("Error sending POST request:", error.message);}
            //     }
            // // dynamically set fetch credentials mode END 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹

            // // idle tracking START 🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
            //     let lastActivity = Date.now();
            //     // const updateActivity = () => {
            //     function updateActivity(){
            //         lastActivity = Date.now();
            //         console.log('🟢 User activety detected.',(new Date()).toLocaleString());
            //     };
            //     document.addEventListener("mousemove", updateActivity);
            //     document.addEventListener("keydown", updateActivity);
            //     document.addEventListener("click", updateActivity);
            //     const heartBeatInterval = clientConfigSettings.CLIENT_SESSION_HEARTBEAT_INTERVAL;
            //     const logoutAfter = clientConfigSettings.CLIENT_SESSION_IDLE_LOGOUT_AFTER;
            //     console.log('heartBeatInterval:- ',heartBeatInterval,'logoutAfter:- ',logoutAfter)
            //     const idleTracking_IntervalId = setInterval(async() => {
            //         if (Date.now() - lastActivity < logoutAfter * 60 * 1000) { // Active in last 15 min?
            //             try {
            //                 await fetch('/heartbeat-session-extension', {
            //                         method: 'POST', 
            //                         credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            //                         headers: { 'Content-Type': 'application/json' }
            //                     })
            //                     .then(response => response.json())
            //                     .then(data => {
            //                         console.log('🟢 Heartbeat:', data)
            //                     });
            //                     // .catch(error => console.error('🔴 Heartbeat error:', error));
            //             } catch (error) {
            //                 console.log(`/heartbeat-session-extension error:-`,error);
            //             }
            //         } else {
            //             console.log('🔴 User inactive, consider logging out.');
            //             // Trigger logout function here
            //                 document.removeEventListener("mousemove", updateActivity);
            //                 document.removeEventListener("keydown", updateActivity);
            //                 document.removeEventListener("click", updateActivity);
            //                 clearInterval(idleTracking_IntervalId); 
            //                 sessionLogout(); //in globalSessionsClient.mjs
            //         }
            //     }, heartBeatInterval * 60 * 1000); // Runs every 5 min
            // // idle tracking END🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
    });
    // 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// logout
    // postLogoutActions START
        export function postLogoutActions(){
            if(consoleLog===true){console.log('postLogoutActions() launched.',Date.now().toLocaleString());}
            // place "PROJECT SPECIFIC" actions to take post secure logout here
        }
    // postLogoutActions END
    export async function sessionLogout(mode={silent:false}){ // if mode.silent=true, do not show alerts
        try {
            const fetchUrl = `/sessionsRouter/sessionLogout`;
            const fetchOptions = {
                    method: 'POST',                // Specifies a POST request
                    mode: 'cors',                  // Ensures cross-origin requests are handled
                    cache: 'no-cache',             // Prevents caching issues
                    credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                    headers: {
                        'Content-Type': 'application/json',  // Sets content type
                        // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                        'Accept': 'application/json',        // Expect JSON response
                    },
                    body: JSON.stringify({ 
                        logUserOut:true,
                        silent: mode.silent  // if true, do not show alerts
                    })  // Converts object to JSON for request
                }
            if(consoleLog===true){console.log(JSON.stringify(fetchOptions,null,2));}
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jso = await response.json(); // converts fetch response from JSON to a JSO
            console.log('🟢 Request response:-', JSON.stringify(jso,null,2));
            if(jso.logoutConfirmed===true){
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                console.log("🟢 logout successful.");
                document.getElementById("padlock-icon").src="__padlock_locked.png";
                document.getElementById("sign-in-out-icon-container").setAttribute("data-status","signed-out");
                document.getElementById("sign-in-out-icon-container").title = "Click to sign in.";
                document.getElementById("user-email-address").innerHTML = "...not signed in.";
                postLogoutActions(); // any actions to do after logout success
                if(jso.silent!==true){alert("🟢 logout successful.");}

                // document.getElementById("sign-in-out-button").innerHTML = "Log In";
                // document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
                // document.getElementById("sign-in-out-button").classList.add("sign-in-button");
            }else{
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🔴 logout failed, please try again");
                console.log("🔴 logout failed, please try again");
                // document.getElementById("sign-in-out-button").innerHTML = "Log Out";
                // document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
                // document.getElementById("sign-in-out-button").classList.add("sign-out-button");
            }
        }catch (error){
            alert("🔴 Fatal error logging out!");
            console.log("🔴 Fatal error logging out!",error);
        }
    }
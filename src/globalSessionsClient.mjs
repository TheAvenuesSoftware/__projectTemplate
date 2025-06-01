const consoleLog = true;

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import {clientConfigSettings} from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// logout
    export async function sessionLogout(){
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
                    body: JSON.stringify({          // Converts object to JSON for request
                        logUserOut:true
                    })
                }
            if(consoleLog===true){console.log(JSON.stringify(fetchOptions,null,2));}
            const response = await fetch(fetchUrl,fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jso = await response.json(); // converts fetch response from JSON to a JSO
            console.log('🟢 Request Success:', JSON.stringify(jso,null,2));
            if(jso.logoutConfirmed===true){
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🟢 logout successful.");
                console.log("🟢 logout successful.");
                document.getElementById("sign-in-out-button").innerHTML = "Sign In";
                document.getElementById("sign-in-out-button").classList.remove("sign-out-button");
                document.getElementById("sign-in-out-button").classList.add("sign-in-button");
            }else{
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🔴 logout failed, please try again");
                console.log("🔴 logout failed, please try again");
                document.getElementById("sign-in-out-button").innerHTML = "Sign Out";
                document.getElementById("sign-in-out-button").classList.remove("sign-in-button");
                document.getElementById("sign-in-out-button").classList.add("sign-out-button");
            }
        }catch (error){
            alert("🔴 Fatal error logging out!");
            console.log("🔴 Fatal error logging out!",error);
        }
    }
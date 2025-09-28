const consoleLog = true;

console.log("LOADED:- globalSessions_Client.mjs is loaded",new Date().toLocaleString());

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(consoleLog===true){console.log('DOMContentLoaded successsful ~ globalSessions_Client.',new Date().toLocaleString());}

        window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
            if(consoleLog===true){console.log('Window load successsful ~ globalSessions_Client.',new Date().toLocaleString());}

        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
    });
    // 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// 🚪 🚪 🚪 logout START
    // postLogoutActions START
        export function postLogoutActions(){
            if(consoleLog===true){console.log('postLogoutActions() launched.',new Date().toLocaleString());}
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
            }else{
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                alert("🔴 logout failed, please try again");
                console.log("🔴 logout failed, please try again");
            }
        }catch (error){
            alert("🔴 Fatal error logging out!");
            console.log("🔴 Fatal error logging out!",error);
        }
    }
// 🚪 🚪 🚪 logout END
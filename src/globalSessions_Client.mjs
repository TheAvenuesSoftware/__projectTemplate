if(window.consoleLog===true){console.log("LOADED:- globalSessions_Client.mjs is loaded",new Date().toLocaleString());}

import { showCustomMessage } from "./globalUIpopups_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
    import { login_cancel } from "./globalLogin_Client.mjs"
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// initialise guest session START
    export function initGuestSession(){
        fetch(`/api/initGuest`, {
            method: "POST",
            credentials: "include"
        });
    }
    initGuestSession();
// initialise guest session END

export function getCookie(name, parseJson = true) {
    /**
     * Retrieves a cookie value by name and optionally parses it as JSON.
     */
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);    
    if (parts.length === 2) {
        const rawValue = parts.pop().split(';').shift();
        const decodedValue = decodeURIComponent(rawValue);        
        if (parseJson) {
            try {
                return JSON.parse(decodedValue);
            } catch (e) {
                return decodedValue; // Return raw if JSON parse fails
            }
        }
        return decodedValue;
    }
    return null;
}

    document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(window.consoleLog===true){console.log('DOMContentLoaded successsful ~ globalSessions_Client.',new Date().toLocaleString());}

        window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
            if(window.consoleLog===true){console.log('Window load successsful ~ globalSessions_Client.',new Date().toLocaleString());}

            // --- Initial Call (Run after /api/initGuest or successful /api/refreshGuest) ---
            // This should be called immediately upon loading the page if tokens were set.
                setGuestRefreshTimer();

            // PING for keep-alive on mobile devices
                setRefreshPingTimer(); // SEE module tripsCpunter_Client.mjs FOR PING callRefreshPingTimer() AND stopRefreshPingTimer()

        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
    });
    // 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// 🚪 🚪 🚪 logout START
    // postLogoutActions START
        export function postLogoutActions(){
            if(window.consoleLog===true){console.log('postLogoutActions() launched.',new Date().toLocaleString());}
            // place "PROJECT SPECIFIC" actions to take post secure logout here
        }
    // postLogoutActions END
        export async function sessionLogout(userEmailAddress){
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
                            userEmailAddress: userEmailAddress,
                            logUserOut: true,
                        })  // Converts object to JSON for request
                    }
                if(window.consoleLog===true){console.log(JSON.stringify(fetchOptions,null,2));}
                const response = await fetch(fetchUrl,fetchOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jso = await response.json(); // converts fetch response from JSON to a JSO
                if(window.consoleLog===true){console.log('🟢 Request response:-', JSON.stringify(jso,null,2));}
                document.querySelectorAll('.overlay').forEach(el => {
                    el.style.transition = "opacity 0.5s";
                    el.style.opacity = "0";
                    setTimeout(() => el.remove(), 500);
                });
                if(jso.logoutConfirmed===true){
                    if(window.consoleLog===true){console.log("🟢 logout successful.");}
                    document.getElementById("padlock-icon").src="__padlock_locked.png";
                    document.getElementById("sign-in-out-icon-container").setAttribute("data-status","signed-out");
                    document.getElementById("sign-in-out-icon-container").title = "Click to sign in.";
                    document.getElementById("user-email-address").innerHTML = "...not signed in.";
                    postLogoutActions(); // any actions to do after logout success
                    if(jso.silent!==true){alert("🟢 logout successful.");}
                    location.reload();
                }else{
                    alert("🔴 logout failed, please try again");
                    if(window.consoleLog===true){console.log("🔴 logout failed, please try again");}
                }
            }catch (error){
                alert("🔴 Fatal error logging out!");
                login_cancel();
                if(window.cocancel_loginnsoleLog===true){console.log("🔴 Fatal error logging out!",error);}
            }
        }
// 🚪 🚪 🚪 logout END

// session regeneration START
    // session regeneration can be triggered periodically to enhance security
        export async function regenUserSession(){
            const userEmailAddress = document.getElementById('user-email-address').textContent;
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
                        userEmailAddress: userEmailAddress
                    })
                }
            if(window.consoleLog===true){console.log(fetchUrl);}
            if(window.consoleLog===true){console.log(fetchUrl, "options:-\n",fetchOptions);}
            try {
                // fetch
                    const response = await fetch(fetchUrl,fetchOptions);
                    if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
                    const jso = await response.json(); // Fetch JSON object
                    if(window.consoleLog===true){console.log(fetchUrl,`sessionRegen:- `,jso);}
                    if(jso.sessionRegenOK===true){
                        if(window.consoleLog===true){console.log("🟢 Session regenerated successfully.");}
                        const x = parseInt(document.getElementById("sessionSignedinRegen").textContent || 0);
                        document.getElementById("sessionSignedinRegen").textContent = x + 1;
                    }else{
                        if(window.consoleLog===true){console.log("jso.sessionRegenOK:",jso.sessionRegenOK);}
                        if(window.consoleLog===true){console.log("🔴 Session regeneration failed.");}
                    }
                }catch (error) {
                    if(window.consoleLog===true){console.log("🔴 Fatal error during session regeneration!",error);}
                }
        }
// session regeneration END

// 🧑🧑🧑 guest session refresh START 🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑
    // A global or module-level variable to hold the timer ID
        let isRefreshing = false;
        let refreshPromise = null;
        let refreshTimer = null; 
        // const REFRESH_INTERVAL_MS = 85 * 60 * 1000 + Math.random() * 5000; // 85 minutes + random up to 5 seconds
        // const REFRESH_INTERVAL_MS = 70 * 60 * 1000 + Math.random() * 5000; // 70 minutes + random up to 5 seconds
        // const REFRESH_INTERVAL_MS = 1 * 60 * 1000 + Math.random() * 5000; // 1 minutes + random up to 5 seconds
        const REFRESH_INTERVAL_MS = 5 * 60 * 1000 + Math.random() * 5000; // 5 minutes + random up to 5 seconds

    // The function that initiates the refresh process
        export async function triggerGuestRefresh() {
            // If a refresh is already in progress, return the existing promise
                if (isRefreshing) {
                    if(window.consoleLog===true){console.log("⏳ Refresh already in flight, waiting for it...");}
                    return refreshPromise;
                }
                isRefreshing = true;
            if(window.consoleLog===true){console.log("Starting guest token refresh attempt...");}

            // Frontend Logic Suggestion to avoid Unnecessary Refresh Attempts
                const guestCookie = getCookie('guestCookie'); // The non-httpOnly one - but still useful to check existence
                if (!guestCookie) {
                    // Don't even try to refresh; redirect to initial guest setup
                        return initGuestSession();
                }
                // guestToken is httpOnly, so can't be read by JS
                    // const guestToken = getCookie('guestToken'); 
                    // if (!guestToken) {
                    //     // Don't even try to refresh; redirect to initial guest setup
                    //         return initGuestSession();
                    // }
                // guestToken is httpOnly, so can't be read by JS
            
            // Clear the old timer before attempting refresh
                clearTimeout(refreshTimer);
            
            // Assign the fetch process to a promise so others can await it
                refreshPromise = (async () => {
                    try {
                        const userEmailAddress = document.getElementById('user-email-address').textContent;
                        const response = await fetch('/api/refreshGuest', {
                            method: 'POST',
                            mode: 'cors',                  // Ensures cross-origin requests are handled
                            cache: 'no-cache',             // Prevents caching issues
                            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                            headers: {
                                'Content-Type': 'application/json',  // Sets content type
                                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                            },
                            body: JSON.stringify({          // Converts object to JSON for request
                                userEmailAddress: userEmailAddress
                            })
                            // Send cookies automatically if SameSite is correct and not cross-domain
                        });

                        if (response.status === 204 || response.ok) {
                            if(window.consoleLog===true){console.log("⏱️ Token refresh successful. Setting new timer. ⏱️");}
                            // 4. Start the timer again for the newly issued token
                                setGuestRefreshTimer();
                            return true;
                        } else if (response.status === 401) {
                            // 401 (Unauthorized) means the token was invalid/blacklisted/expired 
                                console.error("⏱️ ❌ Token refresh failed (401). Forcing logout/re-initialization. ❌ ⏱️");
                            // Redirect the user to the initial guest endpoint or a login page
                                // window.location.href = '/initialize-guest-flow'; 
                                showCustomMessage("⏱️ ❌ Token refresh failed (401). Forcing logout/re-initialization. ❌ ⏱️");
                            return false;
                        } else {
                            // Handle other errors (network issues, 500 server error)
                                console.error("⏱️ ❌ Token refresh failed with status: ", response.status," ❌ ⏱️");
                            // Optionally retry after a delay
                            return false;
                        }

                    } catch (error) {
                        console.error("⏱️ ❌ Network error during token refresh:", error," ❌ ⏱️");
                        // Optionally retry after a delay or alert the user
                        return false;
                    } finally {
                        // Reset the lock once the server responds
                            isRefreshing = false;
                            refreshPromise = null;                    
                    }
                })();
            }

    // Function to set the refresh timer
    function setGuestRefreshTimer() {
        // Check if the refresh timer is already running
            if (refreshTimer) {
                clearTimeout(refreshTimer);
            }
        
        // Set the timer to call the refresh function in 55 minutes
            refreshTimer = setTimeout(triggerGuestRefresh, REFRESH_INTERVAL_MS);
            if(window.consoleLog===true){console.log(`⏱️ Token refresh timer set for ${REFRESH_INTERVAL_MS / 60000} minutes from now at ${new Date().toLocaleTimeString()}. ⏱️`);}
            const x = parseInt(document.getElementById("sessionGuestRegen").textContent || 0);
            document.getElementById("sessionGuestRegen").textContent = x + 1;
            document.getElementById("sessionGuest").textContent = "🟢";
            // regenUserSession(); // Also regen session on timer set
    }

// 🧑🧑🧑 guest session refresh END 🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑🧑

// keep-alive ping 💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗 START
    let refreshPingTimer = null;
    // const PING_INTERVAL_MS = .5 * 60 * 1000 + Math.random() * 5000; // 1 minutes + random up to 5 seconds to avoid sync issues
    const PING_INTERVAL_MS = 1 * 90 * 1000 + Math.random() * 5000; // 1.5 minutes + random up to 5 seconds to avoid sync issues
    export function callRefreshPingTimer(){
        setRefreshPingTimer();
    }
    export function stopRefreshPingTimer(){
        if (refreshPingTimer) {
            clearTimeout(refreshPingTimer);
            refreshPingTimer = null;
            if(window.consoleLog===true){console.log("⏱️ PING timer stopped. ⏱️");}
        }   
    }
    function setRefreshPingTimer() {
        // Check if the refresh timer is already running
            if (refreshPingTimer) {
                clearTimeout(refreshPingTimer);
            }
        // Set the timer to call the refresh function in 55 minutes
            refreshPingTimer = setTimeout(triggerPing, PING_INTERVAL_MS);
            // if(window.consoleLog===true){console.log(`⏱️ PING timer set for ${PING_INTERVAL_MS / 60000} minutes from now. ⏱️`);}
    }
    async function triggerPing(){
        // Check if session is active
            const session = getCookie('guestCookie'); // The non-httpOnly one - but still useful to check existence
            if (!session) {
                if(window.consoleLog===true){console.log("💗 ❌ No active session, skipping ping. ❌ 💗");}
                return;
            }
        document.getElementById("sessionPing").classList.remove("sessionDashItemPulse");
        // const url = window.location;
        // alert(`${url}api/ping`);
        // fetch(`${url}api/ping`, {
        const response = await fetch(`/api/ping`, {
            method: "POST",
            credentials: "include",
            keepalive: true, // This mimics sendBeacon behavior
            // Explicitly tell the browser not to use cache START
                cache: "no-store", 
                headers: {
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                }            
            // Explicitly tell the browser not to use cache END
        });
        if (response.status === 200 || response.status === 204 || response.ok) {
            if(window.consoleLog===true){console.log("💗✅ Keep-alive ping successful.");}
            // document.getElementById("sessionPing").classList.add("sessionDashItemPulse");
            setRefreshPingTimer();
        } else {
            if(window.consoleLog===true){console.log("💗❌ Keep-alive ping failed.");}
        }
    }
    // // ✨ THE FIX FOR CHROME iOS: Handle visibility changes
    // document.addEventListener("visibilitychange", () => {
    //     if (document.visibilityState === "visible") {
    //         if(window.consoleLog===true){console.log("📱 App returned to foreground. Triggering fresh ping...");}
    //         triggerPing(); 
    //     }
    // });
// keep-alive ping 💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗💗 END
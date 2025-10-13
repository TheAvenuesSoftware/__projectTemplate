if(window.consoleLog===true){console.log("LOADED:- global_Client.mjs is loaded",new Date().toLocaleString());}
export function globalClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { getGooglePlacesAPIkey } from "./projectGoogleAPIs_Client.mjs";
    import { doAfterDOMandWindowLoad__globalLogin_ClientMJS } from "./globalLogin_Client.mjs";
    // import { sessionLogout } from "./globalSessions_Client.mjs";
    import { clientConfigSettings } from "../config/projectConfig_Client.mjs";
    // import { showCustomMessage } from "./globalUIpopups_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

    // console.log(actions);
    // const proAct = actions;

    document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(window.consoleLog===true){console.log('DOMContentLoaded successsful ~ global_Client.',new Date().toLocaleString());}

        window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
            if(window.consoleLog===true){console.log('Window load successsful ~ global_Client.',new Date().toLocaleString());}
            
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad__globalLogin_ClientMJS();

            await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            await doAfterDOMandWindowLoad__global_ClientMJS();

        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
    });
    // 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// doAfterDOMandWindowLoad_projectClient()
// 1️⃣🔹1️⃣ START
    async function doAfterDOMandWindowLoad__global_ClientMJS(){

        if(window.consoleLog===true){console.log('doAfterDOMandWindowLoad__global_ClientMJS() launched.',new Date().toLocaleString());}

        // // 1. Initialize guest session by hitting your backend
        //     async function initSession() {
        //         console.log(("🍪").repeat(20));
        //         const response = await fetch('/api/init-session', { credentials: 'include' }); // Sets the cookie
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         const jso = await response.json();
        //         console.log('🟢 init-session:-', jso);
        //     }
        //     initSession().then(() => {
        //         console.log('🟢 Session initialized successfully.');
        //         console.log(("🍪✅").repeat(10));
        //     }).catch(error => {
        //         console.error('🔴 Failed to initialize session:', error);
        //         // Handle session initialization failure
        //         console.log(("🍪❌").repeat(10));
        //     });    
        // 2. Call Google Places API only after session is initialized
            // initSession().then(() => {
            //     initializeGooglePlacesAutocomplete();
            // });
            getGooglePlacesAPIkey();

    }
// 1️⃣🔹1️⃣ END

// async function getProjectFunctionsMap(){
//     try {
//         const response = await fetch('/globalRouter/getProjectFunctionsMap', {
//             method: 'POST',                // Specifies a POST request
//             mode: 'cors',                  // Ensures cross-origin requests are handled
//             cache: 'no-cache',             // Prevents caching issues
//             credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
//             headers: {
//                 'Content-Type': 'application/json',  // Sets content type
//                 // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
//                 // 'Accept': 'application/json',        // Expect JSON response
//             },
//             body: JSON.stringify({          // Converts object to JSON for request
//                 POSTrequest: "getProjectFunctionsMap"
//             })
//         });
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const result = await response.json();
//         console.log('🟢 Request Success:', result);
//         return result;  // Return response data
//     } catch (error) {
//         console.error('🔴 Request Failed:', error);
//         return null;
//     }
// }

// fetch responseHandler
    export function fetchResponseHandler(res) {
        if(window.consoleLog===true){console.log("fetchResponseHandler() res:- ",res);}
        const status = res.headers.get('Status');
        if(window.consoleLog===true){console.log("fetchResponseHandler() status:- ",res.status);}
        const contentType = res.headers.get('Content-Type');
        if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
        if (res.ok) {
            // Handle response dynamically based on content type
            if (contentType.includes('application/json')) {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.json(); // Parse JSON
            } else if (contentType.includes('text/plain')) {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.text(); // Parse plain text
            } else if (contentType.includes('text/html')) {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.text(); // Parse plain text
            } else if (contentType.includes('application/octet-stream')) {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.blob(); // Handle binary data
            } else {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                throw new Error('Unexpected Content-Type');
            }
        } else {
                if(window.consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
            // Handle error response
            resStatusHandler(res);
            throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
        }
    }
// res status handler
    export function resStatusHandler(res) {
        alert("🔴 Error: " + res.status + " - " + res.statusText);
        if (!res.ok) {
            // throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
            alert(res.status);
        }
        // return res; // Process response normally
    }

// universal fetch I
    export async function universalFetch(url, method = 'GET', data = null) {
        if(window.consoleLog===true){console.log("\n",url,'\n',method,'\n',data);}
        try {
            // Ensure data is correctly formatted before using it in the request
                const body = await isValidJSONString(data)
                    ? data // Data is already stringified
                    : typeof data === 'object' 
                        ? JSON.stringify(data) // Convert object to JSON string
                        : null; // No valid data, avoid sending an incorrect body
                if(typeof body === "undefined"){
                    if(window.consoleLog===true){console.log(`🔴 This is not valid JSON:-\n${data}`);}
                }else{
                    if(window.consoleLog===true){console.log(`🟢 Valid JSON:-\n${data}`);}
                }
            // 
                const options = {
                    method,
                    credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                    headers: { 'Content-Type': 'application/json' },
                    body
                };
            // 
                if(window.consoleLog===true){console.log(url,'\n',options,'\n',options.body);}
                const response = await fetch(url, options);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    return await response.json();
        } catch (error) {
            if(window.consoleLog===true){console.error('Fetch error:', error);}
        }
    }

// universal fetch II
export async function universalFetchII(url,options){
    try {
        const response = await fetch(url,options);
        // example code START
            // const response = await fetch('https://example.com/api/resource', {
            //     method: 'POST',                // Specifies a POST request
            //     mode: 'cors',                  // Ensures cross-origin requests are handled
            //     cache: 'no-cache',             // Prevents caching issues
            //     credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,

            //     headers: {
            //         'Content-Type': 'application/json',  // Sets content type
            //         'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
            //         'Accept': 'application/json',        // Expect JSON response
            //     },
            //     body: JSON.stringify({          // Converts object to JSON for request
            //         userId: 12345,
            //         action: 'update',
            //         data: {
            //             name: "Donald",
            //             preferences: ["dark mode", "compact view"],
            //             securityCode: crypto.randomBytes(4).toString("hex")  // Example secure random code
            //         }
            //     })
            // });
        // example code END
        // **Handle response & errors properly**
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jso = await response.json();
        if(window.consoleLog===true){console.log('🟢 Request Success:', jso);}
        return jso;  // Return response data
    } catch (error) {
        if(window.consoleLog===true){console.error('🔴 Request Failed:', error);}
        return null;
    }
}

// check if JSONstring is valid
    export function isValidJSONString(data) {
        if (typeof data !== 'string') return false;
        try {
            JSON.parse(data);
            return true;
        } catch {
            return false;
        }
    }

// remove leading zeros from a number string START
    export function removeLeadingZerosFromString(myString){
        // This revised function checks if the input is a non-empty string
        // before attempting to remove leading zeros. If the input is not 
        // a string or is an empty string, it returns the input as a string
        // without any modification.
        if (typeof myString === 'string' && myString.trim().length > 0) {
            return String(Number(myString));
        }
        return myString.toString();
    // remove leading zeros from a number string END
    };

// return attributes for:- new Date() START
    export function newDateAttributes(){
        // export function newDateAttributes(addYears=0, addMonths=0, addDays=0, addHours=0, addMinutes=0, addSeconds=0){
        const weekDaysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const weekDaysLong = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
        const monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const monthsLong = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        const newDate = new Date();

        // if(window.consoleLog===true){console.log('newDate',newDate);}
        // if(window.consoleLog===true){console.log('newDate.toDateString()',newDate.toDateString());}
        // if(window.consoleLog===true){console.log('newDate.toISOString()',newDate.toISOString());}
        // if(window.consoleLog===true){console.log('newDate.toJSON()',newDate.toJSON());}
        // if(window.consoleLog===true){console.log('newDate.toLocaleDateString()',newDate.toLocaleDateString());}
        // if(window.consoleLog===true){console.log('newDate.toLocaleString()',newDate.toLocaleString());}
        // if(window.consoleLog===true){console.log('newDate.toLocaleTimeString()',newDate.toLocaleTimeString());}
        // if(window.consoleLog===true){console.log('newDate.toString()',newDate.toString());}
        // if(window.consoleLog===true){console.log('newDate.toTimeString()',newDate.toTimeString());}
        // if(window.consoleLog===true){console.log('newDate.toUTCString()',newDate.toUTCString());}
        // if(window.consoleLog===true){console.log('newDate.getTimezoneOffset()',newDate.getTimezoneOffset());}
        // if(window.consoleLog===true){console.log('newDate.getTime()',newDate.getTime());}
        // if(window.consoleLog===true){console.log('newDate.getDate()',newDate.getDate());}
        // if(window.consoleLog===true){console.log('newDate.getDay()',newDate.getDay());}
        // if(window.consoleLog===true){console.log('newDate.getMonth()',newDate.getMonth());}
        // if(window.consoleLog===true){console.log('newDate.getFullYear()',newDate.getFullYear());}
        // if(window.consoleLog===true){console.log('newDate.getHours()',newDate.getHours());}
        // if(window.consoleLog===true){console.log('newDate.getMinutes()',newDate.getMinutes());}
        // if(window.consoleLog===true){console.log('newDate.getSeconds()',newDate.getSeconds());}
        // if(window.consoleLog===true){console.log('newDate.getMilliseconds()',newDate.getMilliseconds());}
        // if(window.consoleLog===true){console.log('newDate.getUTCDate()',newDate.getUTCDate());}
        // if(window.consoleLog===true){console.log('newDate.getUTCDay()',newDate.getUTCDay());}
        // if(window.consoleLog===true){console.log('newDate.getUTCMonth()',newDate.getUTCMonth());}
        // if(window.consoleLog===true){console.log('newDate.getUTCFullYear()',newDate.getUTCFullYear());}
        // if(window.consoleLog===true){console.log('newDate.getUTCHours()',newDate.getUTCHours());}
        // if(window.consoleLog===true){console.log('newDate.getUTCMinutes()',newDate.getUTCMinutes());}
        // if(window.consoleLog===true){console.log('newDate.getUTCSeconds()',newDate.getUTCSeconds());}
        // if(window.consoleLog===true){console.log('newDate.getUTCMilliseconds()',newDate.getUTCMilliseconds());}

        const date = newDate.getDate().toString().padStart(2, '0');
        const day = newDate.getDay().toString();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear().toString();
        const hour = newDate.getHours();
        const minute = newDate.getMinutes().toString().padStart(2, '0');
        const second = newDate.getSeconds().toString().padStart(2, '0');
        const millisecond = newDate.getMilliseconds().toString();
        const weekDayShort = weekDaysShort[newDate.getDay()];
        const weekDayLong = weekDaysLong[newDate.getDay()];
        const monthShort = monthsShort[newDate.getMonth()];
        const monthLong = monthsLong[newDate.getMonth()];

        let hour24 = hour.toString().padStart(2,"0");
        let hour12 = hour.toString().padStart(2,"0");
        let ampm = "am"
        if(hour >= 12 & second > 0){
            hour12 = (hour - 12).toString().padStart(2,"0");
            ampm = "pm"
            // if(window.consoleLog===true){console.log("ampm");}
        }

        const jsonObject = {
            newDate: newDate,
            date:date,
            day:day,
            month:month,
            year:year,
            hour24:hour24,
            hour12:hour12,
            minute:minute,
            second:second,
            millisecond:millisecond,
            weekDayShort:weekDayShort,
            weekDayLong:weekDayLong,
            monthShort:monthShort,
            monthLong:monthLong,
            yyyymmdd:`${year}-${month}-${date}`,
            hhmmss24:`${hour24}:${minute}:${second}`,
            hhmmss12:`${hour12}:${minute}:${second}`,
            ampm:ampm
        };
        if(window.consoleLog===true){(console.log(`newDate:- ${newDate}\ndate:- ${date}\nday:- ${day}\nmonth:- ${month}\nyear:- ${year}\nhour12:- ${hour12}${ampm}\nhour24:- ${hour24}${ampm}\nminute:- ${minute}\nsecond:- ${second}\n`));}
        return jsonObject;
    // return attributes for:- new Date() END
    }
    // newDateAttributes();

// addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) START
    export function addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) {
        const resultDate = new Date(baseDate);

        // Adjust years and months first to handle month overflow
        resultDate.setFullYear(resultDate.getFullYear() + years);
        resultDate.setMonth(resultDate.getMonth() + months);

        // Adjust remaining fields
        resultDate.setDate(resultDate.getDate() + days);
        resultDate.setHours(resultDate.getHours() + hours);
        resultDate.setMinutes(resultDate.getMinutes() + minutes);
        resultDate.setSeconds(resultDate.getSeconds() + seconds);

        return resultDate;
    // addToDate(baseDate, years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0) END
    }
    const newDate = new Date(); // Base date
    // if(window.consoleLog===true){console.log('Base Date:', newDate);}
    const modifiedDate = addToDate(newDate, 1, -2, 10, -5, 30, 45); // Add/subtract values
    // if(window.consoleLog===true){console.log('Modified Date:', modifiedDate);}

// test API end point active/not-active START
    export async function sendDataToApi(testData,localhostEndpoint,wwwEndpoint) {
        // const primaryEndpoint = 'http://localhost:2070/testEndpoint';
        // const secondaryEndpoint = 'https://secondary-api.com/endpoint';
        const primaryEndpoint = localhostEndpoint;
        const secondaryEndpoint = wwwEndpoint;
        try {
        // Try sending data to the primary endpoint
        const response = await fetch(primaryEndpoint, {
            method: 'POST',
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Primary API failed');
        }
        // Return response if successful
        const result = await response.json();
        if(window.consoleLog===true){console.log('Success from Primary API:', result);}
        return result;
        } catch (error) {
        console.warn('Primary API failed, switching to Secondary API:', error.message);
        try {
            // Try sending data to the secondary endpoint
            const fallbackResponse = await fetch(secondaryEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            if (!fallbackResponse.ok) {
            throw new Error('Secondary API failed');
            }
            // Return response if successful
            const fallbackResult = await fallbackResponse.json();
            if(window.consoleLog===true){console.log('Success from Secondary API:', fallbackResult);}
            return fallbackResult;
        } catch (fallbackError) {
            if(window.consoleLog===true){console.error('Both APIs failed:', fallbackError.message);}
            throw fallbackError;
        }
        }
    }

// detectDeviceType() START
export function detectDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Check for iPads and iPhones
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS Device (iPhone or iPad)";
        }
    // Check for Android devices
        if (/android/i.test(userAgent)) {
            return "Android Device";
        }
    // Check for other tablets (basic heuristic)
        if (screen.width > 768 && screen.width <= 1024) {
            return "Tablet";
        }
    // Assume desktop for larger screens
        if (screen.width > 1024) {
            return "Desktop or Laptop";
        }
    // Default fallback
        return "Unknown Device";
// detectDeviceType() END
}
// if(window.consoleLog===true){console.log(detectDeviceType());}

// detectOS() START
export function detectOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/Windows NT/.test(userAgent)) {
        const version = userAgent.match(/Windows NT (\d+\.\d+)/);
        return version ? `Windows (Version ${version[1]})` : "Windows (Unknown Version)";
    } 
    if (/Mac OS X/.test(userAgent)) {
        const version = userAgent.match(/Mac OS X (\d+[_\.]\d+)/);
        return version ? `Mac OS X (Version ${version[1].replace('_', '.')})` : "Mac OS X (Unknown Version)";
    } 
    if (/Android/.test(userAgent)) {
        const version = userAgent.match(/Android (\d+\.\d+)/);
        return version ? `Android (Version ${version[1]})` : "Android (Unknown Version)";
    } 
    if (/Linux/.test(userAgent)) {
        return "Linux (Version detection not specific)";
    } 
    if (/iPhone|iPad|iPod/.test(userAgent)) {
        const version = userAgent.match(/OS (\d+[_\.]\d+)/);
        return version ? `iOS (Version ${version[1].replace('_', '.')})` : "iOS (Unknown Version)";
    }
    return "Unknown Operating System";
// detectOS() END
}
// if(window.consoleLog===true){console.log(detectOS());}

// getGlobalFooter()
export async function getGlobalFooter() {
    if(window.consoleLog===true){console.log('getGlobalFooter()...');}
    if(window.consoleLog===true){console.log('clientConfigSettings.CLIENT_SESSION_CREDENTIALS:-',clientConfigSettings.CLIENT_SESSION_CREDENTIALS);}
    const fetchUrl = `/globalRouter/getGlobalFooter`;
    const fetchOptions = {
            method: 'POST',                // Specifies a POST request
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                'Accept': 'text/html',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            }
            // ,
            // body: JSON.stringify({          
            //     a:"a"
            // }) // Converts object to JSON for request
        }
    if(window.consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            const html = await fetchResponseHandler(response); // Use the fetchResponseHandler to process the response
            if(window.consoleLog===true){console.log("getGlobalFooter() responseParsed:- ",html);}
            // if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            // const html = await response.text(); // Fetch HTML as text
            // if(window.consoleLog===true){console.log(html);} // Logs correctly? Great!
        // Inject into the page
            document.getElementById("global-footer").innerHTML = html;
    } catch (error) {
        if(window.consoleLog===true){console.error("Error fetching from:",fetchUrl, error.message);}
        if(window.consoleLog===true){console.error("Error fetching from:",fetchUrl, error.message);}
        resStatusHandler(response);
    }
}

function logAllEvents(target = document.body) {
    const allEvents = [
        "click", "dblclick", "mousedown", "mouseup", // "mousemove", "mouseenter", "mouseleave",
        "keydown", "keyup", "keypress",
        "input", "change", "focus", "blur", "submit", "reset",
        "touchstart", "touchmove", "touchend",
        "pointerdown", "pointerup", // "pointermove", 
        "drag", "dragstart", "dragenter", "dragover", "dragleave", "drop", "dragend",
        "animationstart", "animationend", "animationiteration",
        "transitionend",
        "copy", "cut", "paste",
        "wheel", "scroll",
        "contextmenu", "resize", "error", "load",
        "compositionstart", "compositionupdate", "compositionend"
    ];

    allEvents.forEach(eventType => {
        target.addEventListener(eventType, e => {
            console.log(`EVENT:-\n[${eventType}] event fired on:\n`, e.target);
        }, true); // useCapture: true to catch in capturing phase too
    });

    if(window.consoleLog===true){console.log("🎧 Event logging activated. Interact with the page to see event logs.");}
}
// logAllEvents();

// TEXTAREA CUSTOMISATIONS start
    const textAreas = document.getElementsByTagName("textarea");
    Array.from(textAreas).forEach((item, index) => {
        item.addEventListener("input", () => {
            item.style.height = "auto";
            item.style.height = ( item.scrollHeight + 16 ) + "px";
        });
    });
    // Array.from(textAreas).forEach((item, index) => {
    //     item.addEventListener("keydown", (e) => {
    //         if (e.key === "Tab") {
    //             e.preventDefault();
    //             const start = item.selectionStart;
    //             const end = item.selectionEnd;
    //             item.setRangeText("    ", start, end, "end");
    //         }
    //     });
    // });
    const SPACES = "    "; // Customize indentation width
    Array.from(textAreas).forEach((textarea, index) => {
        textarea.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();

                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;

                // Get selected text
                const selected = value.slice(start, end);
                const before = value.slice(0, start);
                const after = value.slice(end);

                if (e.shiftKey) {
                    // Outdent
                    const pattern = new RegExp("^" + SPACES);
                    const lines = selected.split("\n").map(line => line.replace(pattern, ""));
                    const newText = lines.join("\n");

                    textarea.value = before + newText + after;
                    textarea.setSelectionRange(start, start + newText.length);
                } else {
                    // Indent
                    if (start === end) {
                        // No selection, insert SPACES
                        textarea.setRangeText(SPACES, start, end, "end");
                    } else {
                        // Multiple lines
                        const lines = selected.split("\n").map(line => SPACES + line);
                        const newText = lines.join("\n");

                        textarea.value = before + newText + after;
                        textarea.setSelectionRange(start, start + newText.length);
                    }
                }
            }
        });
        textarea.addEventListener("focus", (e) => {
            textarea.value = localStorage.getItem("tas_note");
        });
        textarea.addEventListener("blur", (e) => {
            localStorage.setItem("tas_note",textarea.value);
        });
    });
// TEXTAREA CUSTOMISATIONS end

// isEmailValid() START
    export async function isEmailValid(email) {
        // Basic format check (safe and realistic)
        const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Max length constraints
        const MAX_EMAIL_LENGTH = 254;
        const MAX_LOCAL_LENGTH = 64;
        const MAX_DOMAIN_LENGTH = 255;

        if (typeof email !== 'string') return false;

        if (email.length > MAX_EMAIL_LENGTH || !formatRegex.test(email)) {
            return false;
        }

        const [localPart, domain] = email.split('@');

        if (!localPart || !domain) return false;
        if (localPart.length > MAX_LOCAL_LENGTH || domain.length > MAX_DOMAIN_LENGTH) {
            return false;
        }

        // Optional: Validate domain name format
        const domainRegex = /^(?!\-)(?:[a-zA-Z0-9\-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            return false;
        }

        // ✅ MX Record Check using Google DNS API
        try {
            const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
            const data = await response.json();

            const hasMX = data?.Answer?.some(record => record.type === 15);
            const success = data.Status === 0;

            return success && hasMX;
        } catch (err) {
            // DNS check failed (offline or blocked)
            if(window.consoleLog===true){console.warn("MX check failed:", err);}
            return false;
        }
    }
//  isEmailValid() END

// Detect dark mode preference START
    function detectDarkLightMode(){
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     console.log('Dark mode is enabled.  isDark =',isDark);
        // } else {
        //     console.log('Light mode is enabled.  isDark =',isDark);
        // }
        const favicon = document.getElementById('favicon');
        favicon.href = isDark ? './favicon_darkMode.png' : './favicon_lightMode.png';
        const appleTouchIcon = document.getElementById('apple-touch-icon');
        appleTouchIcon.href = isDark ? './favicon_darkMode.png' : './favicon_lightMode.png';
        // long-hand START
            // if(isDark===true){
            //     console.log('Dark mode is enabled.  isDark =',isDark);
            //     favicon.href = './favicon_darkMode.png';
            //     appleTouchIcon.href = './favicon_darkMode.png';
            // }else{
            //     console.log('Dark mode is NOT enabled.  isDark =',isDark);
            //     favicon.href = './favicon_lightMode.png';
            //     appleTouchIcon.href = './favicon_lightMode.png';
            // }
        // long-hand END
    }
// Detect dark mode preference END

// parse text date depending on known format d/m/y OR m/d/y START
    export function parseDate(rawDate, format = "d/m/y") {
        if (!rawDate || typeof rawDate !== "string") return null;

        const parts = rawDate.split(/[\/\-.]/); // Supports /, -, or . as separators
        let day, month, year;

        switch (format) {
            case "d/m/y":
                [day, month, year] = parts;
                break;
            case "m/d/y":
                [month, day, year] = parts;
                break;
            case "y/m/d":
                [year, month, day] = parts;
                break;
            default:
                console.warn("Unknown date format. Using raw date.");
                return new Date(rawDate);
        }

        // Zero-pad month/day if needed and convert to numbers
        const d = parseInt(day, 10);
        const m = parseInt(month, 10) - 1; // JavaScript months are 0-indexed
        const y = parseInt(year, 10);

        const date = new Date(y, m, d);
        return isNaN(date.getTime()) ? null : date;
    }
// parse text date depending on known format d/m/y OR m/d/y START

// // check the data type of a value START
//     export function getType_Simple(value) {
//         if (value === null) return 'null';
//         if (typeof value === 'number' && !isNaN(value)) return 'number';
//         if (typeof value === 'string') {
//             // Check for date (ISO format or valid date string)
//             const date = new Date(value);
//             if (!isNaN(date.getTime())){
//                 return 'date';
//             }
//             return 'text';
//         }
//         return 'unknown';
//     }
// // check the data type of a value END

// // ROBUST for CSV - check the data type of a value START
// export function getType_RobustCSV(value, dateFormat='d/m/y') {
//     console.log('getType_RobustCSV(value):-',value);
//     function sanitisedValue(raw) {
//         const val = typeof raw === 'string' ? raw.trim() : raw;
//         console.log("typeof raw === 'string' ? raw.trim() : raw;:-",val);
//         // Null or empty string → null
//             if (val === '' || val === null){
//                  return null;
//             }
//         // Check for signed numbers: +42, -3.14, etc.
//             // // if (/^[+-]?\d+(\.\d+)?$/.test(val)){
//             // if (/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(val)) {
//             //     console.log('Number detected:-',val);
//             //     console.log('Number detected:-',Number(val));
//             //     return Number(val);
//             // }
//             if(isNumeric(val)===true){
//                 console.log('isNumeric true detected:-',val);
//                 console.log('isNumeric true detected:-',Number(val.replace(/,/g, '')));
//                 // return Number(val.replace(/,/g, ''));
//                 return val.replace(/,/g, '');
//             }
//         // // Check for ISO-style date
//         //     const date = new Date(val);
//         //     if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(val)){
//         //          return date;
//         //     }
//         // Try to parse date using provided format
//             const parsedDate = parseDate(val, dateFormat);
//             if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
//                 return parsedDate;
//             }
//         // Otherwise, treat as text
//             return val;
//     }
//     const actualValue= sanitisedValue(value);
//     console.log('actualValue:-',actualValue);
//     // Type detection
//         if (actualValue === null) return 'null';
//         if (typeof actualValue === 'number') return 'number';
//         if (actualValue instanceof Date) return 'date';
//         return 'text';
// }
// // ROBUST for CSV - check the data type of a value END

export function isNumeric(val) {
    if(window.consoleLog===true){console.log('isNumeric val:-',val);}
    if (typeof val !== 'string'){
        return false;
    } // we only process strings!
    const cleaned = val.replace(/,/g, '').replace(/"/g, "").trim(); // remove commas and whitespace
    if(window.consoleLog===true){console.log('isNumeric cleaned:-',cleaned);}
    // return !isNaN(Number(cleaned));
    if (!isNaN(Number(cleaned))) return 'number';
}
export function getTypeOf(value, dateFormat='d/m/y') {
    if(window.consoleLog===true){console.log(value);}
    if (value === null) return 'null';
    if (isNumeric(String(value)) === 'number') return 'number';
    if(parseDate(value, dateFormat) instanceof Date && !isNaN(parseDate(value, dateFormat).getTime())) return 'date';
    if (typeof value === 'string') return 'text';
    return 'not: null; number; date; text';
}

function dmyToISO(dateStr, separator = "/",format = "d/m/y") {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString(); // Returns in ISO 8601 format (UTC)
}
function mdyToISO(dateStr, separator = "/",format = "m/d/y") {
    const [month, day, year] = dateStr.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString(); // Returns in ISO 8601 format (UTC)
}
function ymdToISO(dateStr, separator = "/",format = "y/m/d") {
    const [year, month, day] = dateStr.split("/").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString(); // Returns in ISO 8601 format (UTC)
}
export function convertToISO(dateStr, separator = "/",format = "d/m/y") {
    if(format === "d/m/y"){
        return dmyToISO(dateStr, separator, format);
    }else if(format === "m/d/y"){
        return mdyToISO(dateStr, separator, format);
    }else if(format === "y/m/d"){
        return ymdToISO(dateStr, separator, format);
    }else{
        if(window.consoleLog===true){console.warn("Unknown date format. Using raw date.");}
        return new Date(dateStr).toISOString();
    }
}
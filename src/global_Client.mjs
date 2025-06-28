const consoleLog = true;

console.log("LOADED:- globalClient.mjs is loaded",new Date().toLocaleString());
export function globalClientJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// fetch responseHandler
    export function fetchResponseHandler(res) {
        if(consoleLog===true){console.log("fetchResponseHandler() res:- ",res);}
        const status = res.headers.get('Status');
        if(consoleLog===true){console.log("fetchResponseHandler() status:- ",res.status);}
        const contentType = res.headers.get('Content-Type');
        if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
        if (res.ok) {
            // Handle response dynamically based on content type
            if (contentType.includes('application/json')) {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.json(); // Parse JSON
            } else if (contentType.includes('text/plain')) {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.text(); // Parse plain text
            } else if (contentType.includes('text/html')) {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.text(); // Parse plain text
            } else if (contentType.includes('application/octet-stream')) {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                return res.blob(); // Handle binary data
            } else {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
                throw new Error('Unexpected Content-Type');
            }
        } else {
                if(consoleLog===true){console.log("fetchResponseHandler() content-type:- ",contentType);}
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
        if(consoleLog===true){console.log("\n",url,'\n',method,'\n',data);}
        try {
            // Ensure data is correctly formatted before using it in the request
                const body = await isValidJSONString(data)
                    ? data // Data is already stringified
                    : typeof data === 'object' 
                        ? JSON.stringify(data) // Convert object to JSON string
                        : null; // No valid data, avoid sending an incorrect body
                if(typeof body === "undefined"){
                    if(consoleLog===true){console.log(`🔴 This is not valid JSON:-\n${data}`);}
                }else{
                    if(consoleLog===true){console.log(`🟢 Valid JSON:-\n${data}`);}
                }
            // 
                const options = {
                    method,
                    credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                    headers: { 'Content-Type': 'application/json' },
                    body
                };
            // 
                if(consoleLog===true){console.log(url,'\n',options,'\n',options.body);}
                const response = await fetch(url, options);
                    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                    return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
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
        const result = await response.json();
        console.log('🟢 Request Success:', result);
        return result;  // Return response data
    } catch (error) {
        console.error('🔴 Request Failed:', error);
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

        // if(consoleLog===true){console.log('newDate',newDate);}
        // if(consoleLog===true){console.log('newDate.toDateString()',newDate.toDateString());}
        // if(consoleLog===true){console.log('newDate.toISOString()',newDate.toISOString());}
        // if(consoleLog===true){console.log('newDate.toJSON()',newDate.toJSON());}
        // if(consoleLog===true){console.log('newDate.toLocaleDateString()',newDate.toLocaleDateString());}
        // if(consoleLog===true){console.log('newDate.toLocaleString()',newDate.toLocaleString());}
        // if(consoleLog===true){console.log('newDate.toLocaleTimeString()',newDate.toLocaleTimeString());}
        // if(consoleLog===true){console.log('newDate.toString()',newDate.toString());}
        // if(consoleLog===true){console.log('newDate.toTimeString()',newDate.toTimeString());}
        // if(consoleLog===true){console.log('newDate.toUTCString()',newDate.toUTCString());}
        // if(consoleLog===true){console.log('newDate.getTimezoneOffset()',newDate.getTimezoneOffset());}
        // if(consoleLog===true){console.log('newDate.getTime()',newDate.getTime());}
        // if(consoleLog===true){console.log('newDate.getDate()',newDate.getDate());}
        // if(consoleLog===true){console.log('newDate.getDay()',newDate.getDay());}
        // if(consoleLog===true){console.log('newDate.getMonth()',newDate.getMonth());}
        // if(consoleLog===true){console.log('newDate.getFullYear()',newDate.getFullYear());}
        // if(consoleLog===true){console.log('newDate.getHours()',newDate.getHours());}
        // if(consoleLog===true){console.log('newDate.getMinutes()',newDate.getMinutes());}
        // if(consoleLog===true){console.log('newDate.getSeconds()',newDate.getSeconds());}
        // if(consoleLog===true){console.log('newDate.getMilliseconds()',newDate.getMilliseconds());}
        // if(consoleLog===true){console.log('newDate.getUTCDate()',newDate.getUTCDate());}
        // if(consoleLog===true){console.log('newDate.getUTCDay()',newDate.getUTCDay());}
        // if(consoleLog===true){console.log('newDate.getUTCMonth()',newDate.getUTCMonth());}
        // if(consoleLog===true){console.log('newDate.getUTCFullYear()',newDate.getUTCFullYear());}
        // if(consoleLog===true){console.log('newDate.getUTCHours()',newDate.getUTCHours());}
        // if(consoleLog===true){console.log('newDate.getUTCMinutes()',newDate.getUTCMinutes());}
        // if(consoleLog===true){console.log('newDate.getUTCSeconds()',newDate.getUTCSeconds());}
        // if(consoleLog===true){console.log('newDate.getUTCMilliseconds()',newDate.getUTCMilliseconds());}

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
            // if(consoleLog===true){console.log("ampm");}
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
        if(consoleLog===true){(console.log(`newDate:- ${newDate}\ndate:- ${date}\nday:- ${day}\nmonth:- ${month}\nyear:- ${year}\nhour12:- ${hour12}${ampm}\nhour24:- ${hour24}${ampm}\nminute:- ${minute}\nsecond:- ${second}\n`));}
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
    // if(consoleLog===true){console.log('Base Date:', newDate);}
    const modifiedDate = addToDate(newDate, 1, -2, 10, -5, 30, 45); // Add/subtract values
    // if(consoleLog===true){console.log('Modified Date:', modifiedDate);}

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
        if(consoleLog===true){console.log('Success from Primary API:', result);}
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
            if(consoleLog===true){console.log('Success from Secondary API:', fallbackResult);}
            return fallbackResult;
        } catch (fallbackError) {
            console.error('Both APIs failed:', fallbackError.message);
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
// if(consoleLog===true){console.log(detectDeviceType());}

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
// if(consoleLog===true){console.log(detectOS());}

// getGlobalFooter()
export async function getGlobalFooter() {
    if(consoleLog===true){console.log('getGlobalFooter()...');}
    if(consoleLog===true){console.log('clientConfigSettings.CLIENT_SESSION_CREDENTIALS:-',clientConfigSettings.CLIENT_SESSION_CREDENTIALS);}
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
    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
    try {
        // fetch
            const response = await fetch(fetchUrl,fetchOptions);
            const html = await fetchResponseHandler(response); // Use the fetchResponseHandler to process the response
            if(consoleLog===true){console.log("getGlobalFooter() responseParsed:- ",html);}
            // if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);
            // const html = await response.text(); // Fetch HTML as text
            // if(consoleLog===true){console.log(html);} // Logs correctly? Great!
        // Inject into the page
            document.getElementById("global-footer").innerHTML = html;
    } catch (error) {
        console.error("Error fetching from:",fetchUrl, error.message);
        console.error("Error fetching from:",fetchUrl, error.message);
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

    console.log("🎧 Event logging activated. Interact with the page to see event logs.");
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
// TEXTAREA CUSTOMISATIONS start
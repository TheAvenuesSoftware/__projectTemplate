const consoleLog = true;

console.log("LOADED:- projectClient.mjs is loaded",new Date().toLocaleString());
export function projectMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { getGlobalFooter } from "./globalClient.mjs";
    import { getGooglePlacesAPIkey } from "./googleAPIs_ClientSide.mjs";
    import { doAfterDOMandWindowLoad_globalLoginClient } from "./globalLoginClient.mjs";
    import { sessionLogout } from "./globalSessionsClient.mjs";
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// const clientConfigSettings = {
//     // CLIENT_APP_NAME: "Personal Expense Tracker",
//     CLIENT_API_KEY: "your-key-here", // public key only!!!
//     CLIENT_BASE_URL: "http://192.168.1.117:3000",
//     CLIENT_DATES_ALLOW_FUTURE: false,
//     CLIENT_DATES_ALLOW_ANY_PAST: false,
//     CLIENT_SESSION_WARNING_DELAY: clientSessionWarningDelay,
//     CLIENT_SESSION_EXPIRED_DELAY: clientSessionExpiredDelay,
//     CLIENT_SESSION_HEARTBEAT_INTERVAL: 5, // minutes
//     CLIENT_SESSION_IDLE_LOGOUT_AFTER: 20, // minutes
//     CLIENT_SESSION_CREDENTIALS: "include"
//         // # Valid Options for credentials
//             // # - "include" → Sends cookies and authentication headers for both same-origin and cross-origin requests.
//             // # - "same-origin" → Only sends credentials if the request is to the same origin.
//             // # - "omit" → Does not send credentials at all (cookies and headers excluded).

// };

    document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(consoleLog===true){console.log('projectClient DOMContentLoaded successsful.',Date.now());}

        window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
            if(consoleLog===true){console.log('projectClient window load successsful.',Date.now());}

            // 1️⃣🔹1️⃣ see projectClient.mjs
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
                await doAfterDOMandWindowLoad_projectClient();

            // 1️⃣🔹2️⃣ see globalClient.mjs
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
                await doAfterDOMandWindowLoad_globalLoginClient();

            // dynamically set fetch "credentials mode" START 🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹
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

            // set up draggable "M"enu button START 🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇
                function showMenu(){
                    const menu = document.getElementById("menu");
                    console.log('🟢 showMenu() called');
                    // document.getElementById("menu-button").focus(); // Give focus to an element
                    // setTimeout(() => alert("d"), 100); // Slight delay avoids event conflicts
                    alert("d");
                }
                const menuButton = document.getElementById("menu-button");
                let offsetX, offsetY, isDragging = false;
                // Start Dragging (Mouse & Touch)
                    const startDrag = (e) => {
                        isDragging = true;
                        // Get initial position relative to mouse/touch point
                            offsetX = e.clientX ? e.clientX - menuButton.offsetLeft : e.touches[0].clientX - menuButton.offsetLeft;
                            offsetY = e.clientY ? e.clientY - menuButton.offsetTop : e.touches[0].clientY - menuButton.offsetTop;
                        // Prevent default touch behavior (like scrolling) ✅ Calling e.preventDefault() stops unintended page movement
                            e.preventDefault();
                        document.addEventListener("mousemove", dragMove);
                        document.addEventListener("mouseup", endDrag);
                        document.addEventListener("touchmove", dragMove);
                        document.addEventListener("touchend", endDrag);
                    };
                // Move Button (Mouse & Touch)
                    const dragMove = (e) => {
                        if (!isDragging) return;
                        // Prevent scrolling when moving touch ✅ Calling e.preventDefault() stops unintended page movement
                            e.preventDefault();
                        const x = e.clientX ? e.clientX - offsetX : e.touches[0].clientX - offsetX;
                        const y = e.clientY ? e.clientY - offsetY : e.touches[0].clientY - offsetY;
                        menuButton.style.left = `${x}px`;
                        menuButton.style.top = `${y}px`;
                    };
                // Stop Dragging (Mouse & Touch)
                    const endDrag = () => {
                        isDragging = false;
                        document.removeEventListener("mousemove", dragMove);
                        document.removeEventListener("mouseup", endDrag);
                        document.removeEventListener("touchmove", dragMove);
                        document.removeEventListener("touchend", endDrag);
                    };
                menuButton.addEventListener("mousedown", startDrag);
                // Why add {passive: false}
                    // - By default, browsers treat touch events as "passive", meaning they allow scrolling even if e.preventDefault() is called.
                    // - Setting { passive: false } ensures that e.preventDefault() works correctly to stop unintended scrolling while dragging.
                        menuButton.addEventListener("touchstart", startDrag);
                        menuButton.addEventListener("touchstart", startDrag, { passive: false });
                // Show menu on double-click || long press on mobile devices
                    // laptop and desktop - double click
                        menuButton.addEventListener("dblclick", showMenu);
                    // mobile devices - long press
                        // - touchstart → Starts a timer for 500ms (adjustable)
                        // - touchend / touchmove / touchcancel → Cancels the timer if touch is released or moved
                        // - Prevents accidental menu triggers from quick taps
                        // - Works smoothly on iPhone & Android!
                            let pressTimer;
                            // Detect Long Press
                                menuButton.addEventListener("touchstart", (e) => {
                                    pressTimer = setTimeout(() => {
                                        showMenu(); // Trigger menu display
                                    }, 500); // Adjust time (500ms = half a second)
                                }, { passive: false });
                            // Cancel Long Press on Touch End or Move
                            menuButton.addEventListener("touchend", () => clearTimeout(pressTimer));
                            menuButton.addEventListener("touchmove", () => clearTimeout(pressTimer));
                            menuButton.addEventListener("touchcancel", () => clearTimeout(pressTimer));
            // set up draggable "M"enu button END 🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇

            // idle tracking START 🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
                let lastActivity = Date.now();
                // const updateActivity = () => {
                function updateActivity(){
                    lastActivity = Date.now();
                    console.log('🟢 User activety detected.',(new Date()).toLocaleString());
                };
                // document.addEventListener("mousemove", updateActivity);
                // document.addEventListener("keydown", updateActivity);
                // document.addEventListener("click", updateActivity);
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
                            // document.removeEventListener("mousemove", updateActivity);
                            // document.removeEventListener("keydown", updateActivity);
                            // document.removeEventListener("click", updateActivity);
                            clearInterval(idleTracking_IntervalId); 
                            sessionLogout(); //in globalSessionsClient.mjs
                    }
                }, heartBeatInterval * 60 * 1000); // Runs every 5 min
            // idle tracking END🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸
        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
    });
    // 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// doAfterDOMandWindowLoad_projectClient()
// 1️⃣🔹1️⃣
    function doAfterDOMandWindowLoad_projectClient(){

        if(consoleLog===true){console.log('doAfterDOMandWindowLoad_projectClient() launched.',Date.now());}

        // ###################################################################################################
            // globalClientJS.getGlobalFooter();
            getGlobalFooter();

            getGooglePlacesAPIkey();
            document.getElementById("close-map").addEventListener("click", function() {
                document.getElementById("map-container").style.display = "none";
            });

        // 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸

            // ✅ Start Camera & Stream to <video>
            async function startCamera() {
                console.log("Starting camera...");
                const videoConstraints = {
                    facingMode: "environment", // rear camera:- "environment"; front camera:- "user"
                    // facingMode: "user", // rear camera:- "environment"; front camera:- "user"
                    width: { ideal: 1280 },    // Ideal resolution width, will automatically scale back if necessary
                    height: { ideal: 720 },    // Ideal resolution height, will automatically scale back if necessary
                    frameRate: { ideal: 30 }   // Smooth video at 30fps, will automatically scale back if necessary
                };
                try {
                    const cameraContainer = document.getElementById("camera-container");
                    const video = document.getElementById("camera-stream");
                    // const stream = await navigator.mediaDevices.getUserMedia({ video: {facingMode: "user"} });                               
                    const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
                    video.srcObject = stream;
                    video.addEventListener("loadedmetadata", () => {
                        console.log("Video dimensions:", video.videoWidth, "x", video.videoHeight);
                        console.log("Displayed dimensions:", video.offsetWidth, "x", video.offsetHeight);
                        cameraContainer.style.maxWidth = video.offsetWidth + "px";
                        cameraContainer.style.margin = "0 auto"; // top and bottom margin zero; left and right auto
                        cameraContainer.style.height = "auto";
                        // - videoWidth and videoHeight → Original video file dimensions.
                        // - offsetWidth and offsetHeight → Size of the <video> element on the page (can be resized via CSS).
                        // - loadedmetadata → Ensures dimensions are available before accessing them.
                    });
                } catch (error) {
                    console.error("Error accessing camera:", error);
                }
            }

            // ✅ Capture Photo & Draw to Canvas
            function capturePhoto() {
                const video = document.getElementById("camera-stream");
                const canvas = document.getElementById("photo-canvas");
                const context = canvas.getContext("2d");

                // canvas.width = video.videoWidth;
                // canvas.height = video.videoHeight;
                canvas.width = video.offsetWidth;
                canvas.height = video.offsetHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Hide camera, show canvas & save button
                video.style.display = "none";
                canvas.style.display = "block";
                // document.getElementById("save-btn").style.display = "inline";
                document.getElementById("save-btn").style.visibility = "visible";
            }

            const imageCompression = 1; // imageCompression level for JPEG (0.1 = 10% quality, 1 = no imageCompression)
            // ✅ Compress Image Before Sending to Backend >>> Blob
                async function canvasToBlob(canvas,imageCompression=1) {
                    return new Promise(resolve => {
                        canvas.toBlob(blob => {
                            console.log("canvasToBlob(canvas,imageCompression=1):-", blob); // Log Blob
                            window.window_image_Blob_compressed = blob; // Store Blob globally if needed
                            resolve(blob);
                        }, "image/jpeg", imageCompression);
                    });
                }
            // ✅ Compress Image Before Sending to Backend >>> DataURL
                function canvasToDataURL(canvas,imageCompression=1) {
                    return canvas.toDataURL("image/jpeg", imageCompression); // Compress to smaller JPEG
                }

            // ✅ Save Photo & Data to SQLite via API
            async function savePhotoToDB() {
                const canvas = document.getElementById("photo-canvas");                
                const image_DataURL_compressed = canvasToDataURL(canvas, imageCompression);
                console.log("Compressed Image DataURL:", image_DataURL_compressed); // Log DataURL
                const image_Blob_compressed = await canvasToBlob(canvas,imageCompression);
                console.log("Compressed Image Blob:", image_Blob_compressed); // Log Blob
                console.log("Compressed Image Blob:", window_image_Blob_compressed); // Log Blob
                console.log("image_Blob_compressed.type",image_Blob_compressed.type); // Should log something like "image/jpeg"
                const userEmailAddress = document.getElementById("user-email-address").textContent; // Get user email from element
                const address = document.getElementById("googlePlacesAPIautocomplete").value;
                const notes = document.getElementById("notes-input").value;
                const formData = new FormData();
                formData.append("image_blob", image_Blob_compressed, "photo.jpg"); // Add Blob with optional filename
                formData.append("image_date", new Date().toLocaleDateString());
                formData.append("image_time", new Date().toLocaleTimeString());
                formData.append("image_address", address);
                formData.append("image_notes", notes);
                formData.append("userEmailAddress", userEmailAddress);
                try {
                    const fetchUrl = "/dbRouter/save-photo";
                    const fetchOptions = {
                            method: 'POST',
                            mode: 'cors',                  // Ensures cross-origin requests are handled
                            cache: 'no-cache',             // Prevents caching issues
                            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                            headers: {
                                // - Content-Type header issue:
                                //     - Since you're using FormData, you shouldn't manually set "Content-Type": "multipart/form-data".
                                //     - The browser automatically sets the correct boundary for multipart/form-data. Manually setting it could lead to an error because the boundary isn’t included. You should remove that header.
                                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                            },
                            body: formData  // Use FormData for file uploads / blobs
                        }
                    if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                    if(consoleLog===true){console.log(fetchOptions);}
                    for (const [key, value] of formData.entries()) {
                        console.log(`${key}:`, value);
                    }
                    const response = await fetch(fetchUrl, fetchOptions);
                    const result = await response.json();
                    console.log(result.message);
                } catch (error) {
                    console.error("Error saving photo:", error);
                }
            }

            // ✅ Event Listeners
                document.getElementById("capture-btn").addEventListener("click", capturePhoto);
                document.getElementById("save-btn").addEventListener("click", savePhotoToDB);
                document.getElementById("retrieve-btn").addEventListener("click", loadPhotos);

            // ✅ Start Camera on Page Load
                startCamera();

        // 📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸📸

        // 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️
            async function filterPhotos(userEmailAddress,image_id) {
                console.log("Filtering photos");
                try {
                            const fetchUrl = "/dbRouter/filter-photos-by-address";
                            const fetchOptions = {
                                method: 'POST',
                                mode: 'cors',                  // Ensures cross-origin requests are handled
                                cache: 'no-cache',             // Prevents caching issues
                                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                                headers: {
                                    'Content-Type': 'application/json',  // Sets content type
                                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                                },
                                body:JSON.stringify({
                                    userEmailAddress:userEmailAddress, 
                                    filterText:filterText
                                })
                            }
                    if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                    const response = await fetch(fetchUrl, fetchOptions);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log(response.message);
                } catch (error) {
                    console.error("Error applying filter:", error);
                }
            }
            async function deletePhoto(userEmailAddress,image_id) {
                console.log(image_id);
                console.log("Delete button clicked for image ID:", image_id);
                try {
                            const fetchUrl = "/dbRouter/delete-photo-by-id";
                            const fetchOptions = {
                                method: 'POST',
                                mode: 'cors',                  // Ensures cross-origin requests are handled
                                cache: 'no-cache',             // Prevents caching issues
                                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                                headers: {
                                    'Content-Type': 'application/json',  // Sets content type
                                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                                },
                                body:JSON.stringify({
                                    userEmailAddress:userEmailAddress, 
                                    image_id:image_id 
                                })
                            }
                    if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                    const deleteResponse = await fetch(fetchUrl, fetchOptions);
                    if (!deleteResponse.ok) {
                        throw new Error(`HTTP error! status: ${deleteResponse.status}`);
                    }
                    const deleteResult = await deleteResponse.json();
                    console.log(deleteResult.message);
                    if (deleteResult.success) {
                        // Remove the photo card from the DOM
                        event.target.parentElement.remove();
                    } else {
                        console.error("Failed to delete photo:", deleteResult.message);
                    }
                } catch (error) {
                    console.error("Error deleting photo:", error);
                }
            }
            async function loadPhotos() {
                // document.getElementById("retrieve-btn").addEventListener("click", async () => {
                const photosContainer = document.getElementById("photos-container");
                try {
                    // const response = await fetch("/get-all-photos", {
                    //     method: "POST",
                    //     headers: { "Content-Type": "application/json" },
                    //     body: JSON.stringify({ userEmailAddress: "your-email@example.com" }) // Replace with actual email
                    // });
                            const userEmailAddress = document.getElementById("user-email-address").textContent; // Get user email from element
                            const address = document.getElementById("googlePlacesAPIautocomplete").value;
                            const fetchUrl = "/dbRouter/get-all-photos";
                            const fetchOptions = {
                                method: 'POST',
                                mode: 'cors',                  // Ensures cross-origin requests are handled
                                cache: 'no-cache',             // Prevents caching issues
                                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                                headers: {
                                    'Content-Type': 'application/json',  // Sets content type
                                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                                },
                                body:JSON.stringify({userEmailAddress:userEmailAddress, image_address:address })
                            }
                            if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                            const response = await fetch(fetchUrl, fetchOptions);
                    const photos = await response.json();
                    photosContainer.innerHTML = ""; // Clear previous content
                    if (!photos.length) {
                        photosContainer.innerHTML = "<p>No photos available.</p>";
                        return;
                    }
                    photos.forEach(photo => {
                        const photoCard = document.createElement("div");
                        photoCard.className = "photo-card";
                        // Handle null values gracefully
                            // 1 causes error, but can be ignored
                                const imageSrc = photo.image_blob || "placeholder.jpg"; // Use default if null
                            // // 2 doesn't work
                            //     const imageSrc = photo.image_blob 
                            //                     ? `data:image/png;base64,${photo.image_blob.toString("base64")}` 
                            //                     : "placeholder.jpg"; // Fallback
                            // // 3 doesn't work
                            //     const imageSrc = photo.image_blob?.buffer 
                            //                     ? `data:image/png;base64,${photo.image_blob.buffer.toString("base64")}`
                            //                     : "placeholder.jpg";
                            const imageDate = photo.image_date || "Unknown Date";
                            const imageTime = photo.image_time || "Unknown Time";
                            const imageAddress = photo.image_address || "No Address Provided";
                            const imageNotes = photo.image_notes || "No Notes Available";
                            const imageID = photo.image_id;
                        photoCard.innerHTML = `
                            <img src="${imageSrc}" alt="Photo" class="photo">
                            <p><strong>Date:</strong> ${imageDate}</p>
                            <p><strong>Time:</strong> ${imageTime}</p>
                            <p><strong>Address:</strong> ${imageAddress}</p>
                            <p><strong>Notes:</strong> ${imageNotes}</p>
                            <div id="image_id"><strong>ID:</strong> ${imageID}</div>
                            <button id="imageDelete" class="std-btn" data-image_id='${imageID}'>Delete Image # ${imageID}</button>
                        `;
                        photosContainer.appendChild(photoCard);
                    });
                    document.querySelectorAll(".delImgBtn").forEach(button => {
                        button.addEventListener("click", async (event) => {
                            const delID = event.target.getAttribute("data-image_id");
                            deletePhoto(userEmailAddress,delID * 1);
                        });
                    });
                } catch (error) {
                    console.error("Error fetching photos:", error);
                    photosContainer.innerHTML = "<p>Failed to load photos.</p>";
                }
            }
        // 🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️🖼️
}
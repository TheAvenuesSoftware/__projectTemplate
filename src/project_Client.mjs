const consoleLog = true;

console.log("LOADED:- project_Client.mjs is loaded",new Date().toLocaleString());
export function projectMJSisLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
    import { clientConfigSettings } from "./projectConfig_Client.mjs";
    import { showCustomMessage } from "./globalUIpopups_Client.mjs";
    import { newDateAttributes } from "./global_Client.mjs";
    import { initTinyMCE } from "./projectTinyMCE_Client.mjs";
    import { initAutocomplete } from "./projectGoogleAPIs_Client.mjs"
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// 🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️
    // functions mapping START
        export const actions = {
            alertDateTime: () => alert(`Current date and time: ${new Date().toLocaleString()}`),
            showNotes: () => doThis('showNotes'),
            insertRecord: async () => await insertRecord(),
            // find search retrieve get START
                searchByAddress: () => {
                    document.getElementById("search-button").setAttribute("data-action", "filterByAddress")
                    document.getElementById("search-input").type = "text"; // Ensures numeric input for date
                },
                searchByNote: () => {
                    document.getElementById("search-button").setAttribute("data-action", "filterByNote")
                    document.getElementById("search-input").type = "text"; // Ensures numeric input for date
                },
                searchByDate: () => {
                    document.getElementById("search-button").setAttribute("data-action", "filterByDate");
                    document.getElementById("search-input").type = "date"; // Ensures numeric input for date
                },
                filterByAddress: () => filterBy("address"),
                filterByNote: () => filterBy("note"),
                filterByDate: () => filterBy("date"),
            // find search retrieve get END
            // edit update START
                // address
                    editRecordAddress: (event) => editRecordAddress(event),
                    saveEditedAddress: (event) => saveEditedAddress(event),
                // note
                    editRecordNote: (event) => editRecordNote(event),
                    saveEditedNote: (event) => saveEditedNote(event),
                // record
                    deleteRecord: async (event) => await deleteRecord(event)
            // edit update END
        };
    // functions mapping END
// 🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️
// 🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴
// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
    // DOM element "data-action" functions START
        let filteredRecords = {}; // Store filtered records globally
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export function editRecordNote(event){
                console.log(`filteredRecords:-\n`,filteredRecords);
                const filteredRecordID = event.target.dataset.imageId;
                console.log(`filteredRecordID:- `,filteredRecordID);
                console.log(`filteredRecord:-\n`,filteredRecords[`${filteredRecordID}`]);
                const imageID = filteredRecords[`${filteredRecordID}`].image_id || '';
                console.log(`filteredRecord imageID:- `,imageID);
                // insert DOM element textarea START
                    const editNoteDiv = document.createElement("div");
                    editNoteDiv.className = "record-card-edit-note";
                    const noteHTML = filteredRecords[`${filteredRecordID}`].image_notes || '';
                    console.log(noteHTML);
                    localStorage.setItem('tas_note_toEdit', noteHTML);
                    editNoteDiv.innerHTML = `<textarea id='tinymce_${imageID}' class='tinymce-editor'>${noteHTML}</textarea>`;
                    const anchorElement = document.getElementById(event.target.id);
                    // console.log(event.target.id);
                    // console.log(anchorElement);
                    anchorElement.after(editNoteDiv); // append after the anchor element.  append; prepend; before; after
                // insert DOM element textarea END
                // initialise TinyMCE START
                    const tinymceEditor = document.getElementById(`tinymce_${imageID}`);
                    console.log(tinymceEditor); // textarea, now style="display: none;"
                    initTinyMCE(tinymceEditor); // Call this to initialize TinyMCE editor
                // initialise TinyMCE END
                // insert save button START
                    const editNoteDivSaveBtn = document.createElement("div");
                    editNoteDivSaveBtn.innerHTML = 
                    `
                        <button id='saveEditedNote${imageID}' class="std-btn" data-action="saveEditedNote" data-record-id='${imageID}'>Save changes to note # ${imageID}</button>
                    `
                    const anchorIIElement = document.getElementById(`deleteRecord${imageID}`);
                    console.log(event.target.id);
                    console.log(anchorIIElement);
                    anchorIIElement.before(editNoteDivSaveBtn); // append after the anchorII element.  append; prepend; before; after
                // insert save button END
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export async function saveEditedNote(event){
                console.log('saveEditedNote:-\n',event);
                const noteToSave = localStorage.getItem("tas_note_edited");
                const recordIdToUpdate = event.target.dataset.recordId;
                console.log('noteToSave:-\n',noteToSave);
                console.log('recordIdToUpdate:-',recordIdToUpdate);
                try {
                    // const userEmailAddress = document.getElementById("user-email-address").textContent;
                    const userEmailAddress = "donald.garton@outlook.com";
                    console.log(userEmailAddress);
                    const fetchUrl = "/dbRouter/update-record";
                    const fetchOptions = {
                            method: 'POST',
                            mode: 'cors',                  // Ensures cross-origin requests are handled
                            cache: 'no-cache',             // Prevents caching issues
                            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                            headers: {
                                'Content-Type': 'application/json',  // Sets content type
                                // - POTENTIAL Content-Type header issue:
                                //     - IF you're using FormData, you shouldn't manually set "Content-Type": "multipart/form-data".
                                //     - The browser automatically sets the correct boundary for multipart/form-data. Manually setting it could lead to an error because the boundary isn’t included. You should remove that header.
                                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                            },
                            body: JSON.stringify({
                                fileName: userEmailAddress,
                                tableName: "photos",
                                updates:{
                                    image_notes: noteToSave
                                },
                                recordIdToUpdate: recordIdToUpdate
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                    const response = await fetch(fetchUrl, fetchOptions);
                    const jso = await response.json(); // Fetch JSON 
                    console.log(jso);
                } catch (error) {
                    console.error(`Error updating record # ${recordIdToUpdate} image_notes in photos :`, error);
                }
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export function editRecordAddress(event){
                console.log(`filteredRecords:-\n`,filteredRecords);
                const filteredRecordID = event.target.dataset.imageId;
                console.log(`filteredRecordID:- `,filteredRecordID);
                console.log(`filteredRecord:-\n`,filteredRecords[`${filteredRecordID}`]);
                const imageID = filteredRecords[`${filteredRecordID}`].image_id || '';
                console.log(`filteredRecord imageID:- `,imageID);
                document.getElementById("googlePlacesAPIautocomplete_0").value = filteredRecords[`${filteredRecordID}`].image_address || '';
                document.getElementById("note-date-time").textContent = filteredRecords[`${filteredRecordID}`].image_date + ' ' + filteredRecords[`${filteredRecordID}`].image_time || '';
                document.getElementById("note-address").textContent = filteredRecords[`${filteredRecordID}`].image_address || '';
                // insert DOM element input START
                    const editAddressDiv = document.createElement("div");
                    editAddressDiv.className = "record-card-edit-address";
                    const addressValue = filteredRecords[`${filteredRecordID}`].image_address || '';
                    console.log(addressValue);
                    localStorage.setItem(`tas_address_edit`,addressValue);
                    editAddressDiv.innerHTML = `
                        <input id="googlePlacesAPIautocomplete_${imageID}" class="autocomplete-address-input" type="text" placeholder="Enter address here..."><br>
                        <button id='saveEditedAddress${imageID}' class="std-btn" data-action="saveEditedAddress" data-image-id='image_${imageID}'>Save address # ${imageID}</button>`;
                const filteredListContainer = document.getElementById("filteredList-container");
                const anchorElement = document.getElementById(event.target.id);
                console.log(event.target.id);
                console.log(anchorElement);
                anchorElement.after(editAddressDiv); // append after the anchor element
                initAutocomplete(`googlePlacesAPIautocomplete_${imageID}`);
                // insert save button START
                    const editAddressDivSaveBtn = document.createElement("div");
                    editAddressDivSaveBtn.innerHTML = 
                    `
                        <button id='saveEditedAddress${imageID}' class="std-btn" data-action="saveEditedAddress" data-record-id='${imageID}'>Save changes to address # ${imageID}</button>
                    `
                    const anchorIIElement = document.getElementById(`deleteRecord${imageID}`);
                    console.log(event.target.id);
                    console.log(anchorIIElement);
                    anchorIIElement.before(editAddressDivSaveBtn); // append after the anchorII element.  append; prepend; before; after
                // insert save button END
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export async function saveEditedAddress(event){
                console.log('saveEditedAddress:-\n',event);
                const addressToSave = localStorage.getItem("tas_address_edited");
                const recordIdToUpdate = event.target.dataset.recordId;
                console.log('addressToSave:-\n',addressToSave);
                console.log('recordIdToUpdate:-',recordIdToUpdate);
                try {
                    // const userEmailAddress = document.getElementById("user-email-address").textContent;
                    const userEmailAddress = "donald.garton@outlook.com";
                    console.log(userEmailAddress);
                    const fetchUrl = "/dbRouter/update-record";
                    const fetchOptions = {
                            method: 'POST',
                            mode: 'cors',                  // Ensures cross-origin requests are handled
                            cache: 'no-cache',             // Prevents caching issues
                            credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                            headers: {
                                'Content-Type': 'application/json',  // Sets content type
                                // - POTENTIAL Content-Type header issue:
                                //     - IF you're using FormData, you shouldn't manually set "Content-Type": "multipart/form-data".
                                //     - The browser automatically sets the correct boundary for multipart/form-data. Manually setting it could lead to an error because the boundary isn’t included. You should remove that header.
                                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                            },
                            body: JSON.stringify({
                                fileName: userEmailAddress,
                                tableName: "photos",
                                updates:{
                                    image_address: addressToSave
                                },
                                recordIdToUpdate: recordIdToUpdate
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                    const response = await fetch(fetchUrl, fetchOptions);
                    const jso = await response.json(); // Fetch JSON 
                    console.log(jso);
                } catch (error) {
                    console.error(`Error updating record # ${recordIdToUpdate} image_address in photos :`, error);
                }
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            // filterBy START
                export async function filterBy(filterField) {
                    console.log("filterBy() called.");
                    try {
                        // const userEmailAddress = document.getElementById("user-email-address").textContent;
                        const userEmailAddress = "donald.garton@outlook.com";
                        console.log(userEmailAddress);
                        const filterText = `%${document.getElementById("search-input").value}%`;
                        if (!filterText) {
                            showCustomMessage("Please enter part of an address to search.");
                            return;
                        }
                        let dateDD = null;
                        let dateMM = null;
                        let dateYYYY = null;
                        if (filterField === "date") {
                            const date = new Date(document.getElementById("search-input").value);
                            console.log(date);
                            if (isNaN(date)) {
                                showCustomMessage("Please enter a valid date.");
                                return;
                            } else {
                                dateDD = date.getDate().toString().padStart(2, '0');
                                dateMM = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                                dateYYYY = date.getFullYear().toString();
                                console.log(dateDD, dateMM, dateYYYY);
                            }
                        }
                        const fetchUrl = "/dbRouter/filter-by";
                        const fetchOptions = {
                                method: 'POST',
                                mode: 'cors',                  // Ensures cross-origin requests are handled
                                cache: 'no-cache',             // Prevents caching issues
                                credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
                                headers: {
                                    'Content-Type': 'application/json',  // Sets content type
                                    // - POTENTIAL Content-Type header issue:
                                    //     - IF you're using FormData, you shouldn't manually set "Content-Type": "multipart/form-data".
                                    //     - The browser automatically sets the correct boundary for multipart/form-data. Manually setting it could lead to an error because the boundary isn’t included. You should remove that header.
                                    // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                                    // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
                                },
                                body: JSON.stringify({
                                    userEmailAddress: userEmailAddress,
                                    filterField: filterField,
                                    filterText: filterText,
                                    dateDD: dateDD,
                                    dateMM: dateMM,
                                    dateYYYY: dateYYYY
                                })
                            }
                        if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                        const response = await fetch(fetchUrl, fetchOptions);
                        const filteredList = await response.json();
                        console.log("Filtered List:", filteredList);
                        const filteredListContainer = document.getElementById("filteredList-container");
                        filteredListContainer.innerHTML = ""; // Clear previous content
                        if (!filteredList.length) {
                            filteredListContainer.innerHTML = "<p>No photos available.</p>";
                            return;
                        }
                        filteredList.forEach(photo => {
                            const recordCard = document.createElement("div");
                            recordCard.className = "record-card";
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
                            recordCard.innerHTML = `
                                <p><strong>RECORD # ${imageID}</strong></p>
                                <img src="${imageSrc}" alt="Photo" class="photo">
                                <p><strong>Date:</strong> ${imageDate}</p>
                                <p><strong>Time:</strong> ${imageTime}</p>
                                <hr>
                                <p><strong>Address:</strong> ${imageAddress}</p>
                                <button id='addressEdit${imageID}' class="std-btn" data-action="editRecordAddress" data-image-id='image_${imageID}'>Edit address # ${imageID}</button>
                                <hr>
                                <p><strong>Notes:</strong> ${imageNotes}</p>
                                <button id='noteEdit${imageID}' class="std-btn" data-action="editRecordNote" data-image-id='image_${imageID}'>Edit note # ${imageID}</button>
                                <br>
                                <button id='deleteRecord${imageID}' class="std-btn-red" data-action="deleteRecord" data-record-id='image_${imageID}'>DELETE RECORD # ${imageID}</button>
                                <hr><hr><br>
                            `;
                            filteredListContainer.appendChild(recordCard);
                            filteredRecords[`image_${imageID}`] = {
                                image_blob: imageSrc,
                                image_date: imageDate,
                                image_time: imageTime,
                                image_address: imageAddress,
                                image_notes: imageNotes,
                                image_id: imageID
                            }
                        });
                    } catch (error) {
                        console.error("Error in filterBy():", error);
                    }

                }
            // filterBy END
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            // getByNote START
                export function getByNote() {
                    const note = document.getElementById("search-input").value;
                    if (!note) {
                        showCustomMessage("Please enter a note to search.");
                        return;
                    }
                    const fetchUrl = `/dbRouter/get-by-note/${encodeURIComponent(note)}`;
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
                    };
                    if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                    fetch(fetchUrl, fetchOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Search results:", data);
                        const resultsContainer = document.getElementById("search-results");
                        resultsContainer.innerHTML = ''; // Clear previous results
                        if (data.length === 0) {
                            resultsContainer.innerHTML = '<p>No results found.</p>';
                        } else {
                            data.forEach(item => {
                                const resultItem = document.createElement("div");
                                resultItem.className = "search-result-item";
                                resultItem.innerHTML = `
                                    <p><strong>Address:</strong> ${item.image_address}</p>
                                    <p><strong>Date:</strong> ${item.image_date}</p>
                                    <p><strong>Time:</strong> ${item.image_time}</p>
                                    <p><strong>Notes:</strong> ${item.image_notes}</p>
                                    <img src="${item.image_blob}" alt="Image" class="search-result-image">
                                `;
                                resultsContainer.appendChild(resultItem);
                            });
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching search results:", error);
                        showCustomMessage("Error fetching search results. Please try again.");
                    });
                }
            // getByNote END
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            // insertRecord START
                export async function insertRecord(){
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
                    console.log("insertRecord() called.");
                    // ✅ Save Photo & Data to SQLite via API
                        const canvas = document.getElementById("canvasII");                
                        const image_DataURL_compressed = canvasToDataURL(canvas, imageCompression);
                        console.log("Compressed Image DataURL:", image_DataURL_compressed); // Log DataURL
                        const image_Blob_compressed = await canvasToBlob(canvas,imageCompression);
                        console.log("Compressed Image Blob:", image_Blob_compressed); // Log Blob
                        console.log("Compressed Image Blob:", window_image_Blob_compressed); // Log Blob
                        console.log("image_Blob_compressed.type",image_Blob_compressed.type); // Should log something like "image/jpeg"
                        const userEmailAddress = document.getElementById("user-email-address").textContent; // Get user email from element
                        const address = document.getElementById("googlePlacesAPIautocomplete_0").value;
                        const imageDATE = new Date().toLocaleDateString();
                        const imageDD = newDateAttributes().date;
                        const imageMM = newDateAttributes().month;
                        const imageYYYY = newDateAttributes().year;
                        const imageTIME = new Date().toLocaleTimeString();
                        // const notes = document.getElementById("save_note_0").value;
                        const notesHTML = localStorage.getItem('tas_note') || ''; // Get notes from localStorage
                        const formData = new FormData();
                        formData.append("image_blob", image_Blob_compressed, "photo.jpg"); // Add Blob with optional filename
                        formData.append("image_date", imageDATE);
                        formData.append("image_dd", imageDD);
                        formData.append("image_mm", imageMM);
                        formData.append("image_yyyy", imageYYYY);
                        formData.append("image_time", imageTIME);
                        formData.append("image_address", address);
                        formData.append("image_notes", notesHTML);
                        // formData.append("userEmailAddress", userEmailAddress);
                        formData.append("userEmailAddress", "donald.garton@outlook.com");
                        console.log("FormData entries:", Array.from(formData.entries())); // Log FormData entries
                        try {
                            const fetchUrl = "/dbRouter/insert-record";
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
                            if (result.message==="Missing user details ~ authentication denied!") {
                                showCustomMessage("Missing user details ~ authentication denied");
                            }
                        } catch (error) {
                            console.error("Error saving photo:", error);
                        }
                }
            // insertRecord END
// DOM element "data-action" functions END
// ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️
// 🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴🏳️🏴
// 🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️

//1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START

    document.addEventListener("DOMContentLoaded",async () => {

        if(consoleLog===true){console.log('DOMContentLoaded successsful ~ projectClient.',Date.now());}

        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START

            window.addEventListener("load",async () => {

                if(consoleLog===true){console.log('Window load successsful ~ projectClient.',Date.now());}

                await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
                await doAfterDOMandWindowLoad();

            });

        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END

    });

// 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// 1️⃣🔹1️⃣ START 1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣

    function doAfterDOMandWindowLoad(){

        // 🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻
            // add PROJECT SPECIFIC event listeners START
                let logCount = 0;
                document.addEventListener("click", (event) => {
                    // Prevents the event from bubbling up to parent elements START
                        event.stopPropagation(); // Prevents the event from bubbling up to parent elements
                    // Prevents the event from bubbling up to parent elements END
                    logCount++;
                    console.log(logCount,event.target); // will log twice if clicked on a radio button label.
                    const action = event.target.dataset.action;
                    const handler = actions[action];
                    console.log(`Action: ${action}, Handler: ${handler}`);
                    if (typeof handler === "function"){
                        try{
                            console.warn(`🟢 Handler found for action: ${event.target.dataset.action}`);
                            handler(event);
                        } catch (error) {
                            console.error(`🔴 Error executing handler for action: ${event.target.dataset.action}`, error);
                        }   
                    } else {
                        console.warn(`🔴 No handler found for action: ${event.target.dataset.action}`);
                    }
                });
            // add PROJECT SPECIFIC event listeners END
        // 🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻🔊🎤🦻

    }

// 1️⃣🔹1️⃣  END  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣  1️⃣🔹1️⃣
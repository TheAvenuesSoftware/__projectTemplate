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
    import { selectImageToUpload } from "./globalUploadImage_Client.mjs";
    import { uploadImageToCanvas } from "./globalUploadImage_Client.mjs";
    import { isEmailValid } from "./global_Client.mjs";
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// 🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️🗺️
    // functions mapping START
        export const actions = {
            alertDateTime: () => alert(`Current date and time: ${new Date().toLocaleString()}`),
            showNotes: () => doThis('showNotes'),
            selectImageToUpload: () => selectImageToUpload(),
            uploadImageToCanvas: () => uploadImageToCanvas(),
            insertFormDataRecord: async () => await insertFormDataRecord(),
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
            export async function deleteRecord(event){
                const recordIdToDELETE = event.target.dataset.recordId;
                console.log('recordIdToDELETE:-',recordIdToDELETE);
                try {
                    const userEmailAddress = document.getElementById("user-email-address").textContent;
                    // const userEmailAddress = "donald.garton@outlook.com";
                    console.log(userEmailAddress);
                    const fetchUrl = "/dbRouter/delete-record";
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
                                updates: {
                                    field_to_update: "None.  DELETE record."
                                },
                                where: {
                                    conditions: [
                                        { field: "image_id", operator: "=", value: recordIdToDELETE }
                                    ],
                                    // logic: "AND" // or "OR" if needed
                                }
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                    const response = await fetch(fetchUrl, fetchOptions);
                    const jso = await response.json(); // Fetch JSON 
                    console.log(jso);
                    if(jso.success===true){
                        if(jso.deleted === 0){
                            showCustomMessage(`No records found to delete`);
                            return;
                        }
                        // steps START
                            // 1 remove the record from the DOM
                                const recordElement = document.getElementById(`record${recordIdToDELETE}`);
                                if(recordElement) {
                                    recordElement.remove(); // Remove the record element from the DOM
                                }
                            // 2 remove the record from filteredRecords
                                delete filteredRecords[`${recordIdToDELETE}`];
                                console.log(`Record # ${recordIdToDELETE} deleted from filteredRecords.`);
                        // steps END
                        showCustomMessage(`Record # ${recordIdToDELETE} deleted successfully.`);
                    }
                } catch (error) {
                    console.error(`Error DELETING record # ${recordIdToDELETE} in photos :`, error);
                }
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export function editRecordNote(event){
                event.target.disabled = true;
                console.log(`filteredRecords:-\n`,filteredRecords);
                const filteredRecordID = event.target.dataset.recordId;
                console.log(`filteredRecordID:- `,filteredRecordID);
                console.log(`filteredRecord:-\n`,filteredRecords[`${filteredRecordID}`]);
                const imageID = filteredRecords[`${filteredRecordID}`].image_id || '';
                console.log(`filteredRecord imageID:- `,imageID);
                if(imageID !== parseInt(filteredRecordID)){
                    showCustomMessage("Error: conflicting ID.  Edit cannot proceed.");
                    return;
                }
                // insert DOM element textarea START
                    const editNoteTinymceContainer = document.createElement("div");
                    editNoteTinymceContainer.id = `editNoteTinymceContainer${imageID}`;
                    editNoteTinymceContainer.className = "record-card-edit-note";
                    // const noteHTML = filteredRecords[`${filteredRecordID}`].image_notes || '';
                    const noteHTML = document.getElementById(`notes${filteredRecordID}`).innerHTML;
                    console.log(noteHTML);
                    localStorage.setItem('tas_note_toEdit', noteHTML);
                    editNoteTinymceContainer.innerHTML = `<textarea id='tinymce_${imageID}' class='tinymce-editor'>${noteHTML}</textarea>`;
                    const anchorElement = document.getElementById(event.target.id);
                    anchorElement.after(editNoteTinymceContainer); // append after the anchor element.  append; prepend; before; after
                // insert DOM element textarea END
                // initialise TinyMCE START
                    // const tinymceEditor = document.getElementById(`noteEdit${imageID}`);
                    const tinymceEditor = document.getElementById(`editNoteTinymceContainer${imageID}`);
                    console.log(tinymceEditor); // textarea, now style="display: none;"
                    initTinyMCE(tinymceEditor); // Call this to initialize TinyMCE editor
                // initialise TinyMCE END
                // insert save button START
                    const editNoteTinymceContainerSaveBtn = document.createElement("div");
                    editNoteTinymceContainerSaveBtn.style.textAlign = "center";
                    editNoteTinymceContainerSaveBtn.innerHTML = 
                    `
                        <button id='saveEditedNote${imageID}' class="std-btn" data-action="saveEditedNote" data-record-id='${imageID}'>Save changes to note # ${imageID}</button>
                    `
                    const anchorIIElement = document.getElementById(`deleteRecord${imageID}`);
                    console.log(event.target.id);
                    console.log(anchorIIElement);
                    anchorIIElement.before(editNoteTinymceContainerSaveBtn); // append after the anchorII element.  append; prepend; before; after
                // insert save button END
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export async function saveEditedNote(event){
                console.log('saveEditedNote:-\n',event);
                const recordIdToUpdate = event.target.dataset.recordId;
                const editNoteBtn = document.getElementById(`noteEdit${recordIdToUpdate}`);
                editNoteBtn.disabled = false; // Re-enable the edit button
                const noteToSave = localStorage.getItem("tas_note_edited"); // this localStorage item is updated by TinyMCE editor.on 'blur'
                event.target.remove();
                console.log('noteToSave:-\n',noteToSave);
                console.log('recordIdToUpdate:-',recordIdToUpdate);
                try {
                    const userEmailAddress = document.getElementById("user-email-address").textContent;
                    // const userEmailAddress = "donald.garton@outlook.com";
                    console.log(userEmailAddress);
                    const fetchUrl = "/dbRouter/update-data-record";
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
                                updates: {
                                    image_notes: noteToSave
                                },
                                where: {
                                    conditions: [
                                        { field: "image_id", operator: "=", value: recordIdToUpdate }
                                    ],
                                    // logic: "AND" // or "OR" if needed
                                }
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                    const response = await fetch(fetchUrl, fetchOptions);
                    const jso = await response.json(); // Fetch JSON 
                    console.log(jso);
                    console.log(jso.updates.image_notes);
                    if(jso.success===true){
                        // steps START
                            // 1 update the notes in the DOM
                                const notesElement = document.getElementById(`notes${recordIdToUpdate}`);
                                notesElement.innerHTML = jso.updates.image_notes; // Update the notes in the DOM
                            // 2 destroy TinyMCE editor instance
                                tinymce.get(`editNoteTinymceContainer${recordIdToUpdate}`)?.remove();
                            // 3 remove the notes input element
                                const editNoteTinymceContainer = document.getElementById(`editNoteTinymceContainer${recordIdToUpdate}`);
                                editNoteTinymceContainer.remove(); // Remove the notes input element
                        // steps END
                    }else{
                        showCustomMessage("Failed to update note", "error");
                    }
                } catch (error) {
                    console.error(`Error updating record # ${recordIdToUpdate} image_notes in photos :`, error);
                }
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export function editRecordAddress(event){
                event.target.disabled = true;
                console.log(`filteredRecords:-\n`,filteredRecords);
                const filteredRecordID = event.target.dataset.recordId;
                console.log(`filteredRecordID:- `,filteredRecordID);
                console.log(`filteredRecord:-\n`,filteredRecords[`${filteredRecordID}`]);
                const imageID = filteredRecords[`${filteredRecordID}`].image_id || '';
                console.log(`filteredRecord imageID:- `,imageID);
                document.getElementById("googlePlacesAPIautocomplete_0").value = filteredRecords[`${filteredRecordID}`].image_address || '';
                document.getElementById("note-date-time").textContent = filteredRecords[`${filteredRecordID}`].image_date + ' ' + filteredRecords[`${filteredRecordID}`].image_time || '';
                document.getElementById("note-address").textContent = filteredRecords[`${filteredRecordID}`].image_address || '';
                // insert DOM element input START
                    const editAddressDiv = document.createElement("div");
                    // editAddressDiv.className = "record-card-edit-address";
                    editAddressDiv.id = "autocomplete-address-container";
                    editAddressDiv.className = "autocomplete-address-container";
                    // const addressValue = filteredRecords[`${filteredRecordID}`].image_address || '';
                    const addressElement = document.getElementById(`address${imageID}`);
                    const addressValue = addressElement.textContent || '';
                    console.log(addressValue);
                    localStorage.setItem(`tas_address_toEdit`,addressValue);
                    editAddressDiv.innerHTML = `
                        <input id="googlePlacesAPIautocomplete_${imageID}" class="autocomplete-address-input" type="text" placeholder="Enter address here..."><br>
                        `;
                    const anchorElement = document.getElementById(event.target.id);
                    console.log(event.target.id);
                    console.log(anchorElement);
                    anchorElement.after(editAddressDiv); // append after the anchor element
                // insert DOM element input END
                // initialise Google API START
                    // document.getElementById(`googlePlacesAPIautocomplete_${imageID}`).value = filteredRecords[`${filteredRecordID}`].image_address || '';
                    document.getElementById(`googlePlacesAPIautocomplete_${imageID}`).value = addressElement.textContent || '';
                    initAutocomplete(`googlePlacesAPIautocomplete_${imageID}`);
                // initialise Google API END
                // insert save button START
                    const editAddressDivSaveBtn = document.createElement("div");
                    editAddressDivSaveBtn.style.textAlign = "center";
                    editAddressDivSaveBtn.innerHTML = `
                        <button id='saveEditedAddress${imageID}' class="std-btn" data-action="saveEditedAddress" data-record-id='${imageID}'>Save changes to address # ${imageID}</button>
                        `;
                    const anchorIIElement = document.getElementById(`googlePlacesAPIautocomplete_${imageID}`);
                    console.log(event.target.id);
                    console.log(anchorIIElement);
                    anchorIIElement.after(editAddressDivSaveBtn); // append after the anchorII element.  append; prepend; before; after
                // insert save button END
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            export async function saveEditedAddress(event){
                console.log('saveEditedAddress:-\n',event);
                const recordIdToUpdate = event.target.dataset.recordId;
                const editAddressBtn = document.getElementById(`addressEdit${recordIdToUpdate}`);
                editAddressBtn.disabled = false; // Re-enable the edit button
                const addressToSave = document.getElementById(`googlePlacesAPIautocomplete_${recordIdToUpdate}`).value;
                event.target.remove();
                localStorage.setItem("tas_address_edited",addressToSave);
                console.log('addressToSave:-\n',addressToSave);
                console.log('recordIdToUpdate:-',recordIdToUpdate);
                try {
                    const userEmailAddress = document.getElementById("user-email-address").textContent;
                    // const userEmailAddress = "donald.garton@outlook.com";
                    console.log(userEmailAddress);
                    const fetchUrl = "/dbRouter/update-data-record";
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
                                updates: {
                                    image_address: addressToSave
                                },
                                where: {
                                    conditions: [
                                        { field: "image_id", operator: "=", value: recordIdToUpdate }
                                    ],
                                    // logic: "AND" // or "OR" if needed
                                }
                            })
                        }
                    if(consoleLog===true){console.log(fetchUrl,fetchOptions);}
                    const response = await fetch(fetchUrl, fetchOptions);
                    const jso = await response.json(); // Fetch JSON 
                    console.log(jso);
                    console.log(jso.updates.image_address);
                    if(jso.success===true){
                        const addressElement = document.getElementById(`address${recordIdToUpdate}`);
                        addressElement.textContent = jso.updates.image_address; // Update the address in the DOM
                        const addressInputContainer = document.getElementById("autocomplete-address-container");
                        addressInputContainer.remove(); // Remove the address input container
                    }else{
                        showCustomMessage("failed to update address", "error");
                    }
                } catch (error) {
                    console.error(`Error updating record # ${recordIdToUpdate} image_address in photos :`, error);
                }
            }
        // 🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦
            // filterBy START
                export async function filterBy(filterField) {
                    console.log("filterBy() called.");
                    try {
                        const userEmailAddress = document.getElementById("user-email-address").textContent;
                        // const userEmailAddress = "donald.garton@outlook.com";
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
                        const jso = await response.json();
                        if(jso.success !== true){
                            // showCustomMessage("Error filtering records. Please try again.", "error");
                            showCustomMessage(jso.message);
                            return;
                        }
                        const filteredList = jso.formattedPhotos || [];
                        console.log("Filtered List:", filteredList);
                        // re-set all previous filtered records START
                            const filteredListContainer = document.getElementById("filteredList-container");
                            while (filteredListContainer.firstChild) {
                                filteredListContainer.removeChild(filteredListContainer.firstChild);
                            }
                            const x = filteredListContainer;
                            console.log("filteredListContainer:-\n",x);
                        // re-set all previous filtered records END
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
                                recordCard.id = `recordCard${imageID}`;
                            recordCard.innerHTML = `
                                <p><strong>Photo # ${imageID}</strong></p>
                                <img src="${imageSrc}" alt="Photo" class="photo">
                                <p><strong>Date:</strong> ${imageDate}</p>
                                <p><strong>Time:</strong> ${imageTime}</p>
                                <hr>
                                <p><strong>Address:</strong></p>
                                <p id='address${imageID}' style="border:1px solid black;padding:5px;">${imageAddress}</p>
                                <button id='addressEdit${imageID}' class="std-btn" data-action="editRecordAddress" data-record-id='${imageID}'>Edit address # ${imageID}</button>
                                <hr>
                                <p><strong>Notes:</strong></p>
                                <div id='notes${imageID}' class="tinymce-textarea">${imageNotes}</div>
                                <button id='noteEdit${imageID}' class="std-btn" data-action="editRecordNote" data-record-id='${imageID}'>Edit note # ${imageID}</button>
                                <hr>
                                <button id='deleteRecord${imageID}' class="std-btn-red" data-action="deleteRecord" data-record-id='${imageID}'>DELETE RECORD # ${imageID}</button>
                            `;
                            filteredListContainer.appendChild(recordCard);
                            filteredRecords[`${imageID}`] = {
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
            // insertFormDataRecord START
                export async function insertFormDataRecord(){
                    // check if an image has been captured START
                    	const canvasII = document.getElementById('canvasII'); // for image capture in section-save
                        const ctx = canvasII.getContext('2d');
                        const imageData = ctx.getImageData(0, 0, canvasII.width, canvasII.height);
                        const pixels = new Uint32Array(imageData.data.buffer);
                        const hasImage = pixels.some(pixel => pixel !== 0);
                        console.log(hasImage);
                        console.log(hasImage ? "Canvas has image data" : "Canvas is blank");
                        if(hasImage===false){
                            showCustomMessage("No image exists.  Please capture an image.")
                            return;
                        }
                    // check if an image has been captured END
                    // check for address START
                        const address = document.getElementById("save_address").textContent;
                        if(address.length===0){
                            showCustomMessage("No address exists.  Please enter an address.")
                            return;
                        }
                    // check for address END
                    // check for note START
                        // const notes = document.getElementById("save_note_0").value;
                        const notesHTML = localStorage.getItem('tas_note_0') || ''; // Get notes from localStorage
                        if(notesHTML.length===0){
                            showCustomMessage("No note exists.  Please enter a note.")
                            return;
                        }
                    // check for note END
                    // check for user email START
                        // check if user email exists in the DOM
                        const userEmailAddress = document.getElementById("user-email-address").textContent; // Get user email from element
                        const userEmailAddressStatus = await isEmailValid(userEmailAddress);
                        if(userEmailAddressStatus===false){
                            showCustomMessage("Invalid email address.  Please sign in with a valid email address.");
                            return;
                        }
                    // check for user email END
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
                    console.log("insertFormDataRecord() called.");
                    // ✅ Save Photo & Data to SQLite via API
                        const canvas = document.getElementById("canvasII");                
                        const image_DataURL_compressed = canvasToDataURL(canvas, imageCompression);
                        console.log("Compressed Image DataURL:", image_DataURL_compressed); // Log DataURL
                        const image_Blob_compressed = await canvasToBlob(canvas,imageCompression);
                        console.log("Compressed Image Blob:", image_Blob_compressed); // Log Blob
                        console.log("Compressed Image Blob:", window_image_Blob_compressed); // Log Blob
                        console.log("image_Blob_compressed.type",image_Blob_compressed.type); // Should log something like "image/jpeg"
                        // const userEmailAddress = document.getElementById("user-email-address").textContent; // Get user email from element
                        const imageDATE = new Date().toLocaleDateString();
                        const imageDD = newDateAttributes().date;
                        const imageMM = newDateAttributes().month;
                        const imageYYYY = newDateAttributes().year;
                        const imageTIME = new Date().toLocaleTimeString();
                        const formData = new FormData();
                        formData.append("image_blob", image_Blob_compressed, "photo.jpg"); // Add Blob with optional filename
                        formData.append("image_date", imageDATE);
                        formData.append("image_dd", imageDD);
                        formData.append("image_mm", imageMM);
                        formData.append("image_yyyy", imageYYYY);
                        formData.append("image_time", imageTIME);
                        formData.append("image_address", address);
                        formData.append("image_notes", notesHTML);
                        formData.append("userEmailAddress", userEmailAddress);
                        // formData.append("userEmailAddress", "donald.garton@outlook.com");
                        console.log("FormData entries:", Array.from(formData.entries())); // Log FormData entries
                        try {
                            const fetchUrl = "/dbRouter/insert-form-data-record";
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
                            if(result.success===true){
                                showCustomMessage("Added new record, successfully.");
                            }
                            if (result.message==="Missing user details ~ authentication denied!") {
                                showCustomMessage("Missing user details ~ authentication denied");
                            }
                        } catch (error) {
                            console.error("Error saving photo:", error);
                        }
                }
            // insertFormDataRecord END
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
                            console.warn(`🟢 Handler found at element: ${event.target.id}`);
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
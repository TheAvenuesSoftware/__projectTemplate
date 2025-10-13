if(window.consoleLog===true){console.log("LOADED:- projectSQLite_Client.mjs is loaded",new Date().toLocaleString());}
export function projectSQLite_Client_isLoaded(){
    return true;
}

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

// 🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️

    // Load Photos from SQLite 🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
    async function filterPhotos(userEmailAddress,image_id) {
        if(window.consoleLog===true){console.log("Filtering photos");}
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
            if(window.consoleLog===true){console.log(JSON.stringify(fetchOptions));}
            const response = await fetch(fetchUrl, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if(window.consoleLog===true){console.log(response.message);}
        } catch (error) {
            if(window.consoleLog===true){console.error("Error applying filter:", error);}
        }
    }

    // 🗑️ DELETE Photos from SQLite 🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️
    async function deletePhoto(userEmailAddress,image_id) {
        if(window.consoleLog===true){console.log(image_id);}
        if(window.consoleLog===true){console.log("Delete button clicked for image ID:", image_id);}
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
            if(window.consoleLog===true){console.log(JSON.stringify(fetchOptions));}
            const deleteResponse = await fetch(fetchUrl, fetchOptions);
            if (!deleteResponse.ok) {
                throw new Error(`HTTP error! status: ${deleteResponse.status}`);
            }
            const deleteResult = await deleteResponse.json();
            if(window.consoleLog===true){console.log(deleteResult.message);}
            if (deleteResult.success) {
                // Remove the photo card from the DOM
                event.target.parentElement.remove();
            } else {
                if(window.consoleLog===true){console.error("Failed to delete photo:", deleteResult.message);}
            }
        } catch (error) {
            if(window.consoleLog===true){console.error("Error deleting photo:", error);}
        }
    }

    // 🔍 Load Photos from SQLite 🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
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
                    const address = document.getElementById("googlePlacesAPIautocomplete_0").value;
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
                    if(window.consoleLog===true){console.log(JSON.stringify(fetchOptions));}
                    const response = await fetch(fetchUrl, fetchOptions);
            const photos = await response.json();
            photosContainer.innerHTML = ""; // Clear previous content
            if (!photos.length) {
                photosContainer.innerHTML = "<p>No photos available.</p>";
                return;
            }
            photos.forEach(photo => {
                const photoCard = document.createElement("div");
                photoCard.className = "record-card";
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

// Simulated fetch from server
async function fetchRecords() {
  // Replace with actual fetch logic
  return [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];
}

// Render a single record
function renderRecord(record, container) {
  const wrapper = document.createElement("div");
  wrapper.className = "record";
  wrapper.dataset.id = record.id;

  const fields = Object.entries(record).filter(([key]) => key !== "id");
  const fieldElements = {};

  fields.forEach(([key, value]) => {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.className = "field";

    const label = document.createElement("label");
    label.textContent = key;

    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.disabled = true;
    input.name = key;

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);
    wrapper.appendChild(fieldWrapper);

    fieldElements[key] = input;
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    Object.values(fieldElements).forEach(input => input.disabled = false);
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  };

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.style.display = "none";
  saveBtn.onclick = async () => {
    const updatedData = {};
    Object.entries(fieldElements).forEach(([key, input]) => {
      updatedData[key] = input.value;
      input.disabled = true;
    });

    await updateRecord(record.id, updatedData);
    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
  };

  wrapper.appendChild(editBtn);
  wrapper.appendChild(saveBtn);
  container.appendChild(wrapper);
}

// Update record on server
async function updateRecord(id, data) {
  // Replace with actual PUT/PATCH logic
  if(window.consoleLog===true){console.log(`Updating record ${id}:`, data);}
  // Example:
  // await fetch(`/api/records/${id}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data)
  // });
}

// Initialize UI
async function initUI() {
  const container = document.getElementById("record-container");
  const records = await fetchRecords();
  records.forEach(record => renderRecord(record, container));
}

initUI();
// 🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️🗄️
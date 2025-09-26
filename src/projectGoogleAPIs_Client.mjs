const consoleLog = true;

// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

console.log("LOADED:- projectGoogleAPIs_Client.mjs is loaded",new Date().toLocaleString());

async function loadScript(src) {
    console.log(`loadScript(src) executed.`)
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve(script); // Resolve once the script loads
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.body.appendChild(script);
    });
}

export function initAutocomplete(inputId) {
    const addressInput = document.getElementById(inputId);
    if(!addressInput){
        console.warn(`Input with ID '${inputId}' not found.`);
        return;
    }
    if (!google.maps || !google.maps.places) {
        console.error("Google Maps Places library is not available yet.");
        return;
    }
    // var addressInput = document.getElementById("googlePlacesAPIautocomplete");
    var addressOptions = {
        componentRestrictions: { country: "AU" } // Restrict to Australia
    };
    var autocomplete = new google.maps.places.Autocomplete(addressInput, addressOptions);

    // added by Donald START
        addressInput.addEventListener("click",(ev) => {
            setTimeout(()=>{
                addressInput.setSelectionRange(0, addressInput.value.length);
            },5)
        })
    // added by Donald END

    function handlePlaceChange() {
        console.log(`📌📍 place changed 📍📌`);
        var place = autocomplete.getPlace();
        if (!place) {
            // if (!place.geometry) {
                console.error("No location data found.");
                return;
        }else{
            // console.log(`📌📍 place changed to 📍📌:- ${JSON.stringify(place)}`);
            console.log(`📌📍 place changed to 📍📌:- ${JSON.stringify(place.geometry)}`);
            const save_address = document.getElementById("save_address");
            save_address.textContent = document.getElementById("googlePlacesAPIautocomplete_0").value;
        }

        var map = new google.maps.Map(document.getElementById("map"), {
            center: place.geometry.location,
            // ZOOM changed by Donald START
                // zoom: 14
                zoom: 16
            // ZOOM changed by Donald END
        });
        // added by Donald START
            localStorage.setItem("tas_address",addressInput.value);
            localStorage.setItem("tas_placeGeometryLocation",JSON.stringify(place.geometry.location));
            document.getElementById("save_address").textContent = addressInput.value;
        // added by Donald END

        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: {
                url: "./map-marker.webp", // Replace with your icon URL
                scaledSize: new google.maps.Size(40, 40), // Resize icon
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            },
            animation: google.maps.Animation.DROP
            // animation: google.maps.Animation.BOUNCE
        });

    };
    autocomplete.addListener("place_changed", handlePlaceChange);
    // setTimeout(()=>{
    //     handlePlaceChange();
    //     alert("E");
    // },3000)

};


function initMap() { // initialises to a fixed address
    const placeGeometryLocation = JSON.parse(localStorage.getItem("tas_placeGeometryLocation"));
    if (placeGeometryLocation &&
        isFinite(placeGeometryLocation.lat) &&
        isFinite(placeGeometryLocation.lng)) {
        const geoLoc = {
            lat: placeGeometryLocation.lat,
            lng: placeGeometryLocation.lng
        };
        const map = new google.maps.Map(document.getElementById("map"), {
            center: geoLoc,
            zoom: 16
        });
        // Add marker
        new google.maps.Marker({
            position: geoLoc, // or place.geometry.location if you have it
            map: map,
            icon: {
                url: "./map-marker.webp", // Replace with your icon URL
                scaledSize: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40)
            },
            animation: google.maps.Animation.DROP
        });
    } else {
        console.warn("Invalid or missing location data.");
    }
};
// showMapInIframe() START
    export function showMapInIframe(){
        const addressInput = document.getElementById('googlePlacesAPIautocomplete_0');
        const address = addressInput.value.trim();

        if (!address) {
        alert('Please enter an address.');
        return;
        }

        const encodedAddress = encodeURIComponent(address);
        const iframeSrc = `https://www.google.com/maps/embed/v1/place?key=${googlePlacesAndMapsAPIkey}&q=${encodedAddress}`;

        const iframe = document.createElement('iframe');
        iframe.width = "100%";
        // iframe.height = "450";
        iframe.height = "100%";
        iframe.style.border = "0";
        iframe.loading = "lazy";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        iframe.src = iframeSrc;

        const mapDiv = document.getElementById('map');
        mapDiv.innerHTML = ""; // Clear previous iframe if any
        mapDiv.appendChild(iframe);

        // Show the map container
        document.getElementById('map-container').style.display = 'block';
    }
// showMapInIframe() END

let googlePlacesAndMapsAPIkey;
export async function getGooglePlacesAPIkey() {

    try {
        const fetchUrl = "/googleAPIsRouter/get-google-places-api-key";
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',                  // Ensures cross-origin requests are handled
            cache: 'no-cache',             // Prevents caching issues
            // credentials: clientConfigSettings.CLIENT_SESSION_CREDENTIALS,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',  // Sets content type
                // 'Authorization': `Bearer ${yourAccessToken}`, // Uses token-based auth (if applicable)
                // 'Accept': 'application/json',        // Sets content type for res. If not json, server may return error. Use response.json() to parse the response.
            },
            body:JSON.stringify({
                getGoogleAPIkey:'Get Google API key'
            })
        }
        if(consoleLog===true){console.log(JSON.stringify(fetchOptions));}
        const response = await fetch(fetchUrl, fetchOptions);
        // const response = await fetch('/googleAPIsRouter/get-google-places-api-key');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jso = await response.json();
        if(consoleLog===true){console.log(jso.success?"✅ Google Places API key fetched successfully.":"❌ Failed to fetch Google Places API key.");}
        // DON'T LOG THE API KEY!!! console.log(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&loading=async&libraries=places&callback=initMap`);
        // DON'T LOG THE API KEY!!! console.log(jso);
        // DON'T LOG THE API KEY!!! console.log(jso.apiKey);

        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&libraries=places`)
        .then(() => {
            console.log("Google Maps API script loaded successfully.");
			googlePlacesAndMapsAPIkey = jso.apiKey;
            // initAutocomplete("googlePlacesAPIautocomplete_0"); // Ensures autocomplete runs **after** Maps loads
            // initMap(); // Initializes the map to fixed location...
        })
        .then(() => {
            initAutocomplete("googlePlacesAPIautocomplete_0"); // Ensures autocomplete runs **after** Maps loads
            initMap(); // Initializes the map to fixed location...
        })
        .catch(error => console.error("Error loading Google Maps script:", error));

    } catch (error) {
        console.error('Error fetching API key or loading scripts:', error);
    }
}
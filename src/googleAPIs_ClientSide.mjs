// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️
//  ONLY IMPORT CLIENT SIDE MODULES TO HERE
// ♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️♾️

console.log("LOADED:- googleAPIs_ClientSide.mjs is loaded",new Date().toLocaleString());

async function loadScript(src) {
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

function initAutocomplete() {
    if (!google.maps || !google.maps.places) {
        console.error("Google Maps Places library is not available yet.");
        return;
    }
    var addressInput = document.getElementById("googlePlacesAPIautocomplete");
    var addressOptions = {
        componentRestrictions: { country: "AU" } // Restrict to Australia
    };
    var autocomplete = new google.maps.places.Autocomplete(addressInput, addressOptions);

    autocomplete.addListener("place_changed", function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.error("No location data found.");
            return;
        }

        var map = new google.maps.Map(document.getElementById("map"), {
            center: place.geometry.location,
            zoom: 14
        });

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

        // // document.getElementById("map-container").style.display = "flex";
        // document.getElementById("map").style.maxWidth = "600px";
        // document.getElementById("map").style.height = "auto";
        const mapContainer = document.getElementById("map-container");
        // Make the container visible
            mapContainer.style.display = "block";
        // Ensure the map resizes properly
            google.maps.event.trigger(map, "resize");
        // // Optionally, re-center the map
        //     map.setCenter({ lat: -33.8688, lng: 151.2093 });

    });


};

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2093 }, // Sydney
        zoom: 12
    });
};


export async function getGooglePlacesAPIkey() {
    try {
        const response = await fetch('/googleAPIsRouter/google-places-api-key');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jso = await response.json();
        // DON'T LOG THE API KEY!!! console.log(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&loading=async&libraries=places&callback=initMap`);
        // DON'T LOG THE API KEY!!! console.log(jso);
        // DON'T LOG THE API KEY!!! console.log(jso.apiKey);

        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&libraries=places`)
        // await loadScript(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&libraries=places&callback=initMap`)
        .then(() => {
            console.log("Google Maps API script loaded successfully.");
            initAutocomplete(); // Ensures autocomplete runs **after** Maps loads
            // initMap(); // Initializes the map
        })
        .catch(error => console.error("Error loading Google Maps script:", error));

    } catch (error) {
        console.error('Error fetching API key or loading scripts:', error);
    }
}
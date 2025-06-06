

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

        document.getElementById("map-container").style.display = "block";

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
        console.log(`https://maps.googleapis.com/maps/api/js?key=${jso.apiKey}&loading=async&libraries=places&callback=initMap`);
        console.log(jso);
        console.log(jso.apiKey);

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
JS code********

document.addEventListener('DOMContentLoaded', function () {
    const destinationSelectInput = document.getElementById('select-destination');
    const destinationSelectButton = document.getElementById('get-direction-button');
    const mapContainer = document.getElementById('map');
    const sceneEl = document.querySelector('a-scene');
    let map;

    // Function to initialize the map and get the user's current location
    const initMapAndLocation = async () => {
        try {
            // Initialize the map with Mapbox
            mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1ZGFtaW5pNDMyMDAzIiwiYSI6ImNscnZvemNpYTBlNzcyanRreDE5ZzhoZWIifQ.5ju-8M5p0icYTlMbhOf1wg';
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 15,
            });

            // Get the user's current location
            const userLocation = await getCurrentLocation();

            // Update map with user's current location
            updateMapCenter(userLocation.latitude, userLocation.longitude);
        } catch (error) {
            console.error('Error initializing map and getting initial location:', error);
        }
    };

    // Function to get the user's current location
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => {
                    console.error('Error in retrieving position', error);
                    reject(error);
                },
                { enableHighAccuracy: true, maximumAge: 0, timeout: 27000 }
            );
        });
    };

    // Function to update the map center
    const updateMapCenter = (latitude, longitude) => {
        map.setCenter([longitude, latitude]);
    };

    // Function to update the map with the route (replace with Mapbox routing service)
    const updateMapWithRoute = (origin, destination) => {
        // Use Mapbox routing service here
        // ...
    };

    // Function to get directions from an API
    const getDirections = async (origin, destination) => {
        const apiKey = 'pk.eyJ1Ijoic2F1ZGFtaW5pNDMyMDAzIiwiYSI6ImNscnZvemNpYTBlNzcyanRreDE5ZzhoZWIifQ.5ju-8M5p0icYTlMbhOf1wg'; // Replace with Mapbox API key
        const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?access_token=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.routes[0].legs[0].steps;
        } catch (error) {
            console.error('Error fetching directions:', error);
            throw error;
        }
    };

    // Function to update AR elements based on directions
    const updateARDirections = (waypoints) => {
        // Remove existing AR markers and path
        removeExistingARMarkers();
        removeExistingARPath();

        // Create AR path element
        const path = document.createElement('a-entity');
        path.setAttribute('line', {
            color: 'blue',
            path: waypoints.map(waypoint => `${waypoint.maneuver.location[0]} ${waypoint.maneuver.location[1]} 0.5`).join(','),
        });
        sceneEl.appendChild(path);

        // Create AR markers for each waypoint
        waypoints.forEach(waypoint => {
            const marker = document.createElement('a-marker');
            marker.setAttribute('preset', 'hiro');
            marker.setAttribute('position', `${waypoint.maneuver.location[0]} ${waypoint.maneuver.location[1]} 0.5`);
            marker.setAttribute('text', `value: ${waypoint.maneuver.instruction}`);
            sceneEl.appendChild(marker);
        });
    };

    // Function to handle destination selection and initiate directions
const selectDestination = async () => {
    const selectedDestination = destinationSelectInput.value;
    const destination = places.find(place => place.name === selectedDestination);

    if (destination) {
        try {
            const userLocation = await getCurrentLocation();
            // Update map with user's current location
            updateMapCenter(userLocation.latitude, userLocation.longitude);

            const directionsData = await getDirections(userLocation, destination);
            // Update AR elements
            updateARDirections(directionsData);

            // Update map with route
            updateMapWithRoute(userLocation, destination);

            // Disable AR.js debug UI
            AR.debugUIEnabled = false;
        } catch (error) {
            console.error('Error in retrieving position', error);
        }
    } else {
        console.log('Destination not found:', selectedDestination);
        // Handle case when the selected destination is not found
    }
};

    // Populate the dropdown with places from places.js
    places.forEach(place => {
        const option = document.createElement('option');
        option.value = place.name;
        option.text = place.name;
        destinationSelectInput.appendChild(option);
    });

    destinationSelectButton.addEventListener('click', selectDestination);

    // End of the 'DOMContentLoaded' event listener
    initMapAndLocation(); // Call the function to initialize map and location
});


HTML CODE********
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>EnRouteAR</title>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://raw.githack.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.min.js"></script>

    <!-- Mapbox script tags -->
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />

    <!-- AR.js script tags -->
    <script src='https://cdn.rawgit.com/jeromeetienne/AR.js/2.0.8/aframe/build/aframe-ar.js'></script>

    <script>
        // Set the Mapbox access token
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2F1ZGFtaW5pNDMyMDAzIiwiYSI6ImNscnZvemNpYTBlNzcyanRreDE5ZzhoZWIifQ.5ju-8M5p0icYTlMbhOf1wg';
        // Set the base URL for AR.js
        THREEx.ArToolkitContext.baseURL = 'https://raw.githack.com/jeromeetienne/ar.js/master/three.js/';
    </script>
    
    <link rel="stylesheet" href="styles/index.css">
</head>
<body style="margin: 0; overflow: hidden;">
    <div class="container">
        <div id="destination-select-container">
            <select id="select-destination">
                <option value="example">Select Destination</option>
                <!-- Add more destination options here -->
            </select>
            <button id="get-direction-button">Get Directions</button>
        </div>
        <a-scene cursor="rayOrigin: mouse; fuse: true; fuseTimeout: 0;" raycaster="objects: [gps-entity-place];" vr-mode-ui="enabled: false" embedded arjs="sourceType: webcam; sourceWidth: 1920; sourceHeight: 1080; displayWidth: 100%; displayHeight: 100%; debugUIEnabled: false;">
            <a-camera gps-camera="minDistance: 10; videoTexture: true;" rotation-reader></a-camera>
        </a-scene>
               

        <!-- Container for the 2D map -->
        <div id="map-container">
            <div id="map"></div>
        </div>
    </div>
    <script src="scripts/places.js"></script>
    <script src="scripts/gps-entity-place.js"></script>
    <script src="scripts/gps-camera.js"></script>
    <script src="scripts/gps-camera-debug.js"></script>
    <script src="scripts/script.js"></script>
</body>
</html>


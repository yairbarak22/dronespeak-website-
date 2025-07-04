// Mission Planning Map - Leaflet Integration and Interactive Elements

// Global variables
let map;
let waypoints = [];
let flightPath;
let droneMarker;
let currentMapType = 'satellite';

// Mission data (simulated)
const missionData = {
    center: [32.0853, 34.7818], // Tel Aviv coordinates
    waypoints: [
        { lat: 32.0853, lng: 34.7818, number: 1, description: 'North side, 15m height', status: 'pending' },
        { lat: 32.0855, lng: 34.7820, number: 2, description: 'East side, 15m height', status: 'pending' },
        { lat: 32.0857, lng: 34.7822, number: 3, description: 'South side, 15m height', status: 'pending' },
        { lat: 32.0859, lng: 34.7820, number: 4, description: 'West side, 15m height', status: 'pending' }
    ],
    dronePosition: [32.0851, 34.7816],
    altitude: 15, // meters
    totalDistance: 450 // meters
};

// Map tile providers
const tileProviders = {
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &mdash; Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
    },
    street: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
};

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupMapControls();
    addMapOverlays();
});

// Initialize Leaflet map
function initializeMap() {
    // Create map instance
    map = L.map('map', {
        center: missionData.center,
        zoom: 18,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: false,
        dragging: true
    });

    // Add initial tile layer (satellite)
    const satelliteLayer = L.tileLayer(tileProviders.satellite.url, {
        attribution: tileProviders.satellite.attribution,
        maxZoom: 19
    }).addTo(map);

    // Add waypoints
    addWaypoints();
    
    // Add flight path
    addFlightPath();
    
    // Add drone marker
    addDroneMarker();

    // Map ready event
    map.whenReady(function() {
        console.log('Map initialized successfully');
        updateMapInfo();
    });
}

// Add waypoint markers to map
function addWaypoints() {
    missionData.waypoints.forEach(function(waypoint, index) {
        // Create custom waypoint marker
        const waypointElement = document.createElement('div');
        waypointElement.className = 'waypoint-marker';
        if (waypoint.status === 'completed') {
            waypointElement.classList.add('completed');
        } else if (waypoint.status === 'active') {
            waypointElement.classList.add('active');
        }
        waypointElement.textContent = waypoint.number;

        // Create Leaflet marker with custom icon
        const waypointMarker = L.marker([waypoint.lat, waypoint.lng], {
            icon: L.divIcon({
                html: waypointElement.outerHTML,
                className: 'waypoint-marker-container',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            })
        });

        // Add popup with waypoint information
        waypointMarker.bindPopup(`
            <div class="waypoint-popup">
                <strong>Waypoint ${waypoint.number}</strong><br>
                ${waypoint.description}<br>
                <small>Lat: ${waypoint.lat.toFixed(6)}, Lng: ${waypoint.lng.toFixed(6)}</small>
            </div>
        `);

        // Add click event for waypoint interaction
        waypointMarker.on('click', function() {
            highlightWaypoint(index);
        });

        waypointMarker.addTo(map);
        waypoints.push(waypointMarker);
    });
}

// Add flight path between waypoints
function addFlightPath() {
    const pathCoords = missionData.waypoints.map(wp => [wp.lat, wp.lng]);
    
    flightPath = L.polyline(pathCoords, {
        color: '#007AFF',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10',
        lineJoin: 'round',
        lineCap: 'round'
    });

    flightPath.addTo(map);

    // Add popup to flight path
    flightPath.bindPopup(`
        <div class="flight-path-popup">
            <strong>Planned Flight Path</strong><br>
            Total Distance: ${missionData.totalDistance}m<br>
            Estimated Time: 8 minutes<br>
            <small>Click waypoints for details</small>
        </div>
    `);
}

// Add drone current position marker
function addDroneMarker() {
    const droneElement = document.createElement('div');
    droneElement.className = 'drone-marker';

    droneMarker = L.marker(missionData.dronePosition, {
        icon: L.divIcon({
            html: droneElement.outerHTML,
            className: 'drone-marker-container',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        })
    });

    droneMarker.bindPopup(`
        <div class="drone-popup">
            <strong>Drone Location</strong><br>
            Status: Ready for takeoff<br>
            Battery: 68%<br>
            <small>GPS: ${missionData.dronePosition[0].toFixed(6)}, ${missionData.dronePosition[1].toFixed(6)}</small>
        </div>
    `);

    droneMarker.addTo(map);
}

// Add map overlays and indicators
function addMapOverlays() {
    // Altitude indicator
    const altitudeOverlay = document.createElement('div');
    altitudeOverlay.className = 'map-overlay altitude-indicator';
    altitudeOverlay.innerHTML = `
        <svg class="altitude-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7h20l-10-5z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 22v-15" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="altitude-text">${missionData.altitude}m altitude</span>
    `;
    document.querySelector('.map-container').appendChild(altitudeOverlay);

    // Distance indicator
    const distanceOverlay = document.createElement('div');
    distanceOverlay.className = 'map-overlay distance-indicator';
    distanceOverlay.innerHTML = `
        <svg class="distance-icon" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
        </svg>
        <span class="distance-text">${missionData.totalDistance}m total</span>
    `;
    document.querySelector('.map-container').appendChild(distanceOverlay);
}

// Setup custom map controls
function setupMapControls() {
    // Override default zoom control styling (already handled in CSS)
    
    // Add custom map type toggle
    const mapTypeButton = document.getElementById('satellite-btn');
    if (mapTypeButton) {
        mapTypeButton.addEventListener('click', toggleMapType);
    }
}

// Toggle between satellite and street view
function toggleMapType() {
    const button = document.getElementById('satellite-btn');
    
    if (currentMapType === 'satellite') {
        // Switch to street view
        map.eachLayer(function(layer) {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });
        
        L.tileLayer(tileProviders.street.url, {
            attribution: tileProviders.street.attribution,
            maxZoom: 19
        }).addTo(map);
        
        currentMapType = 'street';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;
    } else {
        // Switch to satellite view
        map.eachLayer(function(layer) {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });
        
        L.tileLayer(tileProviders.satellite.url, {
            attribution: tileProviders.satellite.attribution,
            maxZoom: 19
        }).addTo(map);
        
        currentMapType = 'satellite';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M2 8h16M8 2v16" stroke="currentColor" stroke-width="1.5"/>
            </svg>
        `;
    }
}

// Center map on mission area
function centerMap() {
    map.setView(missionData.center, 18, {
        animate: true,
        duration: 0.5
    });
}

// Highlight specific waypoint
function highlightWaypoint(index) {
    const waypoint = missionData.waypoints[index];
    
    // Center map on waypoint
    map.setView([waypoint.lat, waypoint.lng], 19, {
        animate: true,
        duration: 0.3
    });

    // Update waypoint info in sidebar (if needed)
    console.log(`Highlighted waypoint ${waypoint.number}: ${waypoint.description}`);
}

// Update map information displays
function updateMapInfo() {
    // Calculate bounds to fit all waypoints
    const group = new L.featureGroup(waypoints);
    
    // Add some padding to the bounds
    const bounds = group.getBounds().pad(0.1);
    
    // Update distance overlay with calculated distance
    updateDistanceDisplay();
}

// Update distance display based on actual path
function updateDistanceDisplay() {
    let totalDistance = 0;
    
    for (let i = 0; i < missionData.waypoints.length - 1; i++) {
        const from = L.latLng(missionData.waypoints[i].lat, missionData.waypoints[i].lng);
        const to = L.latLng(missionData.waypoints[i + 1].lat, missionData.waypoints[i + 1].lng);
        totalDistance += from.distanceTo(to);
    }

    // Update the display
    const distanceText = document.querySelector('.distance-text');
    if (distanceText) {
        distanceText.textContent = `${Math.round(totalDistance)}m total`;
    }
}

// Simulate mission progress (for demo purposes)
function simulateMissionProgress() {
    let currentWaypoint = 0;
    
    const progressInterval = setInterval(function() {
        if (currentWaypoint < missionData.waypoints.length) {
            // Update waypoint status
            missionData.waypoints[currentWaypoint].status = 'completed';
            
            // Update marker appearance
            const markerElement = waypoints[currentWaypoint].getElement();
            if (markerElement) {
                markerElement.querySelector('.waypoint-marker').classList.add('completed');
            }
            
            currentWaypoint++;
            
            // Set next waypoint as active
            if (currentWaypoint < missionData.waypoints.length) {
                missionData.waypoints[currentWaypoint].status = 'active';
                const nextMarkerElement = waypoints[currentWaypoint].getElement();
                if (nextMarkerElement) {
                    nextMarkerElement.querySelector('.waypoint-marker').classList.add('active');
                }
            }
        } else {
            clearInterval(progressInterval);
            console.log('Mission completed!');
        }
    }, 3000); // Progress every 3 seconds for demo
}

// Export functions for global access
window.toggleMapType = toggleMapType;
window.centerMap = centerMap;
window.simulateMissionProgress = simulateMissionProgress; 
// Live Flight Map JavaScript

let map;
let droneMarker;
let flightPath;
let waypoints = [];
let cameraFOV;

// Drone telemetry data
let droneData = {
    position: { lat: 32.0853, lng: 34.7818 },
    altitude: 17.2,
    speed: 3.5,
    battery: 68,
    heading: 45
};

// Mission waypoints
const missionWaypoints = [
    { lat: 32.0850, lng: 34.7815, status: 'completed', label: 'North Side' },
    { lat: 32.0855, lng: 34.7822, status: 'current', label: 'East Side' },
    { lat: 32.0858, lng: 34.7818, status: 'pending', label: 'South Side' },
    { lat: 32.0852, lng: 34.7812, status: 'pending', label: 'West Side' }
];

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    startRealtimeUpdates();
});

function initializeMap() {
    // Initialize Leaflet map
    map = L.map('live-map', {
        center: [droneData.position.lat, droneData.position.lng],
        zoom: 18,
        zoomControl: false,
        attributionControl: false
    });

    // Add satellite tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri'
    }).addTo(map);

    // Add custom zoom control
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Create waypoint markers
    createWaypoints();
    
    // Create flight path
    createFlightPath();
    
    // Create drone marker
    createDroneMarker();
    
    // Create camera field of view
    createCameraFOV();
}

function createWaypoints() {
    missionWaypoints.forEach((waypoint, index) => {
        const icon = createWaypointIcon(waypoint.status, index + 1);
        
        const marker = L.marker([waypoint.lat, waypoint.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="waypoint-popup">
                    <strong>${waypoint.label}</strong><br>
                    <span class="waypoint-status ${waypoint.status}">
                        ${waypoint.status.charAt(0).toUpperCase() + waypoint.status.slice(1)}
                    </span>
                </div>
            `);
        
        waypoints.push(marker);
    });
}

function createWaypointIcon(status, number) {
    const colors = {
        completed: '#34C759',
        current: '#007AFF',
        pending: '#8E8E93'
    };
    
    const color = colors[status];
    
    return L.divIcon({
        className: 'custom-waypoint-icon',
        html: `
            <div class="waypoint-marker ${status}" style="background-color: ${color}">
                <span class="waypoint-number">${number}</span>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
}

function createFlightPath() {
    const pathCoordinates = missionWaypoints.map(wp => [wp.lat, wp.lng]);
    
    // Completed path (solid line)
    const completedPath = pathCoordinates.slice(0, 2);
    if (completedPath.length > 1) {
        L.polyline(completedPath, {
            color: '#34C759',
            weight: 3,
            opacity: 0.8
        }).addTo(map);
    }
    
    // Remaining path (dashed line)
    const remainingPath = pathCoordinates.slice(1);
    if (remainingPath.length > 1) {
        flightPath = L.polyline(remainingPath, {
            color: '#007AFF',
            weight: 3,
            opacity: 0.6,
            dashArray: '10, 10'
        }).addTo(map);
    }
}

function createDroneMarker() {
    const droneIcon = L.divIcon({
        className: 'drone-marker-icon',
        html: `
            <div class="drone-marker">
                <div class="drone-body">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#007AFF"/>
                        <circle cx="12" cy="12" r="6" fill="white"/>
                        <circle cx="12" cy="12" r="2" fill="#007AFF"/>
                    </svg>
                </div>
                <div class="drone-shadow"></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    droneMarker = L.marker([droneData.position.lat, droneData.position.lng], { 
        icon: droneIcon,
        zIndexOffset: 1000
    }).addTo(map);
}

function createCameraFOV() {
    const fovAngle = 84; // degrees
    const range = 50; // meters
    
    // Calculate FOV cone coordinates
    const startAngle = droneData.heading - fovAngle / 2;
    const endAngle = droneData.heading + fovAngle / 2;
    
    const fovCoords = [
        [droneData.position.lat, droneData.position.lng]
    ];
    
    // Add points for the cone
    for (let angle = startAngle; angle <= endAngle; angle += 5) {
        const rad = angle * Math.PI / 180;
        const lat = droneData.position.lat + (range / 111000) * Math.cos(rad);
        const lng = droneData.position.lng + (range / (111000 * Math.cos(droneData.position.lat * Math.PI / 180))) * Math.sin(rad);
        fovCoords.push([lat, lng]);
    }
    
    fovCoords.push([droneData.position.lat, droneData.position.lng]);
    
    cameraFOV = L.polygon(fovCoords, {
        color: '#FFD60A',
        fillColor: '#FFD60A',
        fillOpacity: 0.2,
        weight: 2,
        opacity: 0.6
    }).addTo(map);
}

function updateDronePosition(newPosition) {
    droneData.position = newPosition;
    
    // Update drone marker position with smooth animation
    droneMarker.setLatLng([newPosition.lat, newPosition.lng]);
    
    // Update camera FOV
    if (cameraFOV) {
        map.removeLayer(cameraFOV);
    }
    createCameraFOV();
    
    // Update drone location display
    const locationElement = document.getElementById('droneLocation');
    if (locationElement) {
        locationElement.textContent = `${newPosition.lat.toFixed(4)}°N, ${newPosition.lng.toFixed(4)}°E`;
    }
}

function simulateDroneMovement() {
    // Simulate movement towards current waypoint
    const currentWaypoint = missionWaypoints.find(wp => wp.status === 'current');
    if (!currentWaypoint) return;
    
    const targetLat = currentWaypoint.lat;
    const targetLng = currentWaypoint.lng;
    
    const currentLat = droneData.position.lat;
    const currentLng = droneData.position.lng;
    
    // Calculate movement step (very small for smooth animation)
    const stepLat = (targetLat - currentLat) * 0.1;
    const stepLng = (targetLng - currentLng) * 0.1;
    
    // Update position
    const newPosition = {
        lat: currentLat + stepLat + (Math.random() - 0.5) * 0.0001,
        lng: currentLng + stepLng + (Math.random() - 0.5) * 0.0001
    };
    
    // Update heading based on movement direction
    droneData.heading = Math.atan2(stepLng, stepLat) * 180 / Math.PI;
    
    updateDronePosition(newPosition);
}

function startRealtimeUpdates() {
    // Update drone position every 2 seconds
    setInterval(simulateDroneMovement, 2000);
    
    // Update telemetry data every 3 seconds
    setInterval(updateTelemetryData, 3000);
    
    // Smooth position updates every 100ms for fluid movement
    setInterval(function() {
        // Small random variations for realistic movement
        const variance = 0.00002;
        const newPosition = {
            lat: droneData.position.lat + (Math.random() - 0.5) * variance,
            lng: droneData.position.lng + (Math.random() - 0.5) * variance
        };
        updateDronePosition(newPosition);
    }, 100);
}

function updateTelemetryData() {
    // Simulate changing telemetry values
    droneData.altitude += (Math.random() - 0.5) * 0.5;
    droneData.speed += (Math.random() - 0.5) * 0.2;
    droneData.battery -= 0.2;
    
    // Clamp values to realistic ranges
    droneData.altitude = Math.max(10, Math.min(25, droneData.altitude));
    droneData.speed = Math.max(1, Math.min(5, droneData.speed));
    droneData.battery = Math.max(0, droneData.battery);
    
    // Update UI elements
    updateTelemetryDisplay();
}

function updateTelemetryDisplay() {
    const altitudeEl = document.getElementById('altitude');
    const speedEl = document.getElementById('speed');
    const batteryFillEl = document.getElementById('batteryFill');
    const batteryTextEl = document.getElementById('batteryText');
    
    if (altitudeEl) {
        altitudeEl.textContent = droneData.altitude.toFixed(1) + 'm';
        altitudeEl.classList.add('updating');
        setTimeout(() => altitudeEl.classList.remove('updating'), 500);
    }
    
    if (speedEl) {
        speedEl.textContent = droneData.speed.toFixed(1) + ' m/s';
        speedEl.classList.add('updating');
        setTimeout(() => speedEl.classList.remove('updating'), 500);
    }
    
    if (batteryFillEl && batteryTextEl) {
        const batteryPercent = Math.round(droneData.battery);
        batteryFillEl.style.width = batteryPercent + '%';
        batteryTextEl.textContent = batteryPercent + '%';
        
        // Change color based on battery level
        if (batteryPercent < 20) {
            batteryFillEl.style.background = 'var(--ios-red)';
        } else if (batteryPercent < 40) {
            batteryFillEl.style.background = 'var(--ios-orange)';
        } else {
            batteryFillEl.style.background = 'var(--ios-green)';
        }
    }
}

// Export functions for use in other scripts
window.liveFlightMap = {
    updateDronePosition,
    updateTelemetryData,
    droneData
}; 
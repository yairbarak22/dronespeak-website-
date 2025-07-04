// Mission Planning Interactions - UI Interactions and Button Handlers

// Initialize interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupButtonInteractions();
    setupStatsAnimations();
    setupTimelineAnimations();
    initializeRealTimeUpdates();
});

// Setup all button interactions
function setupButtonInteractions() {
    // Action buttons
    const confirmButton = document.querySelector('.action-button.primary-green');
    const modifyButton = document.querySelector('.action-button.primary-blue');
    const cancelButton = document.querySelector('.action-button.secondary');

    // Add enhanced hover effects
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
        button.addEventListener('click', handleButtonClick);
    });

    // Stat cards interactions
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', handleStatCardClick);
        card.addEventListener('mouseenter', handleStatCardHover);
        card.addEventListener('mouseleave', handleStatCardLeave);
    });

    // Timeline step interactions
    document.querySelectorAll('.timeline-step').forEach(step => {
        step.addEventListener('click', handleTimelineStepClick);
    });

    // Weather widget interaction
    const weatherWidget = document.querySelector('.weather-widget');
    if (weatherWidget) {
        weatherWidget.addEventListener('click', handleWeatherClick);
    }
}

// Button hover effects
function handleButtonHover(event) {
    const button = event.target.closest('.action-button');
    if (!button.classList.contains('loading')) {
        if (button.classList.contains('primary-green')) {
            button.style.transform = 'scale(1.02)';
            button.style.boxShadow = '0 6px 20px rgba(52, 199, 89, 0.4)';
        } else if (button.classList.contains('primary-blue')) {
            button.style.transform = 'scale(1.02)';
            button.style.boxShadow = '0 6px 20px rgba(0, 122, 255, 0.4)';
        } else if (button.classList.contains('secondary')) {
            button.style.background = 'var(--ios-gray-light)';
            button.style.borderColor = 'var(--ios-label)';
            button.style.color = 'var(--ios-label)';
        }
    }
}

function handleButtonLeave(event) {
    const button = event.target.closest('.action-button');
    if (!button.classList.contains('loading')) {
        button.style.transform = '';
        button.style.boxShadow = '';
        if (button.classList.contains('secondary')) {
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
        }
    }
}

// Button click handlers
function handleButtonClick(event) {
    const button = event.target.closest('.action-button');
    
    // Add click animation
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);

    // Prevent multiple clicks during loading
    if (button.classList.contains('loading')) {
        event.preventDefault();
        return;
    }
}

// Stat card interactions
function handleStatCardClick(event) {
    const card = event.target.closest('.stat-card');
    const statLabel = card.querySelector('.stat-label').textContent;
    
    // Show detailed information
    showStatDetails(statLabel);
    
    // Add click feedback
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

function handleStatCardHover(event) {
    const card = event.target.closest('.stat-card');
    card.style.background = '#EEEEEE';
    card.style.borderColor = 'var(--ios-separator)';
}

function handleStatCardLeave(event) {
    const card = event.target.closest('.stat-card');
    card.style.background = '';
    card.style.borderColor = '';
}

// Timeline step interactions
function handleTimelineStepClick(event) {
    const step = event.target.closest('.timeline-step');
    const stepText = step.querySelector('.step-text').textContent;
    
    console.log(`Timeline step clicked: ${stepText}`);
    
    // Add visual feedback
    step.style.opacity = '0.7';
    setTimeout(() => {
        step.style.opacity = '';
    }, 200);
}

// Weather widget interaction
function handleWeatherClick(event) {
    // Show detailed weather information
    showWeatherDetails();
}

// Action button handlers (called from HTML)
function confirmFlight() {
    const button = event.target.closest('.action-button');
    setButtonLoading(button, 'Confirming...');
    
    // Simulate API call
    setTimeout(() => {
        // Hide mission planning and show flight execution
        console.log('Flight confirmed - transitioning to execution view');
        
        // In a real app, this would navigate to the flight execution page
        showFlightConfirmation();
        
        setButtonLoading(button, false);
    }, 2000);
}

function modifyPlan() {
    const button = event.target.closest('.action-button');
    setButtonLoading(button, 'Loading...');
    
    // Simulate loading
    setTimeout(() => {
        console.log('Opening plan modification interface');
        
        // In a real app, this would open the plan editor
        showPlanModification();
        
        setButtonLoading(button, false);
    }, 1500);
}

function cancelMission() {
    const button = event.target.closest('.action-button');
    
    // Show confirmation dialog
    if (confirm('Are you sure you want to cancel this mission?')) {
        setButtonLoading(button, 'Cancelling...');
        
        setTimeout(() => {
            console.log('Mission cancelled - returning to home');
            
            // In a real app, this would navigate back to home
            window.history.back();
        }, 1000);
    }
}

// Button loading state management
function setButtonLoading(button, text) {
    if (text) {
        button.classList.add('loading');
        const buttonText = button.querySelector('.action-button-text');
        buttonText.textContent = text;
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
    } else {
        button.classList.remove('loading');
        button.style.pointerEvents = '';
        button.style.opacity = '';
        
        // Restore original text
        const buttonText = button.querySelector('.action-button-text');
        if (button.classList.contains('primary-green')) {
            buttonText.textContent = 'Confirm and Start Flight';
        } else if (button.classList.contains('primary-blue')) {
            buttonText.textContent = 'Modify Plan';
        } else if (button.classList.contains('secondary')) {
            buttonText.textContent = 'Cancel';
        }
    }
}

// Setup statistics animations
function setupStatsAnimations() {
    // Animate stat values on page load
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((value, index) => {
        value.style.opacity = '0';
        value.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            value.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            value.style.opacity = '1';
            value.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate battery progress
    const batteryFill = document.querySelector('.battery-fill');
    if (batteryFill) {
        const originalWidth = batteryFill.style.width;
        batteryFill.style.width = '0%';
        
        setTimeout(() => {
            batteryFill.style.transition = 'width 1.5s ease';
            batteryFill.style.width = originalWidth;
        }, 1000);
    }
}

// Setup timeline animations
function setupTimelineAnimations() {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    timelineSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            step.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 300 + 500);
    });
}

// Initialize real-time updates
function initializeRealTimeUpdates() {
    // Update battery percentage
    updateBatteryDisplay();
    
    // Update weather conditions
    updateWeatherDisplay();
    
    // Set up periodic updates
    setInterval(updateRealTimeData, 5000); // Update every 5 seconds
}

// Update battery display with simulated data
function updateBatteryDisplay() {
    const batteryValue = document.querySelector('.battery-card .stat-value');
    const batteryFill = document.querySelector('.battery-fill');
    
    if (batteryValue && batteryFill) {
        // Simulate battery drain (very slow for demo)
        let currentBattery = parseInt(batteryValue.textContent);
        
        setInterval(() => {
            if (currentBattery > 20) {
                currentBattery -= 1;
                batteryValue.textContent = `${currentBattery}%`;
                batteryFill.style.width = `${currentBattery}%`;
                
                // Change color if battery is low
                if (currentBattery <= 15) {
                    batteryFill.style.background = 'var(--ios-red)';
                    batteryFill.style.animation = 'battery-pulse 2s infinite';
                }
            }
        }, 30000); // Very slow drain for demo
    }
}

// Update weather display
function updateWeatherDisplay() {
    const weatherConditions = [
        { icon: '☀️', temp: '23°C', condition: 'Clear skies', wind: '5 km/h NE', visibility: '10+ km', status: 'good' },
        { icon: '⛅', temp: '21°C', condition: 'Partly cloudy', wind: '8 km/h E', visibility: '8 km', status: 'good' },
        { icon: '🌤️', temp: '20°C', condition: 'Light clouds', wind: '12 km/h SE', visibility: '6 km', status: 'warning' }
    ];
    
    let currentCondition = 0;
    
    setInterval(() => {
        const condition = weatherConditions[currentCondition];
        
        document.querySelector('.weather-icon').textContent = condition.icon;
        document.querySelector('.temperature').textContent = condition.temp;
        document.querySelector('.conditions').textContent = condition.condition;
        document.querySelector('.detail-value').textContent = condition.wind;
        document.querySelectorAll('.detail-value')[1].textContent = condition.visibility;
        
        // Update flight conditions
        const flightConditions = document.querySelector('.flight-conditions');
        flightConditions.className = `flight-conditions ${condition.status}`;
        
        const conditionText = condition.status === 'good' ? 'Excellent flight conditions' :
                             condition.status === 'warning' ? 'Caution advised' : 'Poor conditions';
        document.querySelector('.condition-text').textContent = conditionText;
        
        currentCondition = (currentCondition + 1) % weatherConditions.length;
    }, 15000); // Update every 15 seconds
}

// Update real-time data
function updateRealTimeData() {
    // Update flight time estimate based on conditions
    const flightTimeValue = document.querySelector('.stat-card .stat-value');
    if (flightTimeValue && flightTimeValue.textContent.includes('minutes')) {
        // Small random variation for demo
        const baseTime = 8;
        const variation = Math.random() * 0.4 - 0.2; // ±0.2 minutes
        const newTime = Math.max(7, Math.min(9, baseTime + variation));
        flightTimeValue.textContent = `${newTime.toFixed(0)} minutes`;
    }
}

// Show stat details modal (placeholder)
function showStatDetails(statType) {
    console.log(`Showing details for: ${statType}`);
    
    // In a real app, this would show a detailed modal
    alert(`Detailed information for ${statType} would be shown here in a modal.`);
}

// Show weather details
function showWeatherDetails() {
    console.log('Showing detailed weather information');
    
    // In a real app, this would show expanded weather data
    alert('Detailed weather forecast and flight safety information would be shown here.');
}

// Show flight confirmation
function showFlightConfirmation() {
    console.log('Showing flight confirmation');
    
    // In a real app, this would show a confirmation screen
    alert('Flight confirmed! The drone will begin executing the mission.');
}

// Show plan modification interface
function showPlanModification() {
    console.log('Opening plan modification');
    
    // In a real app, this would open the plan editor
    alert('Plan modification interface would open here, allowing you to adjust waypoints and parameters.');
}

// Export functions for global access
window.confirmFlight = confirmFlight;
window.modifyPlan = modifyPlan;
window.cancelMission = cancelMission; 
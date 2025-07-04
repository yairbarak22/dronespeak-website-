// Live Flight Interactions JavaScript

// Mission timer and decision logging
let missionStartTime = Date.now() - (2 * 60 + 30) * 1000; // 2:30 elapsed
let decisionsCount = 0;

// Decision types and templates
const decisionTemplates = [
    {
        type: 'wind',
        icon: 'wind',
        messages: [
            'Wind compensation applied - adjusting flight path',
            'Strong crosswind detected - reducing speed for stability',
            'Turbulence detected - increasing altitude by 2m',
            'Wind direction changed - recalibrating camera stabilization'
        ]
    },
    {
        type: 'camera',
        icon: 'camera',
        messages: [
            'Camera angle optimized for lighting conditions',
            'Photo quality enhanced - adjusting ISO settings',
            'Focus locked on target building',
            'Image stabilization activated for sharp photos'
        ]
    },
    {
        type: 'navigation',
        icon: 'navigation',
        messages: [
            'Route optimization - avoiding restricted airspace',
            'Waypoint reached - proceeding to next target',
            'GPS signal strong - maintaining precise positioning',
            'Flight path adjusted for optimal photo angles'
        ]
    },
    {
        type: 'obstacle',
        icon: 'navigation',
        messages: [
            'Bird detected ahead - adjusting altitude',
            'Tree branches identified - increasing clearance distance',
            'Power line detected - rerouting around obstacle'
        ]
    }
];

// Initialize interactions when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeTimer();
    initializeDecisionLogging();
    initializeCameraControls();
    initializeEmergencyControls();
});

function initializeTimer() {
    updateMissionTimer();
    setInterval(updateMissionTimer, 1000);
}

function updateMissionTimer() {
    const elapsed = Date.now() - missionStartTime;
    const totalMissionTime = 8 * 60 * 1000; // 8 minutes total
    const remaining = Math.max(0, totalMissionTime - elapsed);
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    
    const timerElement = document.getElementById('remainingTime');
    if (timerElement) {
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
    }
    
    // Update progress bar
    const progressElement = document.getElementById('missionProgress');
    if (progressElement) {
        const progressPercent = Math.min(100, (elapsed / totalMissionTime) * 100);
        progressElement.style.width = progressPercent + '%';
    }
}

function initializeDecisionLogging() {
    // Add new decisions periodically
    setInterval(addRandomDecision, 15000); // Every 15 seconds
    
    // Add initial decision after short delay
    setTimeout(addRandomDecision, 3000);
}

function addRandomDecision() {
    const template = decisionTemplates[Math.floor(Math.random() * decisionTemplates.length)];
    const message = template.messages[Math.floor(Math.random() * template.messages.length)];
    
    addDecision(template.type, message);
}

function addDecision(type, message) {
    const decisionsLog = document.getElementById('decisionsLog');
    if (!decisionsLog) return;
    
    const timestamp = new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Create decision element
    const decisionElement = document.createElement('div');
    decisionElement.className = 'decision-item recent';
    decisionElement.innerHTML = `
        <div class="decision-header">
            <span class="decision-time">${timestamp}</span>
            <div class="decision-type ${type}">
                ${getDecisionIcon(type)}
            </div>
        </div>
        <span class="decision-text">${message}</span>
    `;
    
    // Add to top of log
    decisionsLog.insertBefore(decisionElement, decisionsLog.firstChild);
    
    // Remove 'recent' class after animation
    setTimeout(() => {
        decisionElement.classList.remove('recent');
    }, 500);
    
    // Limit to 10 decisions
    while (decisionsLog.children.length > 10) {
        decisionsLog.removeChild(decisionsLog.lastChild);
    }
    
    decisionsCount++;
}

function getDecisionIcon(type) {
    const icons = {
        wind: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h8M6 4l4 4-4 4" stroke="#FF9500" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
        camera: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="4" width="12" height="8" rx="1" stroke="#007AFF" stroke-width="1.5"/>
            <circle cx="8" cy="8" r="2" stroke="#007AFF" stroke-width="1.5"/>
        </svg>`,
        navigation: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L2 14h12L8 2z" stroke="#8E8E93" stroke-width="1.5"/>
            <path d="M8 6v4M8 12h.01" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
        success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#34C759" stroke-width="1.5"/>
            <path d="M6 8l1.5 1.5L11 6" stroke="#34C759" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`
    };
    
    return icons[type] || icons.navigation;
}

function initializeCameraControls() {
    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', capturePhoto);
    }
}

function capturePhoto() {
    const captureBtn = document.getElementById('captureBtn');
    
    // Visual feedback
    captureBtn.style.transform = 'scale(0.9)';
    captureBtn.style.background = '#FF3B30';
    
    setTimeout(() => {
        captureBtn.style.transform = 'scale(1)';
        captureBtn.style.background = 'var(--ios-red)';
    }, 150);
    
    // Add photo capture decision
    addDecision('success', `Photo ${Math.floor(Math.random() * 12) + 1} captured successfully - high quality image saved`);
    
    // Flash effect on camera feed
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.style.background = 'white';
        setTimeout(() => {
            videoPlaceholder.style.background = 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)';
        }, 100);
    }
}

function initializeEmergencyControls() {
    // Add confirmation dialogs for emergency actions
    const emergencyButtons = document.querySelectorAll('.emergency-btn');
    emergencyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            handleEmergencyAction(this);
        });
    });
}

function handleEmergencyAction(button) {
    const action = button.querySelector('.btn-text').textContent;
    
    // Create confirmation modal
    const modal = createConfirmationModal(action);
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function createConfirmationModal(action) {
    const modal = document.createElement('div');
    modal.className = 'emergency-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-icon">
                ⚠️
            </div>
            <h3 class="modal-title">Confirm Emergency Action</h3>
            <p class="modal-message">
                Are you sure you want to execute: <strong>${action}</strong>?
                <br><br>
                This action cannot be undone and will immediately affect the drone's flight.
            </p>
            <div class="modal-actions">
                <button class="modal-btn cancel" onclick="closeEmergencyModal()">Cancel</button>
                <button class="modal-btn confirm" onclick="executeEmergencyAction('${action}')">${action}</button>
            </div>
        </div>
    `;
    
    return modal;
}

function closeEmergencyModal() {
    const modal = document.querySelector('.emergency-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function executeEmergencyAction(action) {
    closeEmergencyModal();
    
    // Add decision log entry
    addDecision('emergency', `Emergency action executed: ${action}`);
    
    // Handle specific actions
    switch (action) {
        case 'STOP IMMEDIATELY':
            emergencyStop();
            break;
        case 'RETURN TO BASE':
            returnToBase();
            break;
        case 'MANUAL OVERRIDE':
            manualOverride();
            break;
    }
}

function emergencyStop() {
    // Stop all animations and updates
    addDecision('emergency', 'Flight stopped immediately - drone hovering in place');
    
    // Visual feedback
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        statusDot.style.background = 'var(--ios-red)';
        statusDot.style.animation = 'none';
    }
    
    const statusLabel = document.querySelector('.status-label');
    if (statusLabel) {
        statusLabel.textContent = 'EMERGENCY STOP';
        statusLabel.style.color = 'var(--ios-red)';
    }
}

function returnToBase() {
    addDecision('emergency', 'Returning to base - activating automatic return sequence');
    
    // Update status
    const statusLabel = document.querySelector('.status-label');
    if (statusLabel) {
        statusLabel.textContent = 'Returning to Base';
        statusLabel.style.color = 'var(--ios-orange)';
    }
    
    // Simulate return journey
    setTimeout(() => {
        addDecision('navigation', 'Return to base route calculated - ETA 3 minutes');
    }, 2000);
}

function manualOverride() {
    addDecision('emergency', 'Manual override activated - pilot control enabled');
    
    // Update UI to show manual control
    const statusLabel = document.querySelector('.status-label');
    if (statusLabel) {
        statusLabel.textContent = 'Manual Control';
        statusLabel.style.color = 'var(--ios-blue)';
    }
    
    // Show manual control UI (placeholder)
    setTimeout(() => {
        addDecision('navigation', 'Manual control interface activated - awaiting pilot input');
    }, 1000);
}

// Export functions for global access
window.emergencyStop = emergencyStop;
window.returnToBase = returnToBase;
window.manualOverride = manualOverride;
window.closeEmergencyModal = closeEmergencyModal;
window.executeEmergencyAction = executeEmergencyAction; 
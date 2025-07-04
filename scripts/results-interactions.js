// Results Interactions JavaScript

// Photo data
const photoData = [
    { id: 1, location: 'North Side', details: '15.2m • 32.0853°N', coords: '32.0853°N, 34.7818°E', altitude: '15.2m', time: '14:30:15' },
    { id: 2, location: 'East Side', details: '14.8m • 32.0855°N', coords: '32.0855°N, 34.7820°E', altitude: '14.8m', time: '14:32:30' },
    { id: 3, location: 'South Side', details: '15.5m • 32.0857°N', coords: '32.0857°N, 34.7818°E', altitude: '15.5m', time: '14:34:45' },
    { id: 4, location: 'West Side', details: '14.9m • 32.0859°N', coords: '32.0859°N, 34.7816°E', altitude: '14.9m', time: '14:37:00' },
    { id: 5, location: 'North Detail', details: '16.0m • Window Detail', coords: '32.0853°N, 34.7818°E', altitude: '16.0m', time: '14:30:45' }
];

// State management
let selectedPhotos = new Set();
let currentPhotoModal = null;

// Initialize interactions when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializePhotoGallery();
    initializeGalleryControls();
    initializeDecisionLogControls();
    initializeActionButtons();
    setupKeyboardNavigation();
    generateAdditionalPhotos();
});

function initializePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach(item => {
        // Add click handler for photo modal
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.photo-checkbox')) {
                const photoId = parseInt(this.dataset.photo);
                openPhotoModal(photoId);
            }
        });
        
        // Add checkbox handler
        const checkbox = item.querySelector('.photo-select');
        if (checkbox) {
            checkbox.addEventListener('change', function(e) {
                e.stopPropagation();
                handlePhotoSelection(this, item);
            });
        }
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function generateAdditionalPhotos() {
    const photoGallery = document.getElementById('photoGallery');
    if (!photoGallery) return;
    
    // Add additional photos to complete the gallery
    for (let i = 6; i <= 12; i++) {
        const photoItem = createPhotoElement(i);
        photoGallery.appendChild(photoItem);
    }
}

function createPhotoElement(photoId) {
    const locations = ['North Detail', 'East Detail', 'South Detail', 'West Detail', 'Roof View', 'Foundation', 'Corner View'];
    const location = locations[(photoId - 6) % locations.length];
    const altitude = (14.5 + Math.random() * 2).toFixed(1);
    
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.dataset.photo = photoId;
    photoItem.onclick = () => openPhotoModal(photoId);
    
    photoItem.innerHTML = `
        <div class="photo-container">
            <div class="photo-placeholder">
                <svg width="100%" height="100%" viewBox="0 0 150 150" fill="none">
                    <rect width="150" height="150" fill="#F${photoId % 2 ? '2' : '8'}F${photoId % 2 ? '2' : '8'}F${photoId % 2 ? '2' : '8'}"/>
                    <rect x="${15 + (photoId % 3) * 5}" y="${35 + (photoId % 2) * 5}" width="${100 + (photoId % 4) * 10}" height="${70 + (photoId % 3) * 5}" fill="#D${photoId % 2 ? '5' : 'C'}D${photoId % 2 ? '5' : 'C'}D${photoId % 2 ? '5' : 'C'}"/>
                    <rect x="${25 + (photoId % 2) * 5}" y="${45 + (photoId % 3) * 2}" width="${15 + (photoId % 2) * 3}" height="${25 + (photoId % 3) * 5}" fill="#A${photoId % 2 ? '5' : '8'}A${photoId % 2 ? '5' : '8'}A${photoId % 2 ? '5' : '8'}"/>
                </svg>
            </div>
            <div class="photo-overlay">
                <div class="photo-info">
                    <span class="photo-location">${location}</span>
                    <span class="photo-details">${altitude}m • 32.085${photoId}°N</span>
                </div>
                <div class="photo-badges">
                    <span class="quality-badge">4K</span>
                </div>
            </div>
            <div class="photo-checkbox">
                <input type="checkbox" id="photo${photoId}" class="photo-select">
                <label for="photo${photoId}"></label>
            </div>
        </div>
    `;
    
    // Add event listeners
    const checkbox = photoItem.querySelector('.photo-select');
    checkbox.addEventListener('change', function(e) {
        e.stopPropagation();
        handlePhotoSelection(this, photoItem);
    });
    
    photoItem.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = 'var(--shadow-medium)';
    });
    
    photoItem.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    return photoItem;
}

function handlePhotoSelection(checkbox, photoItem) {
    const photoId = parseInt(photoItem.dataset.photo);
    
    if (checkbox.checked) {
        selectedPhotos.add(photoId);
        photoItem.style.outline = '2px solid var(--ios-blue)';
        photoItem.style.outlineOffset = '4px';
    } else {
        selectedPhotos.delete(photoId);
        photoItem.style.outline = 'none';
        photoItem.style.outlineOffset = '0';
    }
    
    updateGalleryControls();
}

function updateGalleryControls() {
    const downloadBtn = document.getElementById('downloadBtn');
    const selectAllBtn = document.getElementById('selectAllBtn');
    
    if (downloadBtn) {
        downloadBtn.textContent = selectedPhotos.size > 0 ? 
            `Download Selected (${selectedPhotos.size})` : 'Download Selected';
        downloadBtn.disabled = selectedPhotos.size === 0;
        downloadBtn.style.opacity = selectedPhotos.size === 0 ? '0.5' : '1';
    }
    
    if (selectAllBtn) {
        const totalPhotos = document.querySelectorAll('.photo-item').length;
        selectAllBtn.textContent = selectedPhotos.size === totalPhotos ? 'Select None' : 'Select All';
    }
}

function initializeGalleryControls() {
    const selectAllBtn = document.getElementById('selectAllBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', toggleSelectAll);
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadSelectedPhotos);
    }
}

function toggleSelectAll() {
    const photoItems = document.querySelectorAll('.photo-item');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const shouldSelectAll = selectAllBtn.textContent === 'Select All';
    
    photoItems.forEach(item => {
        const checkbox = item.querySelector('.photo-select');
        const photoId = parseInt(item.dataset.photo);
        
        checkbox.checked = shouldSelectAll;
        
        if (shouldSelectAll) {
            selectedPhotos.add(photoId);
            item.style.outline = '2px solid var(--ios-blue)';
            item.style.outlineOffset = '4px';
        } else {
            selectedPhotos.delete(photoId);
            item.style.outline = 'none';
            item.style.outlineOffset = '0';
        }
    });
    
    updateGalleryControls();
}

function downloadSelectedPhotos() {
    if (selectedPhotos.size === 0) return;
    
    // Show download progress
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.textContent;
    
    downloadBtn.textContent = 'Preparing Download...';
    downloadBtn.disabled = true;
    
    // Simulate download process
    setTimeout(() => {
        downloadBtn.textContent = 'Downloading...';
        
        setTimeout(() => {
            downloadBtn.textContent = `Downloaded ${selectedPhotos.size} photos ✓`;
            
            setTimeout(() => {
                downloadBtn.textContent = originalText;
                downloadBtn.disabled = false;
                
                // Show success notification
                showNotification('Photos downloaded successfully!', 'success');
            }, 2000);
        }, 1500);
    }, 500);
}

function openPhotoModal(photoId) {
    const modal = document.getElementById('photoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDetails = document.getElementById('modalDetails');
    
    if (!modal) return;
    
    currentPhotoModal = photoId;
    
    // Set modal content
    const photo = photoData.find(p => p.id === photoId) || {
        id: photoId,
        location: `Photo ${photoId}`,
        coords: `32.085${photoId}°N, 34.7818°E`,
        altitude: `${14.5 + Math.random() * 2}m`,
        time: `14:${30 + photoId}:${15 + photoId * 5}`
    };
    
    modalTitle.textContent = `${photo.location} - Photo ${photoId}`;
    
    // Create high-res image placeholder
    modalImage.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none">
            <rect width="600" height="400" fill="#F0F0F0"/>
            <rect x="50" y="80" width="500" height="240" fill="#D0D0D0"/>
            <rect x="100" y="120" width="60" height="80" fill="#B0B0B0"/>
            <rect x="180" y="110" width="60" height="90" fill="#B0B0B0"/>
            <rect x="260" y="120" width="60" height="80" fill="#B0B0B0"/>
            <rect x="340" y="110" width="60" height="90" fill="#B0B0B0"/>
            <rect x="420" y="120" width="60" height="80" fill="#B0B0B0"/>
            <text x="300" y="360" text-anchor="middle" fill="#888" font-size="16">High Resolution - 4K Quality</text>
        </svg>
    `;
    
    // Set modal details
    modalDetails.innerHTML = `
        <div class="detail-item">
            <strong>Location:</strong> ${photo.location}
        </div>
        <div class="detail-item">
            <strong>Coordinates:</strong> ${photo.coords}
        </div>
        <div class="detail-item">
            <strong>Altitude:</strong> ${photo.altitude}
        </div>
        <div class="detail-item">
            <strong>Timestamp:</strong> ${photo.time}
        </div>
        <div class="detail-item">
            <strong>Resolution:</strong> 3840 × 2160 (4K)
        </div>
        <div class="detail-item">
            <strong>File Size:</strong> ${(8 + Math.random() * 4).toFixed(1)} MB
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closePhotoModal() {
    const modal = document.getElementById('photoModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
    
    currentPhotoModal = null;
}

function initializeDecisionLogControls() {
    const exportLogBtn = document.getElementById('exportLogBtn');
    const detailToggleBtn = document.getElementById('detailToggleBtn');
    
    if (exportLogBtn) {
        exportLogBtn.addEventListener('click', exportDecisionLog);
    }
    
    if (detailToggleBtn) {
        detailToggleBtn.addEventListener('click', toggleLogDetails);
    }
}

function exportDecisionLog() {
    const exportBtn = document.getElementById('exportLogBtn');
    const originalText = exportBtn.textContent;
    
    exportBtn.textContent = 'Generating Report...';
    exportBtn.disabled = true;
    
    // Simulate report generation
    setTimeout(() => {
        exportBtn.textContent = 'Report Generated ✓';
        
        setTimeout(() => {
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
            
            showNotification('Decision log exported successfully!', 'success');
        }, 2000);
    }, 1500);
}

function toggleLogDetails() {
    const detailToggleBtn = document.getElementById('detailToggleBtn');
    const logDetails = document.querySelectorAll('.log-details');
    const isShowingDetails = detailToggleBtn.textContent === 'Hide Details';
    
    logDetails.forEach(detail => {
        detail.style.display = isShowingDetails ? 'none' : 'flex';
    });
    
    detailToggleBtn.textContent = isShowingDetails ? 'Show Details' : 'Hide Details';
}

function initializeActionButtons() {
    const actionButtons = {
        shareResults: () => shareResults(),
        saveToComputer: () => saveToComputer(),
        planNewMission: () => planNewMission(),
        reportIssue: () => reportIssue()
    };
    
    // Setup button click handlers
    Object.keys(actionButtons).forEach(action => {
        const button = document.querySelector(`[onclick="${action}()"]`);
        if (button) {
            button.onclick = null; // Remove inline onclick
            button.addEventListener('click', actionButtons[action]);
        }
    });
}

function shareResults() {
    showActionModal('Share Mission Results', 'Choose how you would like to share the mission results:', [
        { text: 'Email Report', action: () => shareViaEmail() },
        { text: 'Copy Link', action: () => copyShareLink() },
        { text: 'Export PDF', action: () => exportToPDF() },
        { text: 'Cancel', action: () => closeActionModal(), secondary: true }
    ]);
}

function saveToComputer() {
    showActionModal('Save to Computer', 'Select what you would like to save:', [
        { text: 'All Photos (127 MB)', action: () => savePhotos() },
        { text: 'Flight Data (2.3 MB)', action: () => saveFlightData() },
        { text: 'Complete Package (129 MB)', action: () => saveCompletePackage() },
        { text: 'Cancel', action: () => closeActionModal(), secondary: true }
    ]);
}

function planNewMission() {
    window.location.href = 'mission-planning.html';
}

function reportIssue() {
    showActionModal('Report Issue', 'What type of issue would you like to report?', [
        { text: 'Photo Quality', action: () => reportPhotoIssue() },
        { text: 'Flight Performance', action: () => reportFlightIssue() },
        { text: 'Data Accuracy', action: () => reportDataIssue() },
        { text: 'Other', action: () => reportOtherIssue() },
        { text: 'Cancel', action: () => closeActionModal(), secondary: true }
    ]);
}

function goToHome() {
    window.location.href = 'index.html';
}

function showActionModal(title, message, actions) {
    const modal = document.createElement('div');
    modal.className = 'action-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeActionModal()"></div>
        <div class="modal-content">
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <div class="modal-actions">
                ${actions.map(action => `
                    <button class="modal-btn ${action.secondary ? 'secondary' : 'primary'}"
                            onclick="${action.action.name}()">${action.text}</button>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Store action functions globally for onclick handlers
    actions.forEach(action => {
        window[action.action.name] = action.action;
    });
}

function closeActionModal() {
    const modal = document.querySelector('.action-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            closePhotoModal();
            closeActionModal();
        }
        
        // Arrow keys for photo navigation in modal
        if (currentPhotoModal) {
            if (e.key === 'ArrowLeft') {
                const prevPhoto = currentPhotoModal > 1 ? currentPhotoModal - 1 : 12;
                openPhotoModal(prevPhoto);
            } else if (e.key === 'ArrowRight') {
                const nextPhoto = currentPhotoModal < 12 ? currentPhotoModal + 1 : 1;
                openPhotoModal(nextPhoto);
            }
        }
    });
}

// Placeholder functions for action handlers
function shareViaEmail() { showNotification('Email sharing initiated', 'success'); closeActionModal(); }
function copyShareLink() { showNotification('Share link copied to clipboard', 'success'); closeActionModal(); }
function exportToPDF() { showNotification('PDF export started', 'success'); closeActionModal(); }
function savePhotos() { showNotification('Photo download started', 'success'); closeActionModal(); }
function saveFlightData() { showNotification('Flight data download started', 'success'); closeActionModal(); }
function saveCompletePackage() { showNotification('Complete package download started', 'success'); closeActionModal(); }
function reportPhotoIssue() { showNotification('Photo quality report submitted', 'success'); closeActionModal(); }
function reportFlightIssue() { showNotification('Flight performance report submitted', 'success'); closeActionModal(); }
function reportDataIssue() { showNotification('Data accuracy report submitted', 'success'); closeActionModal(); }
function reportOtherIssue() { showNotification('Issue report submitted', 'success'); closeActionModal(); }

// Export functions for global access
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
window.shareResults = shareResults;
window.saveToComputer = saveToComputer;
window.planNewMission = planNewMission;
window.reportIssue = reportIssue;
window.goToHome = goToHome; 
// Results Animations JavaScript

// Animation configuration
const animationConfig = {
    countingDuration: 2000,
    particleBurstDelay: 300,
    staggerDelay: 100
};

// Mission data for counters
const missionData = {
    flightTime: { value: 7.75, unit: 'minutes', target: 465 }, // 7:45 in seconds
    distance: { value: 427, unit: 'meters', target: 427 },
    photos: { value: 12, unit: 'images', target: 12 },
    battery: { value: 34, unit: '%', target: 34 }
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSuccessAnimations();
    initializeCounterAnimations();
    initializeStaggeredAnimations();
    setupParticleEffects();
    initializeScrollAnimations();
});

function initializeSuccessAnimations() {
    const successIcon = document.getElementById('successIcon');
    if (successIcon) {
        // Trigger success icon animation
        setTimeout(() => {
            successIcon.classList.add('animate');
        }, 300);
        
        // Start particle burst after icon animation
        setTimeout(() => {
            triggerParticleBurst();
        }, 800);
    }
    
    // Animate mission stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, 1200 + (index * 150));
    });
}

function triggerParticleBurst() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.animation = `particle-burst 1.5s ease-out`;
        }, index * 100);
    });
}

function initializeCounterAnimations() {
    // Animate flight time
    animateFlightTime();
    
    // Animate other counters
    animateCounter('distanceValue', missionData.distance.target, 0, 'meters');
    animateCounter('photosValue', missionData.photos.target, 12, 'images');
    animateCounter('batteryValue', missionData.battery.target, 34, '%');
}

function animateFlightTime() {
    const flightTimeElement = document.getElementById('flightTimeValue');
    if (!flightTimeElement) return;
    
    const targetSeconds = missionData.flightTime.target;
    const duration = animationConfig.countingDuration;
    const startTime = Date.now();
    
    function updateFlightTime() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentSeconds = Math.floor(targetSeconds * easedProgress);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        
        flightTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} minutes`;
        
        if (progress < 1) {
            requestAnimationFrame(updateFlightTime);
        }
    }
    
    // Start animation after delay
    setTimeout(() => {
        updateFlightTime();
    }, 1000);
}

function animateCounter(elementId, targetValue, finalValue, unit) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = animationConfig.countingDuration;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(targetValue * easedProgress);
        element.textContent = `${currentValue} ${unit}`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Set final value
            element.textContent = `${finalValue} ${unit}`;
        }
    }
    
    // Start animation after delay
    setTimeout(() => {
        updateCounter();
    }, 1200);
}

function initializeStaggeredAnimations() {
    // Animate summary cards with stagger
    const summaryCards = document.querySelectorAll('.summary-card');
    summaryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1500 + (index * animationConfig.staggerDelay));
    });
    
    // Animate photo gallery with stagger
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 2000 + (index * 50));
    });
    
    // Animate decision log entries
    const logEntries = document.querySelectorAll('.log-entry');
    logEntries.forEach((entry, index) => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            entry.style.transition = 'all 0.5s ease';
            entry.style.opacity = '1';
            entry.style.transform = 'translateX(0)';
        }, 2200 + (index * 100));
    });
    
    // Animate action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 2500 + (index * animationConfig.staggerDelay));
    });
}

function setupParticleEffects() {
    // Setup particle positions and animations
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const angle = (index / particles.length) * 360;
        const radius = 50;
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        particle.style.setProperty('--particle-x', `${x}px`);
        particle.style.setProperty('--particle-y', `${y}px`);
    });
}

function initializeScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.gallery-section, .log-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Photo gallery animations
function animatePhotoGallery() {
    const gallery = document.querySelector('.photo-gallery');
    if (!gallery) return;
    
    gallery.style.opacity = '0';
    gallery.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        gallery.style.transition = 'all 0.6s ease';
        gallery.style.opacity = '1';
        gallery.style.transform = 'translateY(0)';
        
        // Animate individual photos
        const photos = gallery.querySelectorAll('.photo-item');
        photos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.opacity = '1';
                photo.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
        });
    }, 100);
}

// Card hover animations
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.summary-card, .photo-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'var(--shadow-medium)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-small)';
        });
    });
}

// Progress bar animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width || '0%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Button press animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.action-btn, .gallery-btn, .log-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Success celebration sequence
function triggerSuccessCelebration() {
    // Main success icon bounce
    setTimeout(() => {
        const successIcon = document.getElementById('successIcon');
        if (successIcon) {
            successIcon.style.animation = 'success-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
    }, 100);
    
    // Particle burst
    setTimeout(() => {
        triggerParticleBurst();
    }, 600);
    
    // Stats animation
    setTimeout(() => {
        initializeCounterAnimations();
    }, 800);
    
    // Cards stagger
    setTimeout(() => {
        initializeStaggeredAnimations();
    }, 1000);
}

// Initialize all animations
function initializeAllAnimations() {
    initializeSuccessAnimations();
    setupCardHoverEffects();
    animateProgressBars();
    setupButtonAnimations();
    
    // Trigger main celebration sequence
    setTimeout(() => {
        triggerSuccessCelebration();
    }, 500);
}

// Performance optimized animation frame
function requestOptimizedAnimationFrame(callback) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
    } else {
        requestAnimationFrame(callback);
    }
}

// Export functions for use in other scripts
window.resultsAnimations = {
    triggerSuccessCelebration,
    animatePhotoGallery,
    initializeCounterAnimations,
    setupButtonAnimations
}; 
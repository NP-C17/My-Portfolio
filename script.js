// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (!themeToggle) return; // nothing to update

    let icon = themeToggle.querySelector('i');
    // Ensure an <i> exists so className assignments won't throw
    if (!icon) {
        themeToggle.innerHTML = '<i aria-hidden="true" class="fas fa-moon"></i>';
        icon = themeToggle.querySelector('i');
    }

    if (theme === 'light') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Modal Management
const projectModal = document.getElementById('projectModal');
const timelineModal = document.getElementById('timelineModal');
const projectGalleryBtn = document.querySelector('.project-gallery-btn');
const timelineBtn = document.getElementById('timelineBtn');
const closeButtons = document.querySelectorAll('.close');

// Open project gallery modal (guarded)
if (projectGalleryBtn) {
    projectGalleryBtn.addEventListener('click', () => {
        if (projectModal) {
            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            console.warn('projectModal element not found');
        }
    });
} else {
    console.warn('projectGalleryBtn (.project-gallery-btn) not found in DOM');
}

// Open timeline modal (guarded)
if (timelineBtn) {
    timelineBtn.addEventListener('click', () => {
        if (timelineModal) {
            timelineModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            console.warn('timelineModal element not found');
        }
    });
} else {
    console.warn('timelineBtn (#timelineBtn) not found in DOM');
}

// Close modals
if (closeButtons && closeButtons.length) {
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (projectModal) projectModal.style.display = 'none';
            if (timelineModal) timelineModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === timelineModal) {
        timelineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        projectModal.style.display = 'none';
        timelineModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Resume Download
const resumeBtn = document.getElementById('resumeBtn');
resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = 'resume.html';
    link.download = 'Isaac_Sammy_Gidali_Resume.html';
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Resume downloaded successfully!', 'success');
});

// Back to Top Button (guarded)
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
} else {
    console.info('backToTop button not found; skipping back-to-top behavior');
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Enhanced Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Enhanced Project Stats Animation
function animateProjectStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        }, index * 300);
    });
}


// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
} else {
    console.info('hamburger or navMenu not found; skipping mobile nav setup');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        
        // Reset hamburger bars if present
        if (hamburger) {
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
});

// Enhanced Form Validation
const contactForm = document.querySelector('.form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    contactForm.addEventListener('submit', function(e) {
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fix the errors in the form', 'error');
            return;
        }
        
        // If form is valid, let it submit to Formspree
        // Show success message before submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if field is empty
    if (!value) {
        field.classList.add('error');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            isValid = false;
        }
    }
    
    return isValid;
}

function clearError(e) {
    e.target.classList.remove('error');
}

// Enhanced Accessibility
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});



// Enhanced Performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll events (only if revealOnScroll exists)
if (typeof revealOnScroll === 'function') {
    const debouncedRevealOnScroll = debounce(revealOnScroll, 16);
    window.addEventListener('scroll', debouncedRevealOnScroll);
} else {
    console.info('revealOnScroll is not defined; skipping scroll reveal setup');
}

// Enhanced Loading States
window.addEventListener('load', () => {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }

    // Hide the loading overlay (if present) so it doesn't block the page
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        // fade out then remove or hide
        loadingOverlay.style.transition = 'opacity 0.4s ease';
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            // use display none to remove from document flow
            loadingOverlay.style.display = 'none';
        }, 450);
    }
    
    // Initialize all animations
    document.body.style.opacity = '1';
    
    // Trigger entrance animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Enhanced Touch Support for Mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger next section
            console.log('Swipe up detected');
        } else {
            // Swipe down - could trigger previous section
            console.log('Swipe down detected');
        }
    }
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    // Could send error to analytics service
});

// Enhanced Analytics (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Integrate with Google Analytics or other tracking service
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.project-link, .btn, .nav-link')) {
        trackEvent('user_click', {
            element: e.target.textContent || e.target.className,
            href: e.target.href || 'button'
        });
    }
});

// Enhanced SEO and Performance
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalLinks = document.querySelectorAll('link[rel="preload"]');
    criticalLinks.forEach(link => {
        link.rel = 'stylesheet';
    });
});



// Form Input Micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // Add validation effects
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });
});

// Simplified GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Simplified hero section animations
    gsap.from('.hero-title', {
        duration: 0.5,
        y: 30,
        opacity: 0,
        ease: 'power2.out'
    });
    
    gsap.from('.hero-subtitle', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.1
    });
    
    gsap.from('.hero-description', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.2
    });
    
    gsap.from('.hero-buttons .btn', {
        duration: 0.5,
        y: 15,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.3
    });
    
    gsap.from('.floating-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.4
    });
    
    // Simplified project card animations (only for featured project)
    const featuredProject = document.querySelector('.project-card.featured');
    if (featuredProject) {
        gsap.from(featuredProject, {
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: featuredProject,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    }
});


// One-time cache bust for legacy Service Workers and caches (Firefox normal mode)
(function() {
    try {
        var CACHE_BUSTER_KEY = 'cache_cleared_v20251010a';
        if (!localStorage.getItem(CACHE_BUSTER_KEY)) {
            if ('serviceWorker' in navigator && navigator.serviceWorker.getRegistrations) {
                navigator.serviceWorker.getRegistrations()
                    .then(function(regs) { regs.forEach(function(r) { r.unregister(); }); })
                    .catch(function() {});
            }
            if (window.caches && caches.keys) {
                caches.keys()
                    .then(function(keys) { return Promise.all(keys.map(function(k) { return caches.delete(k); })); })
                    .catch(function() {});
            }
            localStorage.setItem(CACHE_BUSTER_KEY, '1');
        }
    } catch (e) {}
})();

// Global Functions - Available for onclick handlers
// About section functionality
window.toggleAbout = function(tab = 'proyecto') {
    console.log('toggleAbout called with tab:', tab);
    const aboutSection = document.getElementById('sobre-proyecto');
    
    if (!aboutSection) {
        console.error('About section not found!');
        return;
    }
    
    console.log('Current display:', aboutSection.style.display);
    
    if (aboutSection.style.display === 'none' || aboutSection.style.display === '') {
        // Show section
        aboutSection.style.display = 'block';
        console.log('Showing about section');
        
        // Set active tab
        const aboutTabs = document.querySelectorAll('.tab-btn');
        const aboutContents = document.querySelectorAll('.about-content .tab-content');
        
        aboutTabs.forEach(t => t.classList.remove('active'));
        aboutContents.forEach(c => c.classList.remove('active'));
        
        const activeTab = document.querySelector(`[data-tab="${tab}"]`);
        const activeContent = document.getElementById(tab);
        
        if (activeTab) activeTab.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
        
        // Smooth scroll to section
        setTimeout(() => {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        // Track event
        if (typeof trackEvent === 'function') {
            trackEvent('about_section_opened', { tab: tab });
        }
    } else {
        // Hide section
        aboutSection.style.display = 'none';
        console.log('Hiding about section');
        if (typeof trackEvent === 'function') {
            trackEvent('about_section_closed');
        }
    }
};

// Floating Video Player Functions - Global scope for onclick
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

window.openFloatingVideo = function(videoId, title) {
    const player = document.getElementById('floatingVideoPlayer');
    const iframe = document.getElementById('floatingVideoFrame');
    const titleElement = document.getElementById('floatingVideoTitle');
    
    // Set video source with autoplay
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    titleElement.textContent = title;
    
    // Show player
    player.classList.add('active');
    
    // Track event
    if (typeof trackEvent === 'function') {
        trackEvent('floating_video_opened', { videoId: videoId, title: title });
    }
};

window.closeFloatingVideo = function() {
    const player = document.getElementById('floatingVideoPlayer');
    const iframe = document.getElementById('floatingVideoFrame');
    
    // Hide player
    player.classList.remove('active');
    
    // Stop video by removing src
    iframe.src = '';
    
    // Reset position
    player.style.transform = 'translate(0px, 0px)';
    xOffset = 0;
    yOffset = 0;
    
    // Track event
    if (typeof trackEvent === 'function') {
        trackEvent('floating_video_closed');
    }
};

// Ensure scroll-to-top button is created regardless of other code errors
document.addEventListener('DOMContentLoaded', function() {
    // Avoid duplicate creation
    if (document.getElementById('scrollToTopBtn')) return;

    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTopBtn';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Subir arriba');
    scrollToTopBtn.title = 'Subir arriba';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99999;
    `;

    document.body.appendChild(scrollToTopBtn);

    function updateVisibility() {
        if (window.pageYOffset > 200) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    }

    // Initial state and listeners
    updateVisibility();
    window.addEventListener('scroll', updateVisibility);
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Main JavaScript for Fáctico website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('nav-menu-open');
            navToggle.classList.toggle('nav-toggle-open');
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .guia-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Demo video placeholder click
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Replace with actual YouTube video URL when available
            const videoUrl = 'https://www.youtube.com/watch?v=DEMO_VIDEO_ID';
            window.open(videoUrl, '_blank');
        });
    }

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // FAQ accordion (if needed in future)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('faq-open');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('faq-open');
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('faq-open');
                }
            });
        }
    });

    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Cargando...';
            this.style.opacity = '0.7';
            
            // Reset after a short delay
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Scroll-to-top is now created in an early listener (see above)

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu-open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: var(--shadow);
            padding: 20px;
        }
        
        .nav-toggle-open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle-open span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle-open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .faq-open p {
            display: block !important;
        }
        
        .scroll-to-top:hover {
            background: #1565c0;
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
});

// Utility functions
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

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .nav-cta')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page: window.location.pathname
        });
    }
});

// Track external link clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        trackEvent('external_link_click', {
            url: e.target.href,
            page: window.location.pathname
        });
    }
});

// About section tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const aboutTabs = document.querySelectorAll('.tab-btn');
    const aboutContents = document.querySelectorAll('.about-content .tab-content');
    
    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            aboutTabs.forEach(t => t.classList.remove('active'));
            aboutContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetTab = this.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Track tab switch
            trackEvent('about_tab_switched', { tab: targetTab });
        });
    });
});

// Make floating player draggable
document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('floatingVideoPlayer');
    const header = player ? player.querySelector('.floating-video-header') : null;
    
    if (!player || !header) return;
    
    header.addEventListener('mousedown', dragStart);
    header.addEventListener('touchstart', dragStart);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
    
    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        
        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, player);
        }
    }
    
    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
    
    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
});

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

// Fix: Refrescar página al volver a la pestaña (evita imágenes perdidas)
(function() {
    var wasHidden = false;
    
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            wasHidden = true;
        } else if (document.visibilityState === 'visible' && wasHidden) {
            // La pestaña vuelve a ser visible después de estar oculta
            location.reload();
        }
    });
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

// ===== GESTIÓN DE CONSENTIMIENTO DE COOKIES (Google Analytics) =====
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');
    
    if (!cookieBanner || !cookieAccept || !cookieReject) {
        console.error('❌ Cookie banner elements not found');
        return;
    }
    
    console.log('✅ Cookie banner elements found');
    
    // Verificar si el usuario ya ha dado su consentimiento
    const cookieConsent = localStorage.getItem('factico_cookie_consent');
    console.log('📊 Cookie consent status:', cookieConsent || 'not set');
    
    if (!cookieConsent) {
        // Mostrar banner si no hay respuesta previa
        cookieBanner.classList.add('show');
        console.log('🍪 Showing cookie banner');
        
        // Debug: verificar que el banner sea visible
        setTimeout(function() {
            const rect = cookieBanner.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(cookieBanner);
            console.log('📐 Banner position:', {
                bottom: rect.bottom,
                height: rect.height,
                display: computedStyle.display,
                zIndex: computedStyle.zIndex,
                hasShowClass: cookieBanner.classList.contains('show'),
                visible: rect.height > 0 && computedStyle.display !== 'none'
            });
            
            if (rect.height === 0 || computedStyle.display === 'none') {
                console.error('❌ Banner NO es visible. Forzando display...');
                cookieBanner.style.display = 'block';
            }
        }, 500);
    } else {
        console.log('✅ User already responded to cookie consent:', cookieConsent);
    }
    
    // Botón Aceptar
    cookieAccept.addEventListener('click', function() {
        // Guardar consentimiento
        localStorage.setItem('factico_cookie_consent', 'accepted');
        
        // Actualizar consentimiento de GA4
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            
            // Enviar evento personalizado
            gtag('event', 'cookie_consent_granted', {
                'event_category': 'engagement',
                'event_label': 'User accepted cookies'
            });
        }
        
        // Ocultar banner
        cookieBanner.classList.remove('show');
        
        console.log('✅ Cookies aceptadas - GA4 activado');
    });
    
    // Botón Rechazar
    cookieReject.addEventListener('click', function() {
        // Guardar rechazo
        localStorage.setItem('factico_cookie_consent', 'rejected');
        
        // Mantener denegado el almacenamiento
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        
        // Ocultar banner
        cookieBanner.classList.remove('show');
        
        console.log('❌ Cookies rechazadas - GA4 desactivado');
    });
});

// ===== EVENTOS PERSONALIZADOS GOOGLE ANALYTICS 4 =====

// Función auxiliar para enviar eventos a GA4
function sendGA4Event(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        const consent = localStorage.getItem('factico_cookie_consent');
        if (consent === 'accepted') {
            gtag('event', eventName, eventParams);
            console.log('GA4 Event:', eventName, eventParams);
        }
    }
}

// Tracking de clics en botones CTA (mejorado)
document.addEventListener('DOMContentLoaded', function() {
    // CTA principales (Empezar ahora)
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
        btn.addEventListener('click', function(e) {
            sendGA4Event('cta_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        });
    });
    
    // Ver demo
    document.querySelectorAll('a[href="#demo"]').forEach(link => {
        link.addEventListener('click', function() {
            sendGA4Event('view_demo', {
                'event_category': 'engagement',
                'event_label': 'Demo section'
            });
        });
    });
    
    // Vídeo promocional del Hero
    const heroVideoIframe = document.querySelector('.hero-video iframe');
    if (heroVideoIframe) {
        // Detectar cuando el iframe se vuelve visible (scroll)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sendGA4Event('promo_video_view', {
                        'event_category': 'engagement',
                        'event_label': 'Hero promotional video',
                        'video_url': 'https://youtu.be/XlSVXVvq7a4'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(heroVideoIframe);
    }
    
    // Reproducir vídeos
    document.querySelectorAll('.video-link, .playlist-card').forEach(videoLink => {
        videoLink.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3')?.textContent || 'Video tutorial';
            sendGA4Event('video_play', {
                'event_category': 'engagement',
                'event_label': videoTitle,
                'video_url': this.href
            });
        });
    });
    
    // Enlaces externos (usar ahora, registrarse)
    document.querySelectorAll('a[href^="https://facticoapp.es"]').forEach(link => {
        link.addEventListener('click', function() {
            sendGA4Event('register_intent', {
                'event_category': 'conversion',
                'event_label': 'Link to app',
                'link_text': this.textContent.trim()
            });
        });
    });
    
    // Clicks en secciones de funcionalidades
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('h3')?.textContent || 'Feature';
            sendGA4Event('feature_click', {
                'event_category': 'engagement',
                'event_label': featureTitle
            });
        });
    });
    
    // Clicks en guías
    document.querySelectorAll('a[href^="guias/"]').forEach(link => {
        link.addEventListener('click', function() {
            const guideTitle = this.textContent.trim();
            sendGA4Event('guide_click', {
                'event_category': 'engagement',
                'event_label': guideTitle,
                'guide_url': this.href
            });
        });
    });
    
    // Navegación en tabs "Sobre el Proyecto"
    document.querySelectorAll('.tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            sendGA4Event('about_tab_view', {
                'event_category': 'engagement',
                'event_label': tabName
            });
        });
    });
    
    // Tiempo en página (después de 30 segundos)
    setTimeout(function() {
        sendGA4Event('time_on_page_30s', {
            'event_category': 'engagement',
            'event_label': 'User stayed 30+ seconds'
        });
    }, 30000);
    
    // Scroll profundo (80% de la página)
    let deepScrollSent = false;
    window.addEventListener('scroll', function() {
        if (deepScrollSent) return;
        
        const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
        if (scrollPercent > 80) {
            sendGA4Event('scroll_depth_80', {
                'event_category': 'engagement',
                'event_label': 'Deep scroll'
            });
            deepScrollSent = true;
        }
    });
});

// Actualizar la función trackEvent existente para usar GA4
function trackEvent(eventName, eventData = {}) {
    // Consola para debug
    console.log('Event tracked:', eventName, eventData);
    
    // Enviar a GA4
    sendGA4Event(eventName, {
        'event_category': eventData.category || 'engagement',
        'event_label': eventData.label || eventName,
        ...eventData
    });
}

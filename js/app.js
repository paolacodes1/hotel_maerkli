// Hotel Maerkli App JavaScript
class HotelApp {
    constructor() {
        this.currentLanguage = 'pt';
        this.contentData = null;
        this.init();
    }

    async init() {
        await this.loadContentData();
        this.setupEventListeners();
        this.updateLanguage('pt');
        this.initializeAccordions();
    }

    async loadContentData() {
        try {
            const response = await fetch('data/content.json');
            this.contentData = await response.json();
        } catch (error) {
            console.error('Error loading content data:', error);
            // Fallback content if JSON fails to load
            this.contentData = {
                pt: { hotel_name: "Hotel Maerkli", welcome: "Seja muito bem-vindo!" },
                en: { hotel_name: "Hotel Maerkli", welcome: "Welcome!" },
                es: { hotel_name: "Hotel Maerkli", welcome: "¡Bienvenido!" }
            };
        }
    }

    setupEventListeners() {
        // Language toggle buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.updateLanguage(lang);
            });
        });

        // Accordion headers
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                this.toggleAccordion(e.target.closest('.accordion-header'));
            });
        });

        // Contact links
        this.setupContactLinks();
    }

    updateLanguage(lang) {
        if (!this.contentData[lang]) {
            console.warn(`Language ${lang} not found, using Portuguese`);
            lang = 'pt';
        }

        this.currentLanguage = lang;
        const content = this.contentData[lang];

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // Update all text content
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (content[key]) {
                if (Array.isArray(content[key])) {
                    // Handle lists (like breakfast items)
                    element.innerHTML = '';
                    content[key].forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        element.appendChild(li);
                    });
                } else {
                    element.textContent = content[key];
                }
            }
        });

        // Update document language attribute
        document.documentElement.lang = this.getLanguageCode(lang);

        // Save language preference
        localStorage.setItem('hotelMaerkliLang', lang);
    }

    getLanguageCode(lang) {
        const codes = {
            'pt': 'pt-BR',
            'en': 'en-US', 
            'es': 'es-ES'
        };
        return codes[lang] || 'pt-BR';
    }

    initializeAccordions() {
        // Set initial states - checkin, wifi, parking expanded by default
        const defaultExpanded = ['checkin', 'wifi', 'parking'];
        
        document.querySelectorAll('.accordion-item').forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.accordion-icon');
            const section = header.dataset.section;

            if (defaultExpanded.includes(section)) {
                content.classList.add('expanded');
                icon.textContent = '−';
            } else {
                content.classList.remove('expanded');
                icon.textContent = '+';
            }
        });
    }

    toggleAccordion(header) {
        const accordionItem = header.closest('.accordion-item');
        const content = accordionItem.querySelector('.accordion-content');
        const icon = header.querySelector('.accordion-icon');
        
        const isExpanded = content.classList.contains('expanded');

        if (isExpanded) {
            content.classList.remove('expanded');
            icon.textContent = '+';
            
            // Add green background when collapsed
            icon.style.backgroundColor = '#90EE90';
        } else {
            content.classList.add('expanded');
            icon.textContent = '−';
            
            // Keep green background when expanded
            icon.style.backgroundColor = '#90EE90';
        }

        // Smooth scroll to header if expanding
        if (!isExpanded) {
            setTimeout(() => {
                header.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    }

    setupContactLinks() {
        // Phone number link
        const phoneElements = document.querySelectorAll('a[href^="tel:"]');
        phoneElements.forEach(element => {
            element.addEventListener('click', () => {
                this.trackEvent('contact', 'phone_click');
            });
        });

        // Website link
        const websiteElements = document.querySelectorAll('a[href*="maerkli.com"]');
        websiteElements.forEach(element => {
            element.addEventListener('click', () => {
                this.trackEvent('contact', 'website_click');
            });
        });

        // Social media links
        const socialElements = document.querySelectorAll('a[href*="instagram.com"]');
        socialElements.forEach(element => {
            element.addEventListener('click', () => {
                this.trackEvent('social', 'instagram_click');
            });
        });
    }

    trackEvent(category, action) {
        // Simple event tracking - can be extended with analytics
        console.log(`Event: ${category} - ${action} - Language: ${this.currentLanguage}`);
        
        // If Google Analytics is available
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: this.currentLanguage
            });
        }
    }

    // Utility method to get current language content
    getCurrentContent() {
        return this.contentData[this.currentLanguage] || this.contentData['pt'];
    }

    // Method to handle errors gracefully
    handleError(error, context) {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly error message if needed
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff6b6b;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        errorDiv.textContent = 'Ocorreu um erro. Por favor, recarregue a página.';
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hotelApp = new HotelApp();
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('App is online');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    document.body.classList.add('offline');
});

// Handle back button / page visibility
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh content if needed
        console.log('Page became visible');
    }
});

// Prevent zoom on double tap (iOS Safari)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
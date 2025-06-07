// ===========================
// DARK ELITE PORTFOLIO JAVASCRIPT
// Sophisticated Interactions & Animations
// ===========================

document.addEventListener('DOMContentLoaded', function () {

    // ===========================
    // LOADING SCREEN
    // ===========================
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress-bar');

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initializeAnimations();
            }, 500);
        }
    }, 100);

    // ===========================
    // CUSTOM CURSOR - FIXED
    // ===========================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Mouse move event - CENTERED
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Center the dot (4px wide, so subtract 2px)
        cursorDot.style.left = (mouseX - 2) + 'px';
        cursorDot.style.top = (mouseY - 2) + 'px';
    });

    // Smooth cursor outline animation - CENTERED
    function animateCursorOutline() {
        outlineX += (mouseX - outlineX) * 0.3; // Faster response
        outlineY += (mouseY - outlineY) * 0.3;

        // Center the outline (32px wide, so subtract 16px)
        cursorOutline.style.left = (outlineX - 16) + 'px';
        cursorOutline.style.top = (outlineY - 16) + 'px';

        requestAnimationFrame(animateCursorOutline);
    }
    animateCursorOutline();


    // ===========================
    // NAVIGATION
    // ===========================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // ===========================
    // TYPEWRITER EFFECT
    // ===========================
    function typewriterEffect() {
        const texts = [
            'Transforming Ideas Into Impactful Software',
            'Building Next-Generation Mobile Applications',
            'Crafting Elegant User Experiences',
            'Innovating with Clean Architecture'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const subtitleElement = document.querySelector('.hero-subtitle');
        if (!subtitleElement) return;

        function type() {
            const currentText = texts[textIndex];
            const highlightStart = currentText.indexOf('<span class="highlight">');
            const highlightEnd = currentText.indexOf('</span>') + 7;

            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            let displayText = currentText.substring(0, charIndex);
            subtitleElement.innerHTML = displayText;

            let timeout = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                timeout = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                timeout = 500;
            }

            setTimeout(type, timeout);
        }

        type();
    }

    // ===========================
    // INTERSECTION OBSERVER
    // ===========================
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }

                // Animate counters
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }

                // Stagger animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    staggerProjectCards(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .section-header,
        .text-block,
        .timeline-item,
        .skill-item,
        .project-card,
        .contact-card,
        .achievement-item,
        .stat-item,
        .projects-grid
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ===========================
    // SKILL BAR ANIMATION
    // ===========================
    function animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const progressValue = progressBar.style.getPropertyValue('--progress');

        if (progressBar && progressValue) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = progressValue;
            }, 300);
        }
    }

    // ===========================
    // COUNTER ANIMATION
    // ===========================
    function animateCounter(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement) return;

        const finalValue = numberElement.textContent;
        const isDecimal = finalValue.includes('.');
        const hasSymbol = /[^\d.]/.test(finalValue);

        if (hasSymbol && finalValue !== '1K+' && finalValue !== '2×') return;

        let startValue = 0;
        let endValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));

        if (finalValue === '1K+') endValue = 1000;
        if (finalValue === '2×') endValue = 2;

        const increment = endValue / 50;
        const timer = setInterval(() => {
            startValue += increment;

            if (startValue >= endValue) {
                startValue = endValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(startValue);
            if (isDecimal) displayValue = startValue.toFixed(2);
            if (finalValue === '1K+') displayValue = Math.floor(startValue) >= 1000 ? '1K+' : Math.floor(startValue);
            if (finalValue === '2×') displayValue = Math.floor(startValue) + '×';

            numberElement.textContent = displayValue;
        }, 50);
    }

    // ===========================
    // PROJECT CARD ANIMATIONS
    // ===========================
    function staggerProjectCards(projectsGrid) {
        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }

    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // ===========================
    // CONTACT FORM
    // ===========================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = '<span class="btn-text">SENDING...</span>';
            submitButton.disabled = true;

            setTimeout(() => {
                submitButton.innerHTML = '<span class="btn-text">MESSAGE SENT!</span>';
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ===========================
    // FLOATING ELEMENTS PARALLAX
    // ===========================
    function parallaxElements() {
        const elements = document.querySelectorAll('.floating-elements .element');
        const scrollTop = window.pageYOffset;

        elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', parallaxElements);

    // ===========================
    // TECH BADGES INTERACTION
    // ===========================
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;

        badge.addEventListener('mouseenter', () => {
            badge.style.animationPlayState = 'paused';
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.animationPlayState = 'running';
        });
    });

    // ===========================
    // BUTTON RIPPLE EFFECT
    // ===========================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===========================
    // SMOOTH SCROLLING UTILITIES
    // ===========================
    function smoothScrollTo(targetPosition, duration = 1000) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // ===========================
    // KEYBOARD NAVIGATION
    // ===========================
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }

        // Arrow key navigation between sections
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });

        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);

            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                smoothScrollTo(sections[currentIndex + 1].offsetTop - 80);
            }

            if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                smoothScrollTo(sections[currentIndex - 1].offsetTop - 80);
            }
        }
    });

    // ===========================
    // PERFORMANCE OPTIMIZATIONS
    // ===========================

    // Debounce function for scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Optimized scroll handler
    const optimizedScrollHandler = debounce(() => {
        updateActiveNavLink();
        parallaxElements();
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // ===========================
    // INITIALIZATION
    // ===========================
    function initializeAnimations() {
        // Start typewriter effect
        // typewriterEffect(); // Commented out as we have static text

        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200);
        });

        // Initialize parallax
        parallaxElements();

        // Set initial active nav link
        updateActiveNavLink();
    }

    // ===========================
    // RESIZE HANDLER
    // ===========================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions after resize
            updateActiveNavLink();
        }, 250);
    });

    // ===========================
    // EASTER EGG - KONAMI CODE
    // ===========================
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiCode = [];
        }
    });

    // ===========================
    // PRINT STYLES HANDLER
    // ===========================
    window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
    });

    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });
});

// ===========================
// CSS ANIMATIONS VIA JS
// ===========================

// Add ripple effect CSS
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        padding: 2rem;
        gap: 1.5rem;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .body.nav-open {
        overflow: hidden;
    }
    
    @media print {
        .printing * {
            color: black !important;
            background: white !important;
        }
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Get random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};


// ===========================
// REAL LINKS INTEGRATION
// ===========================

// Wait for page to load
window.addEventListener('load', function () {

    // Handle CV Download Button
    const cvBtn = document.querySelector('.hero-actions .btn-secondary');
    if (cvBtn) {
        cvBtn.onclick = function (e) {
            e.preventDefault();
            window.open('https://drive.google.com/file/d/1tqcIx2ix98l0FjI-IlrdNxXkqo01lmR2/view?usp=sharing', '_blank');
        };
    }

    // Handle View Projects Button  
    const projectBtn = document.querySelector('.hero-actions .btn-primary');
    if (projectBtn) {
        projectBtn.onclick = function (e) {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        };
    }

});

// ===========================
// PHONE NUMBER COPY FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', function () {

    // Phone number copy functionality
    // Elegant phone copy with toast notification
    const phoneCopyElement = document.querySelector('.phone-copy');

    if (phoneCopyElement) {
        phoneCopyElement.addEventListener('click', async function () {
            const phoneNumber = this.getAttribute('data-phone');

            try {
                await navigator.clipboard.writeText(phoneNumber);

                // Create toast notification
                const toast = document.createElement('div');
                toast.innerHTML = '<i class="fas fa-check"></i> Phone number copied!';
                toast.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #22c55e;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideInRight 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            `;

                document.body.appendChild(toast);

                // Remove toast after 2 seconds
                setTimeout(() => {
                    toast.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        if (document.body.contains(toast)) {
                            document.body.removeChild(toast);
                        }
                    }, 300);
                }, 2000);

            } catch (err) {
                // Fallback for older browsers or errors
                alert('Phone number copied: ' + phoneNumber);
            }
        });
    }


    // Fallback copy function for older browsers
    function fallbackCopyTextToClipboard(text, element) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(element);
            }
        } catch (err) {
            showCopyError(element);
        }

        document.body.removeChild(textArea);
    }

    function showCopySuccess(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = `
            <i class="fas fa-check"></i>
            <span>Copied!</span>
        `;
        element.style.color = '#22c55e';

        setTimeout(() => {
            element.innerHTML = originalContent;
            element.style.color = '';
        }, 2000);
    }

    function showCopyError(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = `
            <i class="fas fa-times"></i>
            <span>Copy failed</span>
        `;
        element.style.color = '#ef4444';

        setTimeout(() => {
            element.innerHTML = originalContent;
            element.style.color = '';
        }, 2000);
    }
});

// ===========================
// EMAIL LINK ENHANCEMENT
// ===========================

// Enhanced email link functionality
document.addEventListener('DOMContentLoaded', function () {
    const emailLink = document.querySelector('a[href^="mailto:"]');

    if (emailLink) {
        emailLink.addEventListener('click', function (e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

        });
    }
});



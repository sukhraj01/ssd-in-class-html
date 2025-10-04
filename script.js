// Modern JavaScript for SSD Course Website
// Advanced interactive features and animations

class SSDWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
        this.setupScrollEffects();
        this.setupThemeToggle();
        this.setupParticleEffect();
        this.setupTypingEffect();
        this.setupProgressBars();
        this.setupParallaxEffects();
        this.setupInteractiveElements();
        this.setupLazyLoading();
        this.setupPerformanceOptimizations();
    }

    init() {
        console.log('🚀 SSD Website initialized with modern features!');
        this.createLoadingScreen();
        this.setupSmoothScrolling();
        this.initializeTooltips();
        this.setupBackToTop();
    }

    // Loading screen with animation
    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loading-screen';
        loader.innerHTML = `
            <div class="loader-container">
                <div class="loader-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loader-text">Loading CS6.302 SSD Course...</div>
                <div class="loader-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        `;
        
        // Add loader styles
        const loaderStyles = `
            <style>
                #loading-screen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    transition: opacity 0.5s ease;
                }
                .loader-container {
                    text-align: center;
                    color: white;
                }
                .loader-spinner {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 2rem;
                }
                .spinner-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 4px solid transparent;
                    border-top: 4px solid #fff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                .spinner-ring:nth-child(2) {
                    width: 70%;
                    height: 70%;
                    top: 15%;
                    left: 15%;
                    animation-delay: 0.2s;
                }
                .spinner-ring:nth-child(3) {
                    width: 40%;
                    height: 40%;
                    top: 30%;
                    left: 30%;
                    animation-delay: 0.4s;
                }
                .loader-text {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    animation: pulse 2s infinite;
                }
                .loader-progress {
                    width: 300px;
                    margin: 0 auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', loaderStyles);
        document.body.appendChild(loader);
        
        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 500);
                }, 500);
            }
            const progressFill = loader.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
        }, 100);
    }

    // Event listeners setup
    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Resize handler
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        
        // Mouse effects
        document.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));
        
        // Click effects
        document.addEventListener('click', this.handleClick.bind(this));
    }

    // Scroll effects and animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Special effects for different elements
                    if (entry.target.classList.contains('section')) {
                        this.animateSection(entry.target);
                    }
                    
                    if (entry.target.classList.contains('card')) {
                        this.animateCard(entry.target);
                    }
                    
                    // Removed table animation that was causing disappearing tables
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .card, .table-container').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Theme toggle functionality
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                const isDark = document.body.classList.contains('dark-theme');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                this.updateThemeIcon(isDark);
                this.animateThemeChange();
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                this.updateThemeIcon(true);
            }
        }
    }

    updateThemeIcon(isDark) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        }
    }

    animateThemeChange() {
        // Removed body transition that was causing button shift
        // Theme change now only affects colors, not positioning
    }

    // Particle effect background
    setupParticleEffect() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
            };
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
            });
            
            // Connect nearby particles
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            animationId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
        
        animate();
    }

    // Typing effect for headings
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid #6366f1';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    element.style.borderRight = 'none';
                }
            };
            
            setTimeout(typeWriter, 1000);
        });
    }

    // Animated progress bars
    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const fill = bar.querySelector('.progress-fill');
            const percentage = bar.dataset.percentage || '100';
            
            setTimeout(() => {
                fill.style.width = percentage + '%';
            }, 500);
        });
    }

    // Parallax effects
    setupParallaxEffects() {
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    }

    // Interactive elements
    setupInteractiveElements() {
        // Hover effects for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Removed table row animations that were causing issues

        // Link hover effects
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
            });
        });
    }

    // Lazy loading for images and heavy content
    setupLazyLoading() {
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

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Preload critical resources
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'styles.css';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);

        // Service worker registration (if available)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(console.log);
        }

        // Memory cleanup
        window.addEventListener('beforeunload', () => {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        });
    }

    // Back to top button
    setupBackToTop() {
        const backToTop = document.createElement('div');
        backToTop.className = 'fab';
        backToTop.innerHTML = '↑';
        backToTop.title = 'Back to top';
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide based on scroll position
        window.addEventListener('scroll', this.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'flex';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        }, 100));
    }

    // Animation methods
    animateSection(section) {
        section.style.animation = 'fadeInUp 0.6s ease-out';
        setTimeout(() => {
            section.style.animation = '';
        }, 600);
    }

    animateCard(card) {
        card.style.animation = 'fadeInUp 0.6s ease-out';
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }

    animateTable(table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            setTimeout(() => {
                row.style.animation = 'fadeInUp 0.4s ease-out';
            }, index * 50);
        });
    }

    // Event handlers
    handleScroll() {
        const nav = document.querySelector('.nav-container');
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    handleKeyboard(event) {
        // Keyboard shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch(event.key) {
                case 'k':
                    event.preventDefault();
                    document.querySelector('.theme-toggle')?.click();
                    break;
                case 'h':
                    event.preventDefault();
                    document.querySelector('a[href="#home"]')?.click();
                    break;
            }
        }
    }

    handleMouseMove(event) {
        // Mouse trail effect
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX - 3}px;
            top: ${event.clientY - 3}px;
            animation: fadeOut 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    handleClick(event) {
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        event.target.style.position = 'relative';
        event.target.style.overflow = 'hidden';
        event.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Utility methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    debounce(func, wait) {
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

    // Initialize tooltips
    initializeTooltips() {
        document.querySelectorAll('[title]').forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.title;
            element.removeAttribute('title');
            
            element.addEventListener('mouseenter', () => {
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 + 'px';
                tooltip.style.top = rect.top - 40 + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    }

    // Start animations
    startAnimations() {
        // Add CSS for animations
        const animationStyles = `
            <style>
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                @keyframes fadeOut {
                    to {
                        opacity: 0;
                        transform: scale(0);
                    }
                }
                .tooltip {
                    position: absolute;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    pointer-events: none;
                    z-index: 10000;
                    transform: translateX(-50%);
                }
                .fab {
                    opacity: 0;
                    transition: all 0.3s ease;
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', animationStyles);
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SSDWebsite();
});

// Add some additional CSS for animations
const additionalStyles = `
    <style>
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .dark-theme {
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-light: #9ca3af;
            --bg-primary: #111827;
            --bg-secondary: #1f2937;
            --bg-accent: #374151;
            --border-color: #374151;
        }
        
        .fab {
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .fab:hover {
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

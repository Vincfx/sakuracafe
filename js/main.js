/**
 * Sakura Café - Main JavaScript
 * Handles all interactive elements of the sakura-themed café website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initStickyHeader();
    initMenuTabs();
    initTestimonialSlider();
    initBackToTop();
    initSakuraPetals();
    initReservationForm();
    initAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Menu Tabs Filtering
 */
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuTabs.length && menuItems.length) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide menu items based on category
                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length && dots.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show testimonial at specific index
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        // Event listeners for prev/next buttons
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonials.length - 1;
            showTestimonial(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        });
        
        // Auto-advance testimonials every 5 seconds
        setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Sakura Petals Animation
 */
function initSakuraPetals() {
    const sakuraPetalsContainer = document.querySelector('.sakura-petals');
    
    if (sakuraPetalsContainer) {
        // Create 20 sakura petals
        for (let i = 0; i < 20; i++) {
            createPetal(sakuraPetalsContainer);
        }
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
    
    // Random size between 10px and 20px
    const size = Math.random() * 10 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // Random position
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.top = `-${size}px`;
    
    // Random opacity
    petal.style.opacity = Math.random() * 0.6 + 0.4;
    
    // Random animation duration between 5s and 15s
    const duration = Math.random() * 10 + 5;
    petal.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    petal.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(petal);
    
    // Remove petal after animation completes and create a new one
    setTimeout(() => {
        petal.remove();
        createPetal(container);
    }, duration * 1000);
}

/**
 * Reservation Form Handling
 */
function initReservationForm() {
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validate form data
            if (validateReservationForm(formDataObj)) {
                // In a real application, you would send this data to a server
                // For demo purposes, we'll just show a success message
                showReservationConfirmation(formDataObj);
                this.reset();
            }
        });
    }
}

function validateReservationForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.date || !data.time || !data.guests) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    // Date validation - ensure it's not in the past
    const selectedDate = new Date(data.date + ' ' + data.time);
    const now = new Date();
    if (selectedDate < now) {
        alert('Please select a future date and time.');
        return false;
    }
    
    return true;
}

function showReservationConfirmation(data) {
    // Create a modal or notification to show confirmation
    const modal = document.createElement('div');
    modal.classList.add('reservation-confirmation');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('confirmation-content');
    
    // Format date for display
    const reservationDate = new Date(data.date + ' ' + data.time);
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    modalContent.innerHTML = `
        <h2>Reservation Confirmed!</h2>
        <p>Thank you for your reservation, ${data.name}.</p>
        <div class="confirmation-details">
            <p><strong>Date:</strong> ${reservationDate.toLocaleDateString('en-US', dateOptions)}</p>
            <p><strong>Time:</strong> ${reservationDate.toLocaleTimeString('en-US', timeOptions)}</p>
            <p><strong>Guests:</strong> ${data.guests}</p>
        </div>
        <p>We've sent a confirmation email to ${data.email}.</p>
        <p>We look forward to serving you at Sakura Café!</p>
        <button class="btn primary close-btn">Close</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    // Also close when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Scroll Animations
 */
function initAnimations() {
    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.featured-item, .menu-item, .about-content, .gallery-item, .testimonial');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
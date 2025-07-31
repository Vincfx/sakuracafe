/**
 * Event Countdown and Celebration
 * Creates a countdown timer and celebration animation for special events
 */

class EventCountdown {
    constructor(options = {}) {
        // Default options
        this.options = {
            selector: '.event-countdown',
            eventDate: null, // Date object or string
            eventName: 'Special Event',
            petalCount: 50,
            petalColors: ['#f8c8dc', '#fde2eb', '#e4a3b8', '#f9d7e8'],
            ...options
        };
        
        this.countdown = null;
        this.timeRemaining = {};
        this.interval = null;
        this.hasEnded = false;
        
        this.init();
    }
    
    init() {
        // Find countdown container
        this.countdown = document.querySelector(this.options.selector);
        
        if (!this.countdown) {
            console.warn(`Countdown container not found with selector ${this.options.selector}`);
            return;
        }
        
        // Get event date
        if (!this.options.eventDate) {
            // If no date provided, use a date 7 days from now
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 7);
            this.options.eventDate = defaultDate;
        } else if (typeof this.options.eventDate === 'string') {
            // Convert string to date
            this.options.eventDate = new Date(this.options.eventDate);
        }
        
        // Create countdown structure
        this.createCountdownStructure();
        
        // Create celebration petals container
        this.createCelebrationContainer();
        
        // Start countdown
        this.startCountdown();
    }
    
    createCountdownStructure() {
        // Create title
        const title = document.createElement('h3');
        title.textContent = this.options.eventName;
        
        // Create timer container
        const timerContainer = document.createElement('div');
        timerContainer.classList.add('countdown-timer');
        
        // Create timer items
        const items = ['days', 'hours', 'minutes', 'seconds'];
        
        items.forEach(item => {
            const countdownItem = document.createElement('div');
            countdownItem.classList.add('countdown-item');
            
            const number = document.createElement('div');
            number.classList.add('countdown-number');
            number.setAttribute('data-unit', item);
            number.textContent = '0';
            
            const label = document.createElement('div');
            label.classList.add('countdown-label');
            label.textContent = item.charAt(0).toUpperCase() + item.slice(1);
            
            countdownItem.appendChild(number);
            countdownItem.appendChild(label);
            timerContainer.appendChild(countdownItem);
        });
        
        // Create message
        const message = document.createElement('p');
        message.classList.add('countdown-message');
        message.textContent = `Join us for this special event!`;
        
        // Clear and append elements
        this.countdown.innerHTML = '';
        this.countdown.appendChild(title);
        this.countdown.appendChild(timerContainer);
        this.countdown.appendChild(message);
    }
    
    createCelebrationContainer() {
        // Create container for celebration petals
        const celebrationContainer = document.createElement('div');
        celebrationContainer.classList.add('celebration-petals');
        
        this.countdown.appendChild(celebrationContainer);
    }
    
    startCountdown() {
        // Calculate time remaining
        this.calculateTimeRemaining();
        
        // Update countdown immediately
        this.updateCountdown();
        
        // Set interval to update countdown every second
        this.interval = setInterval(() => {
            this.calculateTimeRemaining();
            this.updateCountdown();
            
            // Check if countdown has ended
            if (this.timeRemaining.total <= 0 && !this.hasEnded) {
                this.endCountdown();
            }
        }, 1000);
    }
    
    calculateTimeRemaining() {
        const now = new Date();
        const difference = this.options.eventDate - now;
        
        // Calculate time units
        this.timeRemaining = {
            total: Math.max(0, difference),
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
        
        // Ensure no negative values
        Object.keys(this.timeRemaining).forEach(key => {
            if (key !== 'total' && this.timeRemaining[key] < 0) {
                this.timeRemaining[key] = 0;
            }
        });
    }
    
    updateCountdown() {
        // Update each time unit
        const units = ['days', 'hours', 'minutes', 'seconds'];
        
        units.forEach(unit => {
            const element = this.countdown.querySelector(`[data-unit="${unit}"]`);
            if (element) {
                // Add leading zero if needed
                const value = this.timeRemaining[unit];
                element.textContent = value < 10 ? `0${value}` : value;
            }
        });
    }
    
    endCountdown() {
        // Mark as ended
        this.hasEnded = true;
        
        // Clear interval
        clearInterval(this.interval);
        
        // Update message
        const message = this.countdown.querySelector('.countdown-message');
        if (message) {
            message.textContent = 'The event has started! 🎉';
        }
        
        // Add celebration class
        this.countdown.classList.add('celebration-active');
        
        // Create celebration petals
        this.createCelebrationPetals();
    }
    
    createCelebrationPetals() {
        // Get celebration container
        const container = this.countdown.querySelector('.celebration-petals');
        
        if (!container) return;
        
        // Create petals
        for (let i = 0; i < this.options.petalCount; i++) {
            setTimeout(() => {
                this.createCelebrationPetal(container);
            }, i * 100);
        }
    }
    
    createCelebrationPetal(container) {
        // Create petal element
        const petal = document.createElement('div');
        petal.classList.add('blossom-petal');
        
        // Random properties
        const size = Math.random() * 15 + 5;
        const color = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];
        const startX = Math.random() * container.offsetWidth;
        const startY = container.offsetHeight;
        const duration = Math.random() * 3000 + 2000;
        
        // Set petal style
        petal.style.position = 'absolute';
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.backgroundColor = color;
        petal.style.borderRadius = '150% 0 150% 0';
        petal.style.opacity = '0';
        petal.style.left = `${startX}px`;
        petal.style.top = `${startY}px`;
        petal.style.transform = 'rotate(0deg) scale(0.5)';
        petal.style.boxShadow = `0 0 5px ${color}33`;
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '10';
        petal.style.transition = `all ${duration}ms ease-out`;
        
        // Add to container
        container.appendChild(petal);
        
        // Trigger animation after a small delay
        setTimeout(() => {
            petal.style.opacity = '0.8';
            petal.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-Math.random() * container.offsetHeight - 50}px) rotate(${Math.random() * 360}deg) scale(1)`;
        }, 10);
        
        // Fade out
        setTimeout(() => {
            petal.style.opacity = '0';
        }, duration - 500);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
            
            // Create a new petal to maintain the effect
            if (this.hasEnded) {
                this.createCelebrationPetal(container);
            }
        }, duration);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's an event countdown on the page
    const countdownContainer = document.querySelector('.event-countdown');
    
    if (countdownContainer) {
        // Get event date from data attribute or use default
        const eventDate = countdownContainer.dataset.eventDate;
        const eventName = countdownContainer.dataset.eventName || 'Special Event';
        
        // Initialize event countdown
        const eventCountdown = new EventCountdown({
            eventDate: eventDate,
            eventName: eventName
        });
    }
});
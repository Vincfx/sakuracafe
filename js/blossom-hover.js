/**
 * Blossom Hover Effect
 * Creates a burst of sakura petals when hovering over elements
 */

class BlossomHoverEffect {
    constructor(options = {}) {
        // Default options
        this.options = {
            selector: '.btn, .menu-item, .gallery-item',
            petalCount: 8,
            petalColors: ['#f8c8dc', '#fde2eb', '#e4a3b8', '#f9d7e8'],
            duration: 1000, // ms
            ...options
        };
        
        this.init();
    }
    
    init() {
        // Find all elements that should have the effect
        const elements = document.querySelectorAll(this.options.selector);
        
        if (elements.length === 0) {
            console.warn(`No elements found with selector ${this.options.selector}`);
            return;
        }
        
        // Add event listeners to each element
        elements.forEach(element => {
            element.addEventListener('mouseenter', this.createBlossomBurst.bind(this, element));
            element.addEventListener('touchstart', this.createBlossomBurst.bind(this, element), { passive: true });
            
            // Add position relative if not already set
            const position = window.getComputedStyle(element).getPropertyValue('position');
            if (position === 'static') {
                element.style.position = 'relative';
            }
            
            // Add overflow hidden to parent if it's a gallery item
            if (element.classList.contains('gallery-item')) {
                element.style.overflow = 'hidden';
            }
        });
    }
    
    createBlossomBurst(element, event) {
        // Get element dimensions and position
        const rect = element.getBoundingClientRect();
        
        // Determine burst origin (either from mouse position or center of element)
        let originX, originY;
        
        if (event.type === 'mouseenter' && event.clientX && event.clientY) {
            originX = event.clientX - rect.left;
            originY = event.clientY - rect.top;
        } else {
            originX = rect.width / 2;
            originY = rect.height / 2;
        }
        
        // Create petals
        for (let i = 0; i < this.options.petalCount; i++) {
            this.createPetal(element, originX, originY);
        }
    }
    
    createPetal(element, originX, originY) {
        // Create petal element
        const petal = document.createElement('div');
        petal.classList.add('blossom-petal');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];
        const angle = Math.random() * 360;
        const distance = Math.random() * 50 + 20;
        const duration = Math.random() * 500 + this.options.duration;
        
        // Calculate end position
        const endX = originX + Math.cos(angle * Math.PI / 180) * distance;
        const endY = originY + Math.sin(angle * Math.PI / 180) * distance;
        
        // Set petal style
        petal.style.position = 'absolute';
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.backgroundColor = color;
        petal.style.borderRadius = '150% 0 150% 0';
        petal.style.opacity = '0';
        petal.style.left = `${originX}px`;
        petal.style.top = `${originY}px`;
        petal.style.transform = 'rotate(0deg) scale(0.5)';
        petal.style.boxShadow = `0 0 5px ${color}33`;
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '10';
        petal.style.transition = `all ${duration}ms ease-out`;
        
        // Add to element
        element.appendChild(petal);
        
        // Trigger animation after a small delay (for browser to process)
        setTimeout(() => {
            petal.style.opacity = '0.8';
            petal.style.transform = `translate(${endX - originX}px, ${endY - originY}px) rotate(${Math.random() * 360}deg) scale(1)`;
            petal.style.opacity = '0';
        }, 10);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, duration + 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blossom hover effect
    const blossomHover = new BlossomHoverEffect();
});
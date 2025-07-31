/**
 * Enhanced Sakura Petals Animation
 * Creates a more interactive and magical sakura petal effect
 */

class EnhancedSakuraPetals {
    constructor(options = {}) {
        // Default options
        this.options = {
            selector: '.sakura-petals',
            petalCount: 30,
            petalColors: ['#f8c8dc', '#fde2eb', '#e4a3b8', '#f9d7e8'],
            minSize: 10,
            maxSize: 20,
            minOpacity: 0.4,
            maxOpacity: 0.8,
            fallSpeed: 1,
            interactive: true,
            ...options
        };
        
        this.petals = [];
        this.container = null;
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseMoving = false;
        this.mouseTimer = null;
        
        this.init();
    }
    
    init() {
        // Find container
        this.container = document.querySelector(this.options.selector);
        
        if (!this.container) {
            console.warn(`Container ${this.options.selector} not found`);
            return;
        }
        
        // Set container style
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = '1';
        
        // Get container dimensions
        this.updateContainerDimensions();
        
        // Create petals
        this.createPetals();
        
        // Add event listeners
        window.addEventListener('resize', this.handleResize.bind(this));
        
        if (this.options.interactive) {
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        }
        
        // Start animation
        this.animate();
    }
    
    updateContainerDimensions() {
        const rect = this.container.getBoundingClientRect();
        this.containerWidth = rect.width;
        this.containerHeight = rect.height;
    }
    
    handleResize() {
        this.updateContainerDimensions();
    }
    
    handleMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
        
        this.isMouseMoving = true;
        
        // Reset the timer
        clearTimeout(this.mouseTimer);
        
        // Set a timer to detect when mouse stops moving
        this.mouseTimer = setTimeout(() => {
            this.isMouseMoving = false;
        }, 100);
    }
    
    createPetals() {
        // Clear existing petals
        this.container.innerHTML = '';
        this.petals = [];
        
        // Create new petals
        for (let i = 0; i < this.options.petalCount; i++) {
            this.createPetal();
        }
    }
    
    createPetal() {
        // Create petal element
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        
        // Random properties
        const size = Math.random() * (this.options.maxSize - this.options.minSize) + this.options.minSize;
        const color = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];
        const opacity = Math.random() * (this.options.maxOpacity - this.options.minOpacity) + this.options.minOpacity;
        const left = Math.random() * this.containerWidth;
        const top = Math.random() * this.containerHeight * -1 - size; // Start above the container
        
        // Set petal style
        petal.style.position = 'absolute';
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.backgroundColor = color;
        petal.style.borderRadius = '150% 0 150% 0';
        petal.style.opacity = opacity;
        petal.style.left = `${left}px`;
        petal.style.top = `${top}px`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        petal.style.boxShadow = `0 0 5px ${color}33`;
        petal.style.filter = 'blur(0.5px)';
        
        // Add to container
        this.container.appendChild(petal);
        
        // Store petal data
        const petalData = {
            element: petal,
            size,
            x: left,
            y: top,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            speedX: (Math.random() - 0.5) * 2,
            speedY: Math.random() * 2 + 1 * this.options.fallSpeed,
            swayFactor: Math.random() * 0.1 + 0.05
        };
        
        this.petals.push(petalData);
        
        return petalData;
    }
    
    animate() {
        this.updatePetals();
        requestAnimationFrame(this.animate.bind(this));
    }
    
    updatePetals() {
        this.petals.forEach((petal, index) => {
            // Update position
            petal.y += petal.speedY;
            petal.x += petal.speedX + Math.sin(petal.y * petal.swayFactor) * 2;
            petal.rotation += petal.rotationSpeed;
            
            // Mouse interaction
            if (this.options.interactive && this.isMouseMoving) {
                const dx = this.mouseX - petal.x;
                const dy = this.mouseY - petal.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100 * 0.5;
                    
                    petal.x -= Math.cos(angle) * force;
                    petal.y -= Math.sin(angle) * force;
                    petal.rotation += force * 10;
                }
            }
            
            // Apply changes
            petal.element.style.transform = `translate(${petal.x}px, ${petal.y}px) rotate(${petal.rotation}deg)`;
            
            // Check if petal is out of bounds
            if (petal.y > this.containerHeight || 
                petal.x < -petal.size || 
                petal.x > this.containerWidth + petal.size) {
                
                // Remove old petal
                petal.element.remove();
                
                // Create new petal
                this.petals[index] = this.createPetal();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced sakura petals
    const sakuraPetals = new EnhancedSakuraPetals({
        petalCount: window.innerWidth < 768 ? 15 : 30, // Fewer petals on mobile
        interactive: true
    });
});
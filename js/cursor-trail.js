/**
 * Sakura Blossom Cursor Trail
 * Creates a trail of sakura petals following the cursor on desktop devices
 */

class SakuraCursorTrail {
    constructor(options = {}) {
        // Default options
        this.options = {
            petalCount: 7,
            petalColors: ['#f8c8dc', '#fde2eb', '#e4a3b8'],
            petalSize: 8,
            trailLength: 100, // ms between petals
            petalDuration: 1000, // ms before petal fades out
            ...options
        };
        
        this.petals = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isCreatingPetal = false;
        this.isMobile = window.innerWidth < 1024;
        
        // Only initialize on desktop
        if (!this.isMobile) {
            this.init();
        }
    }
    
    init() {
        // Add event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Create petal if not already creating
        if (!this.isCreatingPetal) {
            this.createPetal();
        }
    }
    
    handleResize() {
        // Check if now mobile
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 1024;
        
        // If changed to mobile, remove all petals
        if (!wasMobile && this.isMobile) {
            this.petals.forEach(petal => {
                if (petal.element) {
                    petal.element.remove();
                }
            });
            this.petals = [];
        }
    }
    
    createPetal() {
        // Don't create petals on mobile
        if (this.isMobile) return;
        
        // Set flag to prevent too many petals
        this.isCreatingPetal = true;
        
        // Create petal element
        const petal = document.createElement('div');
        petal.classList.add('cursor-petal');
        
        // Random properties
        const size = this.options.petalSize * (Math.random() * 0.4 + 0.8);
        const color = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];
        const rotation = Math.random() * 360;
        
        // Set petal style
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.backgroundColor = color;
        petal.style.left = `${this.mouseX}px`;
        petal.style.top = `${this.mouseY}px`;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        // Add to document
        document.body.appendChild(petal);
        
        // Store petal data
        const petalData = {
            element: petal,
            createdAt: Date.now(),
            initialX: this.mouseX,
            initialY: this.mouseY
        };
        
        this.petals.push(petalData);
        
        // Animate petal
        setTimeout(() => {
            if (petal.parentNode) {
                petal.style.opacity = '0';
                petal.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${Math.random() * 50 + 20}px) rotate(${rotation + 180}deg)`;
            }
        }, 10);
        
        // Remove petal after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
            
            // Remove from petals array
            const index = this.petals.indexOf(petalData);
            if (index > -1) {
                this.petals.splice(index, 1);
            }
        }, this.options.petalDuration);
        
        // Reset flag after delay
        setTimeout(() => {
            this.isCreatingPetal = false;
            
            // If mouse has moved significantly, create another petal immediately
            const distanceMoved = Math.hypot(
                this.mouseX - petalData.initialX,
                this.mouseY - petalData.initialY
            );
            
            if (distanceMoved > 20) {
                this.createPetal();
            }
        }, this.options.trailLength);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor trail (only on desktop)
    const cursorTrail = new SakuraCursorTrail();
});
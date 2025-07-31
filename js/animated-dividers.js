/**
 * Animated Section Dividers
 * Creates beautiful animated SVG dividers between sections
 */

class AnimatedDividers {
    constructor(options = {}) {
        // Default options
        this.options = {
            selector: '.section-divider',
            types: ['wave', 'branch', 'petals'],
            colors: {
                primary: '#f8c8dc',
                secondary: '#e4a3b8',
                accent: '#8d3f63'
            },
            ...options
        };
        
        this.dividers = [];
        this.init();
    }
    
    init() {
        // Find all divider elements
        const dividerElements = document.querySelectorAll(this.options.selector);
        
        if (dividerElements.length === 0) {
            console.warn(`No dividers found with selector ${this.options.selector}`);
            return;
        }
        
        // Initialize each divider
        dividerElements.forEach(element => {
            // Get divider type from data attribute or use random type
            const type = element.dataset.dividerType || 
                this.options.types[Math.floor(Math.random() * this.options.types.length)];
            
            // Get divider color from data attribute or use primary color
            const color = element.dataset.dividerColor || this.options.colors.primary;
            
            // Get divider height from data attribute or use default
            const height = element.dataset.dividerHeight || 100;
            
            // Get flip option from data attribute
            const flip = element.dataset.dividerFlip === 'true';
            
            // Create divider
            this.createDivider(element, type, color, height, flip);
        });
        
        // Add intersection observer for animation
        this.addIntersectionObserver();
    }
    
    createDivider(element, type, color, height, flip) {
        // Clear element content
        element.innerHTML = '';
        
        // Set element style
        element.style.position = 'relative';
        element.style.width = '100%';
        element.style.height = `${height}px`;
        element.style.overflow = 'hidden';
        
        // Create SVG based on type
        let svg;
        
        switch (type) {
            case 'wave':
                svg = this.createWaveDivider(color, height, flip);
                break;
            case 'branch':
                svg = this.createBranchDivider(color, height, flip);
                break;
            case 'petals':
                svg = this.createPetalsDivider(color, height, flip);
                break;
            default:
                svg = this.createWaveDivider(color, height, flip);
        }
        
        // Add SVG to element
        element.appendChild(svg);
        
        // Store divider data
        this.dividers.push({
            element,
            type,
            svg
        });
    }
    
    createWaveDivider(color, height, flip) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', '0 0 1200 120');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.left = '0';
        svg.style.bottom = flip ? 'auto' : '0';
        svg.style.top = flip ? '0' : 'auto';
        svg.style.transform = flip ? 'rotate(180deg)' : 'none';
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0,0 C150,40 350,0 500,30 C650,60 700,0 900,20 C1050,40 1200,10 1200,10 V120 H0 Z');
        path.setAttribute('fill', color);
        path.style.opacity = '0';
        path.style.transform = 'translateY(20px)';
        path.style.transition = 'all 1.5s ease-out';
        
        svg.appendChild(path);
        
        // Add small circles for bubbles/petals
        for (let i = 0; i < 10; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const x = Math.random() * 1200;
            const y = Math.random() * 60 + 30;
            const radius = Math.random() * 5 + 2;
            
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', radius);
            circle.setAttribute('fill', this.options.colors.secondary);
            circle.style.opacity = '0';
            circle.style.transform = 'translateY(20px)';
            circle.style.transition = `all ${1 + Math.random()}s ease-out ${Math.random() * 0.5}s`;
            
            svg.appendChild(circle);
        }
        
        return svg;
    }
    
    createBranchDivider(color, height, flip) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', '0 0 1200 120');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.left = '0';
        svg.style.bottom = flip ? 'auto' : '0';
        svg.style.top = flip ? '0' : 'auto';
        svg.style.transform = flip ? 'rotate(180deg)' : 'none';
        
        // Create base path (branch)
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0,120 C300,100 600,110 900,95 C1050,85 1200,100 1200,100 V120 H0 Z');
        path.setAttribute('fill', this.options.colors.accent);
        path.style.opacity = '0';
        path.style.transform = 'translateY(20px)';
        path.style.transition = 'all 1.5s ease-out';
        
        svg.appendChild(path);
        
        // Create branch line
        const branch = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        branch.setAttribute('d', 'M100,100 C400,60 700,80 1100,70');
        branch.setAttribute('stroke', this.options.colors.accent);
        branch.setAttribute('stroke-width', '3');
        branch.setAttribute('fill', 'none');
        branch.style.opacity = '0';
        branch.style.strokeDasharray = '1200';
        branch.style.strokeDashoffset = '1200';
        branch.style.transition = 'stroke-dashoffset 2s ease-out, opacity 0.5s ease-out';
        
        svg.appendChild(branch);
        
        // Add blossoms along the branch
        for (let i = 0; i < 12; i++) {
            const x = 100 + (i * 90);
            const y = 100 - (Math.sin((i / 12) * Math.PI) * 40);
            
            const blossom = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            blossom.style.opacity = '0';
            blossom.style.transform = 'scale(0)';
            blossom.style.transition = `all 0.5s ease-out ${1 + (i * 0.1)}s`;
            
            // Create flower petals
            for (let j = 0; j < 5; j++) {
                const petal = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const angle = (j / 5) * Math.PI * 2;
                const px = x + Math.cos(angle) * 5;
                const py = y + Math.sin(angle) * 5;
                
                petal.setAttribute('cx', px);
                petal.setAttribute('cy', py);
                petal.setAttribute('r', 4);
                petal.setAttribute('fill', color);
                
                blossom.appendChild(petal);
            }
            
            // Create flower center
            const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            center.setAttribute('cx', x);
            center.setAttribute('cy', y);
            center.setAttribute('r', 3);
            center.setAttribute('fill', this.options.colors.secondary);
            
            blossom.appendChild(center);
            svg.appendChild(blossom);
        }
        
        return svg;
    }
    
    createPetalsDivider(color, height, flip) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', '0 0 1200 120');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.position = 'absolute';
        svg.style.left = '0';
        svg.style.bottom = flip ? 'auto' : '0';
        svg.style.top = flip ? '0' : 'auto';
        svg.style.transform = flip ? 'rotate(180deg)' : 'none';
        
        // Create base path
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M0,0 L1200,0 L1200,120 L0,120 Z');
        path.setAttribute('fill', color);
        path.style.opacity = '0';
        path.style.transform = 'translateY(20px)';
        path.style.transition = 'all 1.5s ease-out';
        
        svg.appendChild(path);
        
        // Add floating petals
        for (let i = 0; i < 20; i++) {
            const petal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const x = Math.random() * 1200;
            const y = Math.random() * 120;
            const size = Math.random() * 10 + 5;
            const rotation = Math.random() * 360;
            
            petal.setAttribute('d', `M${x},${y} c${size/2},0 ${size/2},${size/2} 0,${size} c-${size/2},${size/2} -${size/2},0 0,-${size}`);
            petal.setAttribute('fill', this.options.colors.secondary);
            petal.style.opacity = '0';
            petal.style.transform = `rotate(${rotation}deg)`;
            petal.style.transition = `all ${1 + Math.random()}s ease-out ${Math.random() * 0.5}s`;
            
            svg.appendChild(petal);
        }
        
        return svg;
    }
    
    addIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Find divider data
                        const dividerData = this.dividers.find(d => d.element === entry.target);
                        
                        if (dividerData) {
                            // Animate SVG elements
                            const svg = dividerData.svg;
                            const path = svg.querySelector('path');
                            const circles = svg.querySelectorAll('circle');
                            const blossoms = svg.querySelectorAll('g');
                            const petals = svg.querySelectorAll('path:not(:first-child)');
                            const branch = svg.querySelector('path[stroke]');
                            
                            // Animate main path
                            if (path) {
                                path.style.opacity = '1';
                                path.style.transform = 'translateY(0)';
                            }
                            
                            // Animate circles
                            if (circles.length > 0) {
                                circles.forEach(circle => {
                                    circle.style.opacity = '0.8';
                                    circle.style.transform = 'translateY(0)';
                                });
                            }
                            
                            // Animate blossoms
                            if (blossoms.length > 0) {
                                blossoms.forEach(blossom => {
                                    blossom.style.opacity = '1';
                                    blossom.style.transform = 'scale(1)';
                                });
                            }
                            
                            // Animate petals
                            if (petals.length > 0) {
                                petals.forEach(petal => {
                                    petal.style.opacity = '0.8';
                                });
                            }
                            
                            // Animate branch
                            if (branch) {
                                branch.style.opacity = '1';
                                branch.style.strokeDashoffset = '0';
                            }
                            
                            // Unobserve after animation
                            observer.unobserve(entry.target);
                        }
                    }
                });
            }, { threshold: 0.2 });
            
            // Observe all dividers
            this.dividers.forEach(divider => {
                observer.observe(divider.element);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.dividers.forEach(divider => {
                const svg = divider.svg;
                const path = svg.querySelector('path');
                const circles = svg.querySelectorAll('circle');
                const blossoms = svg.querySelectorAll('g');
                const petals = svg.querySelectorAll('path:not(:first-child)');
                const branch = svg.querySelector('path[stroke]');
                
                // Animate main path
                if (path) {
                    path.style.opacity = '1';
                    path.style.transform = 'translateY(0)';
                }
                
                // Animate circles
                if (circles.length > 0) {
                    circles.forEach(circle => {
                        circle.style.opacity = '0.8';
                        circle.style.transform = 'translateY(0)';
                    });
                }
                
                // Animate blossoms
                if (blossoms.length > 0) {
                    blossoms.forEach(blossom => {
                        blossom.style.opacity = '1';
                        blossom.style.transform = 'scale(1)';
                    });
                }
                
                // Animate petals
                if (petals.length > 0) {
                    petals.forEach(petal => {
                        petal.style.opacity = '0.8';
                    });
                }
                
                // Animate branch
                if (branch) {
                    branch.style.opacity = '1';
                    branch.style.strokeDashoffset = '0';
                }
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated dividers
    const animatedDividers = new AnimatedDividers();
});
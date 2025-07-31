/**
 * Interactive Gallery
 * Creates an interactive gallery with modal and petal effects
 */

class InteractiveGallery {
    constructor(options = {}) {
        // Default options
        this.options = {
            selector: '.gallery-item',
            modalClass: 'gallery-modal',
            petalCount: 15,
            petalColors: ['#f8c8dc', '#fde2eb', '#e4a3b8', '#f9d7e8'],
            ...options
        };
        
        this.modal = null;
        this.currentImage = null;
        this.isModalOpen = false;
        
        this.init();
    }
    
    init() {
        // Find all gallery items
        const galleryItems = document.querySelectorAll(this.options.selector);
        
        if (galleryItems.length === 0) {
            console.warn(`No gallery items found with selector ${this.options.selector}`);
            return;
        }
        
        // Create modal
        this.createModal();
        
        // Add event listeners to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', this.openModal.bind(this, item));
            
            // Add aria attributes for accessibility
            item.setAttribute('role', 'button');
            item.setAttribute('aria-haspopup', 'dialog');
            item.setAttribute('tabindex', '0');
            
            // Add keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openModal(item);
                }
            });
        });
        
        // Add keyboard event listener for modal
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    createModal() {
        // Create modal element
        this.modal = document.createElement('div');
        this.modal.classList.add(this.options.modalClass);
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add(`${this.options.modalClass}-content`);
        
        // Create image element
        const image = document.createElement('img');
        image.classList.add(`${this.options.modalClass}-image`);
        image.setAttribute('alt', '');
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.classList.add(`${this.options.modalClass}-close`);
        closeButton.innerHTML = '<i class="fas fa-times"></i>';
        closeButton.setAttribute('aria-label', 'Close modal');
        
        // Create caption
        const caption = document.createElement('div');
        caption.classList.add(`${this.options.modalClass}-caption`);
        
        // Add elements to modal
        modalContent.appendChild(image);
        modalContent.appendChild(closeButton);
        modalContent.appendChild(caption);
        this.modal.appendChild(modalContent);
        
        // Add event listeners
        closeButton.addEventListener('click', this.closeModal.bind(this));
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Add to document
        document.body.appendChild(this.modal);
    }
    
    openModal(item) {
        // Get image source and caption
        const image = item.querySelector('img');
        const caption = item.querySelector('figcaption') || item.querySelector('.gallery-item-caption');
        
        if (!image) {
            console.warn('No image found in gallery item');
            return;
        }
        
        // Set modal image and caption
        const modalImage = this.modal.querySelector(`.${this.options.modalClass}-image`);
        const modalCaption = this.modal.querySelector(`.${this.options.modalClass}-caption`);
        
        modalImage.src = image.src;
        modalImage.alt = image.alt || '';
        
        if (caption) {
            modalCaption.textContent = caption.textContent;
        } else {
            modalCaption.textContent = '';
        }
        
        // Show modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        this.isModalOpen = true;
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus on close button
        setTimeout(() => {
            this.modal.querySelector(`.${this.options.modalClass}-close`).focus();
        }, 100);
        
        // Create petal effect
        this.createPetalEffect();
        
        // Store current image
        this.currentImage = image;
    }
    
    closeModal() {
        // Hide modal
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        this.isModalOpen = false;
        
        // Enable body scroll
        document.body.style.overflow = '';
        
        // Return focus to gallery item
        if (this.currentImage) {
            const galleryItem = this.currentImage.closest(this.options.selector);
            if (galleryItem) {
                galleryItem.focus();
            }
        }
    }
    
    handleKeyDown(e) {
        if (!this.isModalOpen) return;
        
        // Close modal on Escape key
        if (e.key === 'Escape') {
            this.closeModal();
        }
    }
    
    createPetalEffect() {
        // Get modal content
        const modalContent = this.modal.querySelector(`.${this.options.modalClass}-content`);
        
        // Create petals
        for (let i = 0; i < this.options.petalCount; i++) {
            this.createPetal(modalContent);
        }
    }
    
    createPetal(container) {
        // Create petal element
        const petal = document.createElement('div');
        petal.classList.add('blossom-petal');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = this.options.petalColors[Math.floor(Math.random() * this.options.petalColors.length)];
        const startX = Math.random() * container.offsetWidth;
        const startY = Math.random() * container.offsetHeight;
        const angle = Math.random() * 360;
        const duration = Math.random() * 1000 + 1000;
        
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
            petal.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) rotate(${angle}deg) scale(1)`;
        }, 10);
        
        // Fade out
        setTimeout(() => {
            petal.style.opacity = '0';
        }, duration / 2);
        
        // Remove petal after animation
        setTimeout(() => {
            petal.remove();
        }, duration);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive gallery
    const gallery = new InteractiveGallery();
});
/**
 * Sakura Café - 3D Interactive Reservation Form
 * Creates an interactive 3D background for the reservation form using Three.js
 */

class ReservationForm3D {
    constructor(options = {}) {
        // Default options
        this.options = {
            containerId: 'reservation-3d-container',
            backgroundColor: 0xf8e8f0, // Light pink background
            petalCount: 50,
            petalColors: [
                0xffd7e5, // Light pink
                0xffb7d5, // Medium pink
                0xffa6c9, // Dark pink
                0xffffff  // White
            ],
            ...options
        };

        // Initialize properties
        this.container = document.getElementById(this.options.containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.petals = [];
        this.isInitialized = false;

        // Bind methods
        this.init = this.init.bind(this);
        this.createScene = this.createScene.bind(this);
        this.createPetals = this.createPetals.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onFormFocus = this.onFormFocus.bind(this);
        this.onFormBlur = this.onFormBlur.bind(this);

        // Initialize if container exists
        if (this.container) {
            this.init();
        } else {
            console.error('Container element not found');
        }
    }

    /**
     * Initialize the 3D scene
     */
    init() {
        // Create the scene
        this.createScene();

        // Create petals
        this.createPetals();

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize);

        // Add event listeners to form inputs
        const formInputs = document.querySelectorAll('.reservation-form input, .reservation-form select, .reservation-form textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', this.onFormFocus);
            input.addEventListener('blur', this.onFormBlur);
        });

        // Start animation loop
        this.animate();

        this.isInitialized = true;
    }

    /**
     * Create the Three.js scene, camera, and renderer
     */
    createScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);

        // Create camera
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 20;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 10, 10);
        this.scene.add(directionalLight);
    }

    /**
     * Create sakura petals
     */
    createPetals() {
        // Create petal geometry
        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.bezierCurveTo(1, 1, 2, 1, 3, 0);
        petalShape.bezierCurveTo(2, -1, 1, -1, 0, 0);

        const petalGeometry = new THREE.ShapeGeometry(petalShape);
        petalGeometry.scale(0.4, 0.4, 0.4);

        // Create petals
        for (let i = 0; i < this.options.petalCount; i++) {
            // Random color from options
            const colorIndex = Math.floor(Math.random() * this.options.petalColors.length);
            const petalColor = this.options.petalColors[colorIndex];

            // Create material with transparency
            const petalMaterial = new THREE.MeshStandardMaterial({
                color: petalColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7 + Math.random() * 0.3
            });

            // Create mesh
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);

            // Random position
            petal.position.x = (Math.random() - 0.5) * 40;
            petal.position.y = (Math.random() - 0.5) * 40;
            petal.position.z = (Math.random() - 0.5) * 20;

            // Random rotation
            petal.rotation.x = Math.random() * Math.PI;
            petal.rotation.y = Math.random() * Math.PI;
            petal.rotation.z = Math.random() * Math.PI;

            // Random scale
            const scale = 0.8 + Math.random() * 0.7;
            petal.scale.set(scale, scale, scale);

            // Add to scene and petals array
            this.scene.add(petal);
            this.petals.push({
                mesh: petal,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                movementSpeed: {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05,
                    z: (Math.random() - 0.5) * 0.05
                }
            });
        }
    }

    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(this.animate);

        // Animate each petal
        this.petals.forEach(petal => {
            // Rotate petal
            petal.mesh.rotation.x += petal.rotationSpeed.x;
            petal.mesh.rotation.y += petal.rotationSpeed.y;
            petal.mesh.rotation.z += petal.rotationSpeed.z;

            // Move petal
            petal.mesh.position.x += petal.movementSpeed.x;
            petal.mesh.position.y += petal.movementSpeed.y;
            petal.mesh.position.z += petal.movementSpeed.z;

            // Reset position if petal goes out of bounds
            if (Math.abs(petal.mesh.position.x) > 20) {
                petal.mesh.position.x = -Math.sign(petal.mesh.position.x) * 20;
            }
            if (Math.abs(petal.mesh.position.y) > 20) {
                petal.mesh.position.y = -Math.sign(petal.mesh.position.y) * 20;
            }
            if (Math.abs(petal.mesh.position.z) > 10) {
                petal.mesh.position.z = -Math.sign(petal.mesh.position.z) * 10;
            }
        });

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        if (!this.isInitialized) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     * Handle form input focus - animate petals to move toward the focused input
     */
    onFormFocus(event) {
        // Get the position of the focused input relative to the container
        const inputRect = event.target.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();

        const targetX = ((inputRect.left + inputRect.width / 2) - (containerRect.left + containerRect.width / 2)) * 0.05;
        const targetY = -((inputRect.top + inputRect.height / 2) - (containerRect.top + containerRect.height / 2)) * 0.05;

        // Animate petals to move toward the focused input
        this.petals.forEach(petal => {
            // Adjust movement speed to move toward the target
            petal.movementSpeed.x = (targetX - petal.mesh.position.x) * 0.01;
            petal.movementSpeed.y = (targetY - petal.mesh.position.y) * 0.01;
            
            // Increase rotation speed
            petal.rotationSpeed.x *= 1.5;
            petal.rotationSpeed.y *= 1.5;
            petal.rotationSpeed.z *= 1.5;
        });
    }

    /**
     * Handle form input blur - reset petal movement
     */
    onFormBlur() {
        // Reset petal movement to random
        this.petals.forEach(petal => {
            petal.movementSpeed = {
                x: (Math.random() - 0.5) * 0.05,
                y: (Math.random() - 0.5) * 0.05,
                z: (Math.random() - 0.5) * 0.05
            };
            
            // Reset rotation speed
            petal.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        // Create script element to load Three.js
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = initReservation3D;
        document.head.appendChild(script);
    } else {
        initReservation3D();
    }

    function initReservation3D() {
        // Create 3D container if it doesn't exist
        let container = document.getElementById('reservation-3d-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'reservation-3d-container';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            
            const formContainer = document.querySelector('.reservation-form-container');
            if (formContainer) {
                formContainer.style.position = 'relative';
                formContainer.appendChild(container);
                
                // Initialize 3D reservation form
                new ReservationForm3D();
            }
        }
    }
});
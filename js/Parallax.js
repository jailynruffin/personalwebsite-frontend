import * as THREE from 'three';

class Parallax {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Add glowing particles
        this.createParticles();

        // Set camera position
        this.camera.position.z = 5;

        // Add light
        this.addLight();

        // Start animation
        this.animate();
        this.handleResize();
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000; // Number of particles
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20; // Random position in a cube
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesTexture = new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/textures/sprites/circle.png'); // A circle texture

        const particlesMaterial = new THREE.PointsMaterial({
            map: particlesTexture, // Use the circular texture
            color: 0xffc1ed,       // Soft pink color
            size: 0.1,            // Adjust size for the glowing effect
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending, // Enhance the glow effect
            depthWrite: false,     // Prevent particles from blocking each other
        });


        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    addLight() {
        const ambientLight = new THREE.AmbientLight(0xffc1ed, 0.5); // Soft pink ambient light
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffc1ed, 1, 100);
        pointLight.position.set(5, 5, 5); // Position the light
        this.scene.add(pointLight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
    
        // Smooth parallax effect based on scroll position
        const scrollY = window.scrollY; // Get current scroll position
        this.camera.position.z = 5 - scrollY * 0.01; // Adjust z-axis for depth effect
        this.particles.rotation.y += 0.001; // Slight rotation for dynamic look
        this.particles.rotation.x += 0.0005;
    
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }
    

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

export { Parallax };

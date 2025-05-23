function scrollToNextSection() {
    document.getElementById('about').scrollIntoView({
      behavior: 'smooth'
    });
}

const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
var swiper = new Swiper('.swiper-container', {
    effect: 'slide', // default, supports multiple slides
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        window.scrollTo({
            top: target.offsetTop + 40,
            behavior: 'smooth'
        });
    }
});
});
// Enhanced Three.js 3D Background
const canvas = document.getElementById('canvas3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create particles for background
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1500;

const posArray = new Float32Array(particleCount * 3);
const colorArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.2);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0x7dd3fc, 0.5);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

camera.position.z = 3;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.0015;

    // Parallax effect with mouse movement
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Create floating glow elements
const floatingContainer = document.getElementById('floating-elements');
const elementCount = 8;

for (let i = 0; i < elementCount; i++) {
    const element = document.createElement('div');
    element.classList.add('floating-element');

    const size = Math.random() * 300 + 150;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.2 + 0.1;
    const delay = Math.random() * 5;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;
    element.style.opacity = opacity;

    floatingContainer.appendChild(element);

    // Animate each element with GSAP
    gsap.to(element, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        delay: delay,
        ease: "sine.inOut"
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero text animation
gsap.from(".hero h1 span", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.3
});

gsap.from(".hero p", {
    duration: 1.5,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.6
});

gsap.from(".btn", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.9,
    onComplete: function () {
        gsap.set(".btn", { opacity: 1 }); // Force opacity to 1 after animation
    }
});

gsap.from(".social-icons a", {
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.9,
    onComplete: function () {
        gsap.set(".social-icons a", { opacity: 1 }); // Force opacity to 1 after animation
    }
});

// About section animation
gsap.from(".about-img", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1.2,
    x: -100,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".about-text", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1.2,
    x: 100,
    opacity: 0,
    ease: "power3.out"
});

// Skills animation
gsap.from(".skill", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    y: 20,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.2,
    onComplete: function () {
        gsap.set(".skill", { opacity: 1 }); // Force opacity to 1 after animation
    }
});

// Projects animation
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        y: 0,
        opacity: 1,
        delay: index * 0.15,
        ease: "power3.out",
        onComplete: () => {
            card.classList.add("animate");
        }
    });
});

// Contact form animation
gsap.from(".contact-form", {
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
});

// Nav link hover animation
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(link, {
            duration: 0.3,
            y: -3,
            ease: "power2.out"
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(link, {
            duration: 0.3,
            y: 0,
            ease: "power2.out"
        });
    });
});

// Handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


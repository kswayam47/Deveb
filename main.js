import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

// Mobile menu functionality
const hamburgerBtn = document.getElementById('hamburgerBtn');
const closeBtn = document.getElementById('closeBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn?.addEventListener('click', () => {
  mobileMenu.classList.remove('translate-x-full');
});

closeBtn?.addEventListener('click', () => {
  mobileMenu.classList.add('translate-x-full');
});

// Close menu when clicking a link
const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
mobileMenuLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
  });
});

// First, register the plugin
gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
  alpha: true,
  
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(2, 50 , 50);

// Create shader material
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uColorChange: { value: 0 },
    uOpacity: { value: 1.0 }
  },
  transparent: true
});

material.uniforms.uPixelRatio = { value: Math.min(window.devicePixelRatio, 2) };

// Create mesh and add to scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.position.y=-2.5
// Position camera
camera.position.z = 3;


var tl=gsap.timeline({ 
  scrollTrigger: {
  trigger:".landing",
  start:"top top",
  end:"bottom center",
  scrub:2,

},
});
tl.to(mesh.position,{
  y:0,
  z:-2,
  ease:"power2.inOut",    //dono to aek sath chalte h
},"a").to(material.uniforms.uColorChange,{    //accesing and changing color from here 
  value:1,
  
  ease:"power2.inOut",
},"a").to(material.uniforms.uOpacity,{
  value:0.3,
  ease:"power2.inOut",
},"a").to(".landing h1",{
  opacity:0,
},"a").to(".landing p",{
  opacity:1,
},"b")   //jinke flags same aek sath chalte h
  

// Create clock for timing
const clock = new THREE.Clock();

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "top 0%",
    end: "top -200%",
    scrub: 2,
    pin: true,
   
    anticipatePin: 1
  },
});

// Modified timeline for overlapping effect with synchronized text
tl2.to("body", {
  backgroundColor: "#FFB6C1",
  duration: 0.3,
  ease: "power2.inOut"
}, 0)
// Initial positions
.set(".image-wrapper:nth-child(2)", {
  y: "100%"  // Start below first image
}, 0)
.set(".image-wrapper:nth-child(3)", {
  y: "200%"  // Start below second image
}, 0)
// First transition
.to(".heading-container h2:nth-child(1)", {
  y: "-100%",
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
}, 0.6)
.to(".heading-container h2:nth-child(2)", {
  y: "0%",
  opacity: 1,
  top: "50%",
  duration: 1,
  ease: "power2.inOut",
}, 0.6)
// Image 2 slides up over Image 1
.to(".image-wrapper:nth-child(2)", {
  y: "0%",
  duration: 1,
  ease: "none",
}, 0.6)
// Second transition
.to(".heading-container h2:nth-child(2)", {
  y: "-100%",
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
}, 1.2)
.to(".heading-container h2:nth-child(3)", {
  y: "0%",
  opacity: 1,
  top: "50%",
  duration: 1,
  ease: "power2.inOut",
}, 1.2)
// Image 3 slides up over Image 2
.to(".image-wrapper:nth-child(3)", {
  y: "0%",
  duration: 1,
  ease: "none",
}, 1.2)
// Background transitions
.to("body", {
  backgroundColor: "#87CEEB",
  duration: 0.3,
  ease: "power2.inOut"
}, 0.5)
.to("body", {
  backgroundColor: "lightyellow",
  duration: 0.3,
  ease: "power2.inOut"
}, 1.5);





// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update uniforms
  material.uniforms.uTime.value = clock.getElapsedTime();
  
  // Render
  renderer.render(scene, camera);
}

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation loop
animate();

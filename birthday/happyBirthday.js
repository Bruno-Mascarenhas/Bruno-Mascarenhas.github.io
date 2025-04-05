import * as THREE from '../../resources/three.js/r126/three.module.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.getElementById("WebGL-output").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;

// Add lights for shadow and highlights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

let textLOD = null;
let font = null;

// Load a bump texture for extra detail on the high LOD level
let bumpTexture = null;
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
    'https://threejs.org/examples/textures/brick_bump.jpg',
    (texture) => {
        bumpTexture = texture;
    }
);

// Load the font and create the initial text object
const loader = new THREE.FontLoader();
loader.load(
    'https://cdn.jsdelivr.net/npm/three@0.126.1/examples/fonts/helvetiker_regular.typeface.json',
    function (loadedFont) {
        font = loadedFont;
        createTextLOD(""); // Default text: "Happy Birthday "
        animate();
    },
    undefined,
    function (err) {
        console.error('Error loading font: ', err);
    }
);

// Function to create/update the LOD text object using input text
function createTextLOD(inputText) {
    // Remove old text if it exists
    if (textLOD) {
        scene.remove(textLOD);
    }

    // Use the same text for both LOD levels and the same color
    const textString = "Happy Birthday " + inputText;
    const commonColor = 0xffaa00;

    // Create high-detail geometry and material (with bump map and shadows)
    const highGeom = new THREE.TextGeometry(textString, {
        font: font,
        size: 3,
        height: 1,
        curveSegments: 16,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 3
    });
    highGeom.center();
    const highMaterial = new THREE.MeshPhongMaterial({
        color: commonColor,
        shininess: 100,
    });
    if (bumpTexture) {
        highMaterial.bumpMap = bumpTexture;
        highMaterial.bumpScale = 0.2;
    }
    const highMesh = new THREE.Mesh(highGeom, highMaterial);
    highMesh.castShadow = true;
    highMesh.receiveShadow = true;

    // Create low-detail geometry and material (without bump mapping)
    const lowGeom = new THREE.TextGeometry(textString, {
        font: font,
        size: 3,
        height: 1,
        curveSegments: 4,
        bevelEnabled: false
    });
    lowGeom.center();
    const lowMaterial = new THREE.MeshPhongMaterial({
        color: commonColor,
        shininess: 50
    });
    const lowMesh = new THREE.Mesh(lowGeom, lowMaterial);
    lowMesh.castShadow = true;
    lowMesh.receiveShadow = true;

    // Build the LOD object: use highMesh when close, lowMesh when farther than 50 units
    textLOD = new THREE.LOD();
    textLOD.addLevel(highMesh, 0);
    textLOD.addLevel(lowMesh, 40);

    scene.add(textLOD);
}

document.getElementById("updateText").addEventListener("click", () => {
    const input = document.getElementById("nameInput").value;
    createTextLOD(input);
});

// Adjust camera position with mouse wheel to trigger LOD changes
window.addEventListener("wheel", (event) => {
    event.preventDefault();
    camera.position.z += event.deltaY * 0.05;
    camera.position.z = Math.max(10, Math.min(100, camera.position.z));
}, { passive: false });

// Animate the scene: animate text and update LOD
function animate(time) {
    if (time) time *= 0.001;
    const amplitude = 5;
    const speed = 0.5;

    if (textLOD) {
        textLOD.position.x = amplitude * Math.sin(time * speed);
        textLOD.position.y = amplitude * Math.cos(time * speed * 1.3);
        textLOD.rotation.z += 0.01;

        // Center the camera on the text and update LOD levels based on distance
        camera.lookAt(textLOD.position);
        textLOD.update(camera);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

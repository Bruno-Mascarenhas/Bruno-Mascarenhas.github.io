import * as THREE from '../../resources/three.js/r126/three.module.js';

function main() {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGL1Renderer();
  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  const camera = new THREE.OrthographicCamera(-7, 7, 7, -7, -7, 7);

  const geometry = new THREE.BufferGeometry();

  const starPoints = [];
  const spikes = 5;
  const innerRadius = 0.5;
  const outerRadius = 1;

  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i / spikes) * Math.PI;
    starPoints.push(radius * Math.sin(angle), radius * Math.cos(angle), 0);
  }

  // Connect the last point with the first point to close the shape
  starPoints.push(starPoints[0], starPoints[1], starPoints[2]);

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPoints, 3));

  const vertexShader = `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

  const fragmentShader = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Blue color
        }
    `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });

  const star = new THREE.Line(geometry, material);
  scene.add(star);

  renderer.clear();
  renderer.render(scene, camera);

  function animate(time) {
    time *= 0.001;

    const speedX = .1 + 6.0 * .05;
    const speedY = .1 + 3.0 * .05;
    const speedZ = .1 + 2.0 * .05;

    star.rotation.x = time * speedX;
    star.rotation.y = time * speedY;
    star.rotation.z = time * speedZ;

    renderer.clear();
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

main();

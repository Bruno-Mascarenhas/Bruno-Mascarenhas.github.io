import * as THREE from '../../resources/three.js/r126/three.module.js';

function main() {
  const scene = new THREE.Scene();
  
  const renderer = new THREE.WebGL1Renderer();
  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(window.innerWidth*0.8,window.innerHeight*0.8);
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(0, 0, 0), // vertex 0
    new THREE.Vector3(1, 1, 0), // vertex 1
    new THREE.Vector3(-1, 1, 0), // vertex 2
    new THREE.Vector3(1, -1, 0), // vertex 3
    new THREE.Vector3(-1, -1, 0) // vertex 4
  );

  geometry.faces.push(
    new THREE.Face3(0, 1, 2), // face 0
    new THREE.Face3(0, 3, 4), // face 1
    new THREE.Face3(0, 2, 4), // face 2
    new THREE.Face3(0, 1, 3) // face 3
  );

  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  for (var i = 0; i < 126; i++) {
    var star = new THREE.Mesh(geometry, material);
    star.position.set(
      Math.random() * 800 - 400,
      Math.random() * 800 - 400,
      Math.random() * 800 - 400
    );
    scene.add(star);
  }

  camera.position.z = 5;

  renderer.clear();
  renderer.render(scene, camera);

  function animate() {
    scene.children.forEach(function(star) {
      star.rotation.z += 0.01;
    });

    renderer.clear();
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

main();

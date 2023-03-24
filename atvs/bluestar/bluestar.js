import * as THREE from '../../resources/three.js/r126/three.module.js';

function main() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var geometry = new THREE.Geometry();
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

  var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

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

  function animate() {
    requestAnimationFrame(animate);
    scene.children.forEach(function(star) {
      star.rotation.z += 0.01;
    });
    renderer.render(scene, camera);
  }
  animate();
}

main();
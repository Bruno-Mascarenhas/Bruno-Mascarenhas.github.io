import * as THREE from '../../resources/three.js/r126/three.module.js';

function main(){
    const pi = Math.PI;
    let rotX = 0.0, rotY = 0.0, rotZ = 0.0;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGL1Renderer();
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    renderer.setSize(window.innerWidth*0.8,window.innerHeight*0.8);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-7, 7, 7, -7, -7, 7);

    function tranguloid(u, v, target){
        u *= 2*pi;
        v *= 2*pi;

        const x = 2 * Math.sin(3*u) / (2 + Math.cos(v));
        const y = 2 * (Math.sin(u) + 2 * Math.sin(2*u)) / (2 + Math.cos(v + 2*(pi/3)));
        const z = (Math.cos(u) - 2*Math.cos(2*u)) * (2 + Math.cos(v)) * (2 + Math.cos(v + 2*(pi/3)))/4;

        target.set(x,y,z).multiplyScalar(1.1);
    }

    const geometry = new THREE.ParametricGeometry(tranguloid,30,30);
    geometry.computeBoundingBox();

    const uniforms = {
      color1: {value: new THREE.Color("purple")},
      color2: {value: new THREE.Color("orange")},
      bboxMin: {value: geometry.boundingBox.min},
      bboxMax: {value: geometry.boundingBox.max}
    }

    const vertexShader = `
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;
    
      varying vec2 vUv;

      void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
    
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        wireframe: true
    });

    const tranguloid_mesh = new THREE.Mesh(geometry, material);
    scene.add(tranguloid_mesh);

    renderer.clear();
    renderer.render(scene, camera);

    function animate(time){
        time *= 0.001;
        
        const speedX = .1 + 6.0 * .05;
        const speedY = .1 + 3.0 * .05;
        const speedZ = .1 + 2.0 * .05;
    
        rotX = time * speedX;
        rotY = time * speedY;
        rotZ = time * speedZ;
    
        tranguloid_mesh.rotation.x = rotX;
        tranguloid_mesh.rotation.y = rotY;
        tranguloid_mesh.rotation.z = rotZ;

        renderer.clear();
        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

main();
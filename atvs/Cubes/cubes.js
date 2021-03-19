import * as THREE from '../../resources/three.js/r126/three.module.js';

function main() {
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth*0.8,window.innerHeight*0.8)

    const [fov, aspect, near, far] = [75, 2, 0.1, 5];
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const [booxWidth, boxHeight, boxDepth] = [1,1,1];
    const geometry = new THREE.BoxGeometry(booxWidth, boxHeight, boxDepth);

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    function makeInstance(geometry, color, x){
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2)
    ];


    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    renderer.clear();
	renderer.render(scene, camera);

    function animate(time){
        time *= 0.001;

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1 * 10;
            const rot = time * speed;

            cube.rotation.x = rot;
            cube.rotation.y  = rot;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

main(); 
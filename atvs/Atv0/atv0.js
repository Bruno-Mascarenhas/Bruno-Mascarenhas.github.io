import * as THREE from '../../resources/three.js/r126/three.module.js';

function main() {
    const scene = new THREE.Scene();
    let n = 10, k = 2, nn, nk;

    function click(){
        nn = parseInt(document.getElementById("n-val").value) || 10;
        nk = parseInt(document.getElementById("k-val").value) || 2;

        console.log(n, k);
    }

    document.getElementById("submit").addEventListener("click",onclick => click());

    const renderer = new THREE.WebGL1Renderer();
    renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
    renderer.setSize(window.innerWidth*0.8,window.innerHeight*0.8)
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
    
    const camera = new THREE.OrthographicCamera( -1.2, 1.2, 1.2, -1.2, -1.0, 1.0 );
    
    function render() {
        while(scene.children.length > 0){ 
            scene.remove(scene.children[0]); 
        }
        const c_points = [];
        const qtd = 360/n;
        const pi = Math.PI;
        
        for(let i=0; i<=361; i+=qtd){
            c_points.push(new THREE.Vector3(Math.cos(i*(pi/180)), Math.sin(i*(pi/180)), 0));
        }

        const c_geometry = new THREE.BufferGeometry().setFromPoints(c_points);
        const c_material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const circle = new THREE.Line( c_geometry, c_material );
        scene.add(circle);

        const p_geometry = new THREE.BufferGeometry().setFromPoints(c_points);
        const p_material = new THREE.PointsMaterial( { color: 0x0000ff, size:5 } );
        const points = new THREE.Points( p_geometry, p_material );
        scene.add(points)

    
        const l_points = [], l_index = [];
        c_points.forEach((pt, idx) => {
            let x = idx;
            let y = (idx*k)%c_points.length;
            l_points.push(pt);
            l_points.push(c_points[(idx*k)%c_points.length]);
            l_index.push(x, y)
        });
        
        const l_geometry = new THREE.BufferGeometry().setFromPoints(c_points);
        l_geometry.setIndex(l_index);
        const l_material = new THREE.LineBasicMaterial( { color: 0xffffff } );
        const lines = new THREE.Line( l_geometry, l_material );
        scene.add(lines);

        renderer.clear();
        renderer.render(scene, camera);
    }

    render();

    function animate(time){
        time *= 0.001;
        if(nn !== n || nk !== k){
            n = nn;
            k = nk;
            render();
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);   
}

main();
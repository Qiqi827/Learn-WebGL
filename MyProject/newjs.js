
//define geometry, material and scene
var camera, scene, renderer, geometry, material, mesh;

var scene1, scene2, geometry2, material2, mesh2;

init();
animate();

//function of btn
var btn1 = document.getElementById('scene1');
btn1.onclick = function () {
    scene = scene1;
}
var btn2 = document.getElementById('scene2');
btn2.onclick = function () {
    scene = scene2;
}

function init() {
    //add camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;

    //add renderer

    renderer = new THREE.WebGLRenderer({
        // Allow transparency to show the gradient background
        // we defined in the CSS
        alpha: true,

        // Activate the anti-aliasing; this is less performant,
        // but, as our project is low-poly based, it should be fine :)
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    //container
    //set the magic into HTML div
    container = document.getElementById('container');
    container.appendChild(renderer.domElement);


    /////////////////////////////////////////////////
    //       Scene 1                               //
    /////////////////////////////////////////////////
    scene1 = new THREE.Scene();
    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    scene1.add(mesh);


    /////////////////////////////////////////////////
    //       Scene 2                               //
    /////////////////////////////////////////////////

    scene2 = new THREE.Scene();

    geometry2 = new THREE.SphereGeometry(100, 10, 10);
    material2 = new THREE.MeshNormalMaterial();

    mesh2 = new THREE.Mesh(geometry2, material2);
    mesh2.position.set(0, 0, 150);
    scene2.add(mesh2); // so note need to be able to switch this on

    // Choosing default scene as scene1
    scene = scene1;
}



function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {
    // Try some checking to update what is necessary
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    mesh2.rotation.x += 0.01;
    mesh2.rotation.y += 0.02;

    renderer.render(scene, camera);

}

//here to resize the window
window.addEventListener('resize', handleWindowResize, false);

function handleWindowResize() {
    // update height and width of the renderer and the camera
    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

//define geometry, material and scene
var camera, scene, renderer, geometry, material, mesh;



init();
animate();



function init() {
    //add camera
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.z = 500;



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





    scene = new THREE.Scene();


    var loader = new THREE.GLTFLoader();
    loader.load('room.gltf',function (gltf) {
        scene.add(gltf.scene);


        }


    );
    //add light here
    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );


}



function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {


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
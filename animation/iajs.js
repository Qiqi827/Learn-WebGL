

// document.getElementById("myModal").style.display = "none";
var raycaster;
var mouse = new THREE.Vector2(),INTERSECTED;
var radius = 100, theta = 0;

var scene = new THREE.Scene(); //set a scene


//set a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);



//set a render
var renderer = new THREE.WebGLRenderer({alpha:true , antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//container
//set the magic into HTML div
var container = document.getElementById('container');
container.appendChild(renderer.domElement);



var geometry = new THREE.BoxGeometry(1,1,1);
//change the material here
var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );

var cube = new THREE.Mesh(geometry, material); //create the cube with var geometry and material
scene.add(cube); //add the cube into scene
cube.castShadow = true; //you have to label shadow on things need shadow

//another box
var box = new THREE.BoxGeometry(1,1,1);
var mat = new THREE.MeshLambertMaterial({color:0xff6600});
var mesh = new THREE.Mesh(box, mat);
// mesh.position(30,30,30);
mesh.position.y = -2;
mesh.position.x = -2;
// scene.add(mesh);



//add spotlight
var spotLight = new THREE.SpotLight(0xffffff);//set a spotlight with color
spotLight.castShadow = true;
spotLight.position.set(15, 30, 30); //set the position
scene.add(spotLight);//add it into scene(always do it)
//set the camera position 数字越大图形越远（小）
// camera.position.z = 5;
// camera.position.set(0,0,5);
camera.position.set(0,0,5);
camera.lookAt(new THREE.Vector3(0,0,0));

//set Raycaster here
raycaster = new THREE.Raycaster();

//mouse function
document.addEventListener('mousemove',onDocumentMouseMove, false);
//locate the mouse
function onDocumentMouseMove( event ) {
    // event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//add mouse click function
//click model and add another scene here

window.addEventListener('click',onMouseClick, false);
function onMouseClick( event ) {
    // event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects( scene.children );

    console.log(intersects);





    var to = {
        x : camera.position.x,
        y : camera.position.y,
        z : 2
    };


    for ( var i = 0; i < intersects.length; i++ ) {

        // intersects[ i ].object.material.color.set( 0xff0000 );
        // scene.add(mesh);

        //弹窗显示
        document.getElementById("background").style.display = "initial";


        // new TWEEN.Tween(camera.position).to({camera.position.z=7})

        var tween = new TWEEN.Tween(camera.position)
            .to(to,600)
            .start();

            // .onUpdate(function () {
            //     camera.position.set(this.x, this.y, this.z);
            //     camera.lookAt(new THREE.Vector3(0,0,0));
            // })
            // .onComplete(function () {
            //     camera.lookAt(new THREE.Vector3(0,0,0));
            // })




    }


}

var close = document.getElementById('close-button');
var back = {
    x : camera.position.x,
    y : camera.position.y,
    z : 5
};

close.onclick = function close() {
    document.getElementById("background").style.display = "none";

    var tween = new TWEEN.Tween(to)
        .to(back,600)
        .start();
}



//set the animation of cube
var render = function () {
    TWEEN.update();
    requestAnimationFrame(render);
    cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;


    // find intersections
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) {


        if ( INTERSECTED !== intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            // if ( INTERSECTED ) INTERSECTED.material.setHex( INTERSECTED.currentHex );
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
        }



    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = null;


    }






    renderer.render(scene,camera);
};





render();
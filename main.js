
var renderer, camera, scene,light, stats, controls;
var raycaster;
var mouse;
var arwGo = [];
var letterGo=[];
var showMe;
Physijs.scripts.worker = 'physijs_worker.js';
Physijs.scripts.ammo = 'three/examples/js/libs/ammo.js';






function initRender() {
    renderer = new THREE.WebGLRenderer({alpha:true,antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
    //告诉渲染器需要阴影效果
    document.body.appendChild(renderer.domElement);
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    document.getElementById('background');

}





function initCamera() {
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 10, 35);
    // var helper = new THREE.CameraHelper( camera );
    // scene.add( helper );
}

function initScene() {
    scene = new Physijs.Scene();
    scene.background = new THREE.Color('rgb(230,218,218)');
    scene.fog = new THREE.Fog('rgb(230,218,218)', 10, 100);

    //设置重力
    scene.setGravity(new THREE.Vector3(0, -30, 0));


}



function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(-1, 3, 4);

    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    //light helper
    // scene.add( new THREE.CameraHelper( light.shadow.camera ) );


    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);




}




//letters falling down!!
var arw;

function initModel() {

    //辅助工具
    // var helper = new THREE.AxesHelper(50);
    // scene.add(helper);

    // 地板
    var mesh = new Physijs.PlaneMesh(new THREE.PlaneGeometry(200, 200), Physijs.createMaterial(new THREE.MeshPhongMaterial({color: 'rgb(39, 64, 70)', depthWrite: false})));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -1.5;
    mesh.receiveShadow = true;
    scene.add(mesh);


    //添加地板割线
    // var grid = new THREE.GridHelper(200, 50, 0x000000, 0x000000);
    // grid.material.opacity = 0.2;
    // grid.material.transparent = true;
    // scene.add(grid);

    //添加一个球体
    var Friction1 = 1; //摩擦力
    var Restitution1 = 3.2; //反弹力

    var Friction2 = 1; //摩擦力
    var Restitution2 = 2.8; //反弹力

    var Friction3 = 1; //摩擦力
    var Restitution3 = 2.7; //反弹力

    var Friction4 = 1; //摩擦力
    var Restitution4 = 3.1; //反弹力

    var Friction5 = 1; //摩擦力
    var Restitution5 = 2.9; //反弹力



    var loader = new THREE.FontLoader();
    loader.load('Maigreds_Regular.json', function (font) {
        var theText = "A";
        var letter1 = new THREE.TextBufferGeometry(theText, {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 2,


        });

        var letter2 = new THREE.TextBufferGeometry("P", {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 2
        });

        var letter3 = new THREE.TextBufferGeometry("A", {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 2
        });

        var letter4 = new THREE.TextBufferGeometry("T", {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 2
        });

        var letter5 = new THREE.TextBufferGeometry("E", {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 2
        });


        letter1.computeBoundingBox();
        letter2.computeBoundingBox();
        letter3.computeBoundingBox();
        letter4.computeBoundingBox();
        letter5.computeBoundingBox();

        // var centerOffset = -0.5 * (textgeometry.boundingBox.max.x - textgeometry.boundingBox.min.x);

        //letter1
        // var materialFront = new THREE.MeshBasicMaterial({color:0xff0000});
        // var materialSide = new THREE.MeshBasicMaterial({color:0x000088});
        // var materialArray = [materialFront,materialSide];

        var mat1 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:'rgb(39, 64, 70)'}), Friction1,Restitution1);
        // var mat1 = new Physijs.createMaterial(new THREE.MeshFaceMaterial(materialArray), Friction1,Restitution1);

        var mesh = new Physijs.ConeMesh(letter1, mat1);
        mesh.castShadow = true;
        mesh.position.y = 10;
        mesh.rotation.y = -0.2;
        mesh.position.z = 0.3;
        mesh.position.x = -0.5 * (letter1.boundingBox.max.x - letter1.boundingBox.min.x) - 5;

        scene.add(mesh);
        letterGo.push(mesh);

        //letter2
        var mat2 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:'rgb(39, 64, 70)'}), Friction2, Restitution2);

        var mesh2 = new Physijs.ConeMesh(letter2, mat2);
        mesh2.castShadow = true;
        mesh2.position.y = 10;
        mesh2.rotation.y = 0.2;
        mesh2.position.z = 0.5;
        mesh2.position.x = -0.5 * (letter2.boundingBox.max.x - letter2.boundingBox.min.x) - 2.5;

        scene.add(mesh2);
        letterGo.push(mesh2);

        //letter3
        var mat3 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:'rgb(39, 64, 70)'}), Friction3, Restitution3);

        var mesh3 = new Physijs.ConeMesh(letter3, mat3);
        mesh3.castShadow = true;
        mesh3.position.y = 10;
        mesh3.rotation.y = - 0.3;
        mesh3.position.z = - 0.5;
        mesh3.position.x = -0.5 * (letter3.boundingBox.max.x - letter3.boundingBox.min.x);

        scene.add(mesh3);
        letterGo.push(mesh3);

        //letter4
        var mat4 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:'rgb(39, 64, 70)'}), Friction4, Restitution4);

        var mesh4 = new Physijs.ConeMesh(letter4, mat4);
        mesh4.castShadow = true;
        mesh4.position.y = 10;
        mesh4.rotation.y = - 0.3;
        mesh4.position.z = 0.9;
        mesh4.position.x = -0.5 * (letter4.boundingBox.max.x - letter4.boundingBox.min.x)+2.5;

        scene.add(mesh4);
        letterGo.push(mesh4);

        //letter5

        var mat5 = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:'rgb(39, 64, 70)'}), Friction5, Restitution5);

        var mesh5 = new Physijs.ConeMesh(letter5, mat5);
        mesh5.castShadow = true;
        mesh5.position.y = 10;
        mesh5.rotation.y = 0.3;
        mesh5.position.z = 0.7;
        mesh5.position.x = -0.5 * (letter5.boundingBox.max.x - letter5.boundingBox.min.x)+5;


        scene.add(mesh5);
        letterGo.push(mesh5);
    });




    //arrow
    var geometry = new THREE.BoxGeometry(1,1,0.5,1,1,1);

    geometry.vertices[0].y-=0.5;
    geometry.vertices[0].x+=1;

    geometry.vertices[1].y-=0.5;
    geometry.vertices[1].x+=1;

    geometry.vertices[2].y+=0.5;
    geometry.vertices[2].x+=1;

    geometry.vertices[3].y+=0.5;
    geometry.vertices[3].x+=1;

    geometry.vertices[4].x+= 1;
    geometry.vertices[5].x+= 1;
    geometry.vertices[6].x+= 1;
    geometry.vertices[7].x+= 1;

    var singleGeometry = new THREE.Geometry();

    var geo = new THREE.BoxGeometry(1,0.5,0.5,1,1,1);
    var boxMesh = new THREE.Mesh(geometry);
    var arrowMesh = new THREE.Mesh(geo);

    boxMesh.updateMatrix();
    singleGeometry.merge(boxMesh.geometry, boxMesh.matrix);

    arrowMesh.updateMatrix();
    singleGeometry.merge(arrowMesh.geometry, boxMesh.matrix);

    var material = new THREE.MeshLambertMaterial({color:'rgb(39, 64, 70)'});
    arw = new THREE.Mesh(singleGeometry,material);



    arw.position.y = 4.5;
    arw.position.z = 2;
    arw.position.x = 4;

    //更新顶点的法向量


    arw.scale.set(0.5,0.5,0.5);

    // var outlineMaterial = new THREE.MeshBasicMaterial({color:0xff0000,side:THREE.BackSide});
    // var outlineMesh = new THREE.Mesh(singleGeometry,outlineMaterial);
    // outlineMesh.position = arw.position;
    // outlineMesh.scale.multiplyScalar(1.05);
    // scene.add(outlineMesh);

    arwGo.push(arw);

    var callback = function () {
        scene.add(arw);
    };

    setTimeout(callback, 3000);



    // scene.add(arw);



    // var go = arw.position.y = 0;
    // var tween = new TWEEN.Tween(arw.position.y).to(go,600).start();

    //add raycaster here
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );

    // window.addEventListener('click',onMouseClick, false);


}

window.addEventListener('click',onMouseClick, false);
//
// function onDocumentTouchStart( event ) {
//
//     event.preventDefault();
//
//     event.clientX = event.touches[0].clientX;
//     event.clientY = event.touches[0].clientY;
//     onDocumentMouseDown( event );
// }
// document.getElementById('background').style.display = 'block';
function onMouseClick(event) {
    // event.preventDefault();
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( arwGo, true );

    for ( var i = 0; i < intersects.length; i++ ) {

        showIt();
        scene.background = new THREE.Color('rgb(34,33,218)');
        // scene.remove(arw);

    }

}

var showIt = function () {
    showMe = document.getElementById("background");
    showMe.style.display = "block";
};

var next = document.getElementById("next");
next.onclick = function next() {

    document.getElementById("background").style.display = "none";
};



//初始化性能插件
// function initStats() {
//     stats = new Stats();
//     document.body.appendChild(stats.dom);
// }

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //设置控制器的中心点
    //controls.target.set( 0, 100, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 100;
    //是否开启右键拖拽
    controls.enablePan = true;
}

var positionStep = 0;
function render() {
    arw.rotation.x += 0.01;

    positionStep+=0.1;

    arw.position.x = 0.2*Math.cos(positionStep)+4.5;


    scene.simulate();
    controls.update();
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    //更新控制器
    render();


    //更新性能插件
    // stats.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

function draw() {
    //兼容性判断
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    // initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();

    // initStats();

    animate();
    window.onresize = onWindowResize;
}

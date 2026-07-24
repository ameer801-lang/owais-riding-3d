let scene, camera, renderer;
let car;
let speed = 0;

let keys = {};

init();
animate();


function init(){

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);


camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);


renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


// Ground

let groundGeometry = new THREE.PlaneGeometry(500,500);

let groundMaterial = new THREE.MeshBasicMaterial({
color:0x228B22
});

let ground = new THREE.Mesh(
groundGeometry,
groundMaterial
);

ground.rotation.x=-Math.PI/2;

scene.add(ground);


// Roads

let roadGeometry = new THREE.PlaneGeometry(20,500);

let roadMaterial = new THREE.MeshBasicMaterial({
color:0x333333
});

let road = new THREE.Mesh(
roadGeometry,
roadMaterial
);

road.rotation.x=-Math.PI/2;
road.position.y=0.01;

scene.add(road);



// Car

car = new THREE.Group();


let body = new THREE.Mesh(
new THREE.BoxGeometry(3,1,6),
new THREE.MeshBasicMaterial({
color:0xff0000
})
);

body.position.y=1;

car.add(body);


let cabin = new THREE.Mesh(
new THREE.BoxGeometry(2.5,1,3),
new THREE.MeshBasicMaterial({
color:0x111111
})
);

cabin.position.y=2;

car.add(cabin);


scene.add(car);



// City buildings

for(let i=0;i<50;i++){

let building = new THREE.Mesh(
new THREE.BoxGeometry(
5,
Math.random()*20+5,
5
),

new THREE.MeshBasicMaterial({
color:0x888888
})
);


building.position.x =
(Math.random()*100)-50;

building.position.z =
(Math.random()*300)-150;

building.position.y =
building.geometry.parameters.height/2;


scene.add(building);

}


camera.position.set(0,8,12);


window.addEventListener(
"keydown",
e=>keys[e.key.toLowerCase()]=true
);

window.addEventListener(
"keyup",
e=>keys[e.key.toLowerCase()]=false
);


}



function animate(){

requestAnimationFrame(animate);


if(keys["w"])
speed +=0.01;

if(keys["s"])
speed -=0.01;

if(keys[" "])
speed*=0.9;


speed*=0.98;


if(keys["a"])
car.rotation.y +=0.03;

if(keys["d"])
car.rotation.y -=0.03;


car.translateZ(-speed);


camera.position.x =
car.position.x;

camera.position.z =
car.position.z+12;

camera.lookAt(car.position);


renderer.render(scene,camera);

}
import './style.css'
import * as THREE from 'three'


function createTrain(x, z) { //função para criar trem, de acordo com o eixo x e z
  const geometry_train = new THREE.BoxGeometry( 0.3, 1 ,0.3 ); 
  const material_train = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
  const train = new THREE.Mesh( geometry_train, material_train ); 
  
  train.position.x = x;
  train.position.z = z;


  scene.add(train);
}


function createBox(x, z) { //função para criar uma caixa, de acordo com o eixo x e z
  const geometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
  const material_box = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
  const box = new THREE.Mesh(geometry, material_box);
  box.position.x = x;
  box.position.z = z;

  scene.add(box);
}


function createObj(x,z){
  // aste da esquerda
  const geometry = new THREE.CylinderGeometry( 0.01, 0.01, 1, 5 ); 
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
  const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder );
  cylinder.position.z = z
  cylinder.position.x = x - 0.15


  // aste da direita

  const geometry2 = new THREE.CylinderGeometry( 0.01, 0.01, 1, 5 ); 
  const material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
  const cylinder2 = new THREE.Mesh( geometry2, material2 ); scene.add( cylinder2 );
  cylinder2.position.z = z
  cylinder2.position.x = x + 0.15

  //placa
  const geometry3 = new THREE.BoxGeometry(0.34, 0.2, 0.03);
  const material_box = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
  const box = new THREE.Mesh(geometry3, material_box);
  box.position.x = x;
  box.position.z = z;   
  box.position.y = 0.4

  //scene.add(cylinder2) TALVEZ PRECISE
  
  scene.add(cylinder)
  scene.add(box)

}

function createTrilho(x, z) {
  const metalTexture = new THREE.TextureLoader().load('download.jpeg');

  // Trilho da esquerda
  const geometry_left = new THREE.BoxGeometry(0.01, 0.05, 100);
  const material = new THREE.MeshStandardMaterial({
    map: metalTexture,
    metalness: 0.5,
    roughness: 0.2
  });

  const trilho_left = new THREE.Mesh(geometry_left, material);
  trilho_left.position.x = x - 0.07;
  trilho_left.position.z = z;
  scene.add(trilho_left);

  // Trilho da direita
  const geometry_right = new THREE.BoxGeometry(0.01, 0.05, 100);
  
  const trilho_right = new THREE.Mesh(geometry_right, material);
  trilho_right.position.x = x + 0.07;
  trilho_right.position.z = z;
  scene.add(trilho_right);



  //meio do trilho
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BoxGeometry(0.18, 0.02, 0.03);
    const material_box3 = new THREE.MeshBasicMaterial( {color: 0x0000ff} ); 
    const box3 = new THREE.Mesh(geometry, material_box3);
    box3.position.x = x;
    box3.position.z = z - (i*0.3); 
    scene.add(box3)

  } 
    
  // scene.add(box)

  
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setY(0.5);

renderer.render(scene, camera);

// linhas para auxiliar
// const Grid = new THREE.GridHelper(200.50);
// scene.add(Grid)

// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

//guia para luz
const ligh_helper = new THREE.PolarGridHelper();
scene.add(ligh_helper)

//Luz

const ambiente = new THREE.AmbientLight(0xffffff)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,0,-1)
scene.add(pointLight)

//chão
const Ground = new THREE.PlaneGeometry(1.1, 100);
const material_ground = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const ground = new THREE.Mesh(Ground, material_ground);
scene.add(ground);
ground.rotation.x = -Math.PI / 2; 

//criação das caixas nas coordenadas do mundo
createBox(0,-8);
createBox(-0.35,-13);  //0.35:direita, 0:meio e -0.35:esquerda 
createBox(0.35,-13);
createBox(0,-18);
createBox(0,-4);
createBox(-0.35,-4);
createBox(0,-15);
createBox(-0.35,-15);


//criação dos trens nas coordenadas de mundo
createTrain(0.35,-10)
createTrain(0.35,-20)
createTrain(-0.35,-25)
createTrain(0.35,-25)
createTrain(0.35,-3)


//criação das "cercas" no mundo
createObj(0, -2)
createObj(0.35, -2)
// createObj(0, -2)
createObj(-0.35, -2)
createObj(0.35,-18)
createObj(-0.35, -18)
createObj(0, -25)
createObj(0,-10)

createTrilho(0,0)
createTrilho(0.35,0)
createTrilho(-0.35,0)


function animate() {
  requestAnimationFrame(animate);

  // camera.position.z -= 0.04; // ajusta a velocidade que percorre o eixo z, sempre negativamente
  // camera.position.y -= 0.02;
  renderer.render(scene, camera);
}

animate();
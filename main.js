import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let flag = 0;



function createTrain(x, z) { //função para criar trem, de acordo com o eixo x e z
  const geometry_train = new THREE.BoxGeometry(0.3, 1, 0.3);
  const material_train = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const train = new THREE.Mesh(geometry_train, material_train);

  train.position.x = x;
  train.position.z = z;

  train.receiveShadow = true;
  train.castShadow = true;
  scene.add(train);
}

let character;
const clock = new THREE.Clock();

function createCharacter() {
  const gftLoader = new GLTFLoader();
  gftLoader.load('./assets/modelos/boneco/source/boneco.glb', (gltfScene) => {
    character = gltfScene.scene;
    character.rotation.y -= Math.PI / -2; // Rotate 90 degrees to the left
    character.scale.set(0.2, 0.2, 0.2);
    character.position.set(0, 0, -1); // Move the model up 0.1 units
    scene.add(character);
  });
}

function createBox(x, z) { //função para criar uma caixa, de acordo com o eixo x e z
  const boxTexture = new THREE.TextureLoader().load('caixa.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: boxTexture,
    metalness: 0,
    roughness: 0
  });
  const geometry = new THREE.BoxGeometry(0.3, 0.4, 0.2);
  const box = new THREE.Mesh(geometry, material);
  box.position.x = x;
  box.position.z = z;
  box.receiveShadow = true;

  // Habilitar o lançamento de sombras pelo objeto da caixa
  box.castShadow = true;
  scene.add(box);
}


function createObj(x, z) {
  // aste da esquerda
  const woodTexture = new THREE.TextureLoader().load('assets/mine.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: woodTexture,
    metalness: 0,
    roughness: 0
  });
  const geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
  const cylinder = new THREE.Mesh(geometry, material); scene.add(cylinder);
  cylinder.position.z = z
  cylinder.position.x = x - 0.15


  // aste da direita

  const geometry2 = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
  const cylinder2 = new THREE.Mesh(geometry2, material); scene.add(cylinder2);
  cylinder2.position.z = z
  cylinder2.position.x = x + 0.15

  //placa
  const geometry3 = new THREE.BoxGeometry(0.34, 0.2, 0.03);
  const box = new THREE.Mesh(geometry3, material);
  box.position.x = x;
  box.position.z = z;
  box.position.y = 0.4

  //scene.add(cylinder2) TALVEZ PRECISE
  cylinder.receiveShadow = true;
  cylinder.castShadow = true;
  cylinder2.receiveShadow = true;
  cylinder2.castShadow = true;
  box.receiveShadow = true;
  box.castShadow = true;
  scene.add(cylinder)
  scene.add(box)

}

function createTrilho(x, z) {
  const metalTexture = new THREE.TextureLoader().load('assets/texutras/donwload.jpeg');

  // Trilho da esquerda
  const geometry_left = new THREE.BoxGeometry(0.01, 0.05, 100);
  const material = new THREE.MeshStandardMaterial({
    map: metalTexture,
    metalness: 0.5,
    roughness: 0.5
  });

  const trilho_left = new THREE.Mesh(geometry_left, material);
  trilho_left.position.x = x - 0.07;
  trilho_left.position.z = z;
  scene.add(trilho_left);
  trilho_left.receiveShadow = true;
  trilho_left.castShadow = true;

  // Trilho da direita
  const geometry_right = new THREE.BoxGeometry(0.01, 0.05, 100);

  const trilho_right = new THREE.Mesh(geometry_right, material);
  trilho_right.position.x = x + 0.07;
  trilho_right.position.z = z;

  trilho_right.receiveShadow = true;
  trilho_right.castShadow = true;
  scene.add(trilho_right);


  //meio do trilho
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BoxGeometry(0.18, 0.02, 0.03);
    const material_box3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const box3 = new THREE.Mesh(geometry, material_box3);
    box3.position.x = x;
    box3.position.z = z - (i * 0.3);

    box3.receiveShadow = true;
    box3.castShadow = true;
    scene.add(box3)
  }
  // scene.add(box)
}

// CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// linhas para auxiliar
// const Grid = new THREE.GridHelper(200.50);
// scene.add(Grid)

// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );


for (let i = 0; i < 15; i++) {
  const pointLight = new THREE.PointLight(0xffffff, 3);
  pointLight.position.set(1, 2, -i * 2);

  pointLight.intensity = 2;

  pointLight.castShadow = true;

  scene.add(pointLight);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(lightHelper);
}
// scene.add(ambiente)


//guia para luz



//chão
const Ground = new THREE.PlaneGeometry(1.1, 100);
const material_ground = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const ground = new THREE.Mesh(Ground, material_ground);
scene.add(ground);
ground.rotation.x = -Math.PI / 2;

createCharacter() //criação do personagem

//criação das caixas nas coordenadas do mundo
createBox(0, -8);
createBox(-0.35, -13);  //0.35:direita, 0:meio e -0.35:esquerda 
createBox(0.35, -13);
createBox(0, -18);
createBox(0, -4);
createBox(-0.35, -4);
createBox(0, -15);
createBox(-0.35, -15);


//criação dos trens nas coordenadas de mundo
createTrain(0.35, -10)
createTrain(0.35, -20)
createTrain(-0.35, -25)
createTrain(0.35, -25)
createTrain(0.35, -3)


//criação das "cercas" no mundo
createObj(0, -2)
createObj(0.35, -2)
// createObj(0, -2)
createObj(-0.35, -2)
createObj(0.35, -18)
createObj(-0.35, -18)
createObj(0, -25)
createObj(0, -10)

createTrilho(0, 0)
createTrilho(0.35, 0)
createTrilho(-0.35, 0)

const controls = new OrbitControls(camera, renderer.domElement); //para movimentar a camera com o mouse
controls.enableDamping = true; //animação de movimentação da camera
controls.target.set(0, 0, -10000); //para onde a camera aponta
controls.rotateSpeed = 0.0001;
function animate() {
  requestAnimationFrame(animate);

  window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyA') {
      flag = 1 // ajusta a velocidade que percorre o eixo z, sempre negativamente
    }
  })
  if (flag == 1) {
    
    camera.position.z -= 0.04;
    const characterPos = character.position.clone();
  }
  controls.update();  //para movimentar a camera com o mouse
  // camera.position.y -= 0.02;
  renderer.render(scene, camera);
}

// função para movimentar a camera com o teclado

const y = 0;
const x = 0;

window.addEventListener('keydown', function (event) {
  //esquerda
  if (event.code === 'KeyA' && camera.position.x > -0.1) {
    camera.position.x -= 0.3;
  }
  //direita
  if (event.code === 'KeyD' && camera.position.x < 0.2) {
    camera.position.x += 0.3;
  }
  //cima
  if (event.code === 'KeyS' && camera.position.y > 0.3) {
    camera.position.y -= 0.3
  }
  //baixo
  if (event.code === 'KeyW' && camera.position.y < 0.3) {
    camera.position.y += 0.3;
  }
})

animate();// Add the following code after the camera position is set
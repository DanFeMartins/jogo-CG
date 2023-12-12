import './style.css'
import THREE from './src/_base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createBox } from './src/Box'
import { createTrain } from './src/Train';
import { createCharacter } from './src/Character';
import { createFence } from './src/Fence';
import { createTrail } from './src/Trail';
import { createObj } from './src/random_gen';
import { RectAreaLight } from 'three';
import { Light } from 'three';
// import Tween.js if using modules
// import { jump} from './src/animation';
import * as TWEEN from '@tweenjs/tween.js';

let flag = 0; //flag para ajustar a velocidade que percorre o eixo z, sempre negativamente

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  
})


function createEnvironment() {
  // CAMERA
  camera.position.set(0, 0.75, 0);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
  // renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
}
createEnvironment()


const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
const light = new THREE.DirectionalLight( 0xffffff, 4);
const targetObject = new THREE.Object3D();

light.position.set(-1, 9, 30);
light.castShadow = true;
light.receiveShadow = true;
targetObject.position.set(0, 0, -40);
light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


scene.add( light, targetObject, ambientLight );
light.target = targetObject;

const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );  

// const helper1 = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper1 );


// const Ground = new THREE.PlaneGeometry(1.1, 200,3); ORIGINAL
function Ground(){
  const Ground = new THREE.PlaneGeometry(1.1, 200,3);
  const material_ground = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(Ground, material_ground);

  ground.castShadow = true;
  ground.receiveShadow = true;
  scene.add(ground);

  ground.rotation.x = -Math.PI / 2;
} Ground()

//cria os 3 trilhos do cenário
createTrail(0, 0)
createTrail(0.35, 0)
createTrail(-0.35, 0)


function resetGame() {
  // Reset the positions of camera and character
  camera.position.set(0, 0.75, 0);

  character.position.set(0, 0, -1);


  flag = 0;
}

function checkCollision(object1, object2) {
  const box1 = new THREE.Box3().setFromObject(object1);
  const box2 = new THREE.Box3().setFromObject(object2);
  return box1.intersectsBox(box2);
}

function checkCollisions() {
  // Check collision with fences
  fences.forEach((fence) => {
    if (camera && fence && (checkCollision(camera, fence) || checkCollision(character, fence))) {
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });

  // Check collision with boxes
  boxes.forEach((box) => {
    if (camera && box && (checkCollision(camera, box) || checkCollision(character, box))) {
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });

  // Check collision with trains
  trains.forEach((train) => {
    if (camera && train && (checkCollision(camera, train) || checkCollision(character, train))) {
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });
}




let character = await createCharacter() //criação do personagem
let boxes = [] //array para guardar as caixas
let fences = [] //array para guardar as cercas
let trains = [] //array para guardar os trens


//CRIAÇÃO DOS OBJETOS RANDOMICAMENTE
for (let i = 0; i < 20; i++) {  
  const valor = await createObj(); 
  boxes.push(await createBox(valor.x, valor.z));
  const valor2 = await createObj();
  trains.push(await createTrain(valor2.x, valor2.z));
  const valor3 = await createObj();
  fences.push(await createFence(valor3.x, valor3.z));
}




function jump() {
  const jumpHeight = 0.6; // Set your desired jump height
  const jumpDuration = 350; // Set the duration of the jump in milliseconds

  const initialCharacterY = 0

  const tween1 = new TWEEN.Tween(character.position)
    .to({ y: jumpHeight }, jumpDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      character.position.y = coords.y;
    });

  const tween2 = new TWEEN.Tween(character.position)
    .to({ y: initialCharacterY }, jumpDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      character.position.y = coords.y;
    });

  tween1.chain(tween2); // Chain the tweens for sequential execution
  tween1.start();
}

function slide(){
  const slideDuration = 350; // Set the duration of the jump in milliseconds

  const initialCharacterX = 0;
  

  const tween1 = new TWEEN.Tween(character.position)
    .to({ y: -0.4 }, slideDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      character.position.y = coords.y;
    });

  const tween2 = new TWEEN.Tween(character.position)
    .to({ y: initialCharacterX }, slideDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      character.position.y = coords.y;
    });

  tween1.chain(tween2); // Chain the tweens for sequential execution
  tween1.start();

}

function left() {
  const leftDuration = 120; // Set the duration of the jump in milliseconds
  let final_pos; // Declare final_pos variable here

  if (character.position.x === 0) {
    final_pos = -0.35;
  } else if (character.position.x === 0.35) {
    final_pos = 0;
  } else if (character.position.x === -0.35) {
    return;
  }

  const tween1 = new TWEEN.Tween(character.position)
    .to({ x: final_pos }, leftDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      character.position.x = coords.x;
    });

  const tween2 = new TWEEN.Tween(camera.position)
    .to({ x: final_pos }, leftDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coords) => {
      camera.position.x = coords.x;
    });

  tween1.start();
  tween2.start();
}

function right(){
  const leftDuration = 120; // Set the duration of the jump in milliseconds

  let final_pos

  if (character.position.x === 0) { 
    final_pos = 0.35;
  } else if (character.position.x === 0.35) {
    return;
  } else if (character.position.x === -0.35) {
    final_pos = 0;
  }
  const tween1 = new TWEEN.Tween(character.position)
  .to({ x: final_pos }, leftDuration)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((coords) => {
    character.position.x = coords.x;
  });

  const tween2 = new TWEEN.Tween(camera.position)
  .to({ x: final_pos }, leftDuration)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((coords) => {
    camera.position.x = coords.x;
  });

  tween1.start();
  tween2.start();

}


const controls = new OrbitControls(camera, renderer.domElement); //para movimentar a camera com o mouse

controls.zoomSpeed = 0.01; // Ajuste a sensibilidade do zoom aqui
controls.enableDamping = true; //animação de movimentação da camera
controls.target.set(0, 0, -10000); //para onde a camera aponta
controls.rotateSpeed = 0.0001;
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();

  //movimentação do personagem
  if (flag == 1) {
    camera.position.z -= 0.04;
    character.position.z -= 0.04;
  }
  //stop
  else if(flag == 0){
    camera.position.z -= 0.0;
    character.position.z -= 0.0;

  }

  controls.update();  //para movimentar a camera com o mouse
  renderer.render(scene, camera);

  checkCollisions();
}

// função para movimentar a camera com o teclado

const y = 0;
const x = 0;

window.addEventListener('keydown', function (event) {
  //restart
  if (event.code === 'KeyR') { 
    resetGame();
    camera.position.set(0, 0.75, 0);


  }
  //pause
  if(event.code === 'KeyP'){ 
    if(flag == 0){
      flag = 1
    }
    else{
      flag = 0
    }
  }
  //esquerda
  if (event.code === 'KeyA' && camera.position.x > -0.1) {
    left();
  }
  //direita
  if (event.code === 'KeyD' && camera.position.x < 0.2) {
    right();
  }
  //cima
  
  if (event.code === 'KeyS' && camera.position.y > 0.0) {
    slide();
  }

  if (event.code === 'KeyW' && camera.position.y < 1 ) {
    jump();
  }
  
})



animate();// Add the following code after the camera position is set

export { scene }
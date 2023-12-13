import './style.css'
import THREE from './src/_base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createBox } from './src/Box'
import { createTrain } from './src/Train';
import {
  createCharacter,
  mixer,
  // changeCharacterAnimation,
  // stopCharacterAnimation,
  transitionCharacterAnimation,
  characterSlideAnimation
} from './src/Character.js';
import { createFence } from './src/Fence';
import { createTrail } from './src/Trail';
import { createObj } from './src/random_gen';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import {
  RectAreaLight,
  Light,
  CubeTextureLoader,
  TextureLoader
} from 'three';

import * as TWEEN from '@tweenjs/tween.js';


let flag = 0; //flag para ajustar a velocidade que percorre o eixo z, sempre negativamente

let distance = 0;
let personalRecord = 0;
let distanceElement = 0;
let personalRecordElement = 0;
distanceElement = document.getElementById('distance');
personalRecordElement = document.getElementById('personalRecord');

function updateDistance() {
  distance += 0.04; // Adjust this value based on your desired speed
  personalRecord = Math.max(personalRecord, distance);
  distanceElement.innerText = `Distance: ${distance.toFixed(2)} meters`;
  personalRecordElement.innerText = `Personal Record: ${personalRecord.toFixed(2)} meters`;
}

function clearDistance(){
  distance = 0;
  distanceElement.innerText = `Distance: ${distance.toFixed(2)} meters`;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

})

const composer = new EffectComposer(renderer);
//screen size to composer
composer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.1, 0.1, 0.1);

composer.addPass(bloomPass);


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
const light = new THREE.DirectionalLight(0xffffff, 4);
const targetObject = new THREE.Object3D();

light.position.set(-1, 9, 30);
light.castShadow = true;
light.receiveShadow = true;
targetObject.position.set(0, 0, -40);
light.shadow.mapSize.width = 1024; // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


scene.add(light, targetObject, ambientLight);
light.target = targetObject;

// const helper = new THREE.DirectionalLightHelper( light, 5 );
// scene.add( helper );  

// const helper1 = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper1 );


// const Ground = new THREE.PlaneGeometry(1.1, 200,3); ORIGINAL
function Ground() {
  const Ground = new THREE.PlaneGeometry(1.1, 200, 3);
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
    if (checkCollision(camera, fence) || checkCollision(character, fence)) {
      if (camera && fence && (checkCollision(camera, fence) || checkCollision(character, fence))) {
        stopWalkingAnimation();
        isGameZeroed = true;
        resetGame(); // Reset the game on collision (you can customize this)
      };
    }
  });

  // Check collision with boxes
  boxes.forEach((box) => {
    if (checkCollision(camera, box) || checkCollision(character, box)) {
      // Handle collision with box
      stopWalkingAnimation();
      isGameZeroed = true;
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });

  // Check collision with trains
  trains.forEach((train) => {
    if (checkCollision(camera, train) || checkCollision(character, train)) {
      // Handle collision with train
      stopWalkingAnimation();
      isGameZeroed = true;
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });
}

let character = await createCharacter() //criação do personagem
let boxes = [] //array para guardar as caixas
let fences = [] //array para guardar as cercas
let trains = [] //array para guardar os trens


// CRIAÇÃO DOS OBJETOS RANDOMICAMENTE
for (let i = 0; i < 20; i++) {
  const valor = await createObj();
  boxes.push(await createBox(valor.x, valor.z));
  const valor2 = await createObj();
  trains.push(await createTrain(valor2.x, valor2.z));
  const valor3 = await createObj();
  fences.push(await createFence(valor3.x, valor3.z));
}


async function jump() {
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

function slide() {
  const slideDuration = 500; // Set the duration of the jump in milliseconds

  const initialCharacterX = 0;


  const tween1 = new TWEEN.Tween(character.position)
    .to({ y: -0.2 }, slideDuration)
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

  tween1.chain(tween2).finished; // Chain the tweens for sequential execution
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

function right() {
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

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  // printCurrentAnimationInfo();
  TWEEN.update();

  // Movimentação do personagem
  if (flag == 1) {
    camera.position.z -= 0.04;
    character.position.z -= 0.04;
    updateDistance();

  } else if (flag == 0) {
    camera.position.z -= 0.0;
    character.position.z -= 0.0;
    clearDistance();
  }

  controls.update();  // Para movimentar a câmera com o mouse

  // Update the animation mixer
  if (mixer) {
    mixer.update(clock.getDelta()); // Assuming you have a clock variable defined
  }

  
  composer.render(scene, camera);

  checkCollisions();
}

// função para movimentar a camera com o teclado

const y = 0;
const x = 0;

let isGameZeroed = true;
let currentAnimation = 'idle';

window.addEventListener('keydown', function (event) {
  console.log(currentAnimation);
  // restart
  if (event.code === 'KeyR') {
    stopWalkingAnimation();
    isGameZeroed = true;
    resetGame();
    camera.position.set(0, 0.75, 0);
  }

  // pause
  if (event.code === 'KeyP') {

    if (isGameZeroed === true) {
      startWalkingAnimation();
      currentAnimation = 'Walking';
      isGameZeroed = false;
    } else {
      if (currentAnimation != 'idle') {
        transitionCharacterAnimation(currentAnimation, 'idle', 0.5);
        currentAnimation = 'idle';
        isGameZeroed = true;
      }
    }

    if (flag === 0) {
      flag = 1;
    } else {
      flag = 0;

    }
  }

  // movement
  const movementSpeed = 0.35;

  // esquerda
  if (event.code === 'KeyA' && camera.position.x > -0.1) {
    left();
  }

  // direita
  if (event.code === 'KeyD' && camera.position.x < 0.2) {
    right();
  }

  // cima
  if (event.code === 'KeyS' && camera.position.y > 0.4 && isGameZeroed === false) {
    currentAnimation = 'slide';
    slide();
    characterSlideAnimation();
    currentAnimation = 'Walking';
  }

  // baixo
  if (event.code === 'KeyW' && camera.position.y < 1 && isGameZeroed === false) {
    currentAnimation = 'jumping';
    jump();
    currentAnimation = 'Walking';
  }
});

// Function to start the "Walking" animation
async function startWalkingAnimation() {
  transitionCharacterAnimation(currentAnimation, 'Walking', 0.5);
  currentAnimation = 'Walking';
}

// Function to stop the "Walking" animation
async function stopWalkingAnimation() {
  transitionCharacterAnimation(currentAnimation, 'idle', 0.5);
  currentAnimation = 'idle';
}

animate();

export { scene }
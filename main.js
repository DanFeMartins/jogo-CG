import './style.css'
import THREE from './src/_base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createBox } from './src/Box'
import { createTrain } from './src/Train';
import { createCharacter } from './src/Character';
import { createFence } from './src/Fence';
import { createTrail } from './src/Trail';

let flag = 0; //flag para ajustar a velocidade que percorre o eixo z, sempre negativamente

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

function createEnvironment() {
  // CAMERA
  camera.position.set(0, 0.5, 0);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
}
createEnvironment()

// linhas para auxiliar
// const Grid = new THREE.GridHelper(200.50);
// scene.add(Grid)

// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

function lights() {
  for (let i = 0; i < 15; i++) {
    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(1, 2, -i * 2);

    pointLight.intensity = 10;

    pointLight.castShadow = true;

    scene.add(pointLight);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);
  }
}
lights()

function ground() {
  const Ground = new THREE.PlaneGeometry(1.1, 100,3);
  const material_ground = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const ground = new THREE.Mesh(Ground, material_ground);
  scene.add(ground);
  ground.rotation.x = -Math.PI / 2;
}
ground()

function resetGame() {
  // Reset the positions of camera and character
  camera.position.set(0, 0.5, 0);
  character.position.set(0, 0, -1);

  // Reset any other game-related state or variables if needed

  // Reset the flag to stop the movement
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
      // Handle collision with fence
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });

  // Check collision with boxes
  boxes.forEach((box) => {
    if (checkCollision(camera, box) || checkCollision(character, box)) {
      // Handle collision with box
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });

  // Check collision with trains
  trains.forEach((train) => {
    if (checkCollision(camera, train) || checkCollision(character, train)) {
      // Handle collision with train
      resetGame(); // Reset the game on collision (you can customize this)
    }
  });
}

let character = await createCharacter() //criação do personagem
let boxes = [] //array para guardar as caixas
let fences = [] //array para guardar as cercas
let trains = [] //array para guardar os trens

//criação das caixas nas coordenadas do mundo
boxes.push(await createBox(0, -8));
boxes.push(await createBox(0.35, -8));
boxes.push(await createBox(-0.35, -8));
boxes.push(await createBox(0, -13));
boxes.push(await createBox(0.35, -13));
boxes.push(await createBox(-0.35, -13));
boxes.push(await createBox(0, -15));


//criação dos trens nas coordenadas de mundo
trains.push(await createTrain(0.35, -5))
trains.push(await createTrain(-0.35, -5))
trains.push(await createTrain(0.35, -15))
trains.push(await createTrain(-0.35, -15))
trains.push(await createTrain(0.35, -20))
trains.push(await createTrain(-0.35, -20))
trains.push(await createTrain(0.35, -25))

//criação das "cercas" no mundo
fences.push(await createFence(0, -2));
fences.push(await createFence(0.35, -2));
fences.push(await createFence(-0.35, -2));
fences.push(await createFence(0.35, -18));
fences.push(await createFence(-0.35, -18));
fences.push(await createFence(0, -25));
fences.push(await createFence(0, -10));

createTrail(0, 0)
createTrail(0.35, 0)
createTrail(-0.35, 0)

const controls = new OrbitControls(camera, renderer.domElement); //para movimentar a camera com o mouse
controls.enableDamping = true; //animação de movimentação da camera
controls.target.set(0, 0, -10000); //para onde a camera aponta
controls.rotateSpeed = 0.0001;
function animate() {
  requestAnimationFrame(animate);

  if (flag == 1) {
    camera.position.z -= 0.04;
    character.position.z -= 0.04;
  }

  controls.update();  //para movimentar a camera com o mouse
  renderer.render(scene, camera);

  checkCollisions();
}

// função para movimentar a camera com o teclado

const y = 0;
const x = 0;

window.addEventListener('keydown', function (event) {
  if (event.code === 'KeyR') {
    resetGame();
  }
  //esquerda
  if (event.code === 'KeyA' && camera.position.x > -0.1) {
    flag = 1
    camera.position.x -= 0.35;
    character.position.x -= 0.35;
  }
  //direita
  if (event.code === 'KeyD' && camera.position.x < 0.2) {
    camera.position.x += 0.35;
    character.position.x += 0.35;
  }
  //cima
  if (event.code === 'KeyS' && camera.position.y > 0.3) {
    camera.position.y -= 0.35
    character.position.y -= 0.35
  }
  //baixo
  if (event.code === 'KeyW' && camera.position.y < 0.7) {
    camera.position.y += 0.35;
    character.position.y += 0.35;
  }
})

animate();// Add the following code after the camera position is set

export { scene }
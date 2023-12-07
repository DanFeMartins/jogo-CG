import './style.css'
import THREE from './src/_base';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createBox } from './src/Box'
import { createTrain } from './src/Train';
import { createCharacter } from './src/Character';
import { createFence } from './src/Fence';
import { createTrail } from './src/Trail';

let flag = 0; //flag para ajustar a velocidade que percorre o eixo z, sempre negativamente

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

  pointLight.intensity = 10;

  pointLight.castShadow = true;

  scene.add(pointLight);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(lightHelper);
}

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
createFence(0, -2)
createFence(0.35, -2)
// createFence(0, -2)
createFence(-0.35, -2)
createFence(0.35, -18)
createFence(-0.35, -18)
createFence(0, -25)
createFence(0, -10)

createTrail(0, 0)
createTrail(0.35, 0)
createTrail(-0.35, 0)

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

export { scene }
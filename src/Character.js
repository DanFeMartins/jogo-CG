import { scene } from '../main';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let character;

export function createCharacter() {
  const gftLoader = new GLTFLoader();
  gftLoader.load('../assets/modelos/boneco/source/boneco.glb', (gltfScene) => {
    character = gltfScene.scene;
    character.rotation.y -= Math.PI / -2; // Rotate 90 degrees to the left
    character.scale.set(0.2, 0.2, 0.2);
    character.position.set(0, 0, -1); // Move the model up 0.1 units
    scene.add(character);
  });
}
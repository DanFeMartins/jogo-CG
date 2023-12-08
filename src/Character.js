import { scene } from '../main';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createCharacter() {
  return new Promise((resolve, reject) => {
    const gftLoader = new GLTFLoader();
    gftLoader.load('../assets/modelos/boneco/source/boneco.glb', (gltfScene) => {
      const character = gltfScene.scene;
      character.rotation.y -= Math.PI / -2; // Rotate 90 degrees to the left
      character.scale.set(0.18, 0.18, 0.18);
      character.position.set(0, 0, -1); // Move the model up 0.1 units

      // Loop through all materials in the character and adjust properties
      character.traverse(child => {
        if (child.isMesh) {
          // Set metalness and roughness to 0 to reduce reflectivity
          child.material.metalness = 0;
          child.material.roughness = 1; // You can also play with roughness values
        }
      });

      character.castShadow = true;
      character.receiveShadow = true;
      scene.add(character);
      
      resolve(character);
    }, undefined, reject);
  });
}


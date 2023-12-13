import { scene } from '../main';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

let mixer;
let gltfScene;
let clips;
let animationClips; // Use the correct variable name

export { mixer, gltfScene, animationClips };

export function createCharacter() {
  return new Promise((resolve, reject) => {
    const gftLoader = new GLTFLoader();
    gftLoader.load('../assets/modelos/boneco/source/boneco_all1.glb', (loadedGltfScene) => {

      gltfScene = loadedGltfScene.scene;
      const character = gltfScene;
      character.rotation.y -= Math.PI / -2;
      character.scale.set(0.18, 0.18, 0.18);
      character.position.set(0, 0.03, -1.1); // Move the model up 0.1 units

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

      animationClips = loadedGltfScene.animations; // Use the correct variable name
      mixer = new THREE.AnimationMixer(character);

      const animationClip = THREE.AnimationClip.findByName(animationClips, 'idle');
      const animationIdle = mixer.clipAction(animationClip);
      animationIdle.play();
      resolve(character);
    }, undefined, reject);
  });
}

export async function stopCharacterAnimation(animationName) {
  const animationClip = THREE.AnimationClip.findByName(animationClips, animationName);

  if (animationClip) {
    const currentAction = mixer.existingAction(animationClip);
    currentAction.fadeOut(0.5);
  } else {
    console.error(`Animation clip "${animationName}" not found.`);
  }
}

export async function transitionCharacterAnimation(fromAnimation, toAnimation, duration) {
  const fromClip = THREE.AnimationClip.findByName(animationClips, fromAnimation);
  const toClip = THREE.AnimationClip.findByName(animationClips, toAnimation);

  const fromAction = mixer.clipAction(fromClip);
  const toAction = mixer.clipAction(toClip);

  fromAction.crossFadeTo(toAction, duration, false);
  toAction.play();
  fromAction.stop();
}

export async function characterSlideAnimation() {
  const walkingClip = THREE.AnimationClip.findByName(animationClips, 'Walking');
  const slideClip = THREE.AnimationClip.findByName(animationClips, 'slide');

  const walkingAction = mixer.clipAction(walkingClip);
  const slideAction = mixer.clipAction(slideClip);

  slideAction.setLoop(THREE.LoopOnce);

  slideAction.clampWhenFinished = true;

  walkingAction.crossFadeTo(slideAction, 0.5, false);
  walkingAction.stop();
  slideAction.play();

  setTimeout(() => {
    slideAction.crossFadeTo(walkingAction, 0.5, false);
    slideAction.stop();
    walkingAction.play();
  }, 0.5 * 1000);  

}
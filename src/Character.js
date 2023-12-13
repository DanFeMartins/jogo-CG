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

      resolve(character);
    }, undefined, reject);
  });
}

export async function changeCharacterAnimation(animationName) {
  const animationClip = THREE.AnimationClip.findByName(animationClips, animationName);

  if (animationClip) {
    const currentAction = mixer.existingAction(animationClip);

    if (currentAction) {
      // Se a ação atual existe, pare-a antes de iniciar a nova animação
      currentAction.stop();
      const newAction = mixer.clipAction(animationClip);
      
      // Espere a transição terminar antes de iniciar a nova animação
      await currentAction.crossFadeTo(newAction, 0.5, true).finished;

      // Você pode optar por pausar a animação na última posição se necessário
      // newAction.paused = true;
    } else {
      // Se a ação atual não existe, apenas inicie a nova animação
      const animationAction = mixer.clipAction(animationClip);
      animationAction.play();
    }
  } else {
    console.error(`Animation clip "${animationName}" not found.`);
  }
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

    toAction.time = 0;
    toAction.setEffectiveTimeScale(1);
    toAction.setEffectiveWeight(1);

    // Crossfade and wait for completion before playing the new animation
    fromAction.crossFadeTo(toAction, duration, true).finished;

    // Start playing the "to" animation
    toAction.play();
}
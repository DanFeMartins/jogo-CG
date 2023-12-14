import { scene } from '../main';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

let mixer;
let gltfScene;
let animationClips;

export { mixer, gltfScene, animationClips };

// Função para criar o personagem
export function createCharacter() {
  return new Promise((resolve, reject) => { // Cria uma promise para retornar o personagem
    const gftLoader = new GLTFLoader(); // Cria um loader de GLTF
    gftLoader.load('../assets/modelos/boneco/source/boneco_all1.glb', (loadedGltfScene) => {

      gltfScene = loadedGltfScene.scene; // Armazena a cena do personagem
      const character = gltfScene; // Armazena o personagem
      character.rotation.y -= Math.PI / -2; // Rotação
      character.scale.set(0.18, 0.18, 0.18); // Escala
      character.position.set(0, 0.03, -1.1); // Posição

      // Definição de propriedades de material do personagem
      character.traverse(child => {
        if (child.isMesh) {
          child.material.metalness = 0; // Metalidade
          child.material.roughness = 1; // Dureza
        }
      });

      character.castShadow = true; // Possibilita que o personagem projete sombra
      character.receiveShadow = true; // Possibilita que o personagem receba sombra
      scene.add(character); // Adiciona o personagem na cena

      animationClips = loadedGltfScene.animations; // Armazena os clipes de animação do personagem
      mixer = new THREE.AnimationMixer(character); // Cria um mixer de animação para o personagem

      const animationClip = THREE.AnimationClip.findByName(animationClips, 'idle'); // Define o clip de animação inicial
      const animationIdle = mixer.clipAction(animationClip); // Cria uma ação de animação para o clipe definido
      animationIdle.play(); // Inicia a animação
      resolve(character); // Retorna o personagem
    }, undefined, reject); // Caso ocorra algum erro, rejeita a promise
  });
}

// Função para iniciar uma animação
export function transitionCharacterAnimation(fromAnimation, toAnimation, duration) { 

  // Procura o clipe das animações pelos nomes
  const fromClip = THREE.AnimationClip.findByName(animationClips, fromAnimation); 
  const toClip = THREE.AnimationClip.findByName(animationClips, toAnimation);

  // Cria as ações de animação para os clipes encontrados
  const fromAction = mixer.clipAction(fromClip);
  const toAction = mixer.clipAction(toClip);

  fromAction.crossFadeTo(toAction, duration, false); // Faz uma transição suave entre as animações
  toAction.play(); // Inicia a animação
  fromAction.stop(); // Para a animação anterior
}

// Função para fazer o personagem deslizar
export function characterSlideAnimation() {

  // Procura o clipe das animações pelos nomes
  const walkingClip = THREE.AnimationClip.findByName(animationClips, 'Walking');
  const slideClip = THREE.AnimationClip.findByName(animationClips, 'slide');

  // Cria as ações de animação para os clipes encontrados
  const walkingAction = mixer.clipAction(walkingClip);
  const slideAction = mixer.clipAction(slideClip);

  // Realiza apenas um loop da animação de delize
  slideAction.setLoop(THREE.LoopOnce);

  // Fixa a posição do personagem no final da animação de deslize
  slideAction.clampWhenFinished = true;

  walkingAction.crossFadeTo(slideAction, 0.5, false); // Faz uma transição suave entre as animações
  walkingAction.stop(); // Para a animação anterior
  slideAction.play(); // Inicia a animação de deslize

  // Após 0.5 segundos, faz uma transição suave entre as animações
  setTimeout(() => { 
    slideAction.crossFadeTo(walkingAction, 0.5, false);
    slideAction.stop();
    walkingAction.play();
  }, 500);  
}
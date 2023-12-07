import THREE from './_base';
import { scene } from '../main';

export function createBox(x, z) { //função para criar uma caixa, de acordo com o eixo x e z
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
import THREE from './_base';
import { scene } from '../main';

export function createFence(x, z) {
  // aste da esquerda
  const woodTexture = new THREE.TextureLoader().load('assets/texturas/mine.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: woodTexture,
    metalness: 0,
    roughness: 0
  });
  const geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
  const cylinder = new THREE.Mesh(geometry, material); scene.add(cylinder);
  cylinder.position.z = z
  cylinder.position.x = x - 0.15


  // aste da direita

  const geometry2 = new THREE.CylinderGeometry(0.01, 0.01, 1, 5);
  const cylinder2 = new THREE.Mesh(geometry2, material); scene.add(cylinder2);
  cylinder2.position.z = z
  cylinder2.position.x = x + 0.15

  //placa
  const geometry3 = new THREE.BoxGeometry(0.34, 0.2, 0.03);
  const box = new THREE.Mesh(geometry3, material);
  box.position.x = x;
  box.position.z = z;
  box.position.y = 0.4

  //scene.add(cylinder2) TALVEZ PRECISE
  cylinder.receiveShadow = true;
  cylinder.castShadow = true;
  cylinder2.receiveShadow = true;
  cylinder2.castShadow = true;
  box.receiveShadow = true;
  box.castShadow = true;
  scene.add(cylinder)
  scene.add(box)

}
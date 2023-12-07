import THREE from './_base';
import { scene } from '../main';

export function createTrail(x, z) {
  const metalTexture = new THREE.TextureLoader().load('assets/texturas/download.jpeg');

  // Trilho da esquerda
  const geometry_left = new THREE.BoxGeometry(0.01, 0.05, 100);
  const material = new THREE.MeshStandardMaterial({
    map: metalTexture,
    metalness: 0.5,
    roughness: 0.5
  });

  const trilho_left = new THREE.Mesh(geometry_left, material);
  trilho_left.position.x = x - 0.07;
  trilho_left.position.z = z;
  scene.add(trilho_left);
  trilho_left.receiveShadow = true;
  trilho_left.castShadow = true;

  // Trilho da direita
  const geometry_right = new THREE.BoxGeometry(0.01, 0.05, 100);

  const trilho_right = new THREE.Mesh(geometry_right, material);
  trilho_right.position.x = x + 0.07;
  trilho_right.position.z = z;

  trilho_right.receiveShadow = true;
  trilho_right.castShadow = true;
  scene.add(trilho_right);


  //meio do trilho
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BoxGeometry(0.18, 0.02, 0.03);
    const material_box3 = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const box3 = new THREE.Mesh(geometry, material_box3);
    box3.position.x = x;
    box3.position.z = z - (i * 0.3);

    box3.receiveShadow = true;
    box3.castShadow = true;
    scene.add(box3)
  }
  // scene.add(box)
}
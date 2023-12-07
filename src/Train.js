import THREE from './_base';
import { scene } from '../main';

export function createTrain(x, z) { //função para criar trem, de acordo com o eixo x e z
  const geometry_train = new THREE.BoxGeometry(0.3, 1, 0.3);
  const material_train = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const train = new THREE.Mesh(geometry_train, material_train);

  train.position.x = x;
  train.position.z = z;

  train.receiveShadow = true;
  train.castShadow = true;
  scene.add(train);
}
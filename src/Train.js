import THREE from './_base';
import { scene } from '../main';

export async function createTrain(x, z) { //função para c7iar trem, de acordo com o eixo x e z

  const length = 0.25, width = 0.03;

  const shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo( 0, width );
  shape.lineTo( length, width );
  shape.lineTo( length, 0 );
  shape.lineTo( 0, 0 );

  const extrudeSettings = {
    steps: 2,
    depth: 0.8,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments:10
  };

  const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
  const train_texture = new THREE.TextureLoader().load('../assets/texturas/download.jpeg');
  const material = new THREE.MeshStandardMaterial({
    map: train_texture,
    metalness: 0.9,
    roughness: 0.3
  });
  const train = new THREE.Mesh( geometry, material ) ;

  
  train.position.z = z;
  train.position.x = -0.12 + x;
  train.position.y = 0.07;
  train.castShadow = true;
  train.receiveShadow = true;
  scene.add( train );


  const geometry1 = new THREE.TorusGeometry( 3, 1.5, 16, 100 ); 
  //roda dianteira esquerda
  const whell_texture = new THREE.TextureLoader().load('../assets/texturas/whell.jpeg');
  const whell_material = new THREE.MeshStandardMaterial({
    map: whell_texture,
    envMap : null,
    metalness: 0,
    roughness: 0.9
  });
  const torus = new THREE.Mesh( geometry1, whell_material ); 
  torus.scale.set(0.01,0.01,0.01);
  torus.position.y = -0.03;
  torus.position.x = 0.05
  torus.position.z = -0.05;
  torus.castShadow = true;

  torus.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  //roda dianteira direita
  const torus2 = new THREE.Mesh( geometry1, whell_material ); 
  torus2.scale.set(0.01,0.01,0.01);
  torus2.position.y = -0.03;
  torus2.position.x = 0.19
  torus2.position.z = -0.05;
  torus2.castShadow = true;
  torus2.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  //roda traseira direita
  const torus3 = new THREE.Mesh( geometry1, whell_material ); 
  torus3.scale.set(0.01,0.01,0.01);
  torus3.position.y = -0.03;
  torus3.position.x = 0.19
  torus3.position.z = 0.25;
  torus3.castShadow = true;
  torus3.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  //roda traseira esquerda
  const torus4 = new THREE.Mesh( geometry1, whell_material ); 
  torus4.scale.set(0.01,0.01,0.01);
  torus4.position.y = -0.03;
  torus4.position.x = 0.05
  torus4.position.z = 0.25;
  torus4.castShadow = true;
  torus4.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  const torus5 = new THREE.Mesh( geometry1, whell_material ); 
  torus5.scale.set(0.01,0.01,0.01);
  torus5.position.y = -0.03;
  torus5.position.x = 0.05
  torus5.position.z = 0.5;
  torus5.castShadow = true;
  torus5.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  const torus6 = new THREE.Mesh( geometry1, whell_material ); 
  torus6.scale.set(0.01,0.01,0.01);
  torus6.position.y = -0.03;
  torus6.position.x = 0.05
  torus6.position.z = 0.8;
  torus6.castShadow = true;
  torus6.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  const torus7 = new THREE.Mesh( geometry1, whell_material ); 
  torus7.scale.set(0.01,0.01,0.01);
  torus7.position.y = -0.03;
  torus7.position.x = 0.19
  torus7.position.z = 0.5;
  torus7.castShadow = true;
  torus7.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  const torus8 = new THREE.Mesh( geometry1, whell_material ); 
  torus8.scale.set(0.01,0.01,0.01);
  torus8.position.y = -0.03;
  torus8.position.x = 0.19
  torus8.position.z = 0.8;
  torus8.castShadow = true;
  torus8.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI/2);

  const geometry3 = new THREE.CapsuleGeometry( 0.2, 0.68, 20, 32 ); 
  const texture_capsule = new THREE.TextureLoader().load('../assets/texturas/train.jpeg');
  const material_capsule = new THREE.MeshStandardMaterial({
    map: texture_capsule,
    metalness: 1,
    roughness: 0.4
  });
  const capsule = new THREE.Mesh( geometry3, material_capsule ); scene.add( capsule );

  capsule.position.y = 0.23;
  capsule.position.x = 0.12;
  capsule.position.z = 0.4;
  capsule.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI/2);
  capsule.castShadow = true;
  capsule.receiveShadow = true;

  
  scene.add( torus );
  scene.add( torus2 );
  scene.add( torus3 );
  scene.add( torus4 );
  scene.add( torus5 );
  scene.add( torus6 );
  scene.add( torus7 );
  scene.add( torus8 );
  scene.add( capsule );
  train.add(torus);
  train.add(torus2);
  train.add(torus3);
  train.add(torus4);
  train.add(torus5);
  train.add(torus6);
  train.add(torus7);
  train.add(torus8);
  train.add(capsule);
  

  return train
}
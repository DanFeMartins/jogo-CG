import THREE from './_base';
// import { scene } from '../main';

//cria randomicamente objetos na cena
export async function  createObj() {

    const randomIndex = Math.floor(Math.random() * 3);
    const values = [-0.35, 0, 0.35];
    const x = values[randomIndex];
    const z = THREE.MathUtils.randFloat(-2, -80);

    return {x, z};
}

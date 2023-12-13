import THREE from './_base';
// import { scene } from '../main';

const objects = [];

export async function createObj() {
    const minDistance = 1.0;

    let x, z;
    let tooClose; // Declare tooClose outside the loop

    do {
        const randomIndex = Math.floor(Math.random() * 3);
        const values = [-0.35, 0, 0.35];
        x = values[randomIndex];
        z = THREE.MathUtils.randFloat(-2, -80);

        tooClose = objects.some(obj => {
            const dx = obj.x - x;
            const dz = obj.z - z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            return distance < minDistance;
        });

    } while (tooClose);

    objects.push({ x, z });

    return { x, z };
}


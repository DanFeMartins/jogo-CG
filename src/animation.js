import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js';

export async function jump() {
    const jumpHeight = 0.6; // Set your desired jump height
    const jumpDuration = 100; // Set the duration of the jump in milliseconds
  
    const initialCharacterY = character.position.y;
  
    const tween1 = new TWEEN.Tween(character.position)
      .to({ y: initialCharacterY + jumpHeight }, jumpDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((coords) => {
        character.position.y = coords.y;
      });
  
    const tween2 = new TWEEN.Tween(character.position)
      .to({ y: initialCharacterY }, jumpDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((coords) => {
        character.position.y = coords.y;
      });
  
    tween1.chain(tween2); // Chain the tweens for sequential execution
    tween1.start();
  }
  
  export async function slide(){
    const slideDuration = 500; // Set the duration of the jump in milliseconds
  
    const initialCharacterX = character.position.y;
  
    const tween1 = new TWEEN.Tween(character.position)
      .to({ y: initialCharacterX - 0.35 }, slideDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((coords) => {
        character.position.y = coords.y;
      });
  
    const tween2 = new TWEEN.Tween(character.position)
      .to({ y: initialCharacterX }, slideDuration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate((coords) => {
        character.position.y = coords.y;
      });
  
    tween1.chain(tween2); // Chain the tweens for sequential execution
    tween1.start();
  
  }
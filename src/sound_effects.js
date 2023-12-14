export {
    stumbleSideSound,
    horizontalSwish,
    verticalSwish,
    roll,
    landing,
    hit,
    theme_music
}

let stumbleSideSound = new Audio('./assets/efeitos_sonoros/stumble_side.wav');
let horizontalSwish = new Audio('./assets/efeitos_sonoros/swish_horizontal.wav');
let verticalSwish = new Audio('./assets/efeitos_sonoros/swish_vertical.wav');
let roll = new Audio('./assets/efeitos_sonoros/roll.wav');
let landing = new Audio('./assets/efeitos_sonoros/landing.wav');
let hit = new Audio('./assets/efeitos_sonoros/hit.wav');
let theme_music = new Audio('./assets/efeitos_sonoros/theme_music.mp4');
theme_music.loop = true;
theme_music.volume = 0.2;
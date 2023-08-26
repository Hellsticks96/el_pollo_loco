
let canvas;
let world;
let startScreen;
let background_music = new Audio('audio/background_music.mp3');
let KEYS_TO_CHECK = [
    39,
    37,
    38,
    40,
    32,
];

function init(){
    canvas = document.getElementById('canvas');
}

function startGame(){
    world = new World(canvas, keyboard);
    document.getElementById('start-end-img').classList.add('hide');
    document.getElementById('canvas').classList.remove('hide');
    //background_music.play();
}

window.addEventListener('keydown', (e) => {
    let keyCode = e.keyCode;

    if (keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (keyCode == 38) {
        keyboard.UP = true;
    }
    if (keyCode == 32) {
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (e) => {
    let keyCode = e.keyCode;

    if (keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (keyCode == 38) {
        keyboard.UP = false;
    }
    if (keyCode == 32) {
        keyboard.SPACE = false;
    }
})
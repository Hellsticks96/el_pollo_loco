
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
    document.getElementById('start-img').classList.add('hide');
    document.getElementById('canvas').classList.remove('hide');
    bindBtnPressEvents();
    //background_music.play();
}

function bindBtnPressEvents(){

    document.getElementById('canvas').addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    document.getElementById('moveLeft_Mobile').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('moveLeft_Mobile').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('moveRight_Mobile').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('moveRight_Mobile').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('shoot_Mobile').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('shoot_Mobile').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.SPACE = false;
    });
    
    document.getElementById('jump_Mobile').addEventListener('touchstart', (e) =>{
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById('jump_Mobile').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.UP = false;
    });
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
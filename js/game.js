
let canvas;
let world;
let startScreen;
let endGameInterval;
let silence = false;
let endCardWon = new Background('./img/9_intro_outro_screens/game_over/game_over!.png', 0, 0);
let endCardLost = new Background('./img/9_intro_outro_screens/game_over/oh_no_you_lost!.png', 0, 0);
let background_music = new Audio('./audio/background_music.mp3');
let game_lost_sound = new Audio('./audio/game_over_lost.mp3');
let game_won_sound = new Audio('./audio/game_over_won.mp3');
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
    document.getElementById('start_game_btn').classList.add('hide');
    document.getElementById('mute_btn').classList.remove('hide-small');
    silence = false;
    bindBtnPressEvents();
    checkGameOver();
    checkBackgroundMusic();
}

function checkMute(){
    if (silence == false) {
        silence = true;
    } else {
        silence = false;
    }
}

function checkBackgroundMusic(){
    setInterval(() => {
        if (!silence) {
            background_music.play();
        } else {
            background_music.pause();
        }
    }, 100)
}

function checkGameOver(){
    endGameInterval = setInterval(() => {
        if (world.gameOver == true && world.gameWon == true) {      
            setTimeout(() => {
                silence = true;
                background_music.pause();
                background_music.currentTime = 0;
                game_won_sound.play()
                world.gamePaused = true;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                endCardWon.draw(ctx);
                clearInterval(endGameInterval)
                document.getElementById('start_game_btn').innerText = 'Restart Game';
                document.getElementById('start_game_btn').classList.remove('hide');
            }, 1500)           
        };
        if (world.gameOver == true && world.gameLost == true) {      
            setTimeout(() => {
                silence = true;
                background_music.pause();
                background_music.currentTime = 0;
                game_lost_sound.play();
                world.gamePaused = true;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                endCardLost.draw(ctx);
                clearInterval(endGameInterval)
                document.getElementById('start_game_btn').innerText = 'Restart Game';
                document.getElementById('start_game_btn').classList.remove('hide');
            }, 1500)           
        };
    }, 100) 
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
        keyboard.stopMultipleThrows = false;
    });

    document.getElementById('shoot_Mobile').addEventListener('touchend', (e) =>{
        e.preventDefault();
        keyboard.SPACE = false;
        keyboard.stopMultipleThrows = true;
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
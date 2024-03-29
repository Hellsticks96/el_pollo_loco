
let canvas;
let world;
let startScreen;
let endGameInterval;

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

/**
 * This function starts the game as well as hiding some buttons, imgs and is starting the background music
 */

async function startGame(){
        initializeLevel();
        setButtonsAndCanvas();
        bindBtnPressEvents();
        checkGameOver();
        checkBackgroundMusic();
        world = new World(canvas, keyboard);
}

function setButtonsAndCanvas(){
    document.getElementById('start-img').classList.add('hide');
    document.getElementById('canvas').classList.remove('hide');
    document.getElementById('start_game_btn').classList.add('hide');
    document.getElementById('mute_btn').classList.remove('hide-small');
}

/**
 * @param {boolean} silence - Determines whether or not music should be played
 * This function is used to turn the music on and off.
 * If @param silence is false it will be set to true and the other way around.
 */
function checkMute(){
    if (world.silence == false) {
        world.silence = true;
    } else {
        world.silence = false;
    }
}

/**
 * Checks whether music should be played or not.
 */
function checkBackgroundMusic(){
    setInterval(() => {
        if (!world.silence) {
            background_music.play();
        } else {
            background_music.pause();
        }
    }, 100)
}


/**
 * @param {boolean} world.gameOver - If the character or the endboss are dying, this will be set to true.
 * This function constantly checks whether or not the game is over.
 */
function checkGameOver(){
    endGameInterval = setInterval(() => {
        if (world.gameOver == true && world.gameWon == true) {                  
            setTimeout(() => {
                showGameWonEndcard();
            }, 1500)           
        };
        if (world.gameOver == true && world.gameLost == true) {      
            setTimeout(() => {
                showGameLostEndcard();
            }, 1500)           
        };
    }, 100) 
}

/**
 * This function is called when the endboss is defeated. It will pause the music, play a sound and show the right endcard.
 */
function showGameWonEndcard(){
    silence = true;
    background_music.pause();
    background_music.currentTime = 0;
    game_won_sound.play()
    world.gamePaused = true;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 3.237, canvas.height);
    //endCardWon.draw(ctx);
    clearInterval(endGameInterval)
    document.getElementById('start_game_btn').innerText = 'Restart Game';
    document.getElementById('start_game_btn').classList.remove('hide');
    return;
}

/**
 * Same function as the one above. Only for a lost game with different sound and endcard.
 */
function showGameLostEndcard(){
    silence = true;
    background_music.pause();
    background_music.currentTime = 0;
    game_lost_sound.play();
    world.gamePaused = true;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 3.237, canvas.height);
    endCardLost.draw(ctx);
    clearInterval(endGameInterval)
    document.getElementById('start_game_btn').innerText = 'Restart Game';
    document.getElementById('start_game_btn').classList.remove('hide');
}


/**
 * This function binds the mobile touch controls to an event listener. Is used to call functions in game.
 */
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


/**
 * This function sets parameters to true when keys are pressed. Params according to keyboard buttons.
 */
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

/**
 * Changes the param back to false when the key is released.
 */
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
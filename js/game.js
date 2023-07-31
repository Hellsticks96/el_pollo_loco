let canvas;
let world;
let keyboard;
let KEYS_TO_CHECK = [
    'ArrowRight',
    'ArrowLeft',
    'ArrowUp',
    'ArrowDown',
    'Space',
];

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    keyboard = new keyboardObject();

    console.log('my char is', world);
}

window.addEventListener('keydown', (e) => {
    KEYS_TO_CHECK.forEach((key) => {
        if (e['key'] == key) {
            console.log(key);
        }
    })
})
class ThrowableObject extends MovableObject{
    throwMovementX;
    animation_BottleRotation;
    throw_bottle_sound = new Audio('audio/throw_bottle.mp3');
    bottle_breaking_sound = new Audio('audio/bottle_breaking.mp3');


    IMAGES_BOTTLE_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y){
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_SPINNING);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
    }

    


    throw(){ 
        this.throw_bottle_sound.play();
        this.speedY = 30;
        this.applyGravity();
        this.throwMovementX = setInterval(() => {
            this.x += 8;
        }, 1000 / 60);
    }

    animate(){
        this.animation_BottleRotation = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPINNING);
        }, 1000 / 10);
    }
}
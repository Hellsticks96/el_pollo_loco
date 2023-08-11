class Character extends MovableObject{
    height = 450;
    width = 250;
    y = 200;
    x = 200;
    world;
    walking_sound = new Audio('audio/walking.mp3');
    IMAGES_WALKING = 
    ['../img/2_character_pepe/2_walk/W-21.png',
    '../img/2_character_pepe/2_walk/W-22.png',
    '../img/2_character_pepe/2_walk/W-23.png',
    '../img/2_character_pepe/2_walk/W-24.png',
    '../img/2_character_pepe/2_walk/W-25.png',
    '../img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_SHORT_IDLE =
    ['../img/2_character_pepe/1_idle/idle/I-1.png',
    '../img/2_character_pepe/1_idle/idle/I-2.png',
    '../img/2_character_pepe/1_idle/idle/I-3.png',
    '../img/2_character_pepe/1_idle/idle/I-4.png',
    '../img/2_character_pepe/1_idle/idle/I-5.png',
    '../img/2_character_pepe/1_idle/idle/I-6.png',
    '../img/2_character_pepe/1_idle/idle/I-7.png',
    '../img/2_character_pepe/1_idle/idle/I-8.png',
    '../img/2_character_pepe/1_idle/idle/I-9.png',
    '../img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];

    constructor(){
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate(){
        setInterval( () => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.walking_sound.play();
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.walking_sound.play();
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x +100;
        }, 1000 / 60);

        setInterval( () => {
            
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                if (this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
           
        }, 1000 / 12);
    }
}
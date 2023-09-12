class Character extends MovableObject{
    height = 450;
    width = 250;
    y = 205;
    x = 200;
    world;
    idleTimer = 0;
    stopDeathLoop = false;
    walking_sound = new Audio('./audio/walking.mp3');
    jumping_sound = new Audio('./audio/character_jump.mp3');
    stopAllMovements = false;
    offset = {
        top: 200,
        bottom: 0,
        right: 50,
        left: 40
    }
    IMAGES_WALKING = 
    ['./img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_SHORT_IDLE =
    ['./img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEATH = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Using this constructor all images for all animations of this object are loaded.
     * Additionally a function that sets gravity, an animate function and and idle timer are started.
     */
    constructor(){
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_SHORT_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();  
        this.checkIdle();   
    }

    /**
     * @param {boolean} stopAllMovements - is used to stop movements of character when the game ends
     * This function moves the character by checking which keyboard event is true and starting set functions.
     * At the same time it checks which image loop should be played and starts the correct loop.
     */
    animate(){
        this.checkMovements();        
        this.checkAnimations();
    }

    checkAnimations(){
        setInterval( () => {          
            if (!this.stopAllMovements) {
                if (this.isDead && this.stopDeathLoop == false) {
                    this.walking_sound.pause();
                    this.speedY = 15;
                    this.playAnimation(this.IMAGES_DEATH);
                    this.stopDeathLoop = true;
                } else if(this.isHurt(0.7)) {
                    this.playAnimation(this.IMAGES_HURT);
                } else {
                    if (this.isAboveGround()) {
                       this.playAnimation(this.IMAGES_JUMPING);
                  } else {
                      if (this.world.keyboard.RIGHT) {
                        this.playAnimation(this.IMAGES_WALKING);
                     }
                     if (this.world.keyboard.LEFT) {
                        this.playAnimation(this.IMAGES_WALKING);
                     } else {
                        if (this.idleTimer > 4 && this.idleTimer < 8) {
                            this.playAnimation(this.IMAGES_SHORT_IDLE);
                        } else {
                            if (this.idleTimer >= 9) {
                                this.playAnimation(this.IMAGES_LONG_IDLE);
                            }
                        }
                     }
                    }
                }
            } else {
                this.walking_sound.pause();
            }          
        }, 1000 / 12);
    }

    checkMovements(){
        setInterval( () => {
            if (!this.stopAllMovements) {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.world.checkAudioPlayback(this.walking_sound);
                    this.moveRight();
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.x > 105) {
                    this.world.checkAudioPlayback(this.walking_sound);
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.world.checkAudioPlayback(this.jumping_sound);
                    this.jump();
                }
    
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    /**
     * @param {number} idleTimer - Timer to check when the idle image loop should be started.
     * This function is used to check the time since the last time a button was pressed. Once per second @param idleTimer goes up by 1.
     */
    checkIdle(){
        setInterval(() => {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE) {
            
                this.idleTimer++;
       
        } else {
            this.idleTimer = 0;
        }
    }, 1000)
    }
}
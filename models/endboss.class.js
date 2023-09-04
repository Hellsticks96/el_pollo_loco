class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 260;
    x; 
    offset = {
        top: 50,
        bottom: 0,
        right: 25,
        left: 50
    }
    audio_hit = new Audio('audio/chicken_death.mp3');

    ENDBOSS_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'  
    ];

    ENDBOSS_ALERTED = [
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    ENDBOSS_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    ENDBOSS_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    ENDBOSS_DEATH = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(){
        super().loadImage('../img/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = (1079* 3) - 200;
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_ALERTED);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEATH);
        this.animate();
    }

    animate(){
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.ENDBOSS_HURT);
            } else if (this.isDead) {
                this.speedY = 10;
                this.applyGravity();
                this.playAnimation(this.ENDBOSS_DEATH, this.stopImageLoop);
            } else {
                this.playAnimation(this.ENDBOSS_WALKING);
                this.moveLeft(10);
            }         
        }, 1000 / 10)
    }

}
class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 260;
    x; 

    ENDBOSS_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
        
    ];

    constructor(){
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.x = 700;
        this.loadImages(this.ENDBOSS_WALKING);
        this.animate();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_WALKING);
        }, 1000 / 6)
    }

}
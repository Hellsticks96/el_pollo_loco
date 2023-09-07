class Chicken extends MovableObject{
    height = 80;
    width = 80;
    x;
    y = 550;
    offset = {
        top: 5,
        bottom: 0,
        right: 5,
        left: 5
    }
    audio_death = new Audio('./audio/chicken_death.mp3');
    
    CHICKEN_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'  
    ];

    IMAGES_DYING = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    constructor(x){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.x = x + (Math.random() * 300);
        this.animate();
    }

    animate(){
        
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft(this.speed);
            }
            
        }, 1000 / 60);
        

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DYING);
            } else {
                this.playAnimation(this.CHICKEN_WALKING);
            }
            
        }, 1000 / 6);
    }
    
}
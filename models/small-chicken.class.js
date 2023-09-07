class SmallChicken extends MovableObject{
    height = 60;
    width = 60;
    x;
    y = 570;

    audio_death = new Audio('./audio/chicken_death.mp3');
    
    SMALL_CHICKEN_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'  
    ];

    SMALL_IMAGES_DYING = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    
    constructor(x){
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImages(this.SMALL_IMAGES_DYING);
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
                this.playAnimation(this.SMALL_IMAGES_DYING);
            } else {
                this.playAnimation(this.SMALL_CHICKEN_WALKING);
            }
            
        }, 1000 / 6);
    }
    
}
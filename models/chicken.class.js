class Chicken extends MovableObject{
    height = 80;
    width = 80;
    x;
    y = 560;
    
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'  
    ];
    
    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.x = 800 + Math.random() * 200;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
        

        setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 1000 / 6);
    }
    
}
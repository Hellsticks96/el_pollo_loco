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
    currentImage = 0;


    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.x = 800 + Math.random() * 200;
        this.animate();
    }

    animate(){
        setInterval(() => {
            let i = this.currentImage % this.CHICKEN_WALKING.length;
            let path = this.CHICKEN_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 6);
        setInterval(() => {
            this.x -= 0.6;
        }, 1000 / 60);
    }
}
class Chicken extends MovableObject{
    height = 80;
    width = 80;
    y = 560;
    


    constructor(){
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 800 + Math.random() * 200;
    }
}
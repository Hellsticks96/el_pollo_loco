class Background extends MovableObject {
    height = 720;
    width = 1080;

    constructor(bg, x, y){
        super().loadImage(bg);
        this.x = x;
        this.y = y;
    }
}
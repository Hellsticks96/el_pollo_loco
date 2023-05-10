class Background extends MovableObject {
    height = 720;
    width = 1080;
    x = 0;
    y = 0;
    constructor(bg){
        super().loadImage(bg);
    }
}
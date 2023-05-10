class Background extends MovableObject {
    height = 480;
    width = 720;
    x = 0;
    y = 0;
    constructor(bg){
        super().loadImage(bg);
    }
}
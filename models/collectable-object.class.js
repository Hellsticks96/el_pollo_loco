class CollectableObject extends DrawableObject {


    constructor(img, x, y, height, width){
        super().loadImage(img);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}
class Background extends MovableObject {
    height = 720;
    width = 1080;
    canvas;
    ctx;
    
    constructor(bg, x, y, canvas){
        super().loadImage(bg);
     
             
        this.x = x;
        this.y = y;
        
        
    }

    
}
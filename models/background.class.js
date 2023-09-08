class Background extends MovableObject {
    height = 720;
    width = 1080;
    canvas;
    ctx;
    
    /**
     * 
     * @param {string} bg - path to background img
     * @param {number} x - the x coordinate the img should be placed at in canvas
     * @param {number} y - the y coordinate the img should be placed at in canvas
     */
    constructor(bg, x, y,){
        super().loadImage(bg);    
        this.x = x;
        this.y = y; 
    }

    
}
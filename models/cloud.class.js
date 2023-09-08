class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 600;

    /**
     * 
     * @param {*} x - x coordinate in canvas the object should be placed at
     * Loads image recalculates spawn point and starts animations.
     */
    constructor(x){
        super().loadImage('./img/5_background/layers/4_clouds/2.png');
        this.x = x +(Math.random() * 100);
        this.animate();
    }

    /**
     * Moves object to left in canvas
     */
    animate(){
        setInterval(() => {
            this.moveLeft(0.5);
        }, 1000 / 60)
        
    }
}


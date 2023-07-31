class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 600;

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/2.png');

        this.x = Math.random() * 100;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}


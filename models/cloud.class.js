class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 600;

    constructor(x){
        super().loadImage('../img/5_background/layers/4_clouds/2.png');

        this.x = x +(Math.random() * 100);
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft(0.5);
        }, 1000 / 60)
        
    }
}


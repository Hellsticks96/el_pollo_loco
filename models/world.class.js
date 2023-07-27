class World{
character = new Character();
backgrounds = [
    new Background('../img/5_background/layers/air.png'),
    new Background('../img/5_background/layers/3_third_layer/1.png'),
    new Background('../img/5_background/layers/2_second_layer/1.png'),
    new Background('../img/5_background/layers/1_first_layer/1.png'), 
];

enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];

clouds = [
    new Cloud()
];

canvas;

ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw(){
        this.ctx.fillStyle = 'rgb(135, 178, 235)';
        this.ctx.fillRect(0, 0, 1080, 720);

        this.grabAndAdd(this.backgrounds);
        
        this.grabAndAdd(this.enemies);

        this.grabAndAdd(this.clouds);

        this.addToMap(this.character);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });
    }
        
        grabAndAdd(array){
            array.forEach(item => {
                this.addToMap(item);
            })
        }

        addToMap(mo){
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    
}
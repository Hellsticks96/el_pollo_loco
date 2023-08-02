class World{
character = new Character();
backgrounds = [


    
];

enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];

enemyCount = this.enemies.length;

clouds = [
    new Cloud()
];

canvas;

ctx;

keyboard;

camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadBackgrounds();
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }


    draw(){

        this.ctx.fillRect(0, 0, 1080, 720);

        this.ctx.translate(this.camera_x, 0);

        this.grabAndAdd(this.backgrounds);
        
        this.grabAndAdd(this.enemies);

        this.grabAndAdd(this.clouds);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function(){
            self.draw();
        });

    }

        loadBackgrounds(){
            let multiplier = 0;
            for (let i = 0; i < 5; i++) {
                this.backgrounds.push(
                    new Background('../img/5_background/layers/air.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/3_third_layer/1.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/2_second_layer/1.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/1_first_layer/1.png', 1079 * multiplier, 0),
                );
                multiplier++;
                this.backgrounds.push(
                    new Background('../img/5_background/layers/air.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/3_third_layer/2.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/2_second_layer/2.png', 1079 * multiplier, 0),
                    new Background('../img/5_background/layers/1_first_layer/2.png', 1079 * multiplier, 0),
                )
                multiplier++;
            }
        }

        grabAndAdd(array){
            array.forEach(item => {
                this.addToMap(item);
            })
        }

        addToMap(mo){
            if (mo.otherDirection) {
                this.ctx.save();
                this.ctx.translate(mo.width, 0);
                this.ctx.scale(-1, 1);
                mo.x = mo.x * -1;
            }
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
            if (mo.otherDirection) {
                mo.x = mo.x * -1;
                this.ctx.restore();
            }
        }
    
}
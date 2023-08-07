class World{
character = new Character();

level = level1;

canvas;

ctx;

keyboard;

camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }


    draw(){

        this.ctx.fillRect(0, 0, 1080, 720);

        this.ctx.translate(this.camera_x, 0);

        this.grabAndAdd(this.level.backgrounds);
        
        this.grabAndAdd(this.level.enemies);

        this.grabAndAdd(this.level.clouds);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

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
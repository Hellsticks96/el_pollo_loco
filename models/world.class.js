class World{
character = new Character();

level = level1;

canvas;

ctx;

keyboard;

statusbar_health = new Statusbar();

throwableObject = [new ThrowableObject()];

camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkAliveStatus();
    }

    setWorld(){
        this.character.world = this;
    }

    checkAliveStatus(){
        this.character.checkDeath()
        if (this.character.isDead) {

        }
    }

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                     this.character.hit(5);
                     this.statusbar_health.setPercentage(this.character.energy);
                     this.checkAliveStatus();
                };
                if (this.keyboard.SPACE) {
                    console.log('wurf');
                    let bottle = new ThrowableObject(this.character.x + 150, this.character.y + 180); 
                    this.throwableObject.push(bottle);
                }
            });
        }, 100);
    }


    draw(){

        this.ctx.fillRect(0, 0, 1080, 720);

        this.ctx.translate(this.camera_x, 0);

        this.grabAndAdd(this.level.backgrounds);


        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar_health);
        this.ctx.translate(this.camera_x, 0);
        

        
        this.grabAndAdd(this.level.enemies);

        this.grabAndAdd(this.throwableObject);

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
                this.flipImage(mo);
            }

            mo.draw(this.ctx);

            mo.drawHitbox(this.ctx);

            if (mo.otherDirection) {
                this.resetImage(mo);
            }
        }

        flipImage(mo){
                this.ctx.save();
                this.ctx.translate(mo.width, 0);
                this.ctx.scale(-1, 1);
                mo.x = mo.x * -1;
        }

        resetImage(mo){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    
}
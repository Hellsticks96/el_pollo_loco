class World{
character = new Character();

level = level1;

canvas;

ctx;

keyboard;



statusbar_health = new Statusbar('health');
statusbar_coin = new Statusbar('coin');
statusbar_bottle = new Statusbar('bottle');

throwableObject = [new ThrowableObject()];

coin_collectable = [new CollectableObject('img/8_coin/coin_1.png', 700, 200, 120, 120)];
bottle_collectable = [new CollectableObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 700, 525, 120, 80)];
character_coin_stash = 0;
character_bottle_stash = 0;

camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
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

    run(){
        setInterval(() => {
                this.checkCharacterEnemyCollisions();
                this.checkCharacterCollectableCollisions('coin');
                this.checkCharacterCollectableCollisions('bottle');
                this.checkBottleThrow();
        }, 100);
    }

    checkCharacterEnemyCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                 this.character.hit(5);
                 this.statusbar_health.setPercentage(this.character.energy);
                 this.checkAliveStatus();
            };
            });
    }

    checkCharacterCollectableCollisions(collectable_stash){
        if (collectable_stash == 'coin') {
            this.coin_collectable.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.character_coin_stash++;
                    this.coin_collectable.splice(0, 1);
                    console.log(this.character_coin_stash);
                }
            })
        } else if (collectable_stash ==  'bottle') {
            this.bottle_collectable.forEach((bottle) => {
                if (this.character.isColliding(bottle)) {
                    this.character_bottle_stash++;
                    this.bottle_collectable.splice(0, 1);
                    console.log(this.character_bottle_stash);
                }
            })
        }
        
    }


    checkBottleThrow(){
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 150, this.character.y + 180); 
            this.throwableObject.push(bottle);
        }
    }


    draw(){

        this.ctx.fillRect(0, 0, 1080, 720);

        this.ctx.translate(this.camera_x, 0);

        this.grabAndAdd(this.level.backgrounds);
        
        this.grabAndAdd(this.level.enemies);

        this.grabAndAdd(this.throwableObject);

        this.grabAndAdd(this.coin_collectable);
        this.grabAndAdd(this.bottle_collectable);

        this.grabAndAdd(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar_health);
        this.addToMap(this.statusbar_coin);
        this.addToMap(this.statusbar_bottle);
        this.ctx.translate(this.camera_x, 0);

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
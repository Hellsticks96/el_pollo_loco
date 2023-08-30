class World{
character = new Character();

level = level1;

canvas;

ctx;

keyboard;

random_spawn_timer = Math.floor((Math.random() * 8) + 3);
basic_timer = 0;



statusbar_health = new Statusbar('health');
statusbar_coin = new Statusbar('coin');
statusbar_bottle = new Statusbar('bottle');

throwableObject = [];

coin_collectable = [new CollectableObject('img/8_coin/coin_1.png', 700, 200, 120, 120),
new CollectableObject('img/8_coin/coin_1.png', 1500, 200, 120, 120),
];
bottle_collectable = [new CollectableObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 700, 525, 120, 80),
new CollectableObject('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1200, 525, 120, 80),
];
character_coin_stash = 0;
character_bottle_stash = 100;

camera_x = 0;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkAliveStatus();
        this.runBasicTimer();
        this.randomlySpawnEnemy();
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
                this.checkBottleCollision();
        }, 100);
    }

    randomlySpawnEnemy(){
        
            setInterval(() => {
                if (this.level.enemies.length < 3) {
                this.level.enemies.push(new Chicken(this.character.x + 400));
            }
            }, (this.random_spawn_timer * 1000) + this.basic_timer);
        
        

    }

    runBasicTimer(){
        setInterval(() => {
            this.basic_timer++;
        }, 1000);
    }

    checkBottleCollision(){
            this.level.enemies.forEach((enemy) => {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];
                    if (thrownBottle.isColliding(enemy)) {
                        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH);
                        enemy.playAnimation(enemy.IMAGES_DYING);
                    };
                };
            });
        }    

    
    checkCharacterEnemyCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                 this.character.hit(5);
                 this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);
                 this.checkAliveStatus();
            };
            });
    }

    checkCharacterCollectableCollisions(collectable_stash){
        if (collectable_stash == 'coin') {
            this.checkCoinPickup();
        } else if (collectable_stash ==  'bottle') {
            this.checkBottlePickup();
        }
        
    }

    checkCoinPickup(){
        this.coin_collectable.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (this.character_coin_stash < 100) {
                    this.character_coin_stash += 10;
                    this.statusbar_coin.setPercentage(this.character_coin_stash, this.statusbar_coin.IMAGES_COIN);
                    this.coin_collectable.splice(0, 1);
                } else {
                    this.character_coin_stash = 100;
                    this.statusbar_coin.setPercentage(this.character_coin_stash, this.statusbar_coin.IMAGES_COIN);
                }               
            }
        })
    }

    checkBottlePickup(){
        this.bottle_collectable.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.character_bottle_stash < 100) {
                    this.character_bottle_stash += 10;
                    this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
                    this.bottle_collectable.splice(0, 1);
                } else {
                    this.character_bottle_stash = 100;
                    this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
                }      
            }
        })
    }


    checkBottleThrow(){
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 150, this.character.y + 180); 
            if (this.character_bottle_stash >= 10) {
                this.throwableObject.push(bottle);
                this.character_bottle_stash -= 10;
                this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
            }
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
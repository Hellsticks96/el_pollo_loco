class World{
character = new Character();



level = level1;

canvas;

ctx;

keyboard;

endboss_count = 0;

random_spawn_timer = Math.floor((Math.random() * 8) + 3);
basic_timer = 0;



statusbar_health = new Statusbar('health');
statusbar_coin = new Statusbar('coin');
statusbar_bottle = new Statusbar('bottle');

throwableObject = [];

coin_collectable = [new CollectableObject('img/8_coin/coin_1.png', 100, 200, 120, 120),
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
        this.runBasicTimer();
        //this.randomlySpawnEnemy();
    }

    setWorld(){
        this.character.world = this;
    }  

    run(){
        setInterval(() => {
                this.checkCharacterEnemyCollisions();
                this.checkCharacterCollectableCollisions('coin');
                this.checkCharacterCollectableCollisions('bottle');
                this.checkBottleThrow();
                this.checkBottleCollision();
                this.checkEndbossSpawn();
                this.checkEndcard();
        }, 100);
    }

    checkEndcard(){ 
        if (this.character.isDead) {
            setTimeout(() => {
                this.level.endcard.push(new Background('img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x -100, 0));
            }, 3000);
        }
        if (this.level.endboss.length > 0 && this.level.endboss[0].isDead) {
            setTimeout(() => {
                this.level.endcard.push(new Background('img/9_intro_outro_screens/game_over/game over!.png', this.character.x -100, 0));
            }, 3000);
        }
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
        let splashCheck = true;
            this.level.enemies.forEach((enemy) => {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];
                    
                    if (thrownBottle.isColliding(enemy)) {
                        clearInterval(thrownBottle.throwMovementX);
                        clearInterval(thrownBottle.animation_BottleRotation);
                        clearInterval(thrownBottle.gravity);
                        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, splashCheck);
                        thrownBottle.applyGravity();
                        enemy.playAnimation(enemy.IMAGES_DYING);
                        this.deleteHitEnemy(enemy);               
                    };
                };
            });
            if (this.level.endboss.length > 0) {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];
                    if (thrownBottle.isColliding(this.level.endboss[0])) {
                        clearInterval(thrownBottle.throwMovementX);
                        clearInterval(thrownBottle.animation_BottleRotation);
                        clearInterval(thrownBottle.gravity);
                        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, splashCheck);
                        thrownBottle.applyGravity();
                        this.level.endboss[0].hit(10);
                    }
                }
            }
            
        }


    deleteHitEnemy(obj){
        setTimeout(() => {
                    this.level.enemies.splice(this.getEnemyIndex(obj), 1);
        }, 1500); 
    }
        
    getEnemyIndex(obj){
        let index = this.level.enemies.indexOf(obj);
        return index;
    }

    
    checkCharacterEnemyCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    this.character.speedY = 30;
                    enemy.playAnimation(enemy.IMAGES_DYING);
                    this.deleteHitEnemy(enemy); 
                } else {
                    this.character.hit(5);
                 this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);
                }             
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
                    this.coin_collectable.splice(this.coin_collectable.findIndex(x => x.x === coin.x), 1);
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
                    this.bottle_collectable.splice(this.bottle_collectable.findIndex(x => x.x === bottle.x), 1);
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

    checkEndbossSpawn(){
        let endboss = new Endboss();
        if (this.character.x > 2000 && this.endboss_count < 1) {
            this.level.endboss.push(endboss);
            this.endboss_count++;
        }
    }


    draw(){

        this.ctx.fillRect(0, 0, 1080, 720);

        this.ctx.translate(this.camera_x, 0);

        this.grabAndAdd(this.level.backgrounds);
        
        this.grabAndAdd(this.level.enemies);
        this.grabAndAdd(this.level.endboss);

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

        if (this.level.endcard.length > 0) {
            this.grabAndAdd(this.level.endcard);
        }

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

        triggerMobileButton(button){
            if (button = left) {
                this.world.keyboard.LEFT = true;
            }
        }
    
}
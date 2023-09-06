class World{
character = new Character();
spawnCharacter = true;
stoppableInterval;


level = level1;

canvas;

ctx;

keyboard;

endboss_count = 0;
endboss;

random_spawn_timer = Math.floor((Math.random() * 8) + 3);
basic_timer = 0;
timeNow;
gamePaused = false;
gameOver = false;
gameWon = false;
gameLost = false;
stopImageLoop = true;



statusbar_health = this.level.statusbars[0];
statusbar_coin = this.level.statusbars[1];
statusbar_bottle = this.level.statusbars[2];
statusbar_endboss = [];

throwableObject = [];

coin_collectable = this.level.coin_collectables;
bottle_collectable = this.level.bottle_collectables;
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
        this.runBasicTimer();
        //this.randomlySpawnEnemy();
    }

    setWorld(){
        this.character.world = this;
    }  

    run(){
        this.stoppableInterval = setInterval(() => {
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
                this.level.endcard.push(new Background('../img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x -100, 0));
                this.character.stopAllMovements = true;
                this.gameOver = true;
                this.gameLost = true;
            }, 3000);
        }
        if (this.level.endboss.length > 0 && this.level.endboss[0].isDead) {
            setTimeout(() => {
                this.level.endcard.push(new Background('../img/9_intro_outro_screens/game_over/game over!.png', this.character.x -100, 0));
                this.character.stopAllMovements = true;
                this.gameOver = true;
                this.gameWon = true;
            }, 3000);
        }
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
                        thrownBottle.bottle_breaking_sound.play();
                        clearInterval(thrownBottle.throwMovementX);
                        clearInterval(thrownBottle.animation_BottleRotation);
                        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, this.stopImageLoop);
                        enemy.hit(100);
                        this.deleteHitEnemy(enemy);               
                    };
                };
            });
            if (this.level.endboss.length > 0 && !this.endboss.isHurt(0.8)) {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];
                    if (thrownBottle.isColliding(this.endboss)) {
                        thrownBottle.bottle_breaking_sound.play();
                        this.endboss.audio_hit.play()
                        clearInterval(thrownBottle.throwMovementX);
                        clearInterval(thrownBottle.animation_BottleRotation);
                        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, this.stopImageLoop);
                        this.endboss.hit(50);
                        
                        if(this.endboss.isDead){
                            this.statusbar_endboss.splice(0, 1);
                        } else {
                            this.statusbar_endboss[0].setPercentage(this.level.endboss[0].energy, this.statusbar_endboss[0].IMAGES_HEALTH_ENDBOSS);
                        }
                    }
                }
            }
            
        }


    deleteHitEnemy(obj){
        obj.audio_death.play();
        setTimeout(() => {
                    this.level.enemies.splice(this.getEnemyIndex(obj), 1);
        }, 500); 
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
                    enemy.hit(100);
                    this.deleteHitEnemy(enemy); 
                } else {
                    this.character.hit(5);
                 this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);
                }             
            };
            });
            this.level.endboss.forEach((endboss) => {
                if (this.character.isColliding(endboss)) {
                    this.character.hit(5);
                    this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);
                              
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
                    coin.coin_collection_sound.play();
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
                    bottle.bottle_collection_sound.play();
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
        if (this.keyboard.SPACE && this.timeSinceLastCall() && this.character_bottle_stash >= 10) {
            this.timeNow = new Date().getTime();
            let bottle = new ThrowableObject(this.character.x + 150, this.character.y + 180);             
            this.throwableObject.push(bottle);
            this.character_bottle_stash -= 10;
            this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
            
        }
        
    }

    lastCallTime = 0;

    timeSinceLastCall() {
        const currentTime = new Date();
        

      
        const elapsedTime = (currentTime - this.lastCallTime) / 1000;
        this.lastCallTime = currentTime;
      
        return elapsedTime > 0.2;
      }

    checkEndbossSpawn(){
        let endboss = new Endboss();
        let health_endboss = new Statusbar('endboss');
        if (this.character.x > 2100 && this.endboss_count < 1) {
            this.level.endboss.push(endboss);
            this.endboss = this.level.endboss[0];
            this.statusbar_endboss.push(health_endboss);  
            this.endboss_count++;
            this.ctx.translate(this.level.endboss[0], 0);
        }
    }


    draw(){

        if (!this.gamePaused) {
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
            if (this.statusbar_endboss.length > 0) {
                this.addToMap(this.statusbar_endboss[0]);
            }
            this.ctx.translate(this.camera_x, 0);
    
            if (this.spawnCharacter) {
                this.addToMap(this.character);
            }
            
    
            if (this.level.endcard.length > 0) {
                this.grabAndAdd(this.level.endcard);
            }
    
            this.ctx.translate(-this.camera_x, 0);
    
            let self = this;
            requestAnimationFrame(function(){
                self.draw();
            });           
        } else {
            
        }


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
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

lastCallTime = 0;

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @param {*} keyboard
 * Creates the game world by drawing all content, starting a basic timer and starting an interval 
 */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBasicTimer();
    }

    /**
     * Sets @param world of character to this object
     */
    setWorld(){
        this.character.world = this;
    }  

    /**
     * Interval used for multiple functions
     */
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

    /**
     * Checks if the game is over and starts winning/losing endcard
     */
    checkEndcard(){ 
        if (this.character.isDead) {
            setTimeout(() => {
                this.level.endcard.push(new Background('./img/9_intro_outro_screens/game_over/oh_no_you_lost!.png', this.character.x -100, 0));
                this.character.stopAllMovements = true;
                this.gameOver = true;
                this.gameLost = true;
            }, 3000);
        }
        if (this.level.endboss.length > 0 && this.level.endboss[0].isDead) {
            setTimeout(() => {
                this.level.endcard.push(new Background('./img/9_intro_outro_screens/game_over/game_over!.png', this.character.x -100, 0));
                this.character.stopAllMovements = true;
                this.gameOver = true;
                this.gameWon = true;
            }, 3000);
        }
    }

    /**
     * Runs a basic timer that goes up by 1 per second
     */
    runBasicTimer(){
        setInterval(() => {
            this.basic_timer++;
        }, 1000);
    }

    /**
     * Checks if a bottle is hitting a normal enemy or an endboss and starts according functions
     */
    checkBottleCollision(){
            this.level.enemies.forEach((enemy) => {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];                   
                    if (thrownBottle.isColliding(enemy)) {
                        this.bottleEnemyHit(enemy, thrownBottle)         
                    };
                };
            });
            if (this.level.endboss.length > 0 && !this.endboss.isHurt(0.8)) {
                for (let i = 0; i < this.throwableObject.length; i++) {
                    const thrownBottle = this.throwableObject[i];
                    if (thrownBottle.isColliding(this.endboss)) {
                        this.bottleEndbossHit(this.endboss, thrownBottle)
                        this.checkEndbossStatusbar(this.endboss)                                              
                    }
                }
            }
            
        }

        /**
         * 
         * @param {object} enemy - enemy hit by bottle
         * @param {object} thrownBottle - bottle that hit the enemy
         * Starts bottle breaking sound, stops bottle animations and movement, hits the enemy and then calls a delete function for the enemy
         */
    bottleEnemyHit(enemy, thrownBottle){
        thrownBottle.bottle_breaking_sound.play();
        clearInterval(thrownBottle.throwMovementX);
        clearInterval(thrownBottle.animation_BottleRotation);
        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, this.stopImageLoop);
        enemy.hit(100);
        this.deleteHitEnemy(enemy);     
    }

    /**
     * 
     * @param {object} endboss - endboss hit by bottle
     * @param {object} thrownBottle - bottle that hit endboss
     * Starts bottle breaking sound, stops bottle animations and movement and hits the endboss.
     */
    bottleEndbossHit(endboss, thrownBottle){
        thrownBottle.bottle_breaking_sound.play();
        endboss.audio_hit.play()
        clearInterval(thrownBottle.throwMovementX);
        clearInterval(thrownBottle.animation_BottleRotation);
        thrownBottle.playAnimation(thrownBottle.IMAGES_BOTTLE_SPLASH, this.stopImageLoop);
        endboss.hit(20); 
    }

    /**
     * 
     * @param {object} endboss
     * If the endboss this deletes its statusbar. If not it sets the percentage so the right img will be displayed
     */
    checkEndbossStatusbar(endboss){
        if(endboss.isDead){
            this.statusbar_endboss.splice(0, 1);
        } else {
            this.statusbar_endboss[0].setPercentage(this.level.endboss[0].energy, this.statusbar_endboss[0].IMAGES_HEALTH_ENDBOSS);
        }
    }

    /**
     * 
     * @param {object} obj - enemy object
     * Deletes the hit enemy from the enemy array. 
     */
    deleteHitEnemy(obj){
        obj.audio_death.play();
        setTimeout(() => {
                    this.level.enemies.splice(this.getEnemyIndex(obj), 1);
        }, 500); 
    }
    
    /**
     * 
     * @param {object} obj - enemy object
     * @returns {number}
     * Gets the index of enemy object so the right object at the right position will be deleted
     */
    getEnemyIndex(obj){
        let index = this.level.enemies.indexOf(obj);
        return index;
    }

    /**
     * Checks if the character is colliding with an enemy/endboss
     */
    checkCharacterEnemyCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.checkJumpAttack(enemy)                         
            };
        });
        this.level.endboss.forEach((endboss) => {
            this.checkHitByEndboss(endboss)
        });
    }

    /**
     * 
     * @param {object} enemy - enemy  object
     * This checks if the character is jumping on an object or if its colliding on the sides. As long as the character is above an object, it will hit it.
     * Otherwise will take a hit. 
     */
    checkJumpAttack(enemy){
        if (this.character.isAboveGround()) {
            this.character.speedY = 30;
            enemy.hit(100);
            this.deleteHitEnemy(enemy); 
        } else {
            this.character.hit(5);
            this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);
        }    
    }

    /**
     * 
     * @param {object} endboss - endboss object
     * If the character is colliding with the endboss, it takes a hit. 
     */
    checkHitByEndboss(endboss){
        if (this.character.isColliding(endboss)) {
            this.character.hit(15);
            this.statusbar_health.setPercentage(this.character.energy, this.statusbar_health.IMAGES_HEALTH);                              
        };
    }

    /**
     * Checks whether the character is colliding a collectable
     */
    checkCharacterCollectableCollisions(collectable_stash){
        if (collectable_stash == 'coin') {
            this.checkCoinPickup();
        } else if (collectable_stash ==  'bottle') {
            this.checkBottlePickup();
        }
        
    }

    /**
     * Checks whether character is colliding a coin and picks it up if the stash is below 100
     */
    checkCoinPickup(){
        this.coin_collectable.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                if (this.character_coin_stash < 100) {
                    this.pickUpCoin(coin);
                } else {
                    this.character_coin_stash = 100;
                    this.statusbar_coin.setPercentage(this.character_coin_stash, this.statusbar_coin.IMAGES_COIN);
                }               
            }
        })
    }

    /**
     * 
     * @param {object} coin - collectable object
     * Plays sound, adds 10 to @param character_coin_stash, sets statusbar percentage and deletes the coin from canvas 
     */
    pickUpCoin(coin){
        coin.coin_collection_sound.play();
        this.character_coin_stash += 10;
        this.statusbar_coin.setPercentage(this.character_coin_stash, this.statusbar_coin.IMAGES_COIN);
        this.coin_collectable.splice(this.coin_collectable.findIndex(x => x.x === coin.x), 1);    
    }

    /**
     * Checks whether character is colliding a bottle and picks it up if the stash is below 100
     */
    checkBottlePickup(){
        this.bottle_collectable.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                if (this.character_bottle_stash < 100) {
                    this.pickUpBottle(bottle);
                } else {
                    this.character_bottle_stash = 100;
                    this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
                }      
            }
        })
    }

    /**
     * 
     * @param {object} bottle - collectable object
     * Plays sound, adds 10 to @param character_bottle_stash, sets statusbar percentage and deletes the coin from canvas 
     */
    pickUpBottle(bottle){
        bottle.bottle_collection_sound.play();
        this.character_bottle_stash += 10;
        this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);
        this.bottle_collectable.splice(this.bottle_collectable.findIndex(x => x.x === bottle.x), 1);
    }


    /**
     * Checks if a bottle is thrown. This uses a timer that prevents it from beeing called continiously while a key is pressed
     */
    checkBottleThrow(){
        if (this.keyboard.SPACE && this.timeSinceLastCall() && this.character_bottle_stash >= 10) {            
            this.timeNow = new Date().getTime();
            let bottle = new ThrowableObject(this.character.x + 150, this.character.y + 180);
            if (this.character.otherDirection) {
                bottle.otherDirection = true;
            }            
            this.throwableObject.push(bottle);
            bottle.throw();
            this.character_bottle_stash -= 10;
            this.statusbar_bottle.setPercentage(this.character_bottle_stash, this.statusbar_bottle.IMAGES_BOTTLE);            
        }        
    }


    /**
     * 
     * @returns {boolean}
     * Evaluates how much time has passed since last call and returns true if it has been more than 0.2 seconds
     */
    timeSinceLastCall() {
        const currentTime = new Date();      
        const elapsedTime = (currentTime - this.lastCallTime) / 1000;
        this.lastCallTime = currentTime;     
        return elapsedTime > 0.2;
      }

    /**
     * When the character passes x coordinate 2100 this will spawn an Endboss but only if there is none present at the time.
     */
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

    /**
     * draws all imgs on canvas as long as its not paused
     */
    draw(){
        if (!this.gamePaused) {
            this.ctx.fillRect(0, 0, 1080, 720);

            this.ctx.translate(this.camera_x, 0);
            
    
            this.grabAndAdd(this.level.backgrounds);
            
            this.grabAndAdd(this.level.enemies);
            if (this.level.endboss.length > 0) {
                this.grabAndAdd(this.level.endboss);
            }
            
    
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
        }
    }

        /**
         * 
         * @param {Array} array - array of imgs
         * Loops through array and adds all imgs to canvas
         */
        grabAndAdd(array){
            array.forEach(item => {
                this.addToMap(item);
            })
        }
        
        /**
         * 
         * @param {Object} mo - object to draw
         * This draws a single object on the canvas. It also checks whether the images should be flipped or not (walking other direction)
         */
        addToMap(mo){
            if (mo.otherDirection) {
                this.flipImage(mo);
            }

            mo.draw(this.ctx);

            if (mo.otherDirection) {
                this.resetImage(mo);
            }
        }

        /**
         * 
         * @param {object} mo - object images need to be flipped
         * Flips images of objects
         */
        flipImage(mo){
                this.ctx.save();
                this.ctx.translate(mo.width, 0);
                this.ctx.scale(-1, 1);
                mo.x = mo.x * -1;
        }

        /**
         * Flips the image back to original
         */
        resetImage(mo){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }    
}
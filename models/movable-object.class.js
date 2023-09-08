class MovableObject extends DrawableObject {
    speed = (Math.random() * 0.6) + 0.2;
    gravity;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    isDead = false;
    lastHurt = 0;
    stopImageLoop = true;

    /**
     * Checks whether an object is above ground. If yes gravity is applied by subtracting @param acceleration continiously.
     */
    applyGravity(){
        this.gravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether an object is above a y coordinate in canvas
     * @returns {boolean}
     */
    isAboveGround(){
        if (this instanceof ThrowableObject || this.isDead) {
            return true;
        } else {
            return this.y < 180;
        }
        
    }

    /**
     * Checks whether an object has used up its energy
     */
    checkDeath(){
        if (this.energy <= 0) {
            this.isDead = true;
        }
    }

    /**
     * 
     * @param {number} hitStrength - number that will be subtracted from object energy
     * This function subtracts energy from @param energy of an object.
     */
    hit(hitStrength){
        this.energy -= hitStrength;
        if (this.energy <= 0) {
            this.energy = 0;
            this.checkDeath();
        } else {
            this.lastHurt = new Date().getTime();
        }
    }

    /**
     * 
     * @param {number} hurtTimer - sets how long an object sould be hurt
     * @returns {boolean}
     * This checks whether an object is hurt. Used to prevent multiple hits from one object.
     */
    isHurt(hurtTimer){
        let timePassed = new Date().getTime() - this.lastHurt;
        timePassed = timePassed / 1000;
        return timePassed < hurtTimer;
    }


    /**
     * Moves an object to the right in canvas
     */
    moveRight(){
        this.x += 7; 
    }

    /**
     * @param {number} speed - used to set speed of character
     * Moves an object to the left
     */
    moveLeft(speed){
        if (speed) {
            this.x -= speed;
        }else {
            this.x -= 7;
        }
    }

    /**
     * Starts a jump
     */
    jump(){
        this.speedY = 30;
    }
}
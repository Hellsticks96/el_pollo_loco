class MovableObject extends DrawableObject {
    speed = (Math.random() * 0.6) + 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    isDead = false;
    lastHurt = 0;

    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if ((this instanceof ThrowableObject)) {
            return true;
        } else {
            return this.y < 180;
        }
        
    }

    



    isColliding (obj) {
        return  this.x + this.width > obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x &&
                this.y < obj.y + obj.height

    }

    checkDeath(){
        if (this.energy <= 0) {
            this.isDead = true;
        }
    }

    hit(hitStrength){
        this.energy -= hitStrength;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHurt = new Date().getTime();
        }
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHurt;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    playAnimation(images){
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    moveRight(){
        this.x += 7; 
    }

    moveLeft(speed){
        if (speed) {
            this.x -= speed;
        }else {
            this.x -= 7;
        }
    }

    jump(){
        this.speedY = 30;
    }
}
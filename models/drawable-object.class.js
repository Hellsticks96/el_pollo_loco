class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    stopImageLoop= 0;
    nonLoopingAnimation = 0;
    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images, stopImageLoop){
        if (stopImageLoop) {
            if (this.stopImageLoop <= images.length) {
                let path = images[this.nonLoopingAnimation];
                this.nonLoopingAnimation++;
                this.img = this.imageCache[path];
                this.stopImageLoop++; 
            };  
        } else {
            let i = this.currentImage % images.length;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
        }
          
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawHitbox(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof CollectableObject || this instanceof ThrowableObject || this instanceof Endboss || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = '#000';
           
                ctx.rect(this.x, this.y, this.width, this.height);
            
            
            ctx.stroke();
        }
    }

    isColliding (obj) {
        if (obj instanceof CollectableObject || obj instanceof Endboss || obj instanceof Chicken || obj instanceof Character || obj instanceof SmallChicken) {
            return  this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        }  else  {
            return  this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
        }
        
    }
}
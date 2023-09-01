class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    splashImage= 0;
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

    playAnimation(images, splashCheck){
        if (splashCheck) {
            if (this.splashImage <= images.length) {
                let i = this.currentImage % images.length;
                let path = images[i];
                this.img = this.imageCache[path];
                this.splashImage++; 
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
        if (this instanceof Character || this instanceof Chicken || this instanceof CollectableObject || this instanceof ThrowableObject || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = '#000';
           
                ctx.rect(this.x, this.y, this.width, this.height);
            
            
            ctx.stroke();
        }
    }

    isColliding (obj) {
        if (obj instanceof CollectableObject) {
            return  this.x + this.width - this.offset.right > obj.x &&
            this.y + this.height - this.offset.bottom > obj.y &&
            this.x + this.offset.left < obj.x &&
            this.y + this.offset.top < obj.y + obj.height

        } else {
            return  this.x + this.width > obj.x &&
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height
        }
        
    }
}
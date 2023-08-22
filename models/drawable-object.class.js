class DrawableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

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

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawHitbox(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof CollectableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            if (this instanceof Character) {
                ctx.rect(this.x + 40, this.y + 130, this.width -100, this.height -150);
            } else if (this instanceof CollectableObject) {
                ctx.rect(this.x + 20, this.y + 15, this.width -30, this.height -30);
            } else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            
            ctx.stroke();
        }
    }
}
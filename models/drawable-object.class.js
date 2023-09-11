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

    /**
     * 
     * @param {string} path - path to img
     * @param {object} this.img - used to temporarily store an img object
     * This function creates an img object and sets the src.
     */

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - array for storing img paths
     * @param {object} img - used to temporarily store an img object
     * @param {JSON} imageCache - json for storing imgs for an animation
     * Loops through an array, filters out the img path, creates a new img object and puts it into the json for animation looping.
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * 
     * @param {Array} images - array of img paths
     * @param {number} stopImageLoop - used to stop an animation (e.g. dying endboss would be spinning endlessly)
     * This function is playing the animations for the game. An array is put in, the path filtered out and matched with the fitting object in @param imageCache json.
     */
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

    /**
     * 
     * @param {string} ctx - canvas context
     * this draws an img on the canvas using the set coordinates, height, width and img
     */
    draw(ctx){
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
            console.log(e)
            console.log('problems with', this.img)
        }
        
    }


    /**
     * 
     * @param {object} obj - movable object
     * @returns {boolean}
     * This checks whether objects are colliding by using their coordinates. The ooffset is used to scale to actual character size and not using the edges of the initial img. 
     */
    isColliding (obj) {
            return  this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom     
    }
}
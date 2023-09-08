class CollectableObject extends DrawableObject {

    coin_collection_sound = new Audio('./audio/coin_collection.mp3');
    bottle_collection_sound = new Audio('./audio/bottle_collection.mp3');

    offset = {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
    }

    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    IMAGES_BOTTLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    /**
     * 
     * @param {string} img - path to img
     * @param {number} x - x coordinate in canvas object should be placed at
     * @param {number} y  - x coordinate in canvas object should be placed at
     * @param {number} height - heigth of img
     * @param {number} width - width of img
     * loads all neccesary imgs and starts animation (coin only)
     */
    constructor(img, x, y, height, width){
        super().loadImage(img);
        this.loadImages(this.IMAGES_COIN);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.animate(img);
    }

    /**
     * 
     * @param {string} img - path to picture
     * checks if the object and starts an animation if so
     */
    animate(img){
        setInterval(() => {
            if (img == './img/8_coin/coin_1.png') {
                this.playAnimation(this.IMAGES_COIN);
            }
        }, 400)
    }
}
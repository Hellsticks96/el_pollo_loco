class CollectableObject extends DrawableObject {

    offset = {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30
    }

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];


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

    animate(img){
        setInterval(() => {
            if (img == 'img/8_coin/coin_1.png') {
                this.playAnimation(this.IMAGES_COIN);
            }
        }, 400)
    }
}
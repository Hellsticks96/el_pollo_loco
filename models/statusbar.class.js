class Statusbar extends DrawableObject {
    y = 0;
    x = 10;
    height = 80;
    width = 350;
    percentage = 100;

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];


    constructor(images_indicator){
        super();
        this.loadImages(this.pickArrayToLoad(images_indicator));
    }

    pickArrayToLoad(images_indicator){
        if (images_indicator == 'health') {
            this.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
            return this.IMAGES_HEALTH;
        } else if (images_indicator == 'coin') {
            this.y += 60;
            this.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png');
            return this.IMAGES_COIN;
        } else if (images_indicator == 'bottle') {
            this.y += 120
            this.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png');
            return this.IMAGES_BOTTLE;
        };
    }
    

    setPercentage(percentage){
        this.percentage = percentage;
        let path =  this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
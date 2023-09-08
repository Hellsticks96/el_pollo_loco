class Level {
    enemies;
    endboss;
    clouds;
    backgrounds;
    statusbars;
    coin_collectables;
    bottle_collectables;
    endcard
    level_end_x = 1079*3;

    /**
     * This function is setting the arrays entererd in @param level1 to the @param - of this object(above)
     * 
     */
    constructor(enemies, endboss, clouds, backgrounds, statusbars, coin_collectables, bottle_collectables, endcard){
        this.enemies = enemies;
        this.endboss = endboss
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusbars = statusbars;
        this.coin_collectables = coin_collectables;
        this.bottle_collectables = bottle_collectables;
        this.endcard = endcard;
    }

}
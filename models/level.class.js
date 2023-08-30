class Level {
    enemies;
    clouds;
    backgrounds;
    statusbar_health;
    statusbar_bottle;
    statusbar_coin;
    bottle_collectable;
    coin_collectable;
    level_end_x = 1079*3;

    constructor(enemies, clouds, backgrounds){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
    }

}
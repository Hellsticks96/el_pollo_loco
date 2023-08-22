class Level {
    enemies;
    clouds;
    backgrounds;
    statusbar_health;
    statusbar_bottle;
    statusbar_coin;
    bottle_collectable;
    coin_collectable;
    level_end_x = 1070*3;

    constructor(enemies, clouds, backgrounds, statusbar_health){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.statusbar_health = statusbar_health;
    }

}
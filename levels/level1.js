const level1 = new Level(
    [
        new Chicken(700),
        new Chicken(1000),
        new Chicken(1700),
        new Chicken(900),
        new Chicken(2000),
        new Chicken(2500),
        new Chicken(1800),
        new SmallChicken(500),
        new SmallChicken(800),
        new SmallChicken(2800),
        new SmallChicken(3000),
        new SmallChicken(1300),
        new SmallChicken(900)
    ],

    [

    ],

    [
        new Cloud(300),
        new Cloud(700),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2300),
        new Cloud(3000)
    ],

    [
        new Background('./img/5_background/layers/air.png', 0,0 ),
        new Background('./img/5_background/layers/3_third_layer/1.png', 0, 0),
        new Background('./img/5_background/layers/2_second_layer/1.png', 0, 0),
        new Background('./img/5_background/layers/1_first_layer/1.png', 0, 0),
        new Background('./img/5_background/layers/air.png', 1079, 0),
        new Background('./img/5_background/layers/3_third_layer/2.png', 1079, 0),
        new Background('./img/5_background/layers/2_second_layer/2.png', 1079, 0),
        new Background('./img/5_background/layers/1_first_layer/2.png', 1079, 0),

        new Background('./img/5_background/layers/air.png', 1079 * 2, 0),
        new Background('./img/5_background/layers/3_third_layer/1.png', 1079 * 2, 0),
        new Background('./img/5_background/layers/2_second_layer/1.png', 1079 * 2, 0),
        new Background('./img/5_background/layers/1_first_layer/1.png', 1079 * 2, 0),
        new Background('./img/5_background/layers/air.png', 1079 * 3, 0),
        new Background('./img/5_background/layers/3_third_layer/2.png', 1079 * 3, 0),
        new Background('./img/5_background/layers/2_second_layer/2.png', 1079 * 3, 0),
        new Background('./img/5_background/layers/1_first_layer/2.png', 1079 * 3, 0)
    ],

    [
        new Statusbar('health'),
        new Statusbar('coin'),
        new Statusbar('bottle')
    ],

    [
        new CollectableObject('./img/8_coin/coin_1.png', 500, 200, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 800, 150, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 950, 250, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 1100, 300, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 2000, 200, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 2200, 300, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 2300, 400, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 2400, 300, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 1800, 200, 120, 120),
        new CollectableObject('./img/8_coin/coin_1.png', 1500, 200, 120, 120),

    ],

    [
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 700, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1200, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1800, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2000, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2300, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2500, 525, 120, 80),
        new CollectableObject('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 3000, 525, 120, 80)
    ],

    [

    ],
);
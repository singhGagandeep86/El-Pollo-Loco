
let level1 = createLevel1();

function createLevel1() {
    return new Level(
        [
            new Chicken(200),
            new Chicken(200),
            new ChickenSmall(300),
            new Chicken(800),
            new ChickenSmall(1000),
            new Chicken(1200),
            new Chicken(1600),
            new ChickenSmall(1700),
            new Chicken(1800),
            new ChickenSmall(2200),
            new Chicken(2600),
            new Chicken(2600),
            new ChickenSmall(3000),
            new Chicken(3200),
            new Chicken(3200),
            new ChickenSmall(3300),
            new ChickenSmall(3400)
        ],
        [
            new Clouds(100),
            new Clouds(900),
            new Clouds(1500),
            new Clouds(2100),
            new Clouds(2400),
            new Clouds(2600)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -718),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -718),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -718),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -718),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 718),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718),
            new BackgroundObject('img/5_background/layers/air.png', 718 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 718 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 718 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 4),
            new BackgroundObject('img/5_background/layers/air.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 5)

        ],
        [
            new Coins(310, 180),
            new Coins(360, 180),
            new Coins(900, 100),
            new Coins(1300, 50),
            new Coins(1380, 80),
            new Coins(1900, 180),
            new Coins(2200, 20),
            new Coins(2260, 20),
            new Coins(2320, 20),
            new Coins(2400, 100)
        ],
        [
            new Bottles(400, 360),
            new Bottles(600, 360),
            new Bottles(1000, 360),
            new Bottles(1400, 360),
            new Bottles(1600, 360),
            new Bottles(1750, 360),
            new Bottles(2000, 360),
            new Bottles(2300, 360),
            new Bottles(2420, 360),
            new Bottles(2550, 360),
            new Bottles(2750, 360),
            new Bottles(2900, 360),
            new Bottles(3220, 360),
            new Bottles(3560, 360),
            new Bottles(3650, 360),
            new Bottles(3920, 360),
            new Bottles(3950, 360),
            new Bottles(3960, 360),
            new Bottles(3965, 360),
            new Bottles(3970, 360),
            new Bottles(4050, 360)
        ]
    );
}
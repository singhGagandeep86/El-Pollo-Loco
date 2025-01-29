class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEnd_x = 3670;

    
    /** 
     * Constructs a new Level instance.
     * @param {Array<Enemy>} enemies - All enemies in the level.
     * @param {Array<Clouds>} clouds - All clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - All background objects in the level.
     * @param {Array<Coin>} coins - All coins in the level.
     * @param {Array<Bottle>} bottles - All bottles in the level. 
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}

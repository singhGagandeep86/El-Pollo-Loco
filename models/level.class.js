class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    levelEnd_x = 3670;
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}



class CoinsStatusBar extends DrawableObject {

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    percentage = 0;
    world;

    /**
     * Constructor for a CoinsStatusBar object.
     * @param {World} world - The World object that this StatusBar belongs to.
     */
    constructor(world) {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.width = 200;
        this.height = 58;
        this.x = 40;
        this.y = 60;
        this.world = world;
    }

    /**
     * Sets the percentage of coins collected and updates the StatusBar image accordingly.
     * @param {number} percentage - the percentage of coins collected, from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the percentage of the coins collected based on the number of coins in the world's coin collection.
     * The percentage is calculated as 10 times the number of coins collected.
     * Updates the status bar image accordingly.
     */
    setPercentageFromCoins() {
        let coinsCollected = this.world.coinsCollections.length * 10;
        this.percentage = coinsCollected;
        this.setPercentage(coinsCollected);
    }

    /**
     * Resolves the index of the image to use from the IMAGES_COIN array, based on the percentage of coins collected.
     * @returns {number} the index of the image to use 
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }

    /** 
     * Draws the number of coins collected in the world
     * @param {CanvasRenderingContext2D} ctx - the context to draw on 
     */
    drawCollectedCoins(ctx) {
        let coinsCollected = this.percentage / 10;
        ctx.font = '22px ZABARS';
        ctx.fillStyle = 'white';
        ctx.fillText(`${coinsCollected}`, this.x + this.width + 6, this.y + 45);
    }

}
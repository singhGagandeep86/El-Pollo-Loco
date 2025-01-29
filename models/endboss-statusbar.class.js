

class EndbossStatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    percentage;
    world;

    /**
     * Constructor for the EndbossStatusBar.
     * @param {World} world - The World object that this EndbossStatusBar is part of.
     */
    constructor(world) {
        super().loadImage(this.IMAGES_HEALTH[0]);
        this.loadImages(this.IMAGES_HEALTH);
        this.width = 200;
        this.height = 58;
        this.x = 480;
        this.y = 10;
        this.world = world;
        this.setPercentage(100);
    }

    /**
     * Updates the health percentage of the EndbossStatusBar and changes the displayed image accordingly.
     * @param {number} percentage - The new percentage of health to set, expected to be between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Sets the percentage of health in the EndbossStatusBar based on the current energy value of the endboss.
     * @returns {void}
     */
    setHealthPercentage() {
        let health = this.world.endboss.energy;
        this.percentage = health;
        this.setPercentage(health);
    }

    /**
     * Resolves the index of the image to use from the IMAGES_HEALTH array, based on the percentage of health.
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
     * Draws the health of the endboss on the status bar.
     * @param {CanvasRenderingContext2D} ctx - the context to draw on 
     */
    drawCollectedBottles(ctx) {
        let health = this.percentage;
        ctx.font = '22px ZABARS';
        ctx.fillStyle = 'white';
        if (health >= 0) {
            ctx.fillText(`${health}`, this.x + this.width + 6, this.y + 40);
        } else {
            health = 0;
            ctx.fillText(`${health}`, this.x + this.width + 6, this.y + 40);
        }
    }
}
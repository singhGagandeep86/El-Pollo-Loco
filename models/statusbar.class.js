class Statusbar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]
    percentage = 100;

    /** Constructs a new Statusbar object.
    Initializes the object with an image, loads the other images in the IMAGES_HEALTH array, 
    sets the percentage to 100, and sets the width and height of the object to 200 and 60 respectively. */
    constructor() {
        super().loadImage(this.IMAGES_HEALTH[0]);
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.width = 200;
        this.height = 60;
    }

    /** Sets the percentage of the Statusbar to the given value.
     * @param {number} percentage - the percentage to set the Statusbar to, from 0 to 100.  */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.x = 40;
        this.y = 0;
    }

    /** Resolves the index of the image to use from the IMAGES_HEALTH array, based on the percentage of health.
        @returns {number} the index of the image to use */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }

    /** Draws the health of the Statusbar on the canvas.
        @param {CanvasRenderingContext2D} ctx - the context to draw on. */
    drawHealth(ctx) {
        let health = this.percentage;
        ctx.font = '22px ZABARS';
        ctx.fillStyle = 'white';
        ctx.fillText(`${health}`, this.x + this.width + 6, this.y + 45);
    }
}
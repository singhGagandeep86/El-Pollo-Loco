class Coins extends MoveableObject {
    height = 110;
    width = 110;
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]
    offset = {
        top: 38,
        left: 38,
        right: 38,
        bottom: 38
    };

    /** Construct a new Coin at the given x and y coordinates.
     * @param {number} x - the x-coordinate of the coin
     * @param {number} y - the y-coordinate of the coin */
    constructor(x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /** Animates the coin by continuously playing its animation
     every 600 milliseconds. */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 600);
    }
}
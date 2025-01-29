class Clouds extends MoveableObject {
    y = 50;
    height = 200;
    width = 400;

    /** 
     * Creates a new Clouds object at a random x position.
     * @param {number} x - The x-coordinate where the cloud will appear.
    */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500 + x;
        this.animate(x);
    }

    /** 
     * Animates the cloud by continuously moving it to the left and resetting its x position to the right of the screen
     * when it has reached the left of the screen.
     * @param {number} x - The x-coordinate of the right of the screen. 
     */
    animate(x) {
        setInterval(() => {
            if (this.x < - 500) {
                this.x = 500 + x;
            } else {
                this.x -= 1;
            }
        }, 100);
    }
}
class Bottles extends MoveableObject {
    height = 60;
    width = 60;

    offset = {
        top: 8,
        left: 18,
        right: 8,
        bottom: 6
    };

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

     /* Construct a new Bottles object
     * @param {number} x - the x-coordinate of the bottle &  @param {number} y - the y-coordinate of the bottle
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }
    
    /* Animate the bottle images every 600 milliseconds.*/
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 600);
    }

}
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

    constructor(x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
    }

}
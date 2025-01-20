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

    constructor(x, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 600);
    }
}
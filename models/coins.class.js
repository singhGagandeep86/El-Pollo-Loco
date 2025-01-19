class Coins extends MoveableObject {
    height = 110;
    width = 110;

    offset = {
        top: 38,
        left: 38,
        right: 38,
        bottom: 38
    };

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
    }
}
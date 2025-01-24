class Clouds extends MoveableObject {
    y = 50;
    height = 200;
    width = 400;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500 + x;
        this.animate(x);
    }

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
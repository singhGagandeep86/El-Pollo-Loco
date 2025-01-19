class Clouds extends MoveableObject {
    y = 50;
    height = 200;
    width = 400;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        // this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}
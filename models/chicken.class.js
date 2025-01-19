
class Chicken extends MoveableObject {
    height = 80;
    width = 60;
    walkingImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    dyingImage = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    died = false;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.dyingImage);
        this.y = 350;
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {

        if (!this.died) {
            setInterval(() => {
                this.playAnimation(this.walkingImages);
            }, 800 / 3);

            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }
    }

    dyingAnimation() {
        if (!this.died) {
            this.died = true;
            setInterval(() => {
                this.playAnimation(this.dyingImage);
            }, 100 / 30);
        }

    }

}
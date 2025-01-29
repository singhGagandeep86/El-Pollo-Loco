class ChickenSmall extends MoveableObject {

    height = 50;
    width = 50;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };
    walkingImages = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    dyingImage = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    died = false;

    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.dyingImage);
        this.y = 380;
        this.x = x + Math.random() * 500;
        this.speed = 0.40 + Math.random() * 0.15;
        this.animate();
    }

    /** Animates the chicken.
     * Animates the chicken by moving it left and playing its walking animation. */
    animate() {
        setInterval(() => {
            if (!this.died) {
                this.playAnimation(this.walkingImages);
            }
        }, 800 / 3);
        setInterval(() => {
            if (!this.died) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /** Animates the chicken dying.
     * If the chicken hasn't died yet, this plays the dying animation and marks the chicken as dead.*/
    dyingAnimation() {
        if (!this.died) {
            this.died = true;
            this.playAnimation(this.dyingImage);
        }
    }

}
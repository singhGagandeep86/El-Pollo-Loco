

class ThrowableObject extends MoveableObject {

    rotatingBottles = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    breakingBottles = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    offset = {
        top: 22,
        left: 10,
        right: 10,
        bottom: 18
    };

    throwInterval = null;
    collisionChecked = false;
    isBroken = false;
    otherDirection = false;

    constructor(x, y) {
        super().loadImage(this.rotatingBottles[0]);
        this.loadImages(this.rotatingBottles);
        this.loadImages(this.breakingBottles);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 68;
        this.handleBottleThrow();
    }


    handleBottleThrow() {
        this.animate();
        this.throw();
    }
    animate() {
        setInterval(() => {
            if (!this.isBroken) {
                this.playAnimation(this.rotatingBottles);
            }
        }, 100);
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        this.checkDirection();
        this.throwInterval = setInterval(() => {
            this.throwToEnemy();
            this.throwToFloor();
            this.throwing();
        }, 25);
    }

    checkDirection() {
        this.otherDirection = world.character.otherDirection;
    }

    throwing() {
        if (this.otherDirection === false) {
            this.x += 5;
        } else {
            this.x -= 5;
        }
    }

    throwToEnemy() {
        if (this.isBroken || this.collisionChecked) return;

        const targets = [world.level.enemies, world.endboss]
        targets.forEach(target => {
            if (this.isColliding(target)) {
                this.isBroken = true;
                this.collisionChecked = true;
                target.dyingAnimation ? target.dyingAnimation() : target.hurtAnimation(world);
                this.onEnemyCollision();
            }
        });
    }


    throwToFloor() {
        if (this.y >= 378 && !this.collisionChecked) {
            this.isBroken = true;
            this.groundCollision();
        }
    }


    groundCollision() {
        clearInterval(this.throwInterval);
        world.sounds.COLLIDE_BOTTLE.play();
        this.playAnimation(this.breakingBottles);
        this.speedY = 0;
        this.acceleration = 0;
        setTimeout(() => {
            world.throwableObjects.splice(world.throwableObjects.indexOf(this), 1);
        }, 500);
    }

    onEnemyCollision() {
        clearInterval(this.throwInterval);
        this.speedY = 0;
        this.acceleration = 0;
        this.playAnimation(this.breakingBottles);
        setTimeout(() => {
            world.throwableObjects.splice(world.throwableObjects.indexOf(this), 1);
        }, 100);
    }
}


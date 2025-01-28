
class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    world;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    constructor(world) {
        super();
        this.world = world;
    }

    applyGravity() {
        setInterval(() => {
            if (this.inAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.speedY < 0) {
                   world.characterCollisionWithEnemy();
                }
                if (!this.inAir()) {
                    this.speedY = 0;
                }
            }

        }, 1000 / 25);
    }

    inAir() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        const offsetThis = this.offset || { left: 0, right: 0, top: 0, bottom: 0 };
        const offsetMo = mo.offset || { left: 0, right: 0, top: 0, bottom: 0 };
        return this.x + this.width - offsetThis.right > mo.x + offsetMo.left &&
            this.y + this.height - offsetThis.bottom > mo.y + offsetMo.top &&
            this.x + offsetThis.left < mo.x + mo.width - offsetMo.right &&
            this.y + offsetThis.top < mo.y + mo.height;
    }


    hit() {
        this.energy -= 5;
        sounds.HURT.play();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.8;
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    }
}
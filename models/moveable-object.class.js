
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


    /** 
     * Constructor for MoveableObject.
     * @param {World} world - The World object in which the MoveableObject exists. 
     */
    constructor(world) {
        super();
        this.world = world;
    }

    /** 
     * Simulates gravity on the object.
     * If the object is currently in the air or has a vertical speed, it decreases the vertical speed
     * of the object, and moves the object vertically by the speed. If the vertical speed is negative, 
     * it triggers the character collision with the enemy check. If theobject is no longer in the air, 
     * it resets the vertical speed to 0. The method is called every 25 milliseconds.
     */
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

    /** 
     * Determines if the object is considered to be in the air.
     * For ThrowableObject instances, it always returns true.
     * For other objects, it returns true if the object's vertical position
     * (y-coordinate) is less than 180, indicating it is above the ground.
     * @returns {boolean} - True if the object is in the air, false otherwise. 
     */
    inAir() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /** 
     * Determines whether this object is colliding with another moveable object.
     * Takes into account the offsets for both objects to provide an accurate collision detection.
     * @param {MoveableObject} mo - The other moveable object to check collision against.
     * @returns {boolean} - True if the objects are colliding, false otherwise. 
     */
    isColliding(mo) {
        const offsetThis = this.offset || { left: 0, right: 0, top: 0, bottom: 0 };
        const offsetMo = mo.offset || { left: 0, right: 0, top: 0, bottom: 0 };
        return this.x + this.width - offsetThis.right > mo.x + offsetMo.left &&
            this.y + this.height - offsetThis.bottom > mo.y + offsetMo.top &&
            this.x + offsetThis.left < mo.x + mo.width - offsetMo.right &&
            this.y + offsetThis.top < mo.y + mo.height;
    }

    /** 
     * Simulates a hit on the object.
     * Decreases the object's energy by 5 and plays a hurt sound effect.
     * If the object's energy is now less than 0, sets it to 0. Otherwise, updates the last hit time. 
     */
    hit() {
        this.energy -= 5;
        sounds.HURT.play();
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** 
     * Determines if the object is still hurt.
     * If the object's energy was recently reduced (less than 800ms ago), it is considered hurt.
     * @returns {boolean} - True if the object is hurt, false otherwise. 
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.8;
    }

    /** 
     * Determines if the object is dead based onits energy level is zero.
     * @returns {boolean} - True if the object is dead, false otherwise. 
     */
    isDead() {
        return this.energy == 0;
    }

    /** 
     * Moves the object to the right by its speed amount. @memberof MoveableObject 
     */
    moveRight() {
        this.x += this.speed;
    }

    /** 
     * Moves the object to the left by its speed amount. @memberof MoveableObject 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /** 
     * Plays an animation on the object by switching through the given list of images.
     * @param {string[]} images - The list of images to play in sequence. 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Plays a small animation only once on the object by switching through the given list of images at a specific interval.
     * This method automatically clears the interval when the animation is done.
     * @param {string[]} images - The list of images to play in sequence.
     */
    playSmallAnimation(images) {
        let i = 0; 
        const interval = setInterval(() => {
            let path = images[i]; 
            this.img = this.imageCache[path]; 
            i++;
            if (i >= images.length) { 
                clearInterval(interval);
            }
        }, 160);
    }

    /** 
     * Sets the vertical speed to 20, causing the object to jump. @memberof MoveableObject 
     */
    jump() {
        this.speedY = 20;
    }
}


class Character extends MoveableObject {
    height = 250;
    width = 140;
    y = 180;
    idleImages = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    longIdleImages = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    walkingImages = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    jumpingImages = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    hurtingImages = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    dyingImages = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    speed = 1.5;
    count = 0;

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 20,
    };

    /** 
     * Initialize the character's properties, load the character's images, and start the animation and gravity.
     */
    constructor() {
        super().loadImage(this.walkingImages[0]);
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtingImages);
        this.loadImages(this.dyingImages);
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
        this.applyGravity();
        this.animate();
    }


    /**
     * Animation loop for the character. This method is called once every frame.
     * It contains the logic for playing sounds, moving the character, and initiating animations.
     */
    animate() {
        this.playSounds();

        this.moveCharacter();

        this.initiatingAnimations();

        this.JumpingAnimation();
    }

    /**
     * Starts an interval that plays the walking sound when the character is moving left or right and is not in the air,
     * and pauses the sound when the character is not moving or is in the air.
     */
    playSounds() {
        setInterval(() => {
            if (this.walkingRadius()) {
                sounds.WALKING.play();
            } else {
                sounds.WALKING.pause();
            }
        })
    }

    /**
     * Determines if the character is not out of bounds on the x-axis, and the character is not in the air. 
     */
    walkingRadius() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && 0 > this.x < this.world.levelEnd_x && !this.inAir();
    }

    /**
     * Moves the character based on the keyboard input and moves the camera with the character.
     * This method is called every frame. 
     */
    moveCharacter() {
        setInterval(() => {
            this.controlRightMovement();
            this.controlLeftMovement();
            this.controlJumpMovement();
            this.world.camera_x = -this.x + 100;
        })
    }

    /** 
     * If the right arrow key is pressed and the character is not out of bounds on the right,
     * move the character to the right and set the otherDirection property to false.
     */
    controlRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
            this.moveRight();
            this.otherDirection = false;
        }
    }

    /** 
     * If the left arrow key is pressed and the character is not out of bounds on the left,
     * move the character to the left and set the otherDirection property to true.
     */
    controlLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /** 
     * Checks if the jump key is pressed and if the character is not in the air.
     * If both conditions are met, the character jumps and the jump sound is played. 
     */
    controlJumpMovement() {
        if (this.world.keyboard.SPACE && !this.inAir()) {
            this.jump();
            sounds.JUMP.play();
            sounds.JUMP.volume = 0.4;
        }
    }

    /** 
    * Checks the state of the character and initiates the corresponding animation. This is done every 100ms.
    */
    initiatingAnimations() {
        setInterval(() => {
            if (this.isHurt()) {
                this.pepeHurting();
            } else if (this.isDead() && this.world.endboss.energy > 0) {
                this.pepeDying();
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.inAir()) {
                this.pepeWalking();
            } else if (!this.inAir()) {
                this.pepeSleeping();
            }
        }, 100);
    }

    /**
     * Animates the character's jump. This method is called every 500ms,
     * and checks if the character is in the air. If the character is in the air,
     * it resets the animation counter, pauses the idle animation sound,
     * and plays the jumping animation. This method is called by the World's animate method.
     */
    JumpingAnimation() {
        setInterval(() => {
            if (this.inAir()) {
                this.count = 0;
                this.world.sounds.SLEEPING.pause();
                this.playAnimation(this.jumpingImages);
            }
        }, 500);
    }

    /** 
    * Resets the hurt animation count, pauses the sleeping sound, and plays the hurting animation for the character.
    */
    pepeHurting() {
        this.count = 0;
        this.world.sounds.SLEEPING.pause();
        this.playAnimation(this.hurtingImages);
    }

    /** 
     * Resets the hurt animation count, pauses the normal game sound and plays the dying animation for the character.
     * The character is also set to y position 184 and the gameLost() function is called after 100ms. 
     */
    pepeDying() {
        this.count = 0;
        this.playAnimation(this.dyingImages);
        this.y = 184;
        this.world.sounds.NORMAL_GAME.pause();
        setTimeout(() => gameLost(), 100);
    }

    /** 
     * Resets the hurt animation count, pauses the sleeping sound and plays the walking animation for the character.
     */
    pepeWalking() {
        this.count = 0;
        this.world.sounds.SLEEPING.pause();
        this.playAnimation(this.walkingImages);
    }

    /** 
     * Checks the animation count and plays either the idle or long idle animation for the character. 
     * If the count is greater than 30, the long idle animationis played and the sleeping sound is played.
     */
    pepeSleeping() {
        this.playAnimation(this.idleImages);
        this.count++;
        if (this.count > 30) {
            this.playAnimation(this.longIdleImages);
            this.world.sounds.SLEEPING.play();
        }
    }
}
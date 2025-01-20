

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
    speed = 2;
    count = 0;

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30,
    };
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


    animate() {
        this.playSounds();

        this.moveCharacter();

        this.initiatingAnimations();
    }

    playSounds() {
        setInterval(() => {
            if (this.walkingRadius()) {
                sounds.WALKING.play();
            } else {
                sounds.WALKING.pause();
            }
        })
    }

    walkingRadius() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT && 0 > this.x < this.world.levelEnd_x && !this.inAir();
    }

    moveCharacter() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.inAir()) {
                this.jump();
                sounds.JUMP.play();
                sounds.JUMP.volume = 0.4;
            }
            this.world.camera_x = -this.x + 100;
        })
    }

    initiatingAnimations() {
        setInterval(() => {
            if (this.isHurt()) {
                this.count = 0;
                this.world.sounds.SLEEPING.pause();
                this.playAnimation(this.hurtingImages);
            } else if (this.isDead()) {
                this.count = 0;
                this.playAnimation(this.dyingImages);
                this.y = 184;
                world.sounds.NORMAL_GAME.pause();
                setTimeout(() => {
                    gameLost();
                }, 300);
            } else if (this.inAir()) {
                this.count = 0;
                this.world.sounds.SLEEPING.pause();
                this.playAnimation(this.jumpingImages);
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.inAir()) {
                    this.count = 0;
                    this.world.sounds.SLEEPING.pause();
                    this.playAnimation(this.walkingImages);
                }
                else {
                    this.playAnimation(this.idleImages);
                    this.count++;
                    if (this.count > 30) {
                        this.sleepingAnimation();
                        this.world.sounds.SLEEPING.play();
                    }
                }
            }
        }, 300 / 3);
    }

    sleepingAnimation() {
        this.playAnimation(this.longIdleImages);
    }

}
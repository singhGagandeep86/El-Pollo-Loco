class Endboss extends MoveableObject {
    height = 460;
    width = 300;
    y = 0;
    x = 3930;
    speed = 10;
    world;

    offset = {
        top: 70,
        left: 50,
        right: 10,
        bottom: 70,
    };

    walkingImages = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'

    ];
    alertImages = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    attackImages = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    hurtImages = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    dyingImages = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    firstContact = false;
    state;
    currentInterval = null;

    /** Constructs an Endboss object, initializing its images and starting its animation.
      @param {Object} world - The game world instance where this endboss exists. */
    constructor(world) {
        super().loadImage(this.alertImages[0]);
        this.loadImages(this.alertImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.dyingImages);
        this.world = world;
        this.animate();
    }

    /** Animates the endboss by continuously checking its state and its distance to Pepe,
     * and then acting accordingly.
     * If the endboss is hurt or dead, it plays the hurt or dead animation.
     * If the endboss is neither hurt nor dead, it handles its behavior in handleBossBehavior function. */
    animate() {
        setInterval(() => {
            let distanceToPepe = this.x - this.world.character.x;
            if (this.energy <= 0) {
                this.hurtAnimation();
            } else {
                this.handleBossBehavior(distanceToPepe);
            }
        }, 100);
    }

    /** Reduces the energy of the endboss and updates its health status bar.
     * If the endboss's energy drops to zero or below, it triggers the death sequence.
     * Otherwise, it plays the hurt animation and updates the boss's behavior accordingly. */
    hurtAnimation() {
        if (this.energy <= 0) return;
        this.energy -= 10;
        this.world.endbossstatusbar.setHealthPercentage();
        if (this.energy <= 0) {
            this.bossDead();
        } else {
            this.bossHurting();
        }
    }

    /** Handles the behavior of the endboss depending on the distance to Pepe.
     * @param {number} distanceToPepe - the distance between the endboss and Pepe*/
    handleBossBehavior(distanceToPepe) {
        if (distanceToPepe >= 550 && this.state !== "alert") {
            this.changeState("alert", this.alertImages, this.normalMusic());
        } else if (distanceToPepe < 550 && distanceToPepe >= 60 && this.state !== "walking") {
            this.changeState("walking", this.walkingImages, () => this.moveLeft(), this.bossMusic());
        } else if (distanceToPepe < 60 && this.state !== "attacking") {
            this.changeState("attacking", this.attackImages, this.bossAttack());
        }
    }

    /** Triggers the death sequence of the endboss.
     * Changes the state of the endboss to "dead" and plays the dying animation.
     * Also pauses the boss music and waits 2 seconds before triggering the gameWon() function.*/
    bossDead() {
        this.changeState("dead");
        setInterval(() => {
            this.playAnimation(this.dyingImages);
        }, 100);

        this.world.sounds.BOSS.pause();
        setTimeout(() => {
            gameWon();
        }, 2000);
    }

    /** Handles the behavior of the endboss when it is hurt.
     * Changes the state of the endboss to "hurt" and plays the hurt animation.
     * If the endboss's energy is less than 70, it increases the speed of the endboss and the playback rate of the boss music.
     * Also plays the hurt sound effect and increases its volume to 1. */
    bossHurting() {
        this.changeState("hurt");
        this.playAnimation(this.hurtImages);
        if (this.energy < 70) {
            this.speed = 40;
            this.world.sounds.BOSS.playbackRate = 1.3;
        }
        this.world.sounds.BOSS_HURT.play();
        this.world.sounds.BOSS_HURT.volume = 1;
    }

    /** Pauses the normal game music and plays the boss music instead.
     * Also sets the volume of the boss music to 0.4. */
    bossMusic() {
        this.world.sounds.NORMAL_GAME.pause();
        this.world.sounds.BOSS.play();
        this.world.sounds.BOSS.volume = 0.4;
    }

    /** Pauses the boss music and plays the normal game music instead.
     * Sets the volume of the normal game music to 0.4.*/
    normalMusic() {
        this.world.sounds.NORMAL_GAME.play();
        this.world.sounds.BOSS.pause();
    }

    /** Plays the boss attack sound effect.
     * Sets the volume of the boss attack sound effect to 1.*/
    bossAttack() {
        this.world.sounds.BOSS_ATTACK.play();
        this.world.sounds.BOSS_ATTACK.volume = 1;
    }

    /** Changes the state of the endboss, stops any ongoing animation intervals,
     * and starts a new interval to play animations for the specified state.
     * @param {string} newState - The new state for the endboss.
     * @param {string[]} images - Array of images to be used for the animation.
     * @param {function|null} action - Optional action to be executed with each animation frame.*/
    changeState(newState, images, action = null) {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
        }
        this.state = newState;
        this.currentInterval = setInterval(() => {
            this.playAnimation(images);
            if (action) action();
        }, 200);
    }
}


class World {
    character = new Character();
    statusBar = new Statusbar();
    coinsstatusBar = new CoinsStatusBar(this);
    bottlesstatusBar = new BottlesStatusBar(this);
    endbossstatusbar = new EndbossStatusBar(this);
    endboss = new Endboss(this);
    level = createLevel1();
    sounds;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    bottlesCollection = [];
    coinsCollections = [];

    /** Creates an instance of the World class.
        Initializes the game world by setting up the canvas context, keyboard, and sounds.
        Also initializes sounds settings, begins drawing the game, sets the world context, and starts game logic.
        @param {HTMLCanvasElement} canvas - The canvas element to be used for rendering the game.
        @param {Keyboard} keyboard - The keyboard input handler for the game.
        @param {Sounds} sounds - The sounds manager for handling game audio.*/
    constructor(canvas, keyboard, sounds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sounds = sounds;
        this.setUpSounds();
        this.draw();
        this.setWorld();
        this.run();
    }

    /** Sets up the playback rate for some of the game sounds.
        @todo: Maybe this should be done in the Sounds class? */
    setUpSounds() {
        this.sounds.COIN.playbackRate = 2;
        this.sounds.GET_BOTTLE.playbackRate = 2;
        this.sounds.CHICKEN_DIE.playbackRate = 1;
    }

    /** Clears the canvas, and redraws all game elements. */
    draw() {
        this.clearCanvas();
        this.translateCamera(true);
        this.drawBackground();
        this.drawGameObjects();
        this.translateCamera(false);
        this.drawUI();
        this.translateCamera(true);
        this.drawCharacterAndThrowables();
        this.translateCamera(false);
        requestAnimationFrame(() => this.draw());
    }

    /** Clears the entire canvas.
     This method is used at the beginning of every draw cycle to erase the previous frame. */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /** Translates the canvas context by the camera's x position.
        @param {boolean} forward - Whether to translate forward (true) or backward (false).
        @description This method is used to offset all drawing operations by the camera's position.
        This is necessary to create a scrolling effect for the game world. */
    translateCamera(forward) {
        if (forward) {
            this.ctx.translate(this.camera_x, 0);
        } else {
            this.ctx.translate(-this.camera_x, 0);
        }
    }

    /** Draws all background objects in the level, including clouds.
      is used to draw all static background elements in the game world. */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /** Draws all game objects in the level, including coins, endboss, and enemies.
     *  This method is used to draw all interactive elements in the game world. */
    drawGameObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
    }

    /** Draws all UI elements in the game, including health, coins, bottles, and endboss health bars.
     *  This method is used to draw all interactive UI elements in the game. */
    drawUI() {
        this.addToMap(this.statusBar);
        this.statusBar.drawHealth(this.ctx);
        this.addToMap(this.coinsstatusBar);
        this.coinsstatusBar.drawCollectedCoins(this.ctx);
        this.addToMap(this.bottlesstatusBar);
        this.bottlesstatusBar.drawCollectedBottles(this.ctx);
        this.addToMap(this.endbossstatusbar);
        this.endbossstatusbar.drawCollectedBottles(this.ctx);
    }

    /** Draws the character and all throwables (bottles) in the game world.
     *  This method is used to draw all interactive game objects in the game world. */
    drawCharacterAndThrowables() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }


    /** Adds all objects in the given array to the map.
     *  @param {Array<DrawableObject>} objects - The array of objects to add to the map.   */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /** Adds the given moveable object to the map.\
     *  If the object is facing the other direction, it will flip the image horizontally.
     *  @param {MoveableObject} mo - The moveable object to add to the map. */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /** Flips the given MoveableObject horizontally.
       This method is used to flip the image of a MoveableObject when it is facing the other direction.
       It works by translating the canvas context by the object's width, scaling it by -1 horizontally,
        and then flipping the object's x position.
       After drawing the object, the context is restored to its original state.
       @param {MoveableObject} mo - The moveable object to flip. */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /** Reverses the effects of calling flipImage on the given MoveableObject, restoring the canvas context to its original state.
     *  @param {MoveableObject} mo - The moveable object to flip back. */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /** Sets the world of the Character object to the current World object.
      This allows the Character to access the World object and call its methods. */
    setWorld() {
        this.character.world = this;
    }

    /** Starts the game logic by setting up two intervals.
     The first interval calls checkCollisions every 100 milliseconds to check for collisions between the character and
     enemies. The second interval calls checkThrowObjects every 100 milliseconds to check if the character is colliding
     with any throwables.*/
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 100);
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    /** Checks for collisions between the character and various game objects. */
    checkCollisions() {
        this.checkCharacterCollisions();

        this.checkCollisionwithCoins();

        this.checkCollisionwithBottles();

        this.checkBottleCollisionwithEnemies();
    }

    /** Checks for collisions between the character and the endboss.
        If a collision with the endboss is detected, the character takes damage and the status bar is updated.
        If no collision with the endboss occurs, it checks for a collision with other enemies.  */
    checkCharacterCollisions() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        } else {
            this.characterCollisionWithEnemy();
        }
    }

    /** Iterates over all enemies in the level and checks if the character has collided with any of them from above.
     * If a collision is detected, the character takes damage and the status bar is updated. */
    characterCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.handleCollisionFromAbove(enemy);
        });
    }

    /** Checks for a collision from above between the character and the given enemy.
     If a collision is detected and the character is in the air, safeJump is called. 
     If the character is not in the air, the character will take damage and the status bar will be updated.
    @param {Enemy} enemy - The enemy to check for a collision with. */
    handleCollisionFromAbove(enemy) {
        const characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
        const enemyTop = enemy.y + enemy.offset.top;

        if (this.character.isColliding(enemy)) {
            if (this.character.inAir() && characterBottom < enemyTop + 20) {
                this.safeJump(enemy);
            } else {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
    }

    /** Handles a safe jump onto an enemy.
     * This method is called if the character jumps onto an enemy from above.
     * The character jumps, the sound effect for killing an enemy is played, the enemy is marked as dying,
     * and the enemy is removed from the level after a brief delay.
     * @param {Enemy} enemy - The enemy to kill. */
    safeJump(enemy) {
        this.character.jump();
        this.sounds.CHICKEN_DIE.play();
        enemy.dyingAnimation();
        setTimeout(() => {
            const index = this.level.enemies.indexOf(enemy);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 200);
    }

    /** Checks for collisions between the character and coins.
     * If a collision is detected, the coin is removed from the level and the character's coin collection is updated.
     * The sound effect for picking up a coin is played and the coin status bar is updated. */
    checkCollisionwithCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.sounds.COIN.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinsCollections.push(coin);
                this.coinsstatusBar.setPercentageFromCoins();
            };
        });
    }

    /** Checks for collisions between the character and bottles.
     If a collision is detected, the bottle is removed from the level, the character's bottle collection is updated,
     and the bottle status bar is updated. The sound effect for picking up a bottle is played. */
    checkCollisionwithBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.sounds.GET_BOTTLE.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlesCollection.push(bottle);
                this.bottlesstatusBar.setPercentageFromBottles();
            };
        });
    }

    /** Checks for collisions between bottles and enemies.
     * If a collision is detected, the enemyCollision method is called, which removes the enemy from the level,
     * plays a sound effect, and triggers the dying animation of the enemy. */
    checkBottleCollisionwithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    this.enemyCollision(enemy);
                }
            });
        });
    }

    /** Removes the given enemy from the level after a brief delay.
     Triggers the dying animation of the enemy and plays the sound effect for killing an enemy.
     @param {Enemy} enemy - The enemy to remove from the level. */
    enemyCollision(enemy) {
        this.sounds.CHICKEN_DIE.play();
        enemy.dyingAnimation();
        setTimeout(() => {
            let currentEnemy = this.level.enemies.indexOf(enemy);
            if (currentEnemy != -1) {
                this.level.enemies.splice(currentEnemy, 1);
            }
        }, 400);
    }

    /** Checks if the character can throw a bottle and if so, throws a bottle in the correct direction.
    The new ThrowableObject is then added to the world's list of throwables. The direction of the
     ThrowableObject is determined by the character's direction. If the character is facing right, the
     ThrowableObject is thrown to the right. If the character is facing left, the ThrowableObject is thrown to the left. */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrow() && this.bottlesCollection.length > 0) {
            this.handlebottleThrow();
            if (!this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
            } else if (this.character.otherDirection) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
                this.throwableObjects.push(bottle);
            }
        }
    }

    /** Checks if the character can throw a bottle. The method checks if the character's last throw time
     is undefined or if the time since the last throw is greater than the cooldown time. It return according to condition.
    @returns {boolean} - True if the character can throw a bottle, false otherwise. */
    canThrow() {
        let cooldown = 1000;
        return !this.character.lastThrow || (Date.now() - this.character.lastThrow) > cooldown;
    }

    /** Handles the throwing of a bottle by the character.
     It plays the sound effect for throwing a bottle, pauses the sleeping sound effect, 
     resets the character's throw cooldown, sets the character's last throw time to the current time, 
     and removes a bottle from the character's bottle collection. The method also resets the character's throw key to false. */
    handlebottleThrow() {
        this.sounds.THROW_BOTTLE.play();
        this.sounds.SLEEPING.pause();
        this.character.count = 0;
        this.keyboard.D = false;
        this.character.lastThrow = Date.now();
        this.bottlesCollection.splice(0, 1);
    }

}
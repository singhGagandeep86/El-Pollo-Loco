

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

    setUpSounds() {
        this.sounds.COIN.playbackRate = 2;
        this.sounds.GET_BOTTLE.playbackRate = 2;
        this.sounds.CHICKEN_DIE.playbackRate = 1;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.statusBar.drawHealth(this.ctx);
        this.addToMap(this.coinsstatusBar);
        this.coinsstatusBar.drawCollectedCoins(this.ctx);
        this.addToMap(this.bottlesstatusBar);
        this.bottlesstatusBar.drawCollectedBottles(this.ctx);
        this.addToMap(this.endbossstatusbar);
        this.endbossstatusbar.drawCollectedBottles(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 100);
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    checkCollisions() {
        this.checkCharacterCollisions();

        this.checkCollisionwithCoins();

        this.checkCollisionwithBottles();

        this.checkBottleCollisionwithEnemies();
    }

    checkCharacterCollisions() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        } else {
            this.characterCollisionWithEnemy();
        }
    }

    characterCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.handleCollisionFromAbove(enemy);
        });
    }

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

    checkBottleCollisionwithEnemies() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    this.enemyCollision(enemy);
                }
            });
        });
    }

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

    canThrow() {
        let cooldown = 1000;
        return !this.character.lastThrow || (Date.now() - this.character.lastThrow) > cooldown;
    }

    handlebottleThrow() {
        this.sounds.THROW_BOTTLE.play();
        this.sounds.SLEEPING.pause();
        this.character.count = 0;
        this.keyboard.D = false;
        this.character.lastThrow = Date.now();
        this.bottlesCollection.splice(0, 1);
    }

}
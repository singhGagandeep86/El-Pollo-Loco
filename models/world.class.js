

class World {
    character = new Character();
    statusBar = new Statusbar();
    coinsstatusBar = new CoinsStatusBar(this);
    bottlesstatusBar = new BottlesStatusBar(this);
    endbossstatusbar = new EndbossStatusBar(this);
    endboss = new Endboss(this);
    level = level1;
    sounds;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    bottlesCollection = [
        new Bottles(),
        new Bottles()
    ];
    coinsCollections = [];


    constructor(canvas, keyboard, sounds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sounds = sounds;
        this.draw();
        this.setWorld();
        this.run();
        this.sounds.COIN.playbackRate = 2;
        this.sounds.GET_BOTTLE.playbackRate = 2;
        this.sounds.CHICKEN_DIE.playbackRate = 1;
    }

    clearGame() {
        intervalIDs.forEach(clearInterval);

        console.log("Game cleared:", intervalIDs);
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

        // if (this.endboss.state !== "dead") {
        //     this.endboss.animate(this);
        // }
    }



    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.inAir()) {
                    this.character.jump();
                    enemy.dyingAnimation();
                    setTimeout(() => {
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    }, 200);
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }

            }
        })

        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }

        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.sounds.COIN.play();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinsCollections.push(coin);
                this.coinsstatusBar.setPercentageFromCoins();
            }
        })

        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.sounds.GET_BOTTLE.play();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottlesCollection.push(bottle);
                this.bottlesstatusBar.setPercentageFromBottles();
            }
        })

        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    this.sounds.CHICKEN_DIE.play();
                    this.enemyCollision(enemy);
                }
            })
            if (this.endboss.isColliding(bottle)) {
                let collidingBottle = this.throwableObjects.indexOf(bottle);
                this.throwableObjects.splice(collidingBottle, 1);
                this.endboss.hurtAnimation(this);
            }
        })
    }

    enemyCollision(enemy) {
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
            this.sounds.THROW_BOTTLE.play();
            this.sounds.SLEEPING.pause();
            this.character.count = 0;
            this.keyboard.D = false;
            this.character.lastThrow = Date.now();
            this.bottlesCollection.splice(0, 1);
            if (this.character.otherDirection === false) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                this.throwableObjects.push(bottle);
            } else if (this.character.otherDirection === true) {
                let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
                this.throwableObjects.push(bottle);
            }
        }
    }

    canThrow() {
        let cooldown = 1000;
        return !this.character.lastThrow || (Date.now() - this.character.lastThrow) > cooldown;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
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
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
        // mo.drawFrames(this.ctx);

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
}
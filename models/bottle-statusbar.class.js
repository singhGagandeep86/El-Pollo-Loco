



class BottlesStatusBar extends DrawableObject {

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    percentage = 0;
    world;

    constructor(world) {
        super().loadImage(this.IMAGES_BOTTLES[0]);
        this.loadImages(this.IMAGES_BOTTLES);
        this.width = 200;
        this.height = 58;
        this.x = 40;
        this.y = 120;
        this.world = world;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPercentageFromBottles() {
        let bottlesCollected = this.world.bottlesCollection.length * 10;
        this.percentage = bottlesCollected;
        this.setPercentage(bottlesCollected);
    }

    resolveImageIndex() {
        if (this.percentage >= 50) return 5;
        if (this.percentage == 40) return 4;
        if (this.percentage == 30) return 3;
        if (this.percentage == 20) return 2;
        if (this.percentage == 10) return 1;
        return 0;
    }

    drawCollectedBottles(ctx) {
        let bottlesCollected = this.world.bottlesCollection.length;
        ctx.font = '22px ZABARS';
        ctx.fillStyle = 'white';
        ctx.fillText(`${bottlesCollected}`, this.x + this.width + 6, this.y + 45);
    }

}
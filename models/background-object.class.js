

class BackgroundObject extends MoveableObject {
    y = 0;
    height = 480;
    width = 720;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }

}
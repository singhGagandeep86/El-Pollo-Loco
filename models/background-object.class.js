

class BackgroundObject extends MoveableObject {
    y = 0;
    height = 480;
    width = 720;
   
    /** Constructs a BackgroundObject with a specified image and x-coordinate.
     * @param {string} imagePath - The path to the image for the background.
     * @param {number} x - The x-coordinate position of the background object. */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }

}
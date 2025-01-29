
class DrawableObject {
    x = 50;
    y = 150;
    height = 150;
    width = 300;
    img;
    imageCache = {};
    currentImage = 0;


    /** Draws the object on the given canvas context
     * @param {CanvasRenderingContext2D} ctx - the context to draw on */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /** Loads an image from a given path
     * @param {string} path - the path to the image  */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /** Loads all images from the given array and stores them in the imageCache
     * @param {string[]} arr - an array of paths to the images  */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}

class DrawableObject {
    x = 50;
    y = 150;
    height = 150;
    width = 300;
    img;
    imageCache = {};
    currentImage = 0;


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken|| this instanceof ChickenSmall|| this instanceof Coins|| this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top );
            ctx.stroke(); 
       
        } 

        if (this instanceof Character || this instanceof Chicken|| this instanceof ChickenSmall|| this instanceof Coins|| this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke(); 
        } 
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}
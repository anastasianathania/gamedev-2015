/*jslint nomen: true, sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
function Sprite(imgURL, options) {
    if (!options) {
        options = {};
    }


    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.rows = options.rows || 0;
    this.cols = options.cols || 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this.imageLoaded = false;
    this._image = null;
    this.setImage(imgURL);

    this.cellWidth = options.cellWidth || this.width;
    this.cellHeight = options.cellHeight || this.height;
    this.cellOffsetX = options.cellOffsetX || 0;
    this.cellOffsetY = options.cellOffsetY || 0;

    this._spriteSheetOffsetX = 0;
    this._spriteSheetOffsetY = 0;

    this.isPlaying = false;
    this.counter = 0;   // + on every tick a seq is played
    this.sampleRate = 5;    // amount of ticks to play each cell
    this.sampleChange = this.sampleRate;
    //next change point on timeline that causes a sample transition

    this.sampleEnd = this.sampleRate * this.cols; // end of timeline

}

Sprite.prototype.setImage = function (imgURL) {
    this._image = new Image();
    this._image.onload = (function () {
        // "this" is now sprite (was "_image")
        this.imageLoaded = true;
        this.width = this._image.width;
        this.height = this._image.height;
    }).bind(this); // pass "sprite"
    this._image.src = imgURL;
};

Sprite.prototype.draw = function (ctx) {
    this.x += this.vx;
    this.y += this.vy;

    if (!!this.imageLoaded) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);

        if (this.isPlaying) {
            this.tick();
        }
/**
* Segment Draw Image
*
* ctx.drawImage(image,
*        srcX, srcY, srcWidth, srcHeight,
*        destX, destY, destWidth, destHeight);
*/
        ctx.drawImage(this._image,
            this._spriteSheetOffsetX,
            this._spriteSheetOffsetY,
            this.cellWidth,
            this.cellHeight,

            this.cellOffsetX,
            this.cellOffsetY,
            this.cellWidth,
            this.cellHeight);

        ctx.restore();
    }
};
Sprite.prototype.play = function (row) {
    this.resetCounter();
    this.isPlaying = true;
    this._spriteSheetOffsetY = row * this.cellHeight;
};
Sprite.prototype.stop = function (row) {
    this.isPlaying = false;
    this.resetCounter();
};

Sprite.prototype.tick = function () {
    if (this.counter === this.sampleEnd) {
        this.resetCounter();
    } else if (this.counter === this.sampleChange) {
        this._spriteSheetOffsetX += this.cellWidth;
        //this._spriteSheetOffsetY += this.cellHeight;
        this.sampleChange += this.sampleRate;
    }
    this.counter += 1;
};

Sprite.prototype.resetCounter = function () {
    this.counter = 0;
    this._spriteSheetOffsetX = 0;
    this.sampleChange = this.sampleRate;
};

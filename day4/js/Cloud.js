/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
function Cloud(stage) {
    this.stage = stage;

    this.x = 0;
    this.y = Math.random() * this.stage.height;

    this.vx = 50;
    this.vy = 0;

    this.width = 170;
    this.height = 100;

    this.image = new Image();
    this.image.onload = this.imageLoaded.bind(this);
    this.image.src = './img/large-cloud.png';
    this.loaded = false;
}

Cloud.prototype.update = function (delta) {
    this.x = this.x + (this.vx * delta / 1000);
    this.y = this.y + (this.vy * delta / 1000);
    if (this.x > this.stage.width) {
        this.recycle();
    }
};

Cloud.prototype.recycle = function () {
    this.x = -this.width;
    this.y = Math.random() * (this.stage.height - this.height);
};

Cloud.prototype.draw = function (ctx) {
    if (this.loaded) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
};

Cloud.prototype.imageLoaded = function () {
    this.loaded = true;
};
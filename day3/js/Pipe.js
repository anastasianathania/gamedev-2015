/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
function Pipe(game, stage) {
    this.game = game;
    this.stage = stage;

    this.width = 80;
    this.height = 50 + (Math.random() * 200);

    this.x = this.game.width;
    this.y = this.game.height - this.height;

    this.velocityX = -200;

    this.color = "#0f0";
    this.active = false;

    this.gapHeight = 160;
}
Pipe.prototype.update = function (delta) {
    if (this.active === true) {
        this.x = this.x + (this.velocityX * (delta / 1000));
        if (this.x < -this.width) {
            this.recycle();
        }
    }
};

Pipe.prototype.recycle = function () {
    this.x = this.game.width;
    this.height = 50 + (Math.random() * 200);
    this.y = this.game.height - this.height;
};

Pipe.prototype.animate = function () {
    this.active = true;
};


Pipe.prototype.draw = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(this.x, 0, this.width, this.y - this.gapHeight);
    ctx.restore();
};
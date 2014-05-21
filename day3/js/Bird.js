/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
function Bird(game, stage) {
    this.game = game;
    this.stage = stage;

    this.height = 50;
    this.width = 50;

    this.x = 80;
    this.y = 50;

    this.velocityY = 0;
    this.terminalVelocity = 400;
    this.gravity = 1000;

    this.color = "#f00";

    this.stage.addEventListener('click', this.flap.bind(this));

}

Bird.prototype.flap = function () {
    this.velocityY = this.velocityY - 900;
};

Bird.prototype.update = function (delta) {
    this.velocityY = this.velocityY + (this.gravity * (delta / 1000));
    if (this.velocityY > this.terminalVelocity) {
        this.velocityY = this.terminalVelocity;
    } else if (this.velocityY < -this.terminalVelocity) {
        this.velocityY = -this.terminalVelocity;
    };
    this.y = this.y + (this.velocityY * (delta / 1000));

    if (this.y > this.game.height) {
        this.velocityY = 0;
        this.y = this.game.height;
    }
    if (this.y < -this.height) {
        this.y = -this.height;
        this.velocityY = 0;
    }
};

Bird.prototype.draw = function (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
};

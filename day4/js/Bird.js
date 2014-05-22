/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
function Bird(game, stage) {
    this.game = game;
    this.stage = stage;

    this.height = 50;
    this.width = 50;

    this.x = 80;
    this.y = 50;

    this.velocityY = 0;
    this.terminalVelocity = 350;
    this.gravity = 1000;

    this.color = "#f00";

    this.sprite = new Sprite('./img/birdie.png', {
        x: this.x,
        y: this.y,
        height: this.height,
        cellHeight: 168,
        width: this.width,
        cellWidth: 183,
        rows: 1,
        cols: 14,
        cellOffsetX: -60,
        cellOffsetY: -60,
    });
    this.sprite.scaleX = 0.5;
    this.sprite.scaleY = 0.5;

    this.stage.addEventListener('click', this.flap.bind(this));
    this.sprite.play(0);
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
    }
    this.y = this.y + (this.velocityY * (delta / 1000));

    if (this.y > this.game.height) {
        this.velocityY = 0;
        this.y = this.game.height;
    }
    if (this.y < -this.height) {
        this.y = -this.height;
        this.velocityY = 0;
    }

    this.sprite.x = this.x - this.width / 2;
    this.sprite.y = this.y - this.height / 2;

    //update rotation
    this.sprite.rotation = this.velocityY / this.terminalVelocity;
};

Bird.prototype.draw = function (ctx) {
    this.sprite.draw(ctx);
    
};

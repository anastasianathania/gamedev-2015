/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
function Score(game) {
    this.game = game;
    this.score = 0;
    this.hiScore = 0;

    this.lastState = 0;
}
Score.prototype.update = function (collide) {
    var curState = collide;
    if (curState === 0 && this.lastState === 1) {
        this.score = this.score + 1;
        this.hiScore = Math.max(this.score, this.hiScore);
    } else if (curState === -1 || (this.lastState === -1 && curState === 0)) {
        this.reset();
    }
    this.lastState = curState;
};
Score.prototype.reset = function () {
    this.score = 0;
};
Score.prototype.draw = function (ctx) {
    ctx.save();
    ctx.font = '700 36pt Ubuntu, sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(this.score.toString(), this.game.width - 10, 10);
    ctx.restore();
};
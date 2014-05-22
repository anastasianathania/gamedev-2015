/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
function Collider(game, bird, pipes) {
    this.game = game;
    this.bird = bird;
    this.pipes = pipes;

    this.leftX = this.bird.x - this.bird.width / 2;
    this.rightX = this.bird.x + this.bird.width / 2;
}
Collider.prototype.checkCollision = function () {
    var i, pipe, pipeRightX;
    for (i = 0; i < this.pipes.length; i++) {
        pipe = this.pipes[i];
        pipeRightX = pipe.x + pipe.width;
        if (pipe.x < this.rightX && pipeRightX > this.leftX) {
            if ((this.bird.y - this.bird.height / 2) < (pipe.y - pipe.gapHeight)
                    || (this.bird.y + this.bird.height / 2) > pipe.y) {
                pipe.color = "#f00";
                this.game.die();
            }
        } else {
            pipe.color = "#0f0";
        }
    }
};
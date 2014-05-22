/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
function Collider(bird, pipes) {
    this.bird = bird;
    this.pipes = pipes;

    this.leftX = this.bird.x - this.bird.width / 2;
    this.rightX = this.bird.x + this.bird.width / 2;
}
Collider.prototype.checkCollision = function () {
    /*
    return
        -1 if collide;
        1 if pass a pipe;
        0 otherwise;
    */
    var i, pipe, pipeRightX, ret = 0;
    for (i = 0; i < this.pipes.length; i++) {
        pipe = this.pipes[i];
        pipeRightX = pipe.x + pipe.width;
        if (pipe.x < this.rightX && pipeRightX > this.leftX) {
            if ((this.bird.y - this.bird.height / 2) < (pipe.y - pipe.gapHeight)
                    || (this.bird.y + this.bird.height / 2) > pipe.y) {
                pipe.color = "#f00";
                ret = -1;
            } else {
                ret = 1;
            }
        } else {
            pipe.color = "#0f0";
        }
    }
    return ret;
};
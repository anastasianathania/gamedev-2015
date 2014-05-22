/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
/*global Bird, Pipe, Score, Collider */
function Game(stage) {
    this.stage = stage;
    this.ctx = stage.getContext("2d");
    this.bird = new Bird(this, this.stage);
    this.score = new Score(this);

    this.width  = this.stage.width;
    this.height  = this.stage.height;

    this.pipes = [];
    var i;
    for (i = 0; i < 2; i++) {
        this.pipes[i] = new Pipe(this, this.stage);
        /*setTimeout(function (p) {
            p.animate();
        }.bind(this, this.pipes[i]), i * 1000);*/
        this.pipes[i].x = this.width + i * (this.width + this.pipes[i].width) / 2;
        this.pipes[i].animate();
    }

    this.collider = new Collider(this.bird, this.pipes);

    this.lastTick = Date.now();
    this.tick();
}
Game.prototype.tick = function () {
    //console.log("tick");
    var now = Date.now();
    var delta = Date.now() - this.lastTick;
    this.lastTick = now;
    var i;

    // update game objects
    this.bird.update(delta);
    for (i = 0; i < this.pipes.length; i++) {
        this.pipes[i].update(delta);
    }
    var collide = this.collider.checkCollision();
    this.score.update(collide);

    // draw game objects
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.bird.draw(this.ctx);
    for (i = 0; i < this.pipes.length; i++) {
        this.pipes[i].draw(this.ctx);
    }
    this.score.draw(this.ctx);

    window.requestAnimationFrame(this.tick.bind(this));

};

window.addEventListener("DOMContentLoaded", function () {
    var game = new Game(document.getElementById("stage"));
});
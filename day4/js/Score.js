/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true*/
function Score(stage, el) {
    this.stage = stage;
    this.el = el;

    this.timeElapsed = 0; // ms since game start (or last death)
}
Score.prototype.update = function (delta) {
    this.timeElapsed = this.timeElapsed + delta;
    this.el.textContent = Math.floor(this.timeElapsed / 1000);
};
Score.prototype.reset = function () {
    this.timeElapsed = 0;
};
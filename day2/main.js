/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
function main() {
    var canvas = document.getElementById("layer2");
    var ctx = canvas.getContext("2d");
    var SCREEN_WIDTH = canvas.width;
    var SCREEN_HEIGHT = canvas.height;

    var sprite = new Sprite('./assets/character/girl1.png', {
        cols: 4,
        rows: 4,
        width: 32,
        height: 32,
        cellHeight: 48,
        cellWidth: 32,
        cellOffsetX: 0,
        cellOffsetY: -16,
    });
    sprite.x = SCREEN_WIDTH / 2;
    sprite.y = SCREEN_HEIGHT / 2;

    function drawFrame() {
        ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        
        //sprite.x += sprite.vx;
        //sprite.y += sprite.vy;
        sprite.draw(ctx);
        window.requestAnimationFrame(drawFrame);
    }
    drawFrame();

    var dir = 0;
    window.addEventListener("keydown", function (event) {
        //console.log(event);
        switch (event.keyCode) {
            case 37: // left key
                sprite.vx = -2;
                if (dir !== 1) {
                    dir = 1;
                    sprite.play(1); 
                }
            break;
            case 39: // right key
                sprite.vx = 2;
                if (dir !== 2) {
                    dir = 2;
                    sprite.play(2); 
                }
            break;
            case 38: // up key
                sprite.vy = -2;
                if (dir !== 3) {
                    dir = 3;
                    sprite.play(3); 
                }
            break;
            case 40: // down kevy
                sprite.vy = 2;
                if (dir !== 0) {
                    dir = 0;
                    sprite.play(0); 
                }
            break;
        }
    });
    window.addEventListener("keyup", function (event) {
        sprite.stop();
        sprite.vx = 0;
        sprite.vy = 0;
    });
}
/*jslint sloppy: true, plusplus:true, browser: true, unparam:true, vars:true, continue:true */
(function () {
    var ROWS = 6, COLS = 7, ROW_HEIGHT = 80, COL_WIDTH = 80;
    var styleMap = {
        0: "unset",
        1: "player1",
        2: "player2"
    };
    function Piece(row, col, parentEl, game) {
        this.row = row;
        this.col = col;
        this.game = game;
        this.player = 0;
        //console.log("Building piece: ", this.row, this.col);

        this.pieceEl = document.createElement("div");
        parentEl.appendChild(this.pieceEl);
        this.pieceEl.classList.add("piece");
        this.pieceEl.classList.add("unset");
        this.pieceEl.style.width = (COL_WIDTH - 4) + "px";
        this.pieceEl.style.height = (ROW_HEIGHT - 4) + "px";

        var boardHeight = ROW_HEIGHT * ROWS;
        this.pieceEl.style.left = this.col * COL_WIDTH + 2 + "px";
        this.pieceEl.style.top = (boardHeight - (this.row + 1) * ROW_HEIGHT) + 2 + "px";
        //this.pieceEl.textContent = "(" + row + "," + col + ")";

        this.pieceEl.addEventListener("click", this.clickedPiece.bind(this));
    }
    Piece.prototype.clickedPiece = function (evt) {
        //console.log("clicked", this.row, this.col);
        this.game.clickedColumn(this.col);
    };
    Piece.prototype.setPlayer = function (player) {
        this.player = player;
        this.removeStyle();
        var style = styleMap[player];
        this.pieceEl.classList.add(style);
        console.log("setting piece", this.row, this.col, "to player", this.player);
    };
    Piece.prototype.removeStyle = function () {
        var key, style;
        for (key in styleMap) {
            if (styleMap.hasOwnProperty(key)) {
                style = styleMap[key];
                this.pieceEl.classList.remove(style);
            }
        }
    };

    function Game(el) {
        //console.log("Building game");
        this.activePlayer = 1;
        this.active = true;

        this.boardEl = document.createElement("div");
        this.boardEl.classList.add("board");
        el.appendChild(this.boardEl);

        this.boardEl.style.width = COLS * COL_WIDTH + "px";
        this.boardEl.style.height = ROWS * ROW_HEIGHT + "px";

        this.messageEl = document.createElement("div");
        this.messageEl.classList.add("message");
        el.appendChild(this.messageEl);

        this.setupBoard();
    }
    Game.prototype.setupBoard = function () {
        this.pieces = [];
        var row, col, piece;
        for (row = 0; row < ROWS; row++) {
            this.pieces[row] = [];
            for (col = 0; col < COLS; col++) {
                piece = new Piece(row, col, this.boardEl, this);
                this.pieces[row][col] = piece;
            }
        }
    };
    Game.prototype.clickedColumn = function (col) {
        if (this.active === false) {
            return;
        }

        console.log("clicked column", col);
        var row, piece;
        for (row = 0; row < ROWS; row++) {
            piece = this.pieces[row][col];
            //console.log(piece);
            if (piece.player === 0) {
                piece.setPlayer(this.activePlayer);
                this.checkWin(row, col, this.activePlayer);
                this.switchActivePlayer();
                return;
            }
        }
    };
    Game.prototype.checkWin = function (checkRow, checkCol, player) {
        var row, col, piece, vertStreak = 0, rowStreak = 0, nwseStreak = 0, neswStreak = 0, i;
        // check vertical win condition
        for (row = 0; row < ROWS; row++) {
            piece = this.pieces[row][checkCol];
            if (piece.player === player) {
                vertStreak++;
            } else {
                vertStreak = 0;
            }
            //console.log("Player ", player, "; vertStreak ", vertStreak);

            if (vertStreak === 4) {
                this.active = false;
                console.log("Player " + player + " Won!");
                this.messageEl.innerHTML = "Player " + player + "won!";
                return;
            }
        }

        // check horizontal win condition
        for (col = 0; col < COLS; col++) {
            piece = this.pieces[checkRow][col];
            if (piece.player === player) {
                rowStreak++;
            } else {
                rowStreak = 0;
            }
            if (rowStreak === 4) {
                this.active = false;
                console.log("Player " + player + " Won!");
                this.messageEl.innerHTML = "Player " + player + "won!";
                return;
            }
        }

        // check NE-SW diagonal
        for (i = 1; checkRow + i < ROWS && checkCol + i < COLS; i++) {
            piece = this.pieces[checkRow + i][checkCol + i];
            if (piece.player === player) {
                neswStreak++;
            } else {
                //neswStreak = 0;
                break;
            }
        }
        for (i = 0; checkRow - i >= 0 && checkCol - i >= 0; i++) {
            piece = this.pieces[checkRow - i][checkCol - i];
            if (piece.player === player) {
                neswStreak++;
            } else {
                //neswStreak = 0;
                break;
            }
        }
        if (neswStreak >= 4) {
            this.active = false;
            console.log("Player " + player + " Won!");
            this.messageEl.innerHTML = "Player " + player + "won!";
            return;
        }

        // check NW-SE diagonal
        for (i = 1; checkRow + i < ROWS && checkCol - i >= 0; i++) {
            piece = this.pieces[checkRow + i][checkCol - i];
            if (piece.player === player) {
                nwseStreak++;
            } else {
                //nwseStreak = 0;
                break;
            }
        }
        for (i = 0; checkRow - i >= 0 && checkCol + i < COLS; i++) {
            piece = this.pieces[checkRow - i][checkCol + i];
            if (piece.player === player) {
                nwseStreak++;
            } else {
                //nwseStreak = 0;
                break;
            }
        }
        if (nwseStreak >= 4) {
            this.active = false;
            console.log("Player " + player + " Won!");
            this.messageEl.innerHTML = "Player " + player + "won!";
            return;
        }

    };
    Game.prototype.switchActivePlayer = function () {
        if (this.activePlayer === 1) {
            this.activePlayer = 2;
        } else if (this.activePlayer === 2) {
            this.activePlayer = 1;
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        var containerEl = document.getElementById("game");
        new Game(containerEl);
    });
    
})();
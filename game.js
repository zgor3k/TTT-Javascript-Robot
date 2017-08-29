var Game = function (player, computer) {

    var self = {};

    var combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    var player;
    var computer;
    var currentPlayer;
    var winnerPlayer;
    var moveCounter = 0;

    var grid = new Grid();

    this.player = player;
    this.computer = computer;

    var losNumber = Math.floor((Math.random() * 2));
    var losNumber = Math.floor((Math.random() * 2));
    if (losNumber == 0) {
        currentPlayer = player;
    } else {
        currentPlayer = computer;
    }

    self.getPlayer1 = function () {
        return player;
    };

    self.getPlayer2 = function () {
        return computer;
    };

    self.checkWin = function () {
        winnerPlayer = null;
        for (i = 0; i < combinations.length; i++) {
            var pos1 = combinations[i][0];
            var pos2 = combinations[i][1];
            var pos3 = combinations[i][2];

            if ((grid.getSymbol(pos1) == grid.getSymbol(pos2)) && ((grid.getSymbol(pos3) == grid.getSymbol(pos2))) && (grid.getSymbol(pos3) == grid.getSymbol(pos1))) {
                if (grid.getSymbol(pos1) == player.getSymbol()) {
                    winnerPlayer = player;
                    player.setPoints(player.getPoints() + 1);
                    return true;
                } else if (grid.getSymbol(pos1) == computer.getSymbol()) {
                    winnerPlayer = computer;
                    computer.setPoints(computer.getPoints() + 1);
                    return true;
                }
            }
        }
        return false;
    };

    self.playerMove = function (position) {
        if (grid.isPositionAvaiable(position) && winnerPlayer == null) {
            grid.setPosition(position, currentPlayer.getSymbol());
            self.switchPlayer();
        }
        //grid.showGrid(); // show grid
    };

    self.getWinnerPlayer = function () {
        return winnerPlayer;
    };

    self.switchPlayer = function () {
        moveCounter++;
        if (currentPlayer.getSymbol() == player.getSymbol()) {
            currentPlayer = computer;
        } else {
            currentPlayer = player;
        }
    };

    self.getComputer = function () {
        return computer;
    };

    self.getCurrentPlayer = function () {
        return currentPlayer;
    };

    self.getMoveCounter = function () {
        return moveCounter;
    };

    self.resetMoveCounter = function () {
        moveCounter = 0;
    };

    self.getGrid = function () {
        return grid;
    };

    return self;

};

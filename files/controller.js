var setImage = function (position, symbol) {
    if (symbol == "CROSS") {
        $(fieldTabs[position]).find(".cross").css("display", "block");
    } else {
        $(fieldTabs[position]).find(".ring").css("display", "block");
    }
};

var disabledFields = function () {
    $(".gridding").unbind("click", playerMove);
    $(".gridding").css("cursor", "auto");
};

var enabledFields = function () {
    $(".gridding").on("click", playerMove);
    $(".gridding").css("cursor", "pointer");
};

var drawGrid = function () {
    var imageX = "CROSS";
    var imageO = "RING";
    for (var i = 0; i < fieldTabs.length; i++) {
        if (game.getGrid().getSymbol(i) == "CROSS") {
            setImage(i, imageX);
        } else if (game.getGrid().getSymbol(i) == "RING") {
            setImage(i, imageO);
        }
    }
};

var setNewGame = function (player, player2) {
    fieldTabs = [field0, field1, field2, field3, field4, field5, field6, field7, field8];

    this.game = new Game(player, player2);
};

var setPoints = function () {
    $(".rankingPlayer1").text(game.getPlayer1().getPoints());
    $(".rankingPlayer2").text(game.getPlayer2().getPoints());
};

var setCurrentPlayerImg = function () {
    if (game.getCurrentPlayer().getSymbol() == "CROSS") {
        $(".currentPlayer").find(".ring").css("display", "none");
        $(".currentPlayer").find(".cross").css("display", "block");
    } else {
        $(".currentPlayer").find(".cross").css("display", "none");
        $(".currentPlayer").find(".ring").css("display", "block");
    }
};

var playerMove = function (field) {
    if (!(field >= 0 && field < 10)) {
        var field = $(this).attr("id").slice(5);
    }
    game.playerMove(field);
    drawGrid();

    if (game.checkWin() == true) {
        disabledFields();
        setPoints();
        setTimeout(function () {
            alert("The winner is: " + game.getWinnerPlayer().getName());
        }, 10);
        $("#next").show();
    } else if (game.getMoveCounter() == 9) {
        disabledFields();
        setTimeout(function () {
            alert("DRAW GAME");
        }, 10);
        $("#next").show();
    } else if (!game.checkWin() && game.getMoveCounter() < 9) {
        if (game.getCurrentPlayer().getName() == "COMPUTER") {
            computerMove(field);
        }
        setCurrentPlayerImg();
    }
};

var computerMove = function (field) {

    var playerMoves = [];
    for (var i = 0; i < fieldTabs.length; i++) {
        if (game.getGrid().getSymbol(i) == game.getPlayer1().getSymbol()) {
            playerMoves.push(i);
        }
    }

    var playerLastMove = 0;
    if (field >= 0) {
        playerLastMove = field;
    }

    var lines = [];
    lines.push([0, 1, 2]); // 1
    lines.push([3, 4, 5]); // 2
    lines.push([6, 7, 8]); // 3
    lines.push([0, 3, 6]); // 4
    lines.push([1, 4, 7]); // 5
    lines.push([2, 5, 8]); // 6
    lines.push([0, 4, 8]); // 7
    lines.push([2, 4, 6]); // 8

    var firstComputerMoves = [2, 0, 6, 2, 8];

    var secondComputerMoves = {
        0: [1, 3, 2, 6, 8],
        1: [0, 2, 3, 5, 7],
        2: [1, 5, 0, 8, 6],
        3: [0, 6, 1, 7, 5],
        4: [2, 6, 0, 8],
        5: [2, 8, 1, 7, 3],
        6: [3, 7, 0, 8, 2],
        7: [6, 8, 3, 5, 1],
        8: [5, 7, 6, 2, 0]
    }

    var nextField = 0;

    if (game.getCurrentPlayer().getName() == game.getComputer().getName()) {
        if (playerMoves.length == 0) {
            nextField = firstComputerMoves[Math.floor((Math.random() * firstComputerMoves.length))];
        } else if (playerMoves.length == 1) {
            nextField = 4;
            while (game.getGrid().isPositionAvaiable(nextField) == false) {
                nextField = secondComputerMoves[playerLastMove][Math.floor((Math.random() * secondComputerMoves[playerLastMove].length))];
            }
        } else if (playerMoves.length > 0) {
            var inLine = false;
            var whatLine = [];
            var counter = 0;

            // human lines
            for (var i = 0; i < lines.length; i++) {
                counter = 0;
                for (var e = 0; e < lines[i].length; e++) {
                    if (game.getGrid().getSymbol(lines[i][e]) == game.getPlayer1().getSymbol()) {
                        counter++;
                    } else if (game.getGrid().getSymbol(lines[i][e]) == game.getComputer().getSymbol()) {
                        counter -= 1;
                    }
                }
                if (counter > 1) {
                    inLine = true;
                    whatLine.push(i);
                }
            }

            // computer lines
            var inLineComp = false;
            var whatLineComp = [];
            counter = 0;

            for (var i = 0; i < lines.length; i++) {
                counter = 0;
                for (var e = 0; e < lines[i].length; e++) {
                    if (game.getGrid().getSymbol(lines[i][e]) == game.getComputer().getSymbol()) {
                        counter++;
                    } else if (game.getGrid().getSymbol(lines[i][e]) == game.getPlayer1().getSymbol()) {
                        counter -= 1;
                    }
                }
                if (counter > 1) {
                    inLineComp = true;
                    whatLineComp.push(i);
                }
            }

            if (inLineComp == true) {
                try {
                    for (var i = 0; i < whatLineComp.length; i++) {
                        nextField = lines[whatLineComp[i]][Math.floor((Math.random() * lines[whatLineComp[i]].length))];
                        while (game.getGrid().isPositionAvaiable(nextField) == false) {
                            nextField = lines[whatLineComp[i]][Math.floor((Math.random() * lines[whatLineComp[i]].length))];
                        }
                    }
                } catch (e) {
                    while (game.getGrid().isPositionAvaiable(nextField) == false) {
                        nextField = secondComputerMoves[playerLastMove][Math.floor((Math.random() * secondComputerMoves[playerLastMove].length))];
                    }
                }

            } else {
                if (inLine == true) {
                    try {
                        for (var i = 0; i < whatLine.length; i++) {
                            nextField = lines[whatLine[i]][Math.floor((Math.random() * lines[whatLine[i]].length))];
                            while (game.getGrid().isPositionAvaiable(nextField) == false) {
                                nextField = lines[whatLine[i]][Math.floor((Math.random() * lines[whatLine[i]].length))];
                            }
                        }
                    } catch (e) {
                        while (game.getGrid().isPositionAvaiable(nextField) == false) {
                            nextField = secondComputerMoves[playerLastMove][Math.floor((Math.random() * secondComputerMoves[playerLastMove].length))];
                        }
                    }
                } else {
                    while (game.getGrid().isPositionAvaiable(nextField) == false) {
                        nextField = secondComputerMoves[playerLastMove][Math.floor((Math.random() * secondComputerMoves[playerLastMove].length))];
                    }
                }

            }

        }
        self.playerMove(nextField);
        drawGrid();
    }
};

var newGame = function () {
    var playerRandom = Math.floor((Math.random() * 2));
    var player, player2;
    if (playerRandom == 0) {
        player = new Player("YOU", Symbol.RING);
        player2 = new Player("COMPUTER", Symbol.CROSS);
    } else {
        player2 = new Player("COMPUTER", Symbol.RING);
        player = new Player("YOU", Symbol.CROSS);
    }
    setNewGame(player, player2);
    setCurrentPlayerImg();
    computerMove();
};

var resetGame = function () {
    game.getPlayer1().setPoints(0);
    game.getPlayer2().setPoints(0);
    setPoints();
    game.getGrid().resetGrid();
    game.resetMoveCounter();
    enabledFields();
    drawGrid();
    newGame();
    $("#next").hide();
};

var resetField = function () {
    game.getGrid().resetGrid();
    game.resetMoveCounter();
    enabledFields();
    setCurrentPlayerImg();
    drawGrid();
    computerMove();
    $("#next").hide();
};

$(document).ready(function () {
    var game = new Game();
    var field0 = $("#field0");
    var field1 = $("#field1");
    var field2 = $("#field2");
    var field3 = $("#field3");
    var field4 = $("#field4");
    var field5 = $("#field5");
    var field6 = $("#field6");
    var field7 = $("#field7");
    var field8 = $("#field8");

    $(".gridding").on("click", playerMove);
    $("button#next").on("click", resetField);
    $("button#reset").on("click", resetGame);

    newGame();
});

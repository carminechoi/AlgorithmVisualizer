function boardInit() {
	var board = new Array(COLS);
	for (var i = 0; i < ROWS; i++) {
		board[i] = [];
	}
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			board[i][j] = new Cell(i, j, "empty");
		}
	}
	board[SX][SY].state = "start";
	board[EX][EY].state = "end";

	return board;
}

function updateBoard(x, y, state) {
	if (state != "null") {
		currClick.prevCoord = [x, y];
		currClick.prevState = state;
		board[x][y].state = state;
		if (state == "start") {
			currSX = x;
			currSY = y;
		} else if (state == "end") {
			currEX = x;
			currEY = y;
		}
	}
}

function clearPath() {
	$("#board td").removeClass("searched");
	$("#board td").removeClass("path");
	drawBoard();
}

function clearBoard() {
	$("#board td").removeClass("wall");
	$("#board td").removeClass("searched");
	$("#board td").removeClass("path");
	$("#board td").removeClass("start");
	$("#board td").removeClass("end");
}

function resetBoard() {
	$("#board td").removeClass("wall");
	$("#board td").removeClass("start");
	$("#board td").removeClass("end");
	$("#board td").removeClass("searched");
	$("#board td").removeClass("path");
	board = boardInit();
	drawBoard();
}

function drawStart(coordString) {
	$(coordString).addClass("start");
}

function drawEnd(coordString) {
	$(coordString).addClass("end");
}

function drawSearched(coordString) {
	$(coordString).addClass("searched");
}

function drawWall(coordString) {
	$(coordString).addClass("wall");
}

function drawPath(coordString) {
	$(coordString).removeClass("searched");
	$(coordString).addClass("path");
}

function drawBoard() {
	clearBoard();
	for (var row = 0; row < ROWS; row++) {
		for (var col = 0; col < COLS; col++) {
			var coordString = convertCoordToString(row, col);
			if (board[row][col].state == "empty") {
				$(coordString).addClass("empty");
			} else if (board[row][col].state == "wall") {
				$(coordString).addClass("wall");
			} else if (board[row][col].state == "start") {
				$(coordString).addClass("start");
			} else if (board[row][col].state == "end") {
				$(coordString).addClass("end");
			}
		}
	}
}

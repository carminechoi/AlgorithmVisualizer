const ROWS = 25;
const COLS = 40;
const allCells = $("#board td");

const SX = 11;
const SY = 8;
const EX = 11;
const EY = 31;

var Board = {
	board: createBoard(),
	x: 0,
	y: 0,
	startX: SX,
	startY: SY,
	specialPrev: 0,
	endX: EX,
	endY: EY,
	isStart: false,
	isEnd: false,
	isSelected: false,
	isDragging: false,
};

/* Initialize Board */
function createBoard() {
	var board = new Array(COLS);
	for (var i = 0; i < ROWS; i++) {
		board[i] = [];
	}
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			board[i][j] = {
				value: 0,
				x: i,
				y: j,
				sourcex: null,
				sourcey: null,
			};
		}
	}
	board[SX][SY].value = 2;
	board[EX][EY].value = 3;

	return board;
}

function onLoad() {
	drawTable();
}

/************** ___START Table Input Functions___ **************/
function updateBoard() {
	if (
		Board.isSelected == false &&
		Board.isStart == false &&
		Board.isEnd == false &&
		Board.board[Board.x][Board.y].value == 0
	) {
		Board.board[Board.x][Board.y].value = 1;
	} else if (Board.isSelected && Board.board[Board.x][Board.y].value == 1) {
		Board.board[Board.x][Board.y].value = 0;
	} else if (Board.isStart) {
		Board.board[Board.startX][Board.startY].value = Board.specialPrev;
		Board.specialPrev = Board.board[Board.x][Board.y].value;
		Board.startX = Board.x;
		Board.startY = Board.y;
		Board.board[Board.x][Board.y].value = 2;
	} else if (Board.isEnd) {
		Board.board[Board.endX][Board.endY].value = Board.specialPrev;
		Board.specialPrev = Board.board[Board.x][Board.y].value;
		Board.endX = Board.x;
		Board.endY = Board.y;
		Board.board[Board.x][Board.y].value = 3;
	}
}

function drawTable() {
	$("#board td").removeClass("selected");
	$("#board td").removeClass("start");
	$("#board td").removeClass("end");
	var row, col;
	for (row = 0; row < ROWS; row++) {
		for (col = 0; col < COLS; col++) {
			var coordString = convertCoordToString(row, col);
			if (Board.board[row][col].value == 1) {
				$(coordString).addClass("selected");
			} else if (Board.board[row][col].value == 2) {
				$(coordString).addClass("start");
			} else if (Board.board[row][col].value == 3) {
				$(coordString).addClass("end");
			}
		}
	}
}

function drawSearched(coordString) {
	$(coordString).addClass("searched");
}

function drawPath(coordString) {
	$(coordString).removeClass("searched");

	$(coordString).addClass("path");
}
/************** ___END Table Input Functions___ **************/

/********* ___START Table Input HELPER Functions___  *********/
function indexToCoord(cell) {
	var selected = allCells.index($(cell));

	Board.x = Math.floor(selected / 40);
	Board.y = selected % 40;
}

function convertCoordToString(x, y) {
	var result = "#".concat(x.toString(10), "-", y.toString(10));
	return result;
}

function checkCellStatus() {
	var x = Board.x;
	var y = Board.y;

	if (Board.board[x][y].value == 0) {
		Board.isSelected = false;
	} else if (Board.board[x][y].value == 1) {
		Board.isSelected = true;
	} else if (Board.board[x][y].value == 2) {
		Board.isStart = true;
	} else if (Board.board[x][y].value == 3) {
		Board.isEnd = true;
	}
}

function resetBoard(resetAll) {
	Board.isStart = false;
	Board.isEnd = false;
	Board.isSelected = false;
	Board.specialPrev = 0;
	if (resetAll) {
		Board.board = createBoard();
		Board.startX = SX;
		Board.startY = SY;
		Board.endX = EX;
		Board.endY = EY;
	}
}

/*********** ___END Table Input HELPER Functions___ **********/

window.onload = onLoad;

const ROWS = 25;
const COLS = 40;
const allCells = $("#board td");

var Board = {
	board: createBoard(),
	x: 0,
	y: 0,
	startX: 11,
	startY: 8,
	specialPrev: 0,
	endX: 11,
	endY: 31,
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
			board[i][j] = 0;
		}
	}
	return board;
}
/* Add Start and End Positions */
var start = "#11-8";
var end = "#11-31";
Board.board[11][8] = 2;
Board.board[11][31] = 3;
$(start).addClass("start");
$(end).addClass("end");

/************** ___START Mouse Input Functions___ **************/

$("#board td").mousedown(function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		Board.isDragging = true;
		var cell = this;
		indexToCoord(cell);
		checkCellStatus();
		updateBoard();
		drawTable();

		if (typeof e.preventDefault != "undefined") {
			e.preventDefault();
		}
		document.documentElement.onselectstart = function () {
			return false;
		};
	}
});

$("#board td").mousemove(function rangeMouseMove() {
	if (Board.isDragging) {
		var cell = this;
		indexToCoord(cell);
		//checkCellStatus();
		if (Board.isEnd == false && Board.isStart == false) {
			updateBoard();
			drawTable();
		} else {
			updateBoard();
			drawTable();
		}
	}
});

$("#board td").mouseup(function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		Board.isDragging = false;
		document.documentElement.onselectstart = function () {
			return true;
		};
		resetBoard();
		console.table(Board.board);
	}
});

function selectRange(cellStatus, coord) {
	drawTable();
	if (cellStatus == 0) {
		$(coord).addClass("selected");
	} else if (cellStatus == 1) {
		$(coord).removeClass("selected");
	} else if (cellStatus == 2) {
		$("#board td").removeClass("start");
		$(coord).addClass("start");
	} else if (cellStatus == 3) {
		$("#board td").removeClass("end");
		$(coord).addClass("start");
	}
}

function isRightClick(e) {
	if (e.which) {
		return e.which == 3;
	} else if (e.button) {
		return e.button == 2;
	}
	return false;
}

function updateBoard() {
	if (
		Board.isSelected == false &&
		Board.isStart == false &&
		Board.isEnd == false
	) {
		Board.board[Board.x][Board.y] = 1;
	} else if (Board.isSelected) {
		Board.board[Board.x][Board.y] = 0;
	} else if (Board.isStart) {
		Board.board[Board.startX][Board.startY] = Board.specialPrev;
		Board.specialPrev = Board.board[Board.x][Board.y];
		Board.startX = Board.x;
		Board.startY = Board.y;
		Board.board[Board.x][Board.y] = 2;
	} else if (Board.isEnd) {
		Board.board[Board.endX][Board.endY] = Board.specialPrev;
		Board.specialPrev = Board.board[Board.x][Board.y];
		Board.endX = Board.x;
		Board.endY = Board.y;
		Board.board[Board.x][Board.y] = 3;
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
			if (Board.board[row][col] == 1) {
				$(coordString).addClass("selected");
			} else if (Board.board[row][col] == 2) {
				$(coordString).addClass("start");
			} else if (Board.board[row][col] == 3) {
				$(coordString).addClass("end");
			}
		}
	}
}

/************** ___END Mouse Input Functions___ **************/

/********* ___START Mouse Input HELPER Functions___  *********/
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

	if (Board.board[x][y] == 0) {
		Board.isSelected = false;
	} else if (Board.board[x][y] == 1) {
		Board.isSelected = true;
	} else if (Board.board[x][y] == 2) {
		Board.isStart = true;
	} else if (Board.board[x][y] == 3) {
		Board.isEnd = true;
	}
	console.log("isSelected: " + Board.isSelected);
	console.log("isStart: " + Board.isStart);
	console.log("isEnd: " + Board.isEnd);
}

function resetBoard() {
	Board.isStart = false;
	Board.isEnd = false;
	Board.isSelected = false;
}

/*********** ___END Mouse Input HELPER Functions___ **********/

function clearBoard() {
	$("#board td").removeClass("selected");
}

// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
// 	}
// }

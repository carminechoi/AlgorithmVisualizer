var x = 0;
var y = 0;
var specialX = 0;
var specialY = 0;

var isDragging = false;
var isStart = false;
var isEnd = false;
var cellStatus = 0;
var allCells = $("#board td");

/* Initialize Board */
var board = new Array(25);
for (var i = 0; i < 40; i++) {
	board[i] = [];
}
for (var i = 0; i < board.length; i++) {
	for (var j = 0; j < board.length; j++) {
		board[i][j] = 0;
	}
}

/* Add Start and End Positions */
var start = "#11-8";
var end = "#11-31";
board[11][8] = 2;
board[11][31] = 3;
$(start).addClass("start");
$(end).addClass("end");

/************** ___START Mouse Input Functions___ **************/

$("#board td").mousedown(function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		isDragging = true;
		var selected = allCells.index($(this));
		var coord = indexToCoord(selected);
		checkIsSpecial();
		cellStatus = checkCellStatus(coord);

		if (typeof e.preventDefault != "undefined") {
			e.preventDefault();
		}
		document.documentElement.onselectstart = function () {
			return false;
		};

		selectRange(cellStatus, coord);
		console.log("DOWN - isStart: " + isStart);
		console.log("DOWN - isEnd  : " + isEnd);
		console.log("DOWN - status : " + cellStatus);
	}
});

$("#board td").mousemove(function rangeMouseMove() {
	if (isDragging) {
		var selected = allCells.index($(this));
		var coord = indexToCoord(selected);
		var tempStatus = checkCellStatus(coord);
		if (tempStatus == 0 || tempStatus == 1) {
			selectRange(cellStatus, coord);
		}
	}
});

$("#board td").mouseup(function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		isDragging = false;
		if (isStart) {
			board[specialX][specialY] = 0;
			board[x][y] = 2;
			isStart = false;
		} else if (isEnd) {
			board[specialX][specialY] = 0;
			board[x][y] = 3;
			isEnd = false;
		}
		document.documentElement.onselectstart = function () {
			return true;
		};
		console.log("UP - isStart: " + isStart);
		console.log("UP - isEnd  : " + isEnd);
		console.log(board);
	}
});

function selectRange(cellStatus, coord) {
	if (cellStatus == 0) {
		$(coord).addClass("selected");
		board[x][y] = 1;
	} else if (cellStatus == 1) {
		board[x][y] = 0;
		$(coord).removeClass("selected");
	} else if (cellStatus == 2) {
		$("#board td").removeClass("start");
		$(coord).addClass("start");
	} else if (cellStatus == 3) {
		$("#board td").removeClass("end");
		$(coord).addClass("end");
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
/************** ___END Mouse Input Functions___ **************/

/********* ___START Mouse Input HELPER Functions___  *********/
function indexToCoord(index) {
	x = Math.floor(index / 40);
	y = index % 40;

	var result = "#".concat(x.toString(10), "-", y.toString(10));

	return result;
}

function checkCellStatus(coord) {
	if ($(coord).hasClass("selected")) {
		return 1;
	} else if ($(coord).hasClass("start")) {
		return 2;
	} else if ($(coord).hasClass("end")) {
		return 3;
	} else {
		return 0;
	}
}

function checkIsSpecial() {
	if (board[x][y] == 2) {
		isStart = true;
		specialX = x;
		specialY = y;
	} else if (board[x][y] == 3) {
		isEnd = true;
		specialX = x;
		specialY = y;
	}
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

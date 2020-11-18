class ClickInputs {
	constructor() {
		this.isMouseDown = false;
		this.isWall = false;
		this.isStart = false;
		this.isEnd = false;
		this.prevCoord = [];
		this.prevState = "empty";
		this.prevSpecialState = "empty";
	}
}

$("#board td").mousedown(function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		currClick.isMouseDown = true;
		var cell = allCells.index($(this));
		var coord = indexToCoord(cell);
		var state = checkCellStatus(coord[0], coord[1]);
		if (state == "empty" || state == "wall") {
			console.log(state);
			updateBoard(coord[0], coord[1], state);
			drawBoard();
		} else if (state == "start") {
			currClick.isStart = true;
			updateBoard(coord[0], coord[1], state);
		} else if (state == "end") {
			currClick.isEnd = true;
			updateBoard(coord[0], coord[1], state);
		}
		if (typeof e.preventDefault != "undefined") {
			e.preventDefault();
		}
		document.documentElement.onselectstart = function () {
			return false;
		};
	}
});

$("#board td").mousemove(function rangeMouseMove() {
	if (currClick.isMouseDown) {
		var cell = allCells.index($(this));
		var coord = indexToCoord(cell);
		// ONLY ENTER IF MOUSE MOVES TO NEW SPACE
		if (!equals(coord, currClick.prevCoord)) {
			if (currClick.isStart || currClick.isEnd) {
				updateBoard(
					currClick.prevCoord[0],
					currClick.prevCoord[1],
					currClick.prevSpecialState
				);
				currClick.prevSpecialState = board[coord[0]][coord[1]].state;
				updateBoard(coord[0], coord[1], currClick.isStart ? "start" : "end");
				drawBoard();
			} else {
				var state = checkCellStatus(coord[0], coord[1]);
				if (currClick.prevState == state) {
					updateBoard(coord[0], coord[1], state);
					drawBoard();
				}
			}
		}
	}
});

$("#board td").mouseup(function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		currClick.isMouseDown = false;
		currClick.isStart = false;
		currClick.isEnd = false;
		document.documentElement.onselectstart = function () {
			return true;
		};
	}
});

function isRightClick(e) {
	if (e.which) {
		return e.which == 3;
	} else if (e.button) {
		return e.button == 2;
	}
	return false;
}

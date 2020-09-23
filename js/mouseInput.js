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
		console.log("x: " + Board.x + "     y: " + Board.y);
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
		resetBoard(false);
		//console.table(Board.board);
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

/********** ___START Menu Input HELPER Functions___ **********/
function toggleAlgorithmBtn() {
	document.getElementById("algorithm-btn").classList.toggle("show");
	document.getElementById("maze-btn").classList.remove("show");
}

function toggleMazeBtn() {
	document.getElementById("maze-btn").classList.toggle("show");
	document.getElementById("algorithm-btn").classList.remove("show");
}

function clearBoard() {
	$("#board td").removeClass("selected");
	$("#board td").removeClass("searched");
	$("#board td").removeClass("start");
	$("#board td").removeClass("end");

	resetBoard(true);
	drawTable();
}

function clearPath() {
	$("#board td").removeClass("searched");
	drawTable();
}
/********** ___END Menu Input HELPER Functions___ ***********/

window.onclick = function (event) {
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};
/*********** ___END Menu Input HELPER Functions___ ***********/

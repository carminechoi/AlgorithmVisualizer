$(function () {
	$("#board td")
		.mousedown(rangeMouseDown)
		.mouseup(rangeMouseUp)
		.mousemove(rangeMouseMove);
});

var dragStart = 0;
var dragEnd = 0;
var isDragging = false;
var selected = [];
 
function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		var allCells = $("#board td");
		dragStart = allCells.index($(this));
		isDragging = true;
		selected.push(dragStart);
		if (typeof e.preventDefault != 'undefined') { e.preventDefault(); } 
		document.documentElement.onselectstart = function () { return false; };
		selectRange();
	} 
}

function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		var allCells = $("#board td");
		dragStart = allCells.index($(this));

		isDragging = false;
		if (dragStart != 0) {
			selectRange();
		}

		document.documentElement.onselectstart = function () { return true; }; 
	}
}

function rangeMouseMove(e) {
	if (isDragging) {
		var allCells = $("#board td");
		if (dragStart !== allCells.index($(this))) {
			dragStart = allCells.index($(this));
			selected.push(dragStart);
			selectRange();
		}
		
	}            
}

function selectRange() {
	//$("#board td").removeClass('selected');
	var i;
	
	$("#board td").slice(dragStart, dragStart + 1).addClass('selected');
	//console.log("index: " + selected);
}

function isRightClick(e) {
	if (e.which) {
		return (e.which == 3);
	} else if (e.button) {
		return (e.button == 2);
	}
	return false;
}


// class Cell {
// 	constructor(isClicked){
// 		this.isClicked = isClicked;
// 	}
// }

// var colorArray = ['#F8F8F8', '#2A9D8F'];
// var tds = document.getElementsByTagName('td');
// var firstColor = '#F8F8F8';
// var isClicked = false;

// /* Creating 32 x 32 board */ 
// var board = new Array(32);
// for (var i = 0; i < board.length; i++) {
// 	board[i] = [];
// }

// /* Initializing 2d array */
// for(var i = 0; i < board.length; i++) {
// 	for(var j = 0; j < board.length; j++) {
// 		board[i][j] = new Cell(false);
// 	}
// }

// function getCoord(id) {
// 	var coord = id.split("-");
// 	return coord;
// }

// function changeColor(cell, num, x, y) {
// 	cell.style.backgroundColor = colorArray[num];
// 	board[x][y].isClicked = true
// }

// /* Acknowledge when click is released */
// var handleCellUp = function() {
// 	isClicked = false;
// }

// /* When cell is held down */
// var handleCellEnter = function() {
// 	var cell = this;
// 	if (isClicked) {
// 		fillSquare(cell)
// 	}
// };

// /* When cell is clicked */
// var handleCellDown = function() {
// 	var cell = this;
// 	isClicked = true;
// 	fillSquare(cell);
// };

// function fillSquare(cell) {
// 	var coord = getCoord(cell.id);

// 	changeColor(cell, 1, coord[0], coord[1]);
// 	console.log("x: " + coord[0] + "   y: " + coord[1]);
// }

// for(var i = 0; i < tds.length; i++) {
// 	tds[i].onmousedown = handleCellDown;
// 	tds[i].onmouseenter = handleCellEnter;
// 	tds[i].onmouseup = handleCellUp;
// };

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
	}    
}

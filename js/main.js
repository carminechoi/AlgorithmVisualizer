class Cell {
	constructor(isClicked){
		this.isClicked = isClicked;
	}
}

var isMouseDown = false;
var color = 'red';

/* Creating 32 x 32 board */ 
var board = new Array(32);
for (var i = 0; i < board.length; i++) {
	board[i] = [];
}

/* initializing 2d array */
for(var i = 0; i < board.length; i++) {
	for(var j = 0; j < board.length; j++) {
		board[i][j] = new Cell(false);
	}
}

function isFilled(x, y) {
	if (board[x][y].isClicked == false) {
		return false;
	} else {
		return true;
	}
}

function changeColor(cell, color) {
	cell.style.background=color
}
function mouseIsDown(cell) {
	isMouseDown = true;
	console.log("mouse is down");
	clickedCell(cell);
}

function mouseIsUp() {
	isMouseDown = false;
	console.log("mouse is up");
	console.log("color: ", color);
}

function clickedCell(cell) {
	if(isMouseDown == true) {
		var x = cell.id.split("-")[0];
		var y = cell.id.split("-")[1];
		if (isFilled(x, y) == false) {
			color = 'red'
			changeColor(cell, color);
			board[x][y].isClicked = true;
			console.log("isClicked: ", board[x][y].isClicked);
		} else {
			color = '#F8F8F8'
			changeColor(cell, color);
			board[x][y].isClicked = false;
			console.log("isClicked: ", board[x][y].isClicked);
		}
	}
}

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
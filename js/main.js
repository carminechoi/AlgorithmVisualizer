var selected = 0;
var isDragging = false;

/* Initialize Board */
var board = new Array(32);
for (var i = 0; i < board.length; i++) {
		board[i] = [];
}
for(var i = 0; i < board.length; i++) {
	for(var j = 0; j < board.length; j++) {
		board[i][j] = 0;
	}
}

/************** ___START Mouse Input Functions___ **************/

$(function () {
	$("#board td")
		.mousedown(rangeMouseDown)
		.mouseup(rangeMouseUp)
		.mousemove(rangeMouseMove);
});

function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		var allCells = $("#board td");
		selected = allCells.index($(this));
		isDragging = true;
		if (typeof e.preventDefault != 'undefined') { e.preventDefault(); } 
		document.documentElement.onselectstart = function () { return false; };
		selectRange();
	} 
}

function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		isDragging = false;
		document.documentElement.onselectstart = function () { return true; }; 
	}
}

function rangeMouseMove(e) {
	if (isDragging) {
		var allCells = $("#board td");
		selected = allCells.index($(this));
		selectRange();		
	}            
}

function selectRange() {
	var coord = indexToCoord(selected)
	$(coord).addClass('selected');
}

function isRightClick(e) {
	if (e.which) {
		return (e.which == 3);
	} else if (e.button) {
		return (e.button == 2);
	}
	return false;
}
/************** ___END Mouse Input Functions___ **************/

function indexToCoord(index) {
	var x = Math.floor(index / 32);
	var y = index % 32;
	console.log("x:  " + x + "     y: " + y + "     index: " + index);
	var result = "#".concat(x.toString(10), "-", y.toString(10));
	console.log("result: "+ result)
	return result;
}

function clearBoard() {
	$("#board td").removeClass('selected');
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

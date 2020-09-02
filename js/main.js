var selected = 0;
var cood = "";
var x = 0;
var y = 0;
var isDragging = false;
var cellStatus = 0;

/* Initialize Board */
var board = new Array(25);
for (var i = 0; i < 40; i++) {
		board[i] = [];
}
for(var i = 0; i < board.length; i++) {
	for(var j = 0; j < board.length; j++) {
		board[i][j] = 0;
	}
}

/* Add Start and End Positions */
var start = "#11-8";
var end = "#11-31";
$(start).addClass('start');
$(end).addClass('end');


/************** ___START Mouse Input Functions___ **************/

$("#board td")
.mousedown(function rangeMouseDown(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		isDragging = true;

		var allCells = $("#board td");
		selected = allCells.index($(this));
		coord = indexToCoord(selected)

		if ($(coord).hasClass('selected')) {
			cellStatus = 0;
		} else if ($(coord).hasClass('start')){
			cellStatus = 2;
		} else if ($(coord).hasClass('end')) {
			cellStatus = 3;
		} else {
			cellStatus = 1;
		}

		if (typeof e.preventDefault != 'undefined') { e.preventDefault(); } 
		document.documentElement.onselectstart = function () { return false; };
		
		selectRange(cellStatus, coord);
	} 
});

$("#board td")
.mouseup(function rangeMouseUp(e) {
	if (isRightClick(e)) {
		return false;
	} else {
		isDragging = false;
		document.documentElement.onselectstart = function () { return true; }; 
	}
});

$("#board td")
.mousemove(function rangeMouseMove() {
	if (isDragging) {
		var allCells = $("#board td");
		selected = allCells.index($(this));
		coord = indexToCoord(selected)

		selectRange(cellStatus, coord);		
	}            
});

function selectRange(cellStatus, coord) {
	if (cellStatus == 1) {
		$(coord).addClass('selected');
		board[x][y] = 1;
	} else if (cellStatus == 2) {
		board[x][y] = 2;
		$("#board td").removeClass('start');
		$(coord).removeClass('selected');
		$(coord).addClass('start');
	} else if (cellStatus == 3) {
		board[x][y] = 3;
		$("#board td").removeClass('end');
		$(coord).removeClass('selected');
		$(coord).addClass('end');
	} else {
		board[x][y] = 0;
		$(coord).removeClass('selected');
	}
	console.log(coord);
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


// Change Board Status and Return String Result
function indexToCoord(index) {
	x = Math.floor(index / 40);
	y = index % 40;
	
	var result = "#".concat(x.toString(10), "-", y.toString(10));

	return result;
}

function clearBoard() {
	$("#board td").removeClass('selected');
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

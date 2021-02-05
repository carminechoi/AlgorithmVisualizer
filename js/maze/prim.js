function doPrim() {
	clearBoard();
	drawWalls()

	var neighborList = [];
	var firstCell = pickInitialCell();

	updateBoard(firstCell[0], firstCell[1], "empty");
	
	neighborList = addNeighborsToList(firstCell, neighborList);

	(function doPrimSort() {
		var neighborInfo = pickRandomNeighbor(neighborList)
		neighborList = neighborInfo.neighborList
		var randomNeighbor = neighborInfo.randomNeighbor.neighbor
		neighborList = addNeighborsToList([randomNeighbor.x, randomNeighbor.y], neighborList)
		if (!isStartOrEnd(randomNeighbor.x, randomNeighbor.y)) {
			updateBoard(randomNeighbor.x, randomNeighbor.y, "empty")
		} 
		if (!isStartOrEnd(randomNeighbor.x - neighborInfo.randomNeighbor.fromX, randomNeighbor.y - neighborInfo.randomNeighbor.fromY))
			updateBoard(randomNeighbor.x - neighborInfo.randomNeighbor.fromX, randomNeighbor.y - neighborInfo.randomNeighbor.fromY, "empty");

		if (neighborList.length > 0) {
			setTimeout(doPrimSort, 0);
		}
	})();
}

function getRandom(starting, ending) {
	return Math.floor(Math.random() * ending + starting);
}

function pickInitialCell() {
	var randX = currSX, randY = currSY;
	while (randX == currSX || randX == currEX) {
		randX = getRandom(0, ROWS - 1);
	}
	while (randY == currSY || randY == currEY) {
		randY = getRandom(0, COLS - 1);
	}
	return [randX, randY];
}

function addNeighborsToList(cell, nList) {
	var x = cell[0]
	var y = cell[1]
	if (x >= 2) { 
		var cellIsPresent = cellExistsInArray(board[x-2][y], nList);
		if (board[x-2][y].state == "wall" && !cellIsPresent) {
			nList.push({neighbor: board[x-2][y], fromX: -1, fromY:0})
		}
	}
	if (x < ROWS-2) {
		var cellIsPresent = cellExistsInArray(board[x+2][y], nList);
		if (board[x+2][y].state == "wall" && !cellIsPresent) {
			nList.push({neighbor: board[x+2][y], fromX: 1, fromY: 0})
		}
	}
	if (y >= 2) {
		var cellIsPresent = cellExistsInArray(board[x][y-2], nList);
		if (board[x][y-2].state == "wall" && !cellIsPresent) {
			nList.push({neighbor: board[x][y-2], fromX: 0, fromY: -1})
		}
	}
	if (y < COLS-2) {
		var cellIsPresent = cellExistsInArray(board[x][y+2], nList);
		if (board[x][y+2].state == "wall" && !cellIsPresent) {
			nList.push({neighbor: board[x][y+2], fromX: 0, fromY: 1})
		}
	}
	return nList
}

function pickRandomNeighbor(neighborList) {
	var randomNeighborIndex = getRandom(0, neighborList.length)
	var randomNeighbor = neighborList[randomNeighborIndex]
	neighborList.splice(randomNeighborIndex, 1)

	return {
		randomNeighbor: randomNeighbor,
		neighborList: neighborList
	}
}

function drawWalls() {
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			var coord = convertCoordToString(i, j);
			if (board[i][j].state == "start") {
				drawStart(coord);
			} else if (board[i][j].state == "end") {
				drawEnd(coord);
			} else {
				board[i][j].state = "wall"
				drawWall(coord);
			}
		}
	}
}
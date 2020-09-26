function doPrim() {
	clearPath();
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			Board.board[i][j].value = 1;
		}
	}

	Board.board[Board.startX][Board.startY].value = 2;
	Board.board[Board.endX][Board.endY].value = 3;
	var wallList = [];

	Board.board[Board.startX][Board.startY].value = 0;
	wallList = wallList.concat(
		getWallNeighbors(Board.board[Board.startX][Board.startY])
	);
	while (wallList && wallList.length) {
		var rand = getRandom(0, wallList.length - 1);
		var currentWall = wallList[rand];

		var numCon = checkConnections(currentWall);
		if (numCon != 2) {
			Board.board[currentWall.x][currentWall.y].value = 0;
			connectWall(currentWall);

			wallList = wallList.concat(getWallNeighbors(currentWall));
		}
		wallList.splice(rand, 1);
	}

	Board.board[Board.startX][Board.startY].value = 2;
	Board.board[Board.endX][Board.endY].value = 3;
	var rand1 = 0;
	var rand2 = 0;
	while (rand1 == 0) {
		rand1 = getRandom(-1, 1);
	}
	while (rand2 == 0) {
		rand2 = getRandom(-1, 1);
	}
	checkEndPoint(rand1, rand2);

	drawTable();
}
function connectWall(wall) {
	var x = 0;
	var y = 0;

	if (wall.x == wall.sourcex) {
		if (wall.y > wall.sourcey) {
			Board.board[wall.x][wall.y - 1].value = 0;
		} else {
			Board.board[wall.x][wall.y + 1].value = 0;
		}
	} else if (wall.y == wall.sourcey) {
		if (wall.x > wall.sourcex) {
			Board.board[wall.x - 1][wall.y].value = 0;
		} else {
			Board.board[wall.x + 1][wall.y].value = 0;
		}
	}
	if (Board.board[wall.x + x][wall.y + y].value == 1) {
		Board.board[wall.sourcex][wall.sourcey].value = 0;
	}
}

function getRandom(starting, ending) {
	return Math.floor(Math.random() * ending + starting);
}
function checkEndPoint(randx, randy) {
	var cell = Board.board[Board.endX][Board.endY];
	var count = 0;
	var value = 4;
	var x = Board.endX;
	var y = Board.endY;
	if (x == 0 && y == 0) {
		value = 2;
		if (randx == 1) {
			randx = 0;
			randy = 1;
		} else {
			randx = -1;
			randy = 0;
		}
	} else if (x == 0 && y == COLS - 1) {
		if (randx == 1) {
			randx = 1;
			randy = 0;
		} else {
			randx = 0;
			randy = -1;
		}
		value = 2;
	} else if (x == ROWS - 1 && y == 0) {
		if (randx == 1) {
			randx = -1;
			randy = 0;
		} else {
			randx = 0;
			randy = 1;
		}
		value = 2;
	} else if (x == ROWS - 1 && y == COLS - 1) {
		if (randx == 1) {
			randx = 0;
			randy = 1;
		} else {
			randx = -1;
			randy = 0;
		}
		value = 2;
	} else if (x == 0 || x == ROWS - 1 || y == 0 || y == COLS - 1) {
		value = 3;
	}
	if (x >= 1) {
		if (Board.board[x - 1][y].value === 1) {
			count++;
		}
	}
	if (x <= ROWS - 3) {
		if (Board.board[x + 1][y].value === 1) {
			count++;
		}
	}
	if (y >= 1) {
		if (Board.board[x][y - 1].value === 1) {
			count++;
		}
	}
	if (y <= COLS - 3) {
		if (Board.board[x][y + 1].value === 1) {
			count++;
		}
	}
	if (count == value) {
		Board.board[cell.x + randx][cell.y + randy].value = 0;
	}
}
function checkConnections(wall) {
	var x = wall.x;
	var y = wall.y;
	var count = 0;
	if (Board.board[x][y].value != 2 && Board.board[x][y].value != 3) {
		if (x >= 2) {
			if (Board.board[x - 2][y].value == 0) {
				count++;
			}
		}
		if (x <= ROWS - 3) {
			if (Board.board[x + 2][y].value == 0) {
				count++;
			}
		}
		if (x <= y >= 2) {
			if (Board.board[x][y - 2].value == 0) {
				count++;
			}
		}
		if (y <= COLS - 3) {
			if (Board.board[x][y + 2].value == 0) {
				count++;
			}
		}
	}
	if (count == 2) {
		return true;
	} else {
		return false;
	}
}

function getWallNeighbors(cell) {
	var x = cell.x;
	var y = cell.y;
	var wallNeighbors = [];
	if (x >= 2) {
		if (Board.board[x - 2][y].value === 1) {
			Board.board[x - 2][y].sourcex = x;
			Board.board[x - 2][y].sourcey = y;
			wallNeighbors.push(Board.board[x - 2][y]);
		}
	}
	if (x <= ROWS - 3) {
		if (Board.board[x + 2][y].value === 1) {
			Board.board[x + 2][y].sourcex = x;
			Board.board[x + 2][y].sourcey = y;
			wallNeighbors.push(Board.board[x + 2][y]);
		}
	}
	if (y >= 2) {
		if (Board.board[x][y - 2].value === 1) {
			Board.board[x][y - 2].sourcex = x;
			Board.board[x][y - 2].sourcey = y;
			wallNeighbors.push(Board.board[x][y - 2]);
		}
	}
	if (y <= COLS - 3) {
		if (Board.board[x][y + 2].value === 1) {
			Board.board[x][y + 2].sourcex = x;
			Board.board[x][y + 2].sourcey = y;
			wallNeighbors.push(Board.board[x][y + 2]);
		}
	}

	return wallNeighbors;
}

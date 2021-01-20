//PRIORITY QUEUE

function doDijkstras() {
	clearPath();

	var notWalls = []
	var dist = []
	var prev = []

	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			if (board[i][j].state != "wall") {
				dist.push({x: i, y: j, dist: -1})
				prev.push({x: i, y: j, prev: -1})
				notWalls.push(board[i][j])
			}
		}
	}

	console.log("notWalls.length: " + notWalls.length)	
	
    while (notWalls.length > 1) {
		console.log("inside while")
		var minDistCell = findMinimumDistance(dist)

		notWalls = removeElementFromArray(notWalls, minDistCell)

		var neighbors = findEmptyNeighbors(minDistCell)
		
	}

	console.log("end doDijkstras")
}

function findMinimumDistance(dist) {
	var minDist = 100000
	var minCell = board[SX][SY]
	for (var i = 0; i < dist.length; i++) {
		const currLength = dist[i].dist
		if (currLength < minDist) {
			minDist = currLength
			minCell = board[dist[i].x][dist[i].y]
		}
	}
	return minCell
}

function findEmptyNeighbors(origin) {
	console.log("inside find empty neighbors")
	const x = origin.x
	const y = origin.y

	var neighbors = []
	if (x > 0 && board[x-1][y].state != "wall") {
		neighbors.push(board[x-1][y])
	}
	if (x < ROWS && board[x+1][y].state != "wall") {
		neighbors.push(board[x+1][y])
	}
	if (y > 0 && board[x][y-1].state != "wall") {
		neighbors.push(board[x][y-1])
	}
	if (y < COLS && board[x][y+1].state != "wall") {
		neighbors.push(board[x][y+1])
	}
	return neighbors
}

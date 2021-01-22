//PRIORITY QUEUE

function doDijkstras() {
	clearPath();

	var Q = []
	var dist = []
	var prev = []

	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			if (board[i][j].state != "wall") {
				dist.push({x: i, y: j, dist: 100000})
				prev.push({x: i, y: j, prev: -1})
				Q.push(board[i][j])
			}
		}
	}
	
	dist[findIndexOfWithAttr(dist, 'x', 'y', currSX, currSY)].dist = 0

    while (Q.length > 1) {
		console.log("length: " + Q.length)
		var minDistCell = findMinimumDistance(Q, dist)
		Q = removeElementFromArray(Q, minDistCell)
		if(minDistCell == board[currEX][currEY]) {
			break
		}
		var neighbors = findEmptyNeighbors(minDistCell)
		var indexOfMinDistCell = findIndexOfWithAttr(dist, 'x', 'y', minDistCell.x, minDistCell.y)
		
		// FOR EACH NEIGHBOR
		for (var i = 0; i < neighbors.length; i++) {
			var alt = dist[indexOfMinDistCell] + 1
			var x = neighbors[i].x
			var y = neighbors[i].y
			var indexOfNeighbor = findIndexOfWithAttr(dist, 'x', 'y', x, y)
			if (alt < dist[indexOfNeighbor]) {
				dist[indexOfNeighbor] = alt
				prev[indexOfNeighbor] = minDistCell
			}
		}
	}
	
	// REVERSE ITERATION
	var S = []


	console.log("end doDijkstras")
}

function findMinimumDistance(Q, dist) {
	var minDist = 99999
	var minCell = board[currSX][currSY]
	for (var i = 0; i < Q.length; i++) {
		var x = Q[i].x
		var y = Q[i].y
		var indexToCheckMinimum = findIndexOfWithAttr(dist, 'x', 'y', x, y)
		var distToCheck = dist[indexToCheckMinimum].dist
		if (distToCheck < minDist) {
			console.log("distance: " + distToCheck)
			console.log("minimum distance: " + minDist)
			minDist = distToCheck
			minCell = board[x][y]
			
			console.log("x: " + x + "  ||  y: " + y)
		}
	}
	console.log("end")
	return minCell
}

function findEmptyNeighbors(origin) {
	const x = origin.x
	const y = origin.y

	var neighbors = []
	if (x > 0 && board[x-1][y].state != "wall" && !cellExistsInArray(board[x-1][y], neighbors)) {
		neighbors.push(board[x-1][y])
	}
	if (x < ROWS-1 && board[x+1][y].state != "wall" && !cellExistsInArray(board[x+1][y], neighbors)) {
		neighbors.push(board[x+1][y])
	}
	if (y > 0 && board[x][y-1].state != "wall" && !cellExistsInArray(board[x][y-1], neighbors)) {
		neighbors.push(board[x][y-1])
	}
	if (y < COLS-1 && board[x][y+1].state != "wall" && !cellExistsInArray(board[x][y+1], neighbors)) {
		neighbors.push(board[x][y+1])
	}
	return neighbors
}

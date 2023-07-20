//PRIORITY QUEUE

function dijkstras() {
	clearPath();

	var nodeQueue = []
	var dist = []
	var prev = []

	// INITIALIZE Q, DIST, AND PREV 
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			if (board[i][j].state != "wall") {
				dist.push({x: i, y: j, dist: 100000})
				prev.push({x: i, y: j, prev: null})
				nodeQueue.push(board[i][j])
			}
		}
	}
	
	// SET SOURCE DISTANCE TO ZERO
	dist[findIndexOfWithAttr(dist, 'x', 'y', currSX, currSY)].dist = 0

	var continueDijkstras = true;
	
	(function doDijkstras() {
		// WHILE NODES STILL EXIST
		var minDistCell = findMinimumDistance(nodeQueue, dist)
		nodeQueue = removeElementFromArray(nodeQueue, minDistCell)
		if(minDistCell == board[currEX][currEY]) {
			continueDijkstras = false
			reverseIteration(prev)
			return 0
		} else {
			var neighbors = findEmptyNeighbors(minDistCell)
			var indexOfMinDistCell = findIndexOfWithAttr(dist, 'x', 'y', minDistCell.x, minDistCell.y)
			
			// FOR EACH NEIGHBOR
			for (var i = 0; i < neighbors.length; i++) {
				var alt = dist[indexOfMinDistCell].dist + 1
				var x = neighbors[i].x
				var y = neighbors[i].y
				var indexOfNeighbor = findIndexOfWithAttr(dist, 'x', 'y', x, y)
				if (alt < dist[indexOfNeighbor].dist) {
					dist[indexOfNeighbor].dist = alt
					prev[indexOfNeighbor].prev = minDistCell
					if(x != currEX || y != currEY)
						drawSearched(convertCoordToString(x,y));
				}
			}
		}
		if (nodeQueue.length > 1 && continueDijkstras) {
			setTimeout(doDijkstras, 0);
		}
	})();
}

function reverseIteration(prev) {
	// REVERSE ITERATION
	var S = []

	var target = prev[findIndexOfWithAttr(prev, 'x', 'y', currEX, currEY)]
	console.log(target)
	if (target.prev != null) {
		while (target.prev != null) {
			if(target.x != currEX || target.y != currEY)
				drawPath(convertCoordToString(target.x, target.y));
			S.unshift(board[target.x][target.y])
			target = prev[findIndexOfWithAttr(prev, 'x', 'y', target.prev.x, target.prev.y)]
		}
	}
	console.log("end doDijkstras")
}

function findMinimumDistance(Q, dist) {
	var minDist = 100000
	var minCell = board[currEX][currEY]
	for (var i = 0; i < Q.length; i++) {
		var x = Q[i].x
		var y = Q[i].y
		var indexToCheckMinimum = findIndexOfWithAttr(dist, 'x', 'y', x, y)
		var distToCheck = dist[indexToCheckMinimum].dist

		if (distToCheck < minDist) {
			minDist = distToCheck
			minCell = board[x][y]
		}
	}
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

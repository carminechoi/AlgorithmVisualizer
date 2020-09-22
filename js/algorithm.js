var Queue = function () {
	this.items = [];
};
Queue.prototype.enqueue = function (obj) {
	this.items.push(obj);
};
Queue.prototype.dequeue = function () {
	return this.items.shift();
};
Queue.prototype.isEmpty = function () {
	return this.items.length === 0;
};

function doDijkstra() {}

function doBFS(board, startX, startY, searchValue) {
	var bfsInfo = [];

	for (var i = 0; i < ROWS * COLS; i++) {
		bfsInfo[i] = {
			distance: null,
			predecessor: null,
		};
	}

	bfsInfo[startX * ROWS + startY].distance = 0;
	var queue = new Queue();
	queue.enqueue(board[startX][startY]);
	console.log(board[12][16]);
	(function doSort() {
		var current = queue.dequeue();
		console.log(current.x);
		var u = current.x * ROWS + current.y;

		for (var counter = 0; counter <= 4; counter++) {
			var x, y;
			if (counter === 0) {
				x = -1;
				y = 0;
			} else if (counter === 1) {
				x = 1;
				y = 0;
			} else if (counter === 2) {
				x = 0;
				y = -1;
			} else if (counter === 3) {
				x = 0;
				y = 1;
			}
			var coordString = convertCoordToString(current.x + x, current.y + y);
			var v = (current.x + x) * ROWS + (current.y + y);
			if (bfsInfo[v].distance === null) {
				if (board[current.x + x][current.y + y].value === 3) {
					console.log("FOUND *******************");
					return bfsInfo;
				}
				bfsInfo[v].distance = bfsInfo[u].distance + 1;
				bfsInfo[v].predecessor = "right";
				queue.enqueue(board[current.x + x][current.y + y]);
				drawSearched(coordString);
			}
		}
		if (!queue.isEmpty()) {
			setTimeout(doSort, 0);
		}
	})();

	return bfsInfo;
}

function doBreadthFirst(board, startNode, searchValue) {
	let queue = [];
	let path = [];

	queue.push(startNode);
	let count = 0;
	(function doSort() {
		// while (queue.length > 0 && count < 102) {
		let currentNode = queue[0];
		let x = currentNode[0];
		let y = currentNode[1];

		path.push([x, y]);
		var coordString = convertCoordToString(x, y);
		console.log("Current node is: " + x + ", " + y);

		if (board[x][y] === searchValue) {
			console.log("Found It!");
			//console.table(path);
			return;
		}

		if (x + 1 <= ROWS) {
			if (board[x + 1][y] != 4) {
				board[x][y] = 4;
				queue.push([x + 1, y]);
				drawSearched(coordString);
			}
		}

		if (x - 1 >= 0) {
			if (board[x - 1][y] != 4) {
				board[x][y] = 4;
				queue.push([x - 1, y]);
				drawSearched(coordString);
			}
		}

		if (y + 1 <= COLS) {
			if (board[x][y + 1] != 4) {
				board[x][y] = 4;
				queue.push([x, y + 1]);
				drawSearched(coordString);
			}
		}

		if (y - 1 >= 0) {
			if (board[x][y - 1] != 4) {
				board[x][y] = 4;
				queue.push([x, y - 1]);
				drawSearched(coordString);
			}
		}

		queue.shift();
		count++;
		if (queue.length > 0 && count < 10000) {
			setTimeout(doSort, 0);
		}
	})();

	console.log("Sorry, no such node found :(");
}

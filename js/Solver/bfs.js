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

function doBFS(startX, startY, searchValue) {
	clearPath();
	var queue = new Queue();
	queue.enqueue(board[startX][startY]);
	var bfsInfo = [];

	for (var i = 0; i < COLS * COLS; i++) {
		if (i == startX * COLS + startY) {
			bfsInfo[i] = {
				distance: 0,
				x: startX,
				y: startY,
			};
		} else {
			bfsInfo[i] = {
				distance: null,
				x: null,
				y: null,
			};
		}
	}

	(function doBFSSort() {
		var current = queue.dequeue();
		var u = current.x * COLS + current.y;

		for (var counter = 0; counter < 4; counter++) {
			var x, y;
			if (counter === 0) {
				x = current.x - 1;
				y = current.y;
			} else if (counter === 1) {
				x = current.x + 1;
				y = current.y;
			} else if (counter === 2) {
				x = current.x;
				y = current.y - 1;
			} else if (counter === 3) {
				x = current.x;
				y = current.y + 1;
			}

			var v = x * COLS + y;
			if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {

				if (bfsInfo[v].distance === null && board[x][y].state === "empty") {
					bfsInfo[v].distance = bfsInfo[u].distance + 1;
					bfsInfo[v].x = current.x;
					bfsInfo[v].y = current.y;

					queue.enqueue(board[x][y]);
					drawSearched(convertCoordToString(x, y));
				} else if (board[x][y].state === searchValue) {
					bfsInfo[v].x = current.x;
					bfsInfo[v].y = current.y;
					retrace(bfsInfo, v);
					return bfsInfo;
				}
			}
		}
		if (!queue.isEmpty()) {
			setTimeout(doBFSSort, 0);
		}
	})();

	return bfsInfo;
}

function retrace(bfsInfo, v) {
	var current = bfsInfo[v];
	while (current.distance != 1) {
		var x = current.x;
		var y = current.y;
		current = bfsInfo[x * COLS + y];
		drawPath(convertCoordToString(x, y));
	}
}

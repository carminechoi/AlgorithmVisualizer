//PRIORITY QUEUE

function minDistance(Q, dist) {
	var minValue = 1000000000000000;
	var index = null;
	for (var i = 0; i < dist.length; i++) {
		if (dist[i] < minValue) {
			minValue = dist[i];
			index = i;
		}
	}
	return Q[index];
}

function doDijkstras() {
	clearPath();

	var Q = [];
	var dist = [];
	var prev = [];
	for (row = 0; row < ROWS; row++) {
		for (col = 0; col < COLS; col++) {
			dist[row * COLS + col] = 1000;
			prev[row * COLS + col] = null;
			Q[row * COLS + col] = Board.board[row][col];
		}
	}
	dist[Board.startX * COLS + Board.startY] = 0;

	while (Q.length > 0) {
		var u = minDistance(Q, dist);

		// remove u from Q
		var index = u.x * COLS + u.y;
		Q.splice(index, 1);

		for (var i = 0; i < 4; i++) {
			var x = u.x;
			var y = u.y;

			if (i == 0) {
				x += -1;
			} else if (i == 1) {
				x += 1;
			} else if (i == 2) {
				y += -1;
			} else {
				y += 1;
			}
			if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
				console.log(x + " : " + y + " : ");

				var v = Board.board[x][y];
				if (Q.indexOf(x * COLS + y) != -1) {
					var alt = dist[u.x * COLS + u.y] + 1;
					if (alt < dist[v.x * COLS + v.y]) {
						dist[v.x * COLS + v.y] = alt;
						prev[v.x * COLS + v.y] = u;
					}
				}
			}
		}
		console.log("done");
	}

	console.log("DONE");
}

class Cell {
	constructor(x, y, state) {
		this.x = x;
		this.y = y;
		this.state = state;
	}

	get state() {
		return this._state;
	}
	set state(val) {
		this._state = val;
	}
}

function checkCellStatus(x, y) {
	switch (board[x][y].state) {
		case "empty":
			return "wall";
		case "wall":
			return "empty";
		case "start":
			// console.log("is start");
			return "start";
		case "end":
			return "end";
		default:
			return "null";
	}
}
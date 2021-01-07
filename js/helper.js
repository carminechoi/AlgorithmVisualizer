function indexToCoord(cell) {
	var x = Math.floor(cell / COLS);
	var y = cell % COLS;
	return [x, y];
}

function convertCoordToString(x, y) {
	var result = "#".concat(x.toString(10), "-", y.toString(10));
	return result;
}

const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

function cellExists(cell, arr) {
	return arr.some(function(el) {
		return el.neighbor == cell;
	});
}
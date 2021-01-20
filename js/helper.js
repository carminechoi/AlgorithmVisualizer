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

// RETURN TRUE IF cell IS IN ARRAY arr
function cellExists(cell, arr) {
	return arr.some(function(el) {
		return el.neighbor == cell;
	});
}

// RETURN TRUE IS x AND y ARE START OR END CELL
function isStartOrEnd(x, y) {
	if (x == currSX && y == currSY) {
		return true
	} else if (x == currEX && y == currEY) {
		return true
	} else {
		return false
	}
}

// FIND SMALLEST VALUE IN AN ARRAY Q
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

// REMOVE ELEMENT FROM ARRAY
function removeElementFromArray(array, element) {
	const index = array.indexOf(element)
	if (index > -1) {
		array.splice(index, 1)
	}

	return array
}
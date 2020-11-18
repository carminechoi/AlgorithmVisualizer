const ROWS = 25;
const COLS = 40;
const allCells = $("#board td");

const SX = 11;
const SY = 8;
const EX = 11;
const EY = 31;

var currSX = SX;
var currSY = SY;
var currEX = EX;
var currEY = EY;

var board;
var currClick;

function onLoad() {
	currClick = new ClickInputs();
	board = boardInit();
	drawBoard();
}

window.onload = onLoad;

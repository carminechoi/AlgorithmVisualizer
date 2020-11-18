function toggleAlgorithmBtn() {
	document.getElementById("algorithm-btn").classList.toggle("show");
	document.getElementById("maze-btn").classList.remove("show");
}

function toggleMazeBtn() {
	document.getElementById("maze-btn").classList.toggle("show");
	document.getElementById("algorithm-btn").classList.remove("show");
}

/********** ___END Menu Input HELPER Functions___ ***********/

window.onclick = function (event) {
	if (
		!event.target.matches(".dropbtn") &&
		!event.target.matches(".transparent")
	) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};

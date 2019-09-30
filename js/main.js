function dropAlgorithmBtn() {
    // document.getElementById("algorithm-btn").classList.toggle("show");
    // document.getElementById("maze-btn").classList.remove("show");
}

function dropMazeBtn() {
    // document.getElementById("maze-btn").classList.toggle("show");
    // document.getElementById("algorithm-btn").classList.remove("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    
}
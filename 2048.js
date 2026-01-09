// prepare building blocks of the main code
let board;
let score = 0;
const rows = 4;
const cols = 4;

window.onload = function() {
    setGame();
}

// define the setGame function
function setGame() {
   // board = [
   //     [0, 0, 0, 0],
   //     [0, 0, 0, 0],
   //     [0, 0, 0, 0],
   //     [0, 0, 0, 0],
   // ];

   board = [
   [2, 2, 2, 2],
   [2, 2, 2, 2],
   [4, 4, 8, 8],
   [4, 4, 8, 8],
   ];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // create a div element for each cell
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
            }
        }
    }

    function updateTile(tile, num) {
        tile.innerText = "";
        tile.classList.value = ""; // reset classes
        tile.classList.add("tile");
        if (num > 0) {
            tile.innerText = num;
            tile.classList.add("tile-" + num.toString());
        }
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
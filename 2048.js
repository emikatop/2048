// prepare building blocks of the main code
let board;
let score = 0;
let bestScore = Number(localStorage.getItem("bestScore")) || 0;
document.getElementById("best-score").innerText = bestScore.toString();
const rows = 4;
const cols = 4;

window.onload = function() {
    setGame();
}

// define the setGame function
function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
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
    //set two initial tiles
    setTwo();
    setTwo();
}



function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function hasMovesLeft() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let val = board[r][c];

            if (val === 0) return true;

            if (c < cols - 1 && val === board[r][c + 1]) return true;
            if (r < rows - 1 && val === board[r + 1][c]) return true;
        }
    }
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false; 
    while (!found) {
        //random r (row) and c (column) index
        let r = Math.floor(Math.random() * rows) 
        let c = Math.floor(Math.random() * cols)

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
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

document.addEventListener ("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }

    document.getElementById("score").innerText = score;

    if (!hasEmptyTile()) {
        alert("Game over, loser! Your score is just " + score.toString());

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem("bestScore", bestScore);
            document.getElementById("best-score").innerText = bestScore;
        }

        location.reload();
        reload;
    }
})

function filter(row) {
    return row.filter (num => num != 0);
}

function slide(row) {
    // remove all zeros
    row = filter(row); // [2,2,4]
    // slide left
    for (let i = 0; i < row.length-1; i++) {
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }

    row = filter(row); // [4,0] -> [4]
        while (row.length < cols) {
    row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]; // get each row
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < cols; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = board[r][c];
                updateTile(tile, num);
            }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]; // get each row
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < cols; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < cols; c++) {
    
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < cols; c++) {

        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
const board = document.getElementById("board");
const popup = document.getElementById("popup");
const newGameBtn = document.getElementById("newGameBtn");
const exitGameBtn = document.getElementById("exitGameBtn");
const popupMessage = document.getElementById("popupMessage");

let currentPlayer = "X";
let gameOver = false;
let boardState = ["", "", "", "", "", "", "", "", ""];

// Function to check if the game is over
function checkGameOver() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameOver = true;
            return boardState[a];
        }
    }

    if (!boardState.includes("")) {
        gameOver = true;
        return "Draw";
    }

    return null;
}

// Function to handle cell click
function handleCellClick(index) {
    if (!gameOver && !boardState[index]) {
        boardState[index] = currentPlayer;
        renderBoard();
        const winner = checkGameOver();
        if (winner) {
            popupMessage.textContent = winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
            popup.style.display = "block";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

// Function to render the game board
function renderBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = boardState[i];
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }
}

// Function to start a new game
function startNewGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    popup.style.display = "none";
    renderBoard();
}

newGameBtn.addEventListener("click", startNewGame);

// Function to exit the game
function exitGame() {
    popup.style.display = "none";
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    renderBoard();
}

exitGameBtn.addEventListener("click", exitGame);

// Initial game render
renderBoard();

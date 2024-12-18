const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let currentPlayer = Math.random() < 0.5 ? "X" : "O";
let boardState = Array(9).fill(null);
let scores = { X: 0, O: 0, Draw: 0 };

message.textContent = `Player ${currentPlayer}'s turn`;

// Check for a winner or draw
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes(null) ? null : "Draw";
}

// Update scores after each round
function updateScore(winner) {
    if (winner === "Draw") {
        scores.Draw++;
        scoreDraw.textContent = scores.Draw;
    } else {
        scores[winner]++;
        if (winner === "X") scoreX.textContent = scores.X;
        else scoreO.textContent = scores.O;
    }
}

// Reset the board for a new game
function resetBoard() {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle a click on any of the cells
function handleClick(e) {
    const index = e.target.dataset.index;

    if (!boardState[index]) {
        boardState[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add("taken");

        const winner = checkWinner();
        if (winner) {
            message.textContent = winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
            updateScore(winner);
            cells.forEach(cell => {
                cell.removeEventListener("click", handleClick);  // Disable further clicks
            });
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Restart the game when the button is clicked
restartButton.addEventListener("click", () => {
    resetBoard();
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);  // Re-enable click listeners on cells
    });
});

// Attach the click event to each cell
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

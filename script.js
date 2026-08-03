// 1. Grab references to the board cells, status, and reset button
const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

// 2. Track game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 9 empty slots
let gameActive = true;

// 3. All winning combinations (indexes)
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// 4. Handle a cell click
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    // Ignore if already filled or game over
    if (gameBoard[index] !== '' || !gameActive) return;

    // Place the mark
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for win or draw
    const winningCombo = checkWin();
    if (winningCombo) {
        statusEl.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        // Highlight the winning cells
        winningCombo.forEach(index => {
            cells[index].classList.add('win');
        });
    } else if (gameBoard.every(cell => cell !== '')) {
        statusEl.textContent = "It's a draw!";
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      
        statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// 5. Check if the current player has won (returns the winning combo or null)
function checkWin() {
    let result = null;
    winConditions.forEach(combination => {
        if (combination.every(index => gameBoard[index] === currentPlayer)) {
            result = combination;
        }
    });
    return result;
}


// 7. Reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusEl.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    
}

// 8. Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);



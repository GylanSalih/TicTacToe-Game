const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const player1WinsDisplay = document.getElementById('player1Wins');
const player2WinsDisplay = document.getElementById('player2Wins');
let currentPlayer = 'Player 1';
let gameActive = true;
let player1Wins = 0;
let player2Wins = 0;

function handleClick(e) {
	if (!e.target.textContent && gameActive) {
		e.target.textContent = currentPlayer === 'Player 1' ? 'X' : 'O';
		checkForWinner();
		if (gameActive) {
			currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
			currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
		}
	}
}

function checkForWinner() {
	const winningConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[b].textContent === squares[c].textContent) {
			gameActive = false;
			setTimeout(() => {
				alert(`${currentPlayer} wins!`);
				updateWins();
			}, 100);
			return;
		}
	}
	if (Array.from(squares).every(square => square.textContent)) {
		gameActive = false;
		setTimeout(() => {
			alert("It's a tie!");
			resetBoard();
		}, 100);
	}
}

function updateWins() {
	if (currentPlayer === 'Player 1') {
		player1Wins++;
		player1WinsDisplay.textContent = `Player 1 Wins: ${player1Wins}`;
	} else {
		player2Wins++;
		player2WinsDisplay.textContent = `Player 2 Wins: ${player2Wins}`;
	}
	resetBoard();
}

function resetBoard() {
	squares.forEach(square => square.textContent = '');
	currentPlayer = 'Player 1';
	currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
	gameActive = true;
}

squares.forEach(square => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);

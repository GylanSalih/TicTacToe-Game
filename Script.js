const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';

function handleClick(e) {
	if (!e.target.textContent) {
		e.target.textContent = currentPlayer;
		checkForWinner();
		currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	}
}

function checkForWinner() {
	const winningConditions = [		[0, 1, 2],
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
			alert(`${currentPlayer} wins!`);
			resetBoard();
			return;
		}
	}
	if (Array.from(squares).every(square => square.textContent)) {
		alert("It's a tie!");
		resetBoard();
	}
}

function resetBoard() {
	squares.forEach(square => square.textContent = '');
	currentPlayer = 'X';
}

squares.forEach(square => square.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);

const cellElements = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartBtn");
const winningMessage = document.getElementById("winningMessage");
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
  cellElements.forEach((cell) =>
    cell.addEventListener("click", handleCellClicked)
  );
  restartButton.addEventListener("click", restartGame);
  winningMessage.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function handleCellClicked() {
  const cellIndex = this.getAttribute("data-cell");

  if (options[cellIndex] !== "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  winningMessage.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let wonRound = false;

  for (let i = 0; i < winPatterns.length; i++) {
    const condition = winPatterns[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      wonRound = true;
      break;
    }
  }

  if (wonRound) {
    winningMessage.textContent = `${currentPlayer} wins`;
    running = false;
  } else if (!options.includes("")) {
    winningMessage.textContent = "Draw";
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  cellElements.forEach((cell) => {
    cell.textContent = "";
  });
  winningMessage.textContent = `${currentPlayer}'s turn`;
}

const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("game-card");
    div.style.fontSize = "40px";
    div.style.cursor = "pointer";
    div.textContent = cell;
    div.onclick = () => handleClick(index);
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  checkResult();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  createBoard();
}

function checkResult() {
  for (let condition of winConditions) {
    let [a,b,c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      statusText.textContent = ${gameState[a]} Wins!;
      gameActive = false;
      return;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "Draw!";
    gameActive = false;
  }
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "";
  createBoard();
}

createBoard();

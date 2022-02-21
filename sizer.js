const headerHeight = 70;
const keyboardHeight = 300;

function resizeGameBoard() {
  let gameBoard = document.getElementById("game-board");
  console.log(gameBoard.style.rowGap);
}

window.addEventListener("resize", resizeGameBoard);

resizeGameBoard();
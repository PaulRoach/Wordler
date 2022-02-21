var gameData = null;
const maxWordLength = 8;
const maxGuesses = 7;
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

if (!localStorage.getItem("has-visited")) {
  localStorage.setItem("has-visited", true);
  console.log("has not previously visited");
  gameData = {
    boardState: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    },
    evaluations: {
      0: null,
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
    },
    gameState: "IN_PROGRESS",
    solution: "",
    guessIndex: 0,
  }
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
else {
  console.log("has previously visited");
  gameData = JSON.parse(localStorage.getItem("gameData"));
}

document.addEventListener('keydown', function (event) {
  var key = event.key;
  keypressHandler(key);
}, false);

function virtualKeyPress(key) {
  keypressHandler(key);
}

function keypressHandler(key) {
  if (gameData.gameState != "IN_PROGRESS") {
    return;
  }
  if (key == "Enter") {
    evaluateGuess();
  }
  else if (key == "Backspace") {
    backspaceGuess()
    updateTileLetters();
  }
  else if (alphabet.includes(key.toUpperCase())) {
    key = key.toUpperCase();
    addToGuess(key);
    updateTileLetters();
  }
  updateGameData();
}

function evaluateGuess() {
  if (gameData.boardState[gameData.guessIndex].length < 4) {
    alert("Please enter at least 4 characters.");
  }
  else {
    console.log(gameData.boardState[gameData.guessIndex]);
  }
}

function addToGuess(letter) {
  let guessLength = gameData.boardState[gameData.guessIndex].length;
  if (guessLength < 8) {
    gameData.boardState[gameData.guessIndex].push(letter);
  }
}

function backspaceGuess() {
  let guessLength = gameData.boardState[gameData.guessIndex].length;
  if (guessLength > 0) {
    gameData.boardState[gameData.guessIndex].pop();
  }
}

function updateTileLetters() {
  const boardHolder = document.getElementById("game-board");
  const guessLength = gameData.boardState[gameData.guessIndex].length;
  for (let i = 0; i < guessLength; i++) {
    boardHolder.children[0].children[i].innerHTML = gameData.boardState[gameData.guessIndex][i];
  }
}

function updateGameData() {
  localStorage.setItem("gameData", JSON.stringify(gameData));
}
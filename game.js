var wordLength = 5;
var correct_word = ['R', 'A', 'P', 'U', 'N', 'Z', 'E', 'L'];
const maxLength = 8;
const maxGuesses = 7;
var current_guess = [];
var guessLength = 0;
var guessNumber = 1;
var enabled = true;

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.addEventListener('keydown', function (event) {
  var key = event.key;
  keypressHandler(key);
}, false);

function virtualKeyPress(key) {
  keypressHandler(key);
}

function keypressHandler(key) {
  if (enabled) {
    if (key == "Backspace") {
      backspaceGuess();
    }
    else if (key == "Enter") {
      if (current_guess.length < 4) {
        alert("Please enter at least 4 characters");
      }
      else {
        checkGuess();
        guessNumber++;
        guessLength = 0;
        current_guess = [];
      }
    }
    else if (alphabet.includes(key.toUpperCase())) {
      addToGuess(key.toUpperCase());
    }
  }
}

function addToGuess(letter) {
  if (guessLength < 8) {
    current_guess.push(letter);
    guessLength = guessLength + 1;
    updateTileLetters();
  }
}
function backspaceGuess() {
  if (guessLength > 0) {
    current_guess.pop();
    guessLength = guessLength - 1;
    updateTileLetters();
  }
}
function updateTileLetters() {
  const word_guesses = document.getElementById(`guess_${guessNumber}`);
  for (let i = 0; i < maxLength; i++) {
    if (current_guess[i]) {
      word_guesses.children[i].innerHTML = current_guess[i];
    }
    else {
      word_guesses.children[i].innerHTML = "";
    }
  }
}
function checkGuess() {
  if (guessNumber >= maxGuesses) {
    enabled = false;
  }
  let temp_correct_word = [];
  for (let i = 0; i < correct_word.length; i++) {
    temp_correct_word.push(correct_word[i]);
  }
  const word_guesses = document.getElementById(`guess_${guessNumber}`);
  for (let i = 0; i < current_guess.length; i++) {
    if (current_guess[i] == correct_word[i]) {
      word_guesses.children[i].classList.add("correct");
      for (let j = 0; j < temp_correct_word.length; j++) {
        if (current_guess[i] == temp_correct_word[j]) {
          temp_correct_word.splice(j, 1);
          break;
        }
      }
    }
  }
  for (let i = 0; i < current_guess.length; i++) {
    if (temp_correct_word.includes(current_guess[i])) {
      if (!word_guesses.children[i].classList.contains("correct")) {
        word_guesses.children[i].classList.add("in-word");
        for (let j = 0; j < temp_correct_word.length; j++) {
          if (current_guess[i] == temp_correct_word[j]) {
            temp_correct_word.splice(j, 1);
            break;
          }
        }
      }
    }
  }
  for (let i = 0; i < current_guess.length; i++) {
    let classes = word_guesses.children[i].classList;
    if (classes.contains("in-word") || classes.contains("correct")) {
      continue;
    }
    else {
      word_guesses.children[i].classList.add("incorrect");
    }
  }
  if (current_guess.join("") == correct_word.join("")) {
    enabled = false;
    triggerVictory(guessNumber);
  }
  else if (guessNumber >= maxGuesses) {
    triggerLoss();
  }
}

function triggerVictory(guesses) {
  document.getElementById("results-modal").style.display = "block";
  document.getElementById("guess-count").innerHTML = `You completed the puzzle in ${guesses} guesses!`;
  document.getElementById("main-result").innerHTML = "Nice work!";
  document.getElementById("share-results").addEventListener("click", shareResults(guesses));
}
function triggerLoss() {
  document.getElementById("results-modal").style.display = "block";
  document.getElementById("main-result").innerHTML = "Good attempt!";
  document.getElementById("extra-note").innerHTML = "Try again tomorrow!";
}
function shareResults(tries) {
  const shareData = {
    text: `I completed the daily Disnerdle puzzle in ${tries} guesses!\r\n`,
    url: ""
  }
  navigator.share(shareData);
}
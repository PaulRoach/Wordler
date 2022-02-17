var wordLength = 5;
var correct_word = ['S', 'C', 'R', 'O', 'O', 'G', 'E'];
const maxLength = 8;
var current_guess = [];
var guessLength = 0;
var guessNumber = 1;
var enabled = true;

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.addEventListener('keydown', function (event) {
  var key = event.key;
  if (enabled) {
    if (key == "Backspace") {
      backspaceGuess();
    }
    else if (key == "Enter") {
      // console.log("enter");
      checkGuess();
      guessNumber++;
      guessLength = 0;
      current_guess = [];
    }
    else if (alphabet.includes(key.toUpperCase())) {
      addToGuess(key.toUpperCase());
    }
  }
}, false);

function addToGuess(letter) {
  if (guessLength < 8) {
    current_guess.push(letter);
    guessLength = guessLength + 1;
    // console.log(`Guess ${current_guess}\r\nLetters ${guessLength}`);
    updateTileLetters();
  }
}
function backspaceGuess() {
  if (guessLength > 0) {
    current_guess.pop();
    guessLength = guessLength - 1;
    // console.log(`Guess ${current_guess}\r\nLetters ${guessLength}`);
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
      word_guesses.children[i].classList.add("in-word");
      for (let j = 0; j < temp_correct_word.length; j++) {
        if (current_guess[i] == temp_correct_word[j]) {
          temp_correct_word.splice(j, 1);
          break;
        }
      }
    }
  }
  if (current_guess.join("") == correct_word.join("")) {
    console.log("Yay, you did it!");
    enabled = false;
  }
}
const guessedLettersElemnt = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// display circle symbol as placeholder for chosen word's letters
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault(); 
    message.innerText = ""; //empty message paragraph
    const guess = letterInput.value; // Let's grab what was entered in the input
    const goodGuess = validateInput(guess); //make sure it's a single letter
    if (goodGuess) {
        makeGuess(guess); //guess letter
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/; //lowercase and uppercase alphbetical letters
    if (input.length === 0) { //is input empty?
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) { // was more than one letter inputed?
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) { // was a num or special character inputed?
        message.innerText = "Please enter a letter, from A to Z.";
    } else {  // if a single letter is inputed
        return input;
    }
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guess that letter, silly. Try again."  // was a duplicate letter inputed?
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
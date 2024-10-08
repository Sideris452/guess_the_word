const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () { // call words from word database
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();


const placeholder = function (word) { // display circle symbol as placeholder for chosen word's letters
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault(); 
    message.innerText = ""; //empty message paragraph
    const guess = letterInput.value; // Let's grab what was entered in the input
    const goodGuess = validateInput(guess); //make sure it's a single letter
   
    if (goodGuess) {
        makeGuess(guess); //guess letter
    }
    letterInput.value = "";
});

const validateInput = function (input) { // validate input
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

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again."  // was a duplicate letter inputed?
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = ""; //clear the list
    for (const letter of guessedLetters) {
        const li = document.createElement("li"); //create list element
        li.innerText = letter; //list is of inputed letters
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); //make uppercase
    const wordArray = wordUpper.split(""); //return input as string array
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●"); //reveal matching letter over symbol
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin(); // if won
};

const updateGuessesRemaining = function (guess) { //show remaining guesses
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! the word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You guessed the correct word!</p>`;
        
        startOver();
    }
};

const startOver = function() {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() { //reset game
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerText = "";
    message.innerText = "";

    getWord();

    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});
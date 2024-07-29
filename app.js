const targetSentence = "You are   my life";
const maxAttempts = 6;
let currentAttempt = 0;
let currentGuess = "";
let numberOfSpace = 0;


//const gameBoard = document.getElementById("game-board");
const mainGameBoard = document.getElementById("main-gameboard");
const keyboard = document.getElementById("keyboard");
const test = document.getElementById("test");
const success = document.getElementById("yay");
const hiddenInput = document.getElementById("hidden-input");

// Create game board tiles
for (let i = 0; i < maxAttempts; i++) {
    let currentSpaces = 0;
    const gb = document.createElement("div");
    gb.classList.add("game-board");
    gb.setAttribute("id", `game-board-${i}`)
    mainGameBoard.appendChild(gb);

    for (let j = 0; j < targetSentence.length; j++) {
        const tile = document.createElement("div");
        if(targetSentence[j] === " "){
            tile.classList.add("empty-tile");
            if(i === 0){
                numberOfSpace++;
            }
            currentSpaces++;
        }
        else{
            tile.classList.add("tile");
            tile.setAttribute("id", `tile-${i}-${j-currentSpaces}`);
        }
        gb.appendChild(tile);
    }

    const newLine = document.createElement("div");
    newLine.classList.add("emptyRow");
    mainGameBoard.appendChild(newLine);
}

// Create keyboard
const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
keys.forEach(key => {
    const keyButton = document.createElement("div");
    keyButton.classList.add("key");
    keyButton.textContent = key;
    keyButton.addEventListener("click", () => handleKeyClick(key));
    keyboard.appendChild(keyButton);
});

const enterButton = document.createElement("div");
enterButton.classList.add("key");
enterButton.setAttribute("id", "enter-key");
enterButton.textContent = "entr";
enterButton.addEventListener("click", () => checkGuess());
keyboard.appendChild(enterButton);

const backspaceButton = document.createElement("div");
backspaceButton.classList.add("key");
backspaceButton.setAttribute("id", "backspace-key");
backspaceButton.textContent = "bck";
backspaceButton.addEventListener("click", () => {
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
});
keyboard.appendChild(backspaceButton);

function handleKeyClick(key) {
    if (currentGuess.length < targetSentence.length - numberOfSpace) {
        currentGuess += key;
        updateBoard();
    }
}

function updateBoard() {
    let guessesEmpty = 0;

    for (let i = 0; i < currentGuess.length; i++) {
        const tile = document.getElementById(`tile-${currentAttempt}-${i}`);
        tile.textContent = currentGuess[i];
        guessesEmpty++;
    }
    for(let j = guessesEmpty; j < targetSentence.length - numberOfSpace; j++){
        const tile = document.getElementById(`tile-${currentAttempt}-${j}`);
        tile.textContent = " ";
    }
}

function checkGuess() {
    if (currentGuess.length !== targetSentence.length - numberOfSpace) return;
    let removedSpacesText = targetSentence
    .split(" ")
    .join("")
    .toUpperCase();
    console.log("Target Sentence - " + targetSentence);
    console.log("Guessed Sentence - " + currentGuess);
    console.log("Spaceless Sentence - " + removedSpacesText);
    for (let i = 0; i < targetSentence.length - numberOfSpace; i++) {
        const tile = document.getElementById(`tile-${currentAttempt}-${i}`);
        if (currentGuess[i] === removedSpacesText[i]) {
            tile.classList.add("correct");
        } else if (removedSpacesText.includes(currentGuess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (currentGuess === removedSpacesText) {
        mainGameBoard.textContent = "";
        keyboard.textContent = "";
        success.classList.add("success");
    } else {
        currentAttempt++;
        currentGuess = "";
        if (currentAttempt === maxAttempts) {
            alert("Game Over! The correct sentence was: " + targetSentence);
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkGuess();
    } else if (event.key === "Backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleKeyClick(event.key.toUpperCase());
    }
});
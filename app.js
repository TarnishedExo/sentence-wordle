const targetSentence = "Will you marry me";
const maxAttempts = 6;
let currentAttempt = 0;
let currentGuess = "";

const gameBoard = document.getElementById("game-board");
const keyboard = document.getElementById("keyboard");
const test = document.getElementById("test");

// Create game board tiles
for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < targetSentence.length; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.setAttribute("id", `tile-${i}-${j}`);
        gameBoard.appendChild(tile);
    }
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

function handleKeyClick(key) {
    if (currentGuess.length < targetSentence.length) {
        currentGuess += key;
        updateBoard();
    }
}

function updateBoard() {
    for (let i = 0; i < currentGuess.length; i++) {
        const tile = document.getElementById(`tile-${currentAttempt}-${i}`);
        tile.textContent = currentGuess[i];
    }
}

function checkGuess() {
    if (currentGuess.length !== targetSentence.length) return;

    for (let i = 0; i < targetSentence.length; i++) {
        const tile = document.getElementById(`tile-${currentAttempt}-${i}`);
        if (currentGuess[i] === targetSentence[i]) {
            tile.classList.add("correct");
        } else if (targetSentence.includes(currentGuess[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (currentGuess === targetSentence) {
        alert("Congratulations! Will you marry me?");
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
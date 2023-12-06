//scripts for the hangman game

let playerScore = 0; 

function updateScore() {
    document.getElementById('score').textContent = playerScore;
}


function startNewGame() {
    resetGame();
    playerScore = 0;  
    updateScore();
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

function startGame() {
    //it start where if u click it,it would show u the game
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('second-screen').style.display = 'block';
    selectDifficulty(level);
}

document.getElementById('easy-button').addEventListener('click', function () {
    selectDifficulty('easy');
});
document.getElementById('normal-button').addEventListener('click', function () {
    selectDifficulty('normal');
});
document.getElementById('hard-button').addEventListener('click', function () {
    selectDifficulty('hard');
});
let difficultyLevel = "easy"; 


function selectDifficulty(level) {
    difficultyLevel = level;
    document.getElementById('second-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    resetGame();
    getRandomWord();
}

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");



let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "hangman-0.svg";
    guessesText.innerText = wrongGuessCount + " / " + maxGuesses;
    wordDisplay.innerHTML = currentWord.split("").map(function () {
        return "<li class='letter'></li>";
    }).join("");
    keyboardDiv.querySelectorAll("button").forEach(function (btn) {
        btn.disabled = false;
    });
    gameModal.classList.remove("show");
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordList[difficultyLevel].length);
    const wordObj = wordList[difficultyLevel][randomIndex];
    currentWord = wordObj.word;
    document.querySelector(".hint-text b").innerText = wordObj.hint;
    resetGame();
}


function gameOver(isVictory) {
    // when the game is done this will show whether it is win or lose.
    const modalText = isVictory ? "You found the word:" : 'The correct word was:';
    const imgSrc = isVictory ? 'koriquew' : 'wrong';
    gameModal.querySelector("img").src = imgSrc + ".gif";
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = modalText + " <b>" + currentWord + "</b>";
    gameModal.classList.add("show");

  
     const playAgainButton = document.getElementById('play-again-button');
        playAgainButton.style.display = 'inline-block';
     
    
     const newGameButton = document.getElementById('new-game-button');
        newGameButton.style.display = 'none';


}


function initGame(button, clickedLetter) {
    // Checking if clickedLetter exists in the currentWord
    if (currentWord.includes(clickedLetter)) {
        // Show all the correct letters
        [...currentWord].forEach(function (letter, index) {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // this is under incorrect guesses, if wrong click then hangman updates and the number of wrongs also.
        wrongGuessCount++;
        hangmanImage.src = "hangman-" + wrongGuessCount + ".svg";
    }
    button.disabled = true; // disables the clicked letter
    guessesText.innerText = wrongGuessCount + " / " + maxGuesses;

    // Calling gameOver function if any of these conditions meet
    if (wrongGuessCount === maxGuesses || correctLetters.length === currentWord.length) {
        if (correctLetters.length === currentWord.length) {
            playerScore += 1;
            updateScore();
        } else {
            playerScore -= 1;
            updateScore();
        }

        gameOver(correctLetters.length === currentWord.length);
    }
}

//this is for a keyboard
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", function (e) {
        return initGame(e.target, String.fromCharCode(i));
    });
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);


function playAgain() {
    resetGame();
    getRandomWord();
    document.getElementById('play-again-button').style.display = 'none';
}

document.getElementById('new-game-button').addEventListener('click', startNewGame);
document.getElementById('play-again-button').addEventListener('click', playAgain);

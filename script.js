// ================================
// THE MISSING NECKLACE
// GAME STATE & PROGRESSION
// ================================

// Game states
const GAME_STATES = {
    START: "start",
    PLAYING: "playing",
    PAUSED: "paused",
    WIN: "win",
    LOSE: "lose"
};

let gameState = GAME_STATES.START;

let score = 0;
let cluesFound = 0;
let timeLeft = 60;
let timer = null;

// High score saved in browser
let highScore = Number(localStorage.getItem("necklaceHighScore")) || 0;

// Correct thief
const correctThief = "David";

// Clues
const clues = {
    1: "🔎 You found a broken button near the table!",
    2: "🔎 You found muddy footprints near the window!",
    3: "🔎 You found a note inside the bag mentioning David!"
};


// ================================
// START GAME
// ================================

function startGame() {

    gameState = GAME_STATES.PLAYING;

    score = 0;
    cluesFound = 0;
    timeLeft = 60;

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("pauseScreen").style.display = "none";

    document.getElementById("result").innerHTML = "";

    updateDisplay();

    startTimer();
}


// ================================
// TIMER
// ================================

function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        if (gameState !== GAME_STATES.PLAYING) {
            return;
        }

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            timeLeft = 0;
            loseGame();
        }

    }, 1000);
}


// ================================
// FIND CLUE
// ================================

function findClue(clueNumber) {

    if (gameState !== GAME_STATES.PLAYING) {
        return;
    }

    const button = document.querySelector(
        `.object:nth-child(${clueNumber})`
    );

    // Prevent collecting the same clue twice
    if (button && button.disabled) {
        return;
    }

    if (button) {
        button.disabled = true;
        button.style.opacity = "0.5";
    }

    cluesFound++;

    // Score increases for every new clue
    score += 100;

    document.getElementById("clueBox").innerHTML =
        clues[clueNumber];

    updateDisplay();

    // All clues found
    if (cluesFound === 3) {

        document.getElementById("clueBox").innerHTML +=
            "<br><br>💡 You found all the clues! Now identify the thief.";

        // Bonus for finding all clues
        score += 200;

        updateDisplay();
    }
}


// ================================
// CHECK SUSPECT
// ================================

function checkAnswer(suspect) {

    if (gameState !== GAME_STATES.PLAYING) {
        return;
    }

    // Player must find all clues first
    if (cluesFound < 3) {

        document.getElementById("result").innerHTML =
            "🔍 Find all 3 clues before identifying the thief!";

        return;
    }

    if (suspect === correctThief) {

        score += 500;

        winGame();

    } else {

        loseGame();
    }
}


// ================================
// WIN
// ================================

function winGame() {

    gameState = GAME_STATES.WIN;

    clearInterval(timer);

    saveHighScore();

    document.getElementById("result").innerHTML =
        `
        <h2>🎉 CASE SOLVED!</h2>
        <p>David was the thief!</p>
        <p>⭐ Final Score: ${score}</p>
        <p>🏆 High Score: ${highScore}</p>
        `;

    disableGameButtons();
}


// ================================
// LOSE
// ================================

function loseGame() {

    gameState = GAME_STATES.LOSE;

    clearInterval(timer);

    document.getElementById("result").innerHTML =
        `
        <h2>😔 CASE FAILED!</h2>
        <p>The investigation is over.</p>
        <p>⭐ Score: ${score}</p>
        <button onclick="restartGame()">🔄 Try Again</button>
        `;

    disableGameButtons();
}


// ================================
// PAUSE
// ================================

function pauseGame() {

    if (gameState !== GAME_STATES.PLAYING) {
        return;
    }

    gameState = GAME_STATES.PAUSED;

    document.getElementById("pauseScreen").style.display = "flex";
}


// ================================
// RESUME
// ================================

function resumeGame() {

    if (gameState !== GAME_STATES.PAUSED) {
        return;
    }

    gameState = GAME_STATES.PLAYING;

    document.getElementById("pauseScreen").style.display = "none";
}


// ================================
// RESTART
// ================================

function restartGame() {

    clearInterval(timer);

    gameState = GAME_STATES.START;

    score = 0;
    cluesFound = 0;
    timeLeft = 60;

    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("pauseScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "flex";

    document.getElementById("clueBox").innerHTML =
        "🔍 Click the objects in the room to investigate.";

    document.getElementById("result").innerHTML = "";

    // Enable clues again
    const objects = document.querySelectorAll(".object");

    objects.forEach(function(button) {
        button.disabled = false;
        button.style.opacity = "1";
    });

    updateDisplay();
}


// ================================
// DISPLAY
// ================================

function updateDisplay() {

    document.getElementById("clueCount").innerText =
        `${cluesFound} / 3`;

    document.getElementById("score").innerText =
        score;

    document.getElementById("timer").innerText =
        timeLeft;
}


// ================================
// HIGH SCORE
// ================================

function saveHighScore() {

    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "necklaceHighScore",
            highScore
        );
    }
}


// ================================
// DISABLE GAME BUTTONS
// ================================

function disableGameButtons() {

    const objects = document.querySelectorAll(".object");

    objects.forEach(function(button) {
        button.disabled = true;
    });

    const suspects = document.querySelectorAll(".suspect");

    suspects.forEach(function(button) {
        button.disabled = true;
    });
}

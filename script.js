let cluesFound = [];
let score = 0;
let timeLeft = 60;
let timerInterval;

let clues = {
    1: "🔵 A piece of blue cloth was found on the table.",
    2: "👣 Muddy footprints were found near the window.",
    3: "📝 A note says Lisa was seen near the window."
};

function startGame() {

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    startTimer();
}

function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 60;

    document.getElementById("timer").innerHTML = timeLeft;

    timerInterval = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").innerHTML = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            document.getElementById("result").innerHTML =
                "⏰ TIME'S UP!<br>❌ CASE FAILED!";

            document.getElementById("suspects").style.display = "none";
        }

    }, 1000);
}

function findClue(number) {

    if (cluesFound.includes(number)) {

        document.getElementById("clueBox").innerHTML =
            "🔍 You already investigated this object.";

        return;
    }

    cluesFound.push(number);

    score += 10;

    document.getElementById("score").innerHTML = score;

    document.getElementById("clueBox").innerHTML =
        clues[number];

    document.getElementById("clueCount").innerHTML =
        cluesFound.length + " / 3";

    if (cluesFound.length === 3) {

        document.getElementById("clueBox").innerHTML =
            "🔎 All clues discovered! Identify the thief.";

        document.getElementById("suspects").style.display =
            "block";
    }
}

function checkAnswer(name) {

    clearInterval(timerInterval);

    let result = document.getElementById("result");

    if (name === "Lisa") {

        score += 50;

        document.getElementById("score").innerHTML = score;

        result.innerHTML =
            "🎉 CASE SOLVED!<br>" +
            "Lisa was the thief!<br>" +
            "⭐ Final Score: " + score;

    } else {

        result.innerHTML =
            "❌ WRONG SUSPECT!<br>" +
            "Try again!";
    }
}

function restartGame() {

    clearInterval(timerInterval);

    cluesFound = [];
    score = 0;
    timeLeft = 60;

    document.getElementById("startScreen").style.display = "flex";

    document.getElementById("gameScreen").style.display = "none";

    document.getElementById("clueCount").innerHTML = "0 / 3";

    document.getElementById("score").innerHTML = "0";

    document.getElementById("timer").innerHTML = "60";

    document.getElementById("clueBox").innerHTML =
        "🔍 Click the objects in the room to investigate.";

    document.getElementById("suspects").style.display = "none";

    document.getElementById("result").innerHTML = "";
}
function pauseGame() {

    clearInterval(timerInterval);

    document.getElementById("pauseScreen").style.display =
        "flex";
}

function resumeGame() {

    document.getElementById("pauseScreen").style.display =
        "none";

    timerInterval = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").innerHTML =
            timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            document.getElementById("result").innerHTML =
                "⏰ TIME'S UP!<br>❌ CASE FAILED!";

            document.getElementById("suspects").style.display =
                "none";
        }

    }, 1000);
}
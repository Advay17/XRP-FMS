const modeButtons = document.getElementsByClassName("mode-button");
const settingsIcon = document.getElementById("settings-icon");
const statusElement = document.getElementById("status");
const timerElement = document.getElementById("timer");

let autoTime = 15; // Default autonomous time
let teleopTime = 135; // Default teleop time
let timeLeft = 0;
let timerInterval;
let currentMode = "Disabled";

function setMode(mode) {
    clearInterval(timerInterval);
    if (mode === "Disabled") {
        currentMode = mode;
        statusElement.textContent = "Status: Disabled";
        timerElement.textContent = `Time Left: 0:00`;
    } else if (mode === "Match") {
        startMatchSequence();
    } else {
        currentMode = mode;
        statusElement.textContent = `Status: ${mode}`;
        timeLeft = (mode === "Auto") ? autoTime : teleopTime;
        updateTimer();
        startTimer();
    }
}

function startMatchSequence() {
    statusElement.textContent = "Status: Autonomous";
    timeLeft = autoTime;
    startTimer(() => {
        statusElement.textContent = "Status: TeleOp";
        timeLeft = teleopTime;
        startTimer(() => {
            setMode("Disabled");
        });
    });
}

function startTimer(callback) {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (callback) callback();
        } else {
            timeLeft--;
            updateTimer();
        }
    }, 1000);
}

function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerElement.textContent = `Time Left: ${mins}:${secs.toString().padStart(2, '0')}`;
}

// Disable buttons unless in Disabled mode
for (let btn of modeButtons) {
    btn.onclick = () => {
        if (currentMode === "Disabled" || btn.textContent === "Disabled") {
            setMode(btn.textContent);
        }
    };
}

// Settings Modal Behavior
settingsIcon.onclick = () => {
    document.getElementById("settings-modal").classList.remove("hidden");
    document.getElementById("center-display").classList.add("hidden");
    document.getElementById("alliances-container").classList.add("hidden");
    settingsIcon.classList.add("hidden");
};

document.getElementById("auto-time").oninput = (e) => autoTime = e.target.valueAsNumber || 15;
document.getElementById("teleop-time").oninput = (e) => teleopTime = e.target.valueAsNumber || 135;

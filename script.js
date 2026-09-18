let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(hours).padStart(2, "0")}:` +
           `${String(minutes).padStart(2, "0")}:` +
           `${String(seconds).padStart(2, "0")}.` +
           `${String(milliseconds).padStart(2, "0")}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {

    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);
});

pauseBtn.addEventListener("click", () => {

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;

    display.textContent = "00:00:00.00";
    lapsList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {

    if (elapsedTime === 0) {
        return;
    }

    lapCount++;

    const lap = document.createElement("li");

    lap.textContent = `Lap ${lapCount} — ${formatTime(elapsedTime)}`;

    lapsList.prepend(lap);
});
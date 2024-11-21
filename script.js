let startTime, intervalId;
let elapsedTime = 0;
let isRunning = false;

// Elements
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

// Start button event
startButton.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
        toggleButtons(true);
    }
});

// Pause button event
pauseButton.addEventListener("click", () => {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    toggleButtons(false);
});

// Reset button event
resetButton.addEventListener("click", () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay(0, 0, 0);
    lapsList.innerHTML = "";
    toggleButtons(false, true);
});

// Lap button event
lapButton.addEventListener("click", () => {
    const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
});

// Update time
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    updateDisplay(minutes, seconds, milliseconds);
}

// Update display
function updateDisplay(minutes, seconds, milliseconds) {
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
    millisecondsEl.textContent = String(milliseconds).padStart(2, "0");
}

// Toggle button states
function toggleButtons(running, reset = false) {
    startButton.disabled = running;
    pauseButton.disabled = !running;
    lapButton.disabled = !running;
    resetButton.disabled = reset;
}

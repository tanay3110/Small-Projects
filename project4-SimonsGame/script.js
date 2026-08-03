// ===== SIMON LIGHTNING — FULL GAME LOGIC =====

let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let score = 0;
let highScore = 0;

// DOM refs
let statusEl = document.querySelector("#status");
let scoreEl = document.querySelector("#score");
let highScoreEl = document.querySelector("#highScore");
let startBtn = document.querySelector("#startBtn");
let restartBtn = document.querySelector("#restartBtn");
let gameOverEl = document.querySelector("#gameOver");
let finalScoreEl = document.querySelector("#finalScore");
let finalBestEl = document.querySelector("#finalBest");
let allBtns = document.querySelectorAll(".btn");
let body = document.querySelector("body");

// Load high score from localStorage
highScore = Number(localStorage.getItem("simonHighScore")) || 0;
highScoreEl.innerText = highScore;

// ===== SOUND EFFECTS (Web Audio API) =====
let audioCtx = null;

function playSound(color) {
    // Create audio context lazily (needs user gesture)
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const freqs = {
        red: 220,
        green: 330,
        yellow: 440,
        blue: 550
    };

    const freq = freqs[color] || 440;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
}

function playWrongSound() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(180, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(60, audioCtx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
}

// ===== FLASH FUNCTIONS =====
function btnFlash(btn, className) {
    btn.classList.add(className);
    setTimeout(() => {
        btn.classList.remove(className);
    }, 250);
}

// ===== GAME START =====
function startGame() {
    if (started) return;
    started = true;
    score = 0;
    level = 0;
    gameSeq = [];
    userSeq = [];
    scoreEl.innerText = "0";
    statusEl.innerText = "Get ready...";
    setTimeout(levelUp, 400);
}

// ===== LEVEL UP =====
function levelUp() {
    level++;
    score = gameSeq.length; // score = number of correct steps
    scoreEl.innerText = score;
    statusEl.innerText = `Level ${level}`;
    statusEl.classList.remove("accent-text");
    void statusEl.offsetWidth; // restart animation
    statusEl.classList.add("accent-text");

    // Pick a random button (0-3, all 4 colors)
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    playSound(randColor);

    // Play the whole sequence to the user
    let i = 0;
    const interval = setInterval(() => {
        if (i >= gameSeq.length) {
            clearInterval(interval);
            userSeq = [];
            return;
        }
        let color = gameSeq[i];
        let btn = document.querySelector(`.${color}`);
        btnFlash(btn, "flash");
        playSound(color);
        i++;
    }, 550);
}

// ===== USER PRESS HANDLING =====
function btnPress() {
    if (!started) return;

    const color = this.dataset.color;
    const btn = this;

    btnFlash(btn, "userflash");
    playSound(color);

    userSeq.push(color);

    // Check if the user's last press matches the sequence
    let idx = userSeq.length - 1;
    if (userSeq[idx] !== gameSeq[idx]) {
        // WRONG!
        gameOver();
        return;
    }

    // If the full sequence is matched, go to next level
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 600);
    }
}

// ===== GAME OVER =====
function gameOver() {
    started = false;
    playWrongSound();

    // Flash all buttons red / shake
    allBtns.forEach(b => {
        b.classList.add("wrong");
        setTimeout(() => b.classList.remove("wrong"), 500);
    });
    body.classList.add("gameover");
    setTimeout(() => body.classList.remove("gameover"), 800);

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("simonHighScore", highScore);
        highScoreEl.innerText = highScore;
    }

    // Show overlay
    finalScoreEl.innerText = score;
    finalBestEl.innerText = highScore;
    gameOverEl.classList.remove("hidden");
    statusEl.innerText = "Game Over! Press PLAY AGAIN to retry.";
}

// ===== RESTART =====
function restartGame() {
    gameOverEl.classList.add("hidden");
    startGame();
}

// ===== EVENT LISTENERS =====
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

// Start with keyboard (space or any key) as backup
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        e.preventDefault();
        if (!started) startGame();
    }
});

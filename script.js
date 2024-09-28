const greenButton = document.getElementById('green');
const redButton = document.getElementById('red');
const yellowButton = document.getElementById('yellow');
const blueButton = document.getElementById('blue');
const startButton = document.getElementById('start-button');
const statusText = document.getElementById('status');
const scoreText = document.getElementById('score');

let sequence = [];
let playerSequence = [];
let level = 0;
let colors = ['green', 'red', 'yellow', 'blue'];
let score = 0;

const playSound = (color) => {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
};

const flashColor = (color) => {
    const button = document.getElementById(color);
    button.classList.add('glow');
    playSound(color);
    setTimeout(() => {
        button.classList.remove('glow');
    }, 500);
};

const playSequence = async () => {
    for (let color of sequence) {
        await new Promise(resolve => {
            setTimeout(() => {
                flashColor(color);
                resolve();
            }, 700 - level * 20); // Speed up as levels increase
        });
    }
};

const startNewLevel = () => {
    level++;
    score += 10;  // Increase score by 10 points each level
    scoreText.textContent = `Score: ${score}`;
    playerSequence = [];
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    statusText.textContent = `Level ${level}`;
    playSequence();
};

const handlePlayerInput = (color) => {
    playerSequence.push(color);
    flashColor(color);
    
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        gameOver();
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        setTimeout(startNewLevel, 1000);
    }
};

const gameOver = () => {
    statusText.textContent = `Game Over! You reached Level ${level} with a score of ${score}. Press Start to play again.`;
    level = 0;
    sequence = [];
    playerSequence = [];
    score = 0;
    scoreText.textContent = `Score: ${score}`;
    // Trigger confetti effect (if using confetti from earlier code)
    for (let i = 0; i < 100; i++) {
        createConfettiPiece();
    }
};

// Confetti effect
const createConfettiPiece = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    document.body.appendChild(confetti);
    const hue = Math.random() * 360;
    confetti.style.setProperty('--hue', hue);
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    setTimeout(() => confetti.remove(), 5000);
};

greenButton.addEventListener('click', () => handlePlayerInput('green'));
redButton.addEventListener('click', () => handlePlayerInput('red'));
yellowButton.addEventListener('click', () => handlePlayerInput('yellow'));
blueButton.addEventListener('click', () => handlePlayerInput('blue'));

startButton.addEventListener('click', () => {
    statusText.textContent = 'Get ready!';
    setTimeout(startNewLevel, 1000);
});

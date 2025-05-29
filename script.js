// Pointer les differents elements
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const popSound = new Audio("assets/pop.mp3");
const backgroundMusic = new Audio("assets/background.mp3");
const endSound = new Audio("assets/end.mp3");
const restartSound = new Audio("assets/restart.mp3");
const endMessage = document.getElementById("end-message");
const finalScore = document.getElementById("final-score");
const timerDisplay = document.getElementById("timer");
const replayButton = document.getElementById("replay-button");
let score = 0;
let timeLeft = 60;

// Musique de fond en boucle
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3; // Volume réduit pour ne pas gêner

// Liste de couleurs possibles
const colors = [
  "#FF4B5C",
  "#56CFE1",
  "#4ADEDE",
  "#FFD166",
  "#06D6A0",
  "#8338EC",
  "#fbbb03",
];

// Creation d'une bulle
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  //   Position horizontale aleatoire
  const x = Math.random() * (window.innerWidth - 150);
  bubble.style.left = `${x}px`;

  //   Couleur aleatoire
  const color = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.backgroundColor = color;

  //   Duree d'animation aleatoire
  const duration = 3 + Math.random() * 4;
  bubble.style.animationDuration = `${duration}s`;

  //   Quand on clique sur la bulle
  bubble.addEventListener("click", () => {
    bubble.remove(); // Supprime la bulle
    score++;
    scoreDisplay.textContent = score;
    popSound.currentTime = 0; // reinitialise le son
    popSound.play(); // Joue le son
  });

  //   Supprime la bulle quand il sort de l'ecran
  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });

  gameContainer.appendChild(bubble);
}

// Genere une bulle toutes les 500 millisecondes
setInterval(createBubble, 1000);

let bubbleInterval;
let gameTimer;

function startGame() {
  bubbleInterval = setInterval(createBubble, 1000);
  backgroundMusic.currentTime = 0;
  backgroundMusic.play();

  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(bubbleInterval);

      document.querySelectorAll(".bubble").forEach((b) => b.remove());

      backgroundMusic.pause();
      endSound.play();

      finalScore.textContent = score;
      endMessage.style.display = "block";
    }
  }, 1500);
}

// Démarrage initial
startGame();

replayButton.addEventListener("click", () => {
  // Réinitialise les variables
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;

  // Cache le message de fin
  endMessage.style.display = "none";

  restartSound.play();

  // Redémarre les intervalles
  startGame();
});

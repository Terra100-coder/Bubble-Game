// Pointer les differents elements
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Liste de couleurs possibles
const colors = [
  "#FF4B5C",
  "#56CFE1",
  "#4ADEDE",
  "#FFD166",
  "#06D6A0",
  "#8338EC",
];

// Creation d'une bulle
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  //   Position horizontale aleatoire
  const x = Math.random() * (window.innerWidth - 40);
  bubble.style.left = `${x}px`;

  //   Couleur aleatoire
  const color = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.backgroundColor = color;

  //   Duree d'animation aleatoire
  const duration = 4 + Math.random() * 3;
  bubble.style.animationDuration = `${duration}s`;

  //   Quand on clique sur la bulle
  bubble.addEventListener("click", () => {
    bubble.remove(); // Supprime la bulle
    score++;
    scoreDisplay.textContent = score;
  });

  //   Supprime la bulle quand il sort de l'ecran
  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });

  gameContainer.appendChild(bubble);
}

// Genere une bulle toutes les 500 millisecondes
setInterval(createBubble, 1000);

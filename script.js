const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const gameContainer = document.getElementById("game-container");
let cards = [
  "cash.png",
  "crash.png",
  "marlee.png",
  "winston.png",
  "yuna.png",
  "kitte.png",
  "cash.png",
  "crash.png",
  "marlee.png",
  "winston.png",
  "yuna.png",
  "kitte.png",
];

function duplicate(array, duplicator) {
  let buildDeck = [];
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < duplicator; j++) {
      buildDeck.push(array[i]);
    }
  }
  return buildDeck;
}

duplicate(cards, 2);

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

startButton.addEventListener("click", () => {
  let shuffledCards = shuffle(cards);
  for (let item of shuffledCards) {
    let card = document.createElement("img");
    card.classList.add("images");
    card.src = `/images/${item}`;
    gameContainer.appendChild(card);
  }
  console.log(shuffledCards);
});

// card.addEventListener("click", (event) => {
//   event.target.classList.add("flip");
// });

resetButton.addEventListener("click", (event) => {
    let cards = document.querySelectorAll(".images");
    cards.forEach(card => {
        gameContainer.removeChild(card);
    });
});

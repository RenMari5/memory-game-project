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
let gameCards = document.querySelectorAll(".images");

// function duplicate(array, duplicator) {
//   let buildDeck = [];
//   for (i = 0; i < array.length; i++) {
//     for (j = 0; j < duplicator; j++) {
//       buildDeck.push(array[i]);
//     }
//   }
//   return buildDeck;
// }

// duplicate(cards, 2);

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
    let flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    let cardFront = document.createElement("img");
    cardFront.classList.add("images");
    cardFront.classList.add("flip-card-front");
    cardFront.src = `/images/${item}`;

    let cardBack = document.createElement("img");
    cardBack.classList.add("images");
    cardBack.classList.add("flip-card-back");
    cardBack.src = "/images/Untitled design.png";

    flipCard.addEventListener("click", (e) => {
      cardFront.classList.add("toggle-card");
      cardBack.classList.add("toggle-card");
    });

    flipCard.appendChild(cardFront);
    flipCard.appendChild(cardBack);

    gameContainer.appendChild(flipCard);
  }
  startButton.disabled = true;
});

// flipCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     card.classList.toggle("flip-card");
//   });
// });

resetButton.addEventListener("click", () => {
  // Don't know why this isn't working now, it should be deleting each div with a class of .card
  const flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach((item) => {
    gameContainer.removeChild(item);
  });
  startButton.disabled = false;
  return flipCards;
});

// //matched cards
// const matchCards = () => {
//   // console.log(e);
//   // const matchedCard = e.target;
//   const flipCard = document.querySelectorAll(".toggle-card");

//   if (flipCard[0].src === flipCard[1].src){
//     console.log("matchCard");
//   }
// };

// matchCards();

let matchHandler = function (event) {
  let matchCard = document.querySelectorAll(".flip-card");
  matchCard.addEventListener("click", () => {
    if (flipCard[0].src.value === flipCard[1].src.value) {
      console.log(matchCard);
    }
  });
};

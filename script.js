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
];

let [seconds, minutes] = [0, 0];
let timerRef = document.getElementById("timerDisplay");
let int = null;

function duplicate(array) {
  let buildDeck = [...array];
  for (i = 0; i < array.length; i++) {
    buildDeck.push(array[i]);
  }
  return buildDeck;
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createCards(arrayOfCards) {
  for (let item of arrayOfCards) {
    let flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    let cardFront = document.createElement("img");
    cardFront.classList.add("images");
    cardFront.classList.add("flip-card-front");
    cardFront.src = `/images/${item}`;

    let cardBack = document.createElement("img");
    cardBack.classList.add("images");
    cardBack.classList.add("flip-card-back");
    cardBack.src = "/images/lessMuted.png";

    flipCard.addEventListener("click", () => {
      cardFront.classList.add("toggle-card");
      cardBack.classList.add("toggle-card");
      matchCards();
    });

    flipCard.appendChild(cardFront);
    flipCard.appendChild(cardBack);

    gameContainer.appendChild(flipCard);
  }
}

function removeToggle(element) {
  element.classList.remove("toggle-card");
}

function removeCards(arrayOfCards) {
  arrayOfCards.forEach((item) => {
    item.parentElement.removeChild(item);
  });
  return arrayOfCards;
}

startButton.addEventListener("click", () => {
  let duplicateCards = duplicate(cards);
  let shuffledCards = shuffle(duplicateCards);

  createCards(shuffledCards);

  startButton.disabled = true;

  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 1000);
});

resetButton.addEventListener("click", () => {
  let arrayOfCards = document.querySelectorAll(".flip-card");
  removeCards(arrayOfCards);

  startButton.disabled = false;

  clearInterval(int);
  [seconds, minutes] = [0, 0];
  timerRef.innerHTML = "00 : 00";
});

function displayTimer() {
  seconds += 1;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
    }
  }

  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  timerRef.innerHTML = `${m} : ${s}`;
}

// whole function works, with delays! Now we just need to end the game
function matchCards() {
  let toggledCards = document.querySelectorAll(".toggle-card");

  if (toggledCards.length === 4) {
    if (toggledCards[0].src === toggledCards[2].src) {
      console.log("match");
      setTimeout(removeCards, 1000, toggledCards);
    } else {
      console.log("not a match");
      toggledCards.forEach((element) => {
        setTimeout(removeToggle, 1000, element);
      }); 
    }
  }
}
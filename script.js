const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const gameContainer = document.getElementById("game-container");
const youWon = document.getElementById("you-won");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");
const changeDifficultyButton = document.getElementById("change-difficulty");
let easyMode = false;
let hardMode = false;
let counter = 0;

let cards = [
  "beemo.png",
  "cash.png",
  "crash.png",
  "marlee.png",
  "winston.png",
  "yuna.png",
  "kitte.png",
  "eevee.png",
  "pablo.png",
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

function createCards(array) {
  for (let item of array) {
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

    cardBack.addEventListener("click", function toggleCard() {
      counter++;
      console.log(counter);
      if (counter <= 2) {
        cardFront.classList.add("toggle-card");
        cardBack.classList.add("toggle-card");

        matchCards();
      }
    });

    flipCard.appendChild(cardFront);
    flipCard.appendChild(cardBack);

    gameContainer.appendChild(flipCard);
  }
}

function removeToggle(element) {
  element.classList.remove("toggle-card");
  counter = 0;
}

function removeCards(array) {
  array.forEach((item) => {
    item.parentElement.removeChild(item);
  });
  counter = 0;
  return array;
}

startButton.addEventListener("click", () => {
  // shuffled cards first to get random selection, then decide if we want all of the cards based on if we're in hard or easy mode,
  // then create our game based on the amount of cards picked
  let shuffledCards = shuffle(cards);
  if (easyMode === true) {
    cards = shuffledCards.splice(0, 6);
  }
  let duplicateCards = duplicate(cards);

  createCards(duplicateCards);

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

  youWon.style.display = "none";

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

// Need to add winner banner, can be in the if (remainincards.length) loop
function matchCards() {
  let toggledCards = document.querySelectorAll(".toggle-card");
  let allCards = document.querySelectorAll(".flip-card");
  let remainingCards = document.querySelectorAll(".flip-card-front");

  if (toggledCards.length === 4 && counter >= 2) {
    if (toggledCards[0].src === toggledCards[2].src) {
      setTimeout(removeCards, 1000, toggledCards);

      if (remainingCards.length <= 2) {
        clearInterval(int);
        youWon.style.display = "flex";
      }
    } else {
      toggledCards.forEach((element) => {
        setTimeout(removeToggle, 1000, element);
      });
    }
  }
}

//adding hide and show functions so that we can have a main page
//that shows difficulty levels, click one, then it'll dissapear levels
//and have the start, timer, reset, and change difficulty buttons appear
//so you can play the game -KJ
//hide and show functions

function hideEasyButton() {
  easyButton.style.display = "none";
}

function showEasyButton() {
  easyButton.style.display = "";
}

function hideHardButton() {
  hardButton.style.display = "none";
}

function showHardButton() {
  hardButton.style.display = "";
}

function hideChangeDifficultyButton() {
  changeDifficultyButton.style.display = "none";
}

function showChangeDifficultyButton() {
  changeDifficultyButton.style.display = "";
}

function hideStartButton() {
  startButton.style.display = "none";
}

function showStartButton() {
  startButton.style.display = "";
}

function hideResetButton() {
  resetButton.style.display = "none";
}

function showResetButton() {
  resetButton.style.display = "";
}

function hideTimer() {
  timerRef.style.display = "none";
}

function showTimer() {
  timerRef.style.display = "";
}

// hideEasyButton();
// hideHardButton();
hideChangeDifficultyButton();
hideStartButton();
hideTimer();
hideResetButton();

//creating a funtion that when east is clicked, hides easy and hard button, shows start/reset/timer/changedifficulty

//if easy is clicked, show change difficulty, start, reset, and timer - hide easy and hard
//if change difficulty is clicked, show easy and hard, hide change difficulty, start, reset, and timer

easyButton.addEventListener("click", () => {
  showResetButton();
  showStartButton();
  showChangeDifficultyButton();
  showTimer();
  hideEasyButton();
  hideHardButton();

  easyButton.disabled = true;
  easyMode = true;
});

// I just copied the code from the easy button
hardButton.addEventListener("click", () => {
  showResetButton();
  showStartButton();
  showChangeDifficultyButton();
  showTimer();
  hideEasyButton();
  hideHardButton();

  hardButton.disabled = true;
  hardMode = true;
});

changeDifficultyButton.addEventListener("click", () => {
  hideChangeDifficultyButton();
  hideStartButton();
  hideTimer();
  hideResetButton();
  showEasyButton();
  showHardButton();
});

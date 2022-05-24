const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
let cards = ['eevee-memory.jpg', 'winston-memory-2.jpg', 'pudge.jpg', 'smudge.jpg'];

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
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
}

startButton.addEventListener("click", () => {
    let shuffledCards = shuffle(cards);
    for (let item of cards) {
        let card = document.createElement("div");
        card.src = `${item}`;
        gameContainer.appendChild(card);
    }
})
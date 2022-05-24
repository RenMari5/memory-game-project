const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");
let cards = ['eevee-memory.jpg', 'eevee-memory.jpg', 'winston-memory-2.jpg', 'winston-memory-2.jpg', 'pudge.jpg', 'pudge.jpg', 'smudge.jpg', 'smudge.jpg'];

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
})

card.addEventListener("click", (event) => {
    event.target.classList.add("flip");
})
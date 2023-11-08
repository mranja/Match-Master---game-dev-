const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
var name = window.localStorage.getItem('name')
var nickname = window.localStorage.getItem('nickname')


const items = [
  { name: "bat", image: "./assets/bat.png" },
  { name: "booo", image: "./assets/booo.png" },
  { name: "hattttt", image: "./assets/hattttt.png" },
  { name: "ghost", image: "./assets/ghost.png" },
  { name: "pump", image: "./assets/pump.webp" },
  { name: "witch", image: "./assets/witch.png" },
  { name: "vamp", image: "./assets/vamp.webp" },
  { name: "skull", image: "./assets/skull.webp" },
  { name: "girl", image: "./assets/girl.png" },
  { name: "stick", image: "./assets/stick.png" },
  { name: "RIP", image: "./assets/rip.png" },
  { name: "cat", image: "./assets/cat.png" },
];


let seconds = 0,
  minutes = 0;
let movesCount = 0,
  winCount = 0;

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 40) {
    result.innerHTML = `
    <h1 id='gameover'>GAME OVER</h1>
    <h2 class='textcolor'>${name} Lost</h2><h4 class='textcolor'>No Of Moves: ${movesCount}</h4> <footer id='footer'>Thanks for playing the game❤️</footer>`;
    Loss.play()
    clearInterval(interval)
    stopGame();

  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
};

const generateRandom = (size = 4) => {
  
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      flipaudio.play()
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter()
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            samecard.pause()
            samecard.currentTime = 0
            samecard.play()
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1
            if (winCount == Math.floor(cardValues.length / 2)) {
              clearInterval(interval)
              Won.play()
              result.innerHTML = `<h1 id='gameover'>GAME OVER</h1> <h2 class='textcolor' >${name} Won</h2>
            <h4 class='textcolor' >No Of Moves: ${movesCount}</h4> <footer id='footer'>Thanks for playing the game❤️</footer>`;
              stopGame();
              
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
window.addEventListener("load", () => {
  movesCount = 0;
  seconds = 0;
 
  controls.classList.add("hide");
  stopButton.classList.remove("hide");

  interval = setInterval(timeGenerator, 1000);
 
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});


stopButton.onclick =()=>{
  clearInterval(interval)
  result.innerHTML = `<h1 id='gameover'>GAME OVER</h1> <h2 class='textcolor'>No Result </h2>
  <h4 class='textcolor'>No Of Moves: ${movesCount}</h4> <footer id='footer'>Thanks for playing the game❤️</footer>`;
  stopGame()
}
stopGame = () => {
    controls.classList.remove("hide");
    startButton.style.visibility='visible'
    stopButton.classList.add("hide");
    stopGame();    
    clearInterval(interval);
  }

const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
const flipaudio = new Audio('./assets/Cardflip.mp3')
const samecard = new Audio('./assets/win.mp3')
const Won = new Audio('./assets/won.mp3')
const Loss = new Audio('./assets/loss.mp3')

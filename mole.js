let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let timeLimit = 30; // 30 seconds time limit
let timer;

window.onload = function () {
  setGame();
  startTimer();
};

function setGame() {
  // Setting up the grid for the game board in HTML
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setMole, 600);
  setInterval(setPlant, 800);
}

function startTimer() {
  timer = setInterval(function () {
    if (timeLimit <= 0 || gameOver) {
      // Stop timer when game is over
      clearInterval(timer); // Stop the timer
      document.getElementById("timer").innerText = "Time: 0s";
      document.getElementById("score").innerText =
        "TIME'S UP! Final Score: " + score;
      gameOver = true; // Mark the game as over
    } else {
      document.getElementById("timer").innerText = "Time: " + timeLimit + "s";
      timeLimit--;
    }
  }, 1000); // Decrease time every second
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  let num = getRandomTile();

  if (currPlantTile && currPlantTile.id === num) {
    return;
  }

  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }

  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./piranha-plant.png";

  let num = getRandomTile();

  if (currMoleTile && currMoleTile.id === num) {
    return;
  }

  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this === currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score.toString();
  } else if (this === currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
    clearInterval(timer); // Stop the timer if the player hits the plant
    document.getElementById("timer").innerText = "Time: 0s"; // Set time to 0
    document.getElementById("score").innerText =
      "TIME'S UP! Your Final Score is: " + score; // Add final score message
  }
}

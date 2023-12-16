// Main assets
const board = document.querySelector('#board');
const scoreBox = document.querySelector('#score');
const gameStartScreen = document.querySelector('#gameStart');
const sizeInput = document.querySelector('#sizeInput');
const speedSetBtn = document.querySelector('#speedSetBtn');
const startBtn = document.querySelector('#startBtn');
const gameOverScreen = document.querySelector('#gameOver');
const finalScore = document.querySelector('#finalScore');
const restartBtn = document.querySelector('#restartBtn');
let SIZE;
let SPEED = 200;
let WILL_ACCELERATE = false;
let snake, food, dirX, dirY, score;

function setSize() {
  let value = +sizeInput.value;
  // Board min: 3, max: 51
  if (value < 3) {
    value = 3;
  } else if (value > 51) {
    value = 51;
  }
  SIZE = value;
}

function setSpeed() {
  WILL_ACCELERATE = !WILL_ACCELERATE;
  speedSetBtn.textContent = WILL_ACCELERATE ? 'YES' : 'NO';
  if (WILL_ACCELERATE) {
    SPEED = 400;
  } else {
    SPEED = 200;
  }
}

function setBoard() {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const div = document.createElement('div');
    board.appendChild(div);
  }
  board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;
}

function initGame() {
  snake = [{ x: Math.ceil(SIZE / 2), y: Math.ceil(SIZE / 2) }];
  dirX = 0;
  dirY = 0;
  score = 0;
  placeFood();
  draw();
}

function draw() {
  // Don't draw if there is collision
  if (checkCollision()) return;
  // Clear board
  const boardDivs = document.querySelectorAll('#board div');
  boardDivs.forEach((div) => {
    div.classList.remove('snake', 'snake-head', 'food');
  });
  // Draw snake
  snake.forEach((snakePart, i) => {
    const snakePartPosition = findDivIndex(snakePart);
    if (i === 0) {
      board.children[snakePartPosition].classList.add('snake-head');
    } else {
      board.children[snakePartPosition].classList.add('snake');
    }
  });
  // Draw food
  const foodPosition = findDivIndex(food);
  board.children[foodPosition].classList.add('food');
  // Show score
  scoreBox.textContent = score;
}

function findDivIndex(coordinates) {
  const divIndex = (coordinates.y - 1) * SIZE + (coordinates.x - 1);
  return divIndex;
}

function updateSnake() {
  // Add new head to the front
  const snakeHead = { x: snake[0].x + dirX, y: snake[0].y + dirY };
  snake.unshift(snakeHead);
  // If new head pos runs into food, don't remove last snake part
  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    placeFood();
    updateScore();
    if (WILL_ACCELERATE) {
      updateSpeed();
    }
  } else {
    snake.pop();
  }
}

function placeFood() {
  let foodPlaced = false;
  while (!foodPlaced) {
    // Generate random coords for food
    food = {
      x: Math.floor(Math.random() * SIZE) + 1,
      y: Math.floor(Math.random() * SIZE) + 1,
    };
    // If food is not on snake, set foodPlaced to true
    foodPlaced = !snake.some((snakePart) => snakePart.x === food.x && snakePart.y === food.y);
  }
}

function updateScore() {
  return (score += 1);
}

function updateSpeed() {
  if (score % 5 === 0) {
    SPEED *= 0.9;
  }
}

function changeDirection(e) {
  if ((e.key === 'ArrowUp' || e.key === 'w') && dirY === 0) {
    dirX = 0;
    dirY = -1;
  } else if ((e.key === 'ArrowDown' || e.key === 's') && dirY === 0) {
    dirX = 0;
    dirY = 1;
  } else if ((e.key === 'ArrowLeft' || e.key === 'a') && dirX === 0) {
    dirX = -1;
    dirY = 0;
  } else if ((e.key === 'ArrowRight' || e.key === 'd') && dirX === 0) {
    dirX = 1;
    dirY = 0;
  }
}

function checkCollision() {
  const snakeHead = snake[0];
  // Border collision
  if (snakeHead.x < 1 || snakeHead.y < 1 || snakeHead.x > SIZE || snakeHead.y > SIZE) {
    return true;
  }
  // Self collision
  for (let partIndex = 1; partIndex < snake.length; partIndex++) {
    if (snakeHead.x === snake[partIndex].x && snakeHead.y === snake[partIndex].y) {
      return true;
    }
  }
  // No collision
  return false;
}

function startGame() {
  gameStartScreen.classList.remove('show');
  setSize();
  setBoard();
  initGame();
  document.addEventListener('keydown', changeDirection);
  gameLoop();
}

function gameLoop() {
  setTimeout(() => {
    if (checkCollision()) {
      gameOver('gameover');
    }
    updateSnake();
    draw();
    gameLoop();
  }, SPEED);
}

function gameOver(state) {
  if (state === 'gameover') {
    document.removeEventListener('keydown', changeDirection);
    gameOverScreen.classList.add('show');
    finalScore.textContent = score;
    restartBtn.focus();
  } else if (state === 'restart') {
    location.reload();
  }
}

speedSetBtn.addEventListener('click', setSpeed);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => gameOver('restart'));

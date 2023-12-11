// Main assets
const board = document.querySelector('#board');
const SIZE = 21;
let SPEED = 200;
let snake, food, dirX, dirY;

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
}

function updateSnake() {
  // Add new head to the front
  const snakeHead = { x: snake[0].x + dirX, y: snake[0].y + dirY };
  snake.unshift(snakeHead);
  // If new head pos runs into food, don't remove last snake part
  if (snakeHead.x === food.x && snakeHead.y === food.y) {
    placeFood();
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

// Game loop
function gameLoop() {
  setTimeout(() => {
    if (checkCollision()) {
      alert('Game over');
      initGame();
    }
    updateSnake();
    draw();
    gameLoop();
  }, SPEED);
}

// Helper functions
function findDivIndex(coordinates) {
  const divIndex = (coordinates.y - 1) * SIZE + (coordinates.x - 1);
  return divIndex;
}

setBoard();
initGame();
document.addEventListener('keydown', changeDirection);
gameLoop();

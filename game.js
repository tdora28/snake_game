// Main assets
const board = document.querySelector('#board');
const SIZE = 20;
let snake, food;

function setBoard() {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const div = document.createElement('div');
    board.appendChild(div);
  }
  board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;
}

function initGame() {
  snake = [{ x: 11, y: 11 }];
  placeFood();
  draw();
}

function draw() {
  const boardDivs = document.querySelectorAll('#board div');
  // Clear board
  boardDivs.forEach((div) => {
    div.classList.remove('snake', 'food');
  });
  // Draw snake
  snake.forEach((snakePart) => {
    const snakePartPosition = findDivIndex(snakePart);
    board.children[snakePartPosition].classList.add('snake');
  });
  // Draw food
  const foodPosition = findDivIndex(food);
  board.children[foodPosition].classList.add('food');
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

// Helper functions
function findDivIndex(coordinates) {
  const divIndex = (coordinates.y - 1) * SIZE + (coordinates.x - 1);
  return divIndex;
}

setBoard();
initGame();

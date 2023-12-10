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
  food = { x: 5, y: 1 };
  draw();
}

function draw() {
  const boardDivs = document.querySelectorAll('#board div');
  boardDivs.forEach((div) => {
    div.classList.remove('snake');
  });
  snake.forEach((snakePart) => {
    const snakePartPosition = findDivIndex(snakePart);
    board.children[snakePartPosition].classList.add('snake');
  });
  const foodPosition = findDivIndex(food);
  board.children[foodPosition].classList.add('food');
}

// Helper functions
function findDivIndex(coordinates) {
  const divIndex = (coordinates.y - 1) * SIZE + (coordinates.x - 1);
  return divIndex;
}

setBoard();
initGame();

console.log(board.children[0]);

// Board

const SIZE = 21;

window.onload = function () {
  const boardElem = document.querySelector('#board');
  boardElem.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;
  boardElem.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;

  placeFood();
  update(boardElem);
};

function update(board) {
  board.innerHTML = '';
  drawSnake(board);
  drawFood(board);
}

// Snake
const snake = [[1, 1]];

function drawSnake(gameBoard) {
  snake.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridColumnStart = segment[0];
    snakeElement.style.gridRowStart = segment[1];
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

// Food
const food = [];

function drawFood(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridColumnStart = food[0];
  foodElement.style.gridRowStart = food[1];
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);
}

function placeFood() {
  food[0] = Math.floor(Math.random() * SIZE) + 1;
  food[1] = Math.floor(Math.random() * SIZE) + 1;
}

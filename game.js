// Main assets
const board = document.querySelector('#board');
const SIZE = 20;
let snake;

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
  draw();
}

function draw() {
  const boardDivs = document.querySelectorAll('#board div');
  boardDivs.forEach((div) => {
    div.classList.remove('snake');
  });
  snake.forEach((snakePart) => {
    const partPosition = (snakePart.y - 1) * SIZE + (snakePart.x - 1);
    board.children[partPosition].classList.add('snake');
  });
}

setBoard();
initGame();

console.log(board.children[0]);

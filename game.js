// Main assets
const board = document.querySelector('#board');
const SIZE = 20;

function setBoard() {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const div = document.createElement('div');
    board.appendChild(div);
  }
  board.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${SIZE}, 1fr)`;
}

setBoard();

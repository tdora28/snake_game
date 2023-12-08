const COLUMNS = 20;
const ROWS = 20;
const boardElem = document.querySelector('#board');

let board = [];
for (let r = 0; r < ROWS; r++) {
  let row = [];
  for (let c = 0; c < COLUMNS; c++) {
    row.push([0]);
  }
  board.push(row);
}
for (let i = 0; i < COLUMNS * ROWS; i++) {
  const squareElem = document.createElement('div');
  squareElem.classList.add('square');
  boardElem.appendChild(squareElem);
}
boardElem.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;
boardElem.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`;

const buttons = document.querySelectorAll('#gameButton');
const gameboard = document.querySelector('.game-board');
const message = document.querySelector('.message');
const playAgain = document.querySelector('.playAgain');
const win = document.querySelector('#win');
const loss = document.querySelector('#loss');
const draw = document.querySelector('#draw');
const endMessage = document.querySelector('P');

let wins = 0;
let losses = 0;
let draws = 0;
let playerTurn = true;
let gameOver = false;

for (let i = 0; i <= buttons.length; i++) {
  this[`t${i + 1}`] = buttons[i];
}

const winningRows = [
  [t1, t2, t3],
  [t4, t5, t6],
  [t7, t8, t9], // Horizontal
  [t1, t4, t7],
  [t2, t5, t8],
  [t3, t6, t9], // Vertical
  [t1, t5, t9],
  [t3, t5, t7], // Diagonal
];

function newGame() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = '';
  }
  message.className = 'message';
  gameOver = false;
  playerTurn = true;
}

function endGame(reason) {
  if (reason === 'X') {
    wins++;
    endMessage.innerHTML = 'You have won the game!';
    win.innerHTML = `Wins: ${wins}`;
    gameOver = true;
  } else if (reason === 'O') {
    losses++;
    endMessage.innerHTML = 'You have lost the game.';
    loss.innerHTML = `Losses: ${losses}`;
  } else if (reason === 'draw') {
    draws++;
    endMessage.innerHTML = 'The game ended in a draw';
    draw.innerHTML = `Draws: ${draws}`;
  }
  message.className = 'message show';
}

function checkWinner(team) {
  for (let i = 0; i < winningRows.length; i++) {
    if (winningRows[i][0].innerHTML === team
            && winningRows[i][1].innerHTML === team
            && winningRows[i][2].innerHTML === team) {
      if (team === 'X') {
        endGame('X');
      } else {
        endGame('O');
      }
    }
  }
}

function lookPattern() {
  for (let i = 0; i < winningRows.length; i++) {
    let numRow = 0;
    for (let o = 0; o < 3; o++) {
      if (winningRows[i][o].innerHTML === 'X') {
        numRow++;
      } else if (winningRows[i][o].innerHTML === 'O') {
        numRow--;
      }
    }
    if (numRow === 2) {
      for (let o = 0; o < 3; o++) {
        if (winningRows[i][o].innerHTML === '') {
          return (winningRows[i][o]);
        }
      }
    } else if (numRow === -2) {
      for (let o = 0; o < 3; o++) {
        if (winningRows[i][o].innerHTML === '') {
          return (winningRows[i][o]);
        }
      }
    }
  }
}

function computerTurn() {
  const buttonsClone = [].slice.call(buttons);
  let tries = 0;
  if (lookPattern()) {
    lookPattern().innerHTML = 'O'
    playerTurn = true;
    checkWinner('O');
    return 'computerPlayed';
  }
  for (let i = 0; i < 9; i++) {
    const ran = Math.floor(Math.random() * buttonsClone.length);
    const selection = buttonsClone[ran];
    if (selection.innerHTML === '' && tries < 9 && !playerTurn && !gameOver) {
      selection.innerHTML = 'O';
      playerTurn = true;
      checkWinner('O');
      return 'computerPlayed';
    }
    buttonsClone.splice(ran, 1);
    tries++;
  }
  if (!gameOver) {
    endGame('draw');
  }
}

gameboard.addEventListener('click', (event) => {
  if (event.target !== message && event.target !== playAgain && event.target.innerHTML === '' && playerTurn) {
    event.target.innerHTML = 'X';
    playerTurn = false;
    checkWinner('X');
    computerTurn();
  }
});

playAgain.addEventListener('click', () => { newGame(); });

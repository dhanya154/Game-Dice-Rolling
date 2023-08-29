'use strict';
//selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
//or to select id can also use getelementbyid
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentscore, ActivePlayer, playing;
//starting conditions

const init = function () {
  playing = true;
  scores = [0, 0];
  ActivePlayer = 0;
  currentscore = 0;

  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();
const switchplayer = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  currentscore = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

//rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.classList.remove('hidden');
    //add all the images from 1 to 6 dices
    diceEL.src = `dice-${dice}.png`;

    //check for rolled 1:
    if (dice !== 1) {
      //add dice to current score
      currentscore += dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        currentscore;
    } else {
      // switch to next player
      switchplayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's score
    scores[ActivePlayer] += currentscore;
    //if scores[1]= scores[1]+=currentscore
    document.getElementById(`score--${ActivePlayer}`).textContent =
      scores[ActivePlayer];

    //2.check if player's score >=100
    if (scores[ActivePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
      current0EL.textContent = 0;
      current1EL.textContent = 0;
    } else {
      //switch to the next player
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);

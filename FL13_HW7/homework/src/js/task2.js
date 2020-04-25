// Your code goes here
let conf = confirm('Do you want to play a game?');
let precision = 6;
let randomNum = Math.floor(Math.random() * precision);

let attempts = 3,
  prize = 100,
  totalPrize = 0;

function playGame() {
  let guess = prompt(`Choose a roulette pocket number from 0 to ${precision - 1}
    Attemps left: ${attempts}
    Total prize: ${totalPrize}$
    Possible prize on current attempt: ${prize}$`);
  if (+guess !== randomNum) {
    attempts -= 1;
    prize /= 2;
    if (attempts === 0) {
      conf = confirm(
        `Thank you for your participation. Your prize is: ${totalPrize}$. Do you want to continue?`
      );
      attempts = 3;
      prize = 100;
      conf && playGame();
    } else {
      playGame();
    }
  } else {
    conf = confirm(
      `Congratulation, you won! Your prize is: ${prize} $. Do you want to continue?`
    );

    if (conf) {
      attempts = 3;
      prize = 200;
      precision = 11;
      playGame();
    } else {
      null;
    }
  }
}

conf ? playGame() : alert('You did not become a billionaire, but can');

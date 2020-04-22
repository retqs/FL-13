// Your code goes here

const word = prompt('Input your word');

function getMiddleLetter(str) {
  /[\s]/.test(str) || str === '' ? alert('Invalid input') : null;
  let middle = str.length >> 1;
  return str.length % 2 === 0
    ? str.slice(middle - 1, middle + 1)
    : str.slice(middle, middle + 1);
}

console.log(getMiddleLetter(word));

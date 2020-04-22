// Your code goes here
const submit = document.getElementById('submit');
const tip = document.getElementById('tip');
const check = document.getElementById('check');
const form = document.getElementById('form');

let checkValue = prompt('Input your check');
let tipValue = prompt('Input your tips');

function getTotalSum(check, tip) {
  const checkNum = +check;
  const tipNum = +tip;

  if (
    checkNum === '' ||
    !/[\d]/.test(+checkNum) ||
    checkNum < 0 ||
    checkNum === 'NaN'
  ) {
    alert('Invalid input data');
  } else if (
    !/[\d]/.test(+tipNum) ||
    tipNum < 0 ||
    tipNum === 'NaN' ||
    tipNum === ''
  ) {
    alert('Invalid input data');
  } else {
    const precision = 100;
    let tipPercentage = precision * tipNum / checkNum;
    let totalSum = checkNum + tipNum;

    tipPercentage > precision
      ? alert('Tip cant be more than 100%')
      : alert(`Check number: ${checkNum}
    Tip: ${tipPercentage.toPrecision(3)}%
    Tip amount: ${tipNum.toPrecision(3)}
    Total sum to pay: ${totalSum.toPrecision(3)}`);
  }
}

getTotalSum(checkValue, tipValue);

// Your code goes here
function convert(...nums) {
  return nums.map((num) => typeof num === 'string' ? +num : String(num));
}

convert('1', 2, 3, '4');

function executeforEach(args, fn) {
  for (let i = 0; i < args.length; i++) {
    fn(args[i]);
  }
}

executeforEach([1, 2, 3], function (el) {
  console.log(el);
});

function mapArray(args, fn) {
  const tempArr = [];

  for (let i = 0; i < args.length; i++) {
    tempArr.push(fn(+args[i]));
  }

  return tempArr;
}

mapArray([2, '5', 8], function (el) {
  return el + 3;
});

function filterArray(args, fn) {
  const tempArr = [];

  for (let i = 0; i < args.length; i++) {
    fn(args[i]) ? tempArr.push(args[i]) : null;
  }

  return tempArr;
}

filterArray([2, 5, 8], function (el) {
  return el % 2 === 0;
});

function containsValue(args, num) {
  for (let i = 0; i < args.length; i++) {
    return args[i] === num;
  }
}

containsValue([2, 5, 8], 2);
containsValue([12, 4, 6], 5);

function flipOver(str) {
  let newWord = '';

  for (let i = str.length - 1; i >= 0; i--) {
    newWord += str[i];
  }
  return newWord;
}

flipOver('hey world');

function makeListFromRange(range) {
  const tempArr = [];
  for (let i = range[0]; i <= range[1]; i++) {
    tempArr.push(i);
  }
  return tempArr;
}

makeListFromRange([2, 7]);

const fruits = [
  {name: 'apple', weight: 0.5},
  {name: 'pineapple', weight: 2}
];

function getArrayOfKeys(arr, key) {
  const tempArr = [];
  for (let i = 0; i < arr.length; i++) {
    tempArr.push(arr[i][key]);
  }

  return tempArr;
}

getArrayOfKeys(fruits, 'name');

function substitute(arr) {
  const tempArr = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i] > 10 && arr[i] < 20 ? tempArr.push('*') : tempArr.push(arr[i]);
  }

  return tempArr;
}

substitute([58, 14, 48, 12, 31, 19, 10]);

const date = new Date(2020, 0, 2);

function getPastDay(date, number) {
  const day = date.getDate() - number;
  return new Date(2020, 0, day).getDate();
}

getPastDay(date, 1); // 1, (1 Jan 2020)
getPastDay(date, 2); // 31, (31 Dec 2019)
getPastDay(date, 365); // 2, (2 Jan 2019)

function formatDate(date) {
  return `${date.getFullYear()}/${date.getMonth() < 9 ? 0 : ''}${
    date.getMonth() + 1
  }/${date.getDate() < 9 ? 0 : ''}${date.getDate()} ${date.getHours()}:${
    date.getMinutes() < 9 ? 0 : ''
  }${date.getMinutes()}`;
}

formatDate(new Date('6/15/2019 09:15:00')); // "2019/06/15 09:15"
formatDate(new Date()); // "2020/04/07 12:56" // gets current local time

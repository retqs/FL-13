function positiveSum(arr) {
  return arr.filter((num) => num > 0).reduce((prev, next) => prev + next);
}

positiveSum([2, 4, 2, 8]);
positiveSum([2, -3, 2, 8]);
positiveSum([2, -20, 2, 8, 2]);

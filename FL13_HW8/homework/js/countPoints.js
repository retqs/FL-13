function isBigger(arr) {
  if (arr[0] > arr[1]) {
    return 3;
  } else if (arr[0] < arr[1]) {
    return 0;
  } else {
    return 1;
  }
}

function countPoints(games) {
  const totalScores = games.map((game) =>
    game.split('').filter((score) => score !== ':')
  );
  return totalScores.map(isBigger).reduce((prev, next) => prev + next);
}

countPoints([
  '3:1',
  '1:0',
  '0:0',
  '1:2',
  '4:0',
  '2:3',
  '1:1',
  '0:1',
  '2:1',
  '1:0',
]);

countPoints([
  '1:1',
  '1:2',
  '2:0',
  '4:2',
  '0:1',
  '2:3',
  '1:1',
  '0:1',
  '1:1',
  '3:0',
]);

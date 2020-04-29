function letterCount(word, letter) {
  return word.toLowerCase().split('').indexOf(letter) + 1;
}

letterCount('word', 'o');
letterCount('find', 'n');
letterCount('Bind', 'b');
letterCount('', 'l');

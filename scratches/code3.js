const topics = ["person", "years", "Color", "pet"];

const solution = [
  ["Colin", 1, "Pink", "Cat"][("Sarah", 3, "Blue", "Dog")][
    ("Bob", 2, "Purple", "Fish")
  ][("Frank", 4, "Red", "Snake")][("Jim", 5, "Green", "Bird")],
];

function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function pickRandomIndex(inputArray) {
  return Math.floor(Math.random() * inputArray.length);
}

const numericOperators = {
  notEqual: (number, otherNumber) => number != otherNumber,
  greater: (number, otherNumber) => number > otherNumber,
  less: (number, otherNumber) => number < otherNumber,
  isOneOf: (number, options) => options.includes(number),

  // could add one of two biggest/smallest
};

const stringOperators = {
  startsWith: ({ word, letter }) => word[0] === letter,
  isLength: ({ word, length }) => word.length === length,
  isLengthBelow: ({ word, greaterLength }) => word.length < greaterLength,
  isLengthAbove: ({ word, lesserLength }) => word.length > lesserLength,
  isOneOf: ({ word, options }) => options.includes(word),
};

function getClueAboutNumber(numberIndex, possibleNumbers) {
  const number = possibleNumbers[numberIndex];
  const altNumbers = [
    ...possibleNumbers.slice(0, numberIndex),
    ...possibleNumbers.slice(numberIndex + 1, possibleNumbers.length),
  ];
  const numberOneOf = [number, pickRandom(altNumbers)]; // todo shuffle
  const operator = pickRandom(Object.keys(numericOperators));

  return {
    operator: operator,
    operatorInputs: {
      number: number,
    },
  };
}

function getClueAboutWord(wordIndex, possibleWords) {
  const word = possibleWords[wordIndex];
  const wordLength = word.length;
  const wordStartsWith = word[0];
  const altWords = [
    ...possibleWords.slice(0, wordIndex),
    ...possibleWords.slice(wordIndex + 1, possibleWords.length),
  ];

  const wordOneOf = [word, pickRandom(altWords)]; //todo should shuffle
  const operator = pickRandom(Object.keys(stringOperators));

  return {
    answerIndex: answerIndex, // 1 => ["Colin", 1, "Pink", "Cat"]
    itemIndex: itemIndex, // 3 => "Pink"
    operator: operator, // startsWith
    operatorInputs: {
      word: word,
      letter: wordStartsWith,
      length: wordLength,
      greaterLength: wordLength + 1, // todo should only give this clue if meaningful
      lesserLength: wordLength - 1, // todo should only give this clue if meaningful
      options: wordOneOf,
    },
  };
}

function getDirectClue() {
  // choose an answer
  const answerIndex = pickRandomIndex(solution);
  const answer = solution[answerIndex];
  const itemIndex = pickRandomIndex(answer);
  const item = answer[itemIndex];

  // if number
  //

  // if word
  // starts with, length, alternative
}

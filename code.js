const answer = {
  cat: 1,
  dog: 2,
  cow: 3,
  car: 4,
  ape: 5,
}

// let possible = {
//   one: [1, 2, 3, 4, 5],
//   two: [1, 2, 3, 4, 5],
//   three: [1, 2, 3, 4, 5],
//   four: [1, 2, 3, 4, 5],
//   five: [1, 2, 3, 4, 5],
// }

const operators = {
  "equal": (a, b) => (a == b),
  "notEqual": (a, b) => (a != b),
  "greater": (a, b) => (a > b),
  "greaterEqual": (a, b) => (a >= b),
  "less": (a, b) => (a < b),
  "lessEqual": (a, b) => (a <= b),
}

function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function generateClue() {
    // Figure out all possible answers
    const answerValues = Object.values(answer)
    const answerKeys = Object.keys(answer)

    let possible = {}
    answerKeys.forEach(item => possible[item] = answerValues)

    let inversePossible = {}
    answerValues.forEach(item => inversePossible[item] = answerKeys)
  
  let foundAllClues = false
  let foundClue = false
  let foundOperator = false
  let clue

  while (!foundAllClues) {

  while (!foundClue) {

    while (!foundOperator) {
      // randomly select an operator
      const operator = pickRandom(Object.keys(operators))

      // apply the operator to a random answer key and a random answer value
      const leftKey = pickRandom(Object.keys(answer))
      const leftValue = answer[leftKey]
      const rightValue = answer[pickRandom(Object.keys(answer))]
      // if true, continue on
      foundOperator = operators[operator](leftValue, rightValue)

      clue = {
        leftKey: leftKey,
        rightValue: rightValue,
        operator: operator
      }
    }
    
    // apply the operator to the possible answers
    let newPossible = possible[clue.leftKey].filter(value => operators[clue.operator](value, clue.rightValue))

    // if the clue narrowed down the possible answers,
    // update the possible answers and stop looking
    if (!possible[clue.leftKey].every(i=>newPossible.includes(i))) {
      possible[clue.leftKey] = newPossible
      foundClue=true
      console.log(`CLUE: ${clue.leftKey} ${clue.operator} ${clue.rightValue}`)
    }

    if (Object.values(possible).every(value => value.length === 1)
    ) {
      foundAllClues = true
    } else {
      foundOperator = false
      foundClue = false
    }
  }

  // return clue (operator and key/value pair)
  // repeat until all possible answers are narrowed down to one answer

}
}

generateClue()


const keys = [
  ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [10, 20, 30, 40]
]

const answers = [
  ['a', 1, 10],
  ['b', 2, 20],
  ['c', 3, 30],
  ['d', 4, 40]
] // todo in future, randomly generate this

const operators = {
  // numeric
  // "equal": (a, b) => (a == b), // maybe only for easy or as compound clue
  "notEqual": (a, b) => (a != b),
  "greater": (a, b) => (a > b),
  // "greaterEqual": (a, b) => (a >= b), // maybe omit, or else exclude extremes
  "less": (a, b) => (a < b),
  // "lessEqual": (a, b) => (a <= b), // maybe omit, or else exclude extremes

  // alpha
  // "startsWith": (word, letter) => (word[0] === letter),

  // compound (ape and cat both greater than 3)

  // relative (ape greater than cat)
}

function pickRandom(inputArray) {
  return inputArray[Math.floor(Math.random() * inputArray.length)];
}

function makeGridOfSize(size) {
  return Array.from({ length: size }, () => (Array.from({ length: size }, () => null)
  ))
}

function makeLogicGrids(keys) {
  const size = keys[0].length

  let logicGrids = {}
  keys.slice(0, keys.length - 1).map((_, index) => (
    logicGrids[index] = {}
  ))
  keys.map((_, index) => (
    keys.slice(index + 1).map((_, index2) => (
      logicGrids[index][index2 + index + 1] = {
        grid: makeGridOfSize(size),
        rowParentIndex: index,
        colParentIndex: (index2 + index + 1),
        rowHeader: keys[index],
        colHeader: keys[index2 + index + 1]
      }
    ))
  ))

  return logicGrids
}


function findValidClue() {
  let foundOperator = false
  let clue

  while (!foundOperator) {
    // randomly select an answer (e.g. [a, 1, 10])
    const answer = pickRandom(answers)

    // randomly select an item in the answer (todo later can make work with non-numbers)
    const item = pickRandom(answer)
    const index = answer.indexOf(item)

    // randomly select a possible answer from the corresponding type
    const rightComparison = pickRandom(keys[index])

    // randomly select an operator
    const operator = pickRandom(Object.keys(operators))

    // apply the operator to the answer and comparison
    const operatorResult = operators[operator](item, rightComparison)
    // console.log(`TESTING: ${item} ${operator} ${rightComparison}`)

    // if true, continue on
    if (operatorResult) {
      foundOperator = operatorResult

      // choose a different index in the answer (otherwise we get something like 10 < 30)
      let answerCopy = answer.slice()
      answerCopy.splice(index, 1)
      const leftComparison = pickRandom(answerCopy)
      const leftIndex = answer.indexOf(leftComparison)

      // console.log(`FOUND VALID CLUE: ${leftComparison} (${item}) ${operator} ${rightComparison}`)
      clue = {
        left: leftComparison,
        leftIndex: leftIndex,
        original: item,
        operator: operator,
        right: rightComparison,
        rightIndex: index
      }
    }
  }

  return clue
}

function generateClue() {
  let count = 0

  // make logic grid
  let deduced = makeLogicGrids(keys)

  let foundAllClues = false
  let foundClue = false
  let foundOperator = false
  let clues = []

  while (!foundAllClues) {

    while (!foundClue) {

      const clue = findValidClue()

      // find the grid that corresponds to the clue
      let deducedCopy = JSON.parse(JSON.stringify(deduced))
      const category1 = Math.min(clue.leftIndex, clue.rightIndex)
      const category2 = Math.max(clue.leftIndex, clue.rightIndex)

      // find the row/col in the grid that correspond to the clue
      const rowNum = clue.leftIndex < clue.rightIndex ? keys[clue.leftIndex].indexOf(clue.left) : keys[clue.rightIndex].indexOf(clue.right)
      if (rowNum < 0) { console.log("ERROR 1!!!!") }
      const colNum = clue.leftIndex < clue.rightIndex ? keys[clue.rightIndex].indexOf(clue.right) : keys[clue.leftIndex].indexOf(clue.left)
      if (colNum < 0) { console.log("ERROR 2!!!!") }

      // For each item in the row or col, mark the false values according to the clue
      if (clue.leftIndex < clue.rightIndex) {
        for (let index = 0; index < deducedCopy[category1][category2].grid.length; index++) {
          if (deducedCopy[category1][category2].grid[rowNum][index] === null && !operators[clue.operator](keys[clue.rightIndex][index], clue.right)) {
            deducedCopy = setToFalse({ category1: category1, category2: category2, rowIndex: rowNum, colIndex: index, deduced: deducedCopy })
          }
        }
      } else {
        for (let index = 0; index < deducedCopy[category1][category2].grid.length; index++) {
          if (deducedCopy[category1][category2].grid[index][colNum] === null && !operators[clue.operator](keys[clue.rightIndex][index], clue.right)) {
            deducedCopy = setToFalse({ category1: category1, category2: category2, rowIndex: index, colIndex: colNum, deduced: deducedCopy })
          }
        }
      }

      // if the clue narrowed down the possible answers,
      // update the possible answers and stop looking
      if (deduced[category1][category2].grid.toString() !== deducedCopy[category1][category2].grid.toString()) {
        deduced = deducedCopy
        foundClue = true
        console.log(`CLUE: ${clue.left} (${clue.original}) ${clue.operator} ${clue.right}`)
        console.log('DEDUCED:')
        console.log(keys.flatMap((_, index) => (
          keys.slice(index + 1).map((_, index2) => (
            deduced[index][index2 + index + 1].grid
          ))
        )))
        console.log('======')  
        clues.push(clue)
      } else {
        // console.log(`TOSSED: ${clue.left} (${clue.original}) ${clue.operator} ${clue.right}`)
      }


      if (keys.flatMap((_, index) => (
        keys.slice(index + 1).flatMap((_, index2) => (
          deduced[index][index2 + index + 1].grid
        ))
      )).flat().every(i => i != null)) {
        foundAllClues = true
        foundOperator = true
        foundClue = true
        // consolidate clues
      } else {
        foundOperator = false
        foundClue = false
        count += 1
      }

      if (count > 100) {
        console.log('NOT FOUND AFTER 100 rounds')
        foundAllClues = true
        foundOperator = true
        foundClue = true
      }
      // console.log(count)
      // console.log('DEDUCED:')
      // console.log(keys.flatMap((_, index) => (
      //   keys.slice(index + 1).map((_, index2) => (
      //     deduced[index][index2 + index + 1].grid
      //   ))
      // )))
      // console.log('======')
    }

    // return clue (operator and key/value pair)
    // repeat until all possible answers are narrowed down to one answer

  }
}



function setToTrue({ category1, category2, rowIndex, colIndex, deduced }) {

  let deducedCopy = JSON.parse(JSON.stringify(deduced))

  // sets the index to true, and sets all others in the row/col to false
  // console.log(`setting ${rowIndex} ${colIndex} to TRUE:  ${JSON.stringify(grid)}`)

  // if the value is already true, return early
  if (deducedCopy[category1][category2].grid[rowIndex][colIndex] === true) {
    return deduced
  }

  // set the index to true
  deducedCopy[category1][category2].grid[rowIndex][colIndex] = true

  // set the whole row to false
  for (let index = 0; index < deducedCopy[category1][category2].grid.length; index++) {
    if (index !== rowIndex) {
      deducedCopy = setToFalse({ category1: category1, category2: category2, rowIndex: index, colIndex: colIndex, deduced: deducedCopy })
    }
  }

  // set the whole column to false
  for (let index = 0; index < deducedCopy[category1][category2].grid.length; index++) {
    if (index !== colIndex) {
      deducedCopy = setToFalse({ category1: category1, category2: category2, rowIndex: rowIndex, colIndex: index, deduced: deducedCopy })
    }
  }

  return deducedCopy
}

function setToFalse({ category1, category2, rowIndex, colIndex, deduced }) {

  let deducedCopy = JSON.parse(JSON.stringify(deduced))
  
  // sets the index to false, and if all but one in the
  // row or col is false, sets the remaining index to true

  // if the value is already false, return early
  if (deducedCopy[category1][category2].grid[rowIndex][colIndex] === false) {
    return deduced
  }

  // set the index to false
  deducedCopy[category1][category2].grid[rowIndex][colIndex] = false

  // Check if that resulted in the row having only a single null remaining
  const totalFalseInRow = deducedCopy[category1][category2].grid[rowIndex].reduce((tallyFalse, currentValue) => currentValue === false ? tallyFalse += 1 : tallyFalse += 0, 0)
  // if yes, set that remaining index to true (unless it is already true)
  if (totalFalseInRow === deducedCopy[category1][category2].grid.length - 1) {
    const trueIndex = deducedCopy[category1][category2].grid[rowIndex].findIndex(i => i === null)
    if (trueIndex >= 0) {
      deducedCopy = setToTrue({ category1: category1, category2: category2, rowIndex: rowIndex, colIndex: trueIndex, deduced: deducedCopy })
    }
  }

  // Check if that resulted in the column being all false but one
  const totalFalseInCol = deducedCopy[category1][category2].grid.reduce((tallyFalse, currentRow) => currentRow[colIndex] === false ? tallyFalse += 1 : tallyFalse += 0, 0)
  // if yes, set that remaining index to true
  if (totalFalseInCol === deducedCopy[category1][category2].grid.length - 1) {
    const trueIndex = deducedCopy[category1][category2].grid.map(row => row[colIndex]).findIndex(i => i === null)
    if (trueIndex >= 0) {
      deducedCopy = setToTrue({ category1: category1, category2: category2, rowIndex: trueIndex, colIndex: colIndex, deduced: deducedCopy })
    }
  }

  return deducedCopy
}

generateClue()

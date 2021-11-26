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
      const grid = deduced[Math.min(clue.leftIndex, clue.rightIndex)][Math.max(clue.leftIndex, clue.rightIndex)].grid
      // console.log('GRID BEFORE:')
      // console.log(deduced)
      // console.log(Math.min(clue.leftIndex, clue.rightIndex))
      // console.log(Math.max(clue.leftIndex, clue.rightIndex))
      // console.log(deduced[Math.min(clue.leftIndex, clue.rightIndex)][Math.max(clue.leftIndex, clue.rightIndex)])
      let gridCopy = JSON.parse(JSON.stringify(grid))

      // find the row/col in the grid that correspond to the clue
      const rowNum = clue.leftIndex < clue.rightIndex ? keys[clue.leftIndex].indexOf(clue.left) : keys[clue.rightIndex].indexOf(clue.right)
      if (rowNum < 0) { console.log("ERROR 1!!!!") }
      const colNum = clue.leftIndex < clue.rightIndex ? keys[clue.rightIndex].indexOf(clue.right) : keys[clue.leftIndex].indexOf(clue.left)
      if (colNum < 0) { console.log("ERROR 2!!!!") }

      // For each item in the row or col, mark the false values according to the clue
      if (clue.leftIndex < clue.rightIndex) {
        for (let index = 0; index < gridCopy.length; index++) {
          if (gridCopy[rowNum][index] === null && !operators[clue.operator](keys[clue.rightIndex][index], clue.right)) {
            gridCopy = setToFalse({ rowIndex: rowNum, colIndex: index, grid: gridCopy })
          }
        }
      } else {
        for (let index = 0; index < gridCopy.length; index++) {
          if (gridCopy[index][colNum] === null && !operators[clue.operator](keys[clue.rightIndex][index], clue.right)) {
            gridCopy = setToFalse({ rowIndex: index, colIndex: colNum, grid: gridCopy })
          }
        }
      }
      // console.log('GRID AFTER:')
      // console.log(gridCopy)
      // console.log(Object.values(deduced).map(i=>i.grid).flat())

      // if the clue narrowed down the possible answers,
      // update the possible answers and stop looking
      if (grid.toString() !== gridCopy.toString()) {
        deduced[Math.min(clue.leftIndex, clue.rightIndex)][Math.max(clue.leftIndex, clue.rightIndex)].grid = gridCopy
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



function setToTrue({ rowIndex, colIndex, grid }) {
  // lastSetToTrue = [rowIndex, colIndex, grid ]

  // sets the index to true, and sets all others in the row/col to false
  // console.log(`setting ${rowIndex} ${colIndex} to TRUE:  ${JSON.stringify(grid)}`)

  // if the value is already true, return early
  if (grid[rowIndex][colIndex] === true) {
    return grid
  }

  // set the index to true
  grid[rowIndex][colIndex] = true

  // set the whole row to false
  for (let index = 0; index < grid.length; index++) {
    if (index !== rowIndex) {
      grid = setToFalse({ rowIndex: index, colIndex: colIndex, grid: grid })
    }
  }

  // set the whole column to false
  for (let index = 0; index < grid.length; index++) {
    if (index !== colIndex) {
      grid = setToFalse({ rowIndex: rowIndex, colIndex: index, grid: grid })
    }
  }

  return grid
}

function setToFalse({ rowIndex, colIndex, grid }) {
  // lastSetToFalse = [rowIndex, colIndex, grid ]
  // sets the index to false, and if all but one in the
  // row or col is false, sets the remaining index to true
  // console.log(`setting ${rowIndex} ${colIndex} to FALSE: ${JSON.stringify(grid)}`)

  // if the value is already false, return early
  if (grid[rowIndex][colIndex] === false) {
    return grid
  }

  // set the index to false
  grid[rowIndex][colIndex] = false

  // Check if that resulted in the row having only a single null remaining
  const totalFalseInRow = grid[rowIndex].reduce((tallyFalse, currentValue) => currentValue === false ? tallyFalse += 1 : tallyFalse += 0, 0)
  // if yes, set that remaining index to true (unless it is already true)
  if (totalFalseInRow === grid.length - 1) {
    const trueIndex = grid[rowIndex].findIndex(i => i === null)
    if (trueIndex >= 0) {
      grid = setToTrue({ rowIndex: rowIndex, colIndex: trueIndex, grid: grid })
    }
  }

  // Check if that resulted in the column being all false but one
  const totalFalseInCol = grid.reduce((tallyFalse, currentRow) => currentRow[colIndex] === false ? tallyFalse += 1 : tallyFalse += 0, 0)
  // if yes, set that remaining index to true
  if (totalFalseInCol === grid.length - 1) {
    const trueIndex = grid.map(row => row[colIndex]).findIndex(i => i === null)
    if (trueIndex >= 0) {
      grid = setToTrue({ rowIndex: trueIndex, colIndex: colIndex, grid: grid })
    }
  }

  return grid
}

generateClue()

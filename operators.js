const keys = [
  ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [10, 20, 30, 40]
]

const answer = [
  [ 'a', 1, 10 ],
  [ 'b', 2, 20 ],
  [ 'c', 3, 30 ],
  [ 'd', 4, 40 ]
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

function generateClue() {
  let count = 0

  // make logic grid
  const size = Object.keys(answer).length
  let deduced = Array.from({ length: size }, () => (Array.from({ length: size }, () => null)
  ))
  let rowHeader = Object.keys(answer)
  let colHeader = Object.values(answer)

  let foundAllClues = false
  let foundClue = false
  let foundOperator = false
  let clues = []

  while (!foundAllClues) {

    while (!foundClue) {
      let clue

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
      // console.log(`TESTING: ${clue.leftKey} ${clue.operator} ${clue.rightValue}`)

      // find the header indexes that correspond to the clue
      const rowNum = rowHeader.findIndex(i => i === clue.leftKey)
      if (rowNum < 0) { console.log("ERROR 1!!!!") }
      const colNum = colHeader.findIndex(i => i === clue.rightValue)
      if (colNum < 0) { console.log("ERROR 2!!!!") }

      // For each item in the row, mark the false values according to the clue
      let newDeduced = JSON.parse(JSON.stringify(deduced))
      for (let index = 0; index < newDeduced.length; index++) {
        // console.log(`index ${rowNum} ${index} has value ${newDeduced[rowNum][index]} and the clue is ${operators[clue.operator](colHeader[index], clue.rightValue)}: ${colHeader[index]} ${clue.operator} ${clue.rightValue}`)
        if (newDeduced[rowNum][index] === null && !operators[clue.operator](colHeader[index], clue.rightValue)) {
          newDeduced = setToFalse({ rowIndex: rowNum, colIndex: index, grid: newDeduced })
        }
      }

      // if the clue narrowed down the possible answers,
      // update the possible answers and stop looking
      if (deduced.toString() !== newDeduced.toString()) {
        deduced = newDeduced
        foundClue = true
        console.log(`CLUE: ${clue.leftKey} ${clue.operator} ${clue.rightValue}`)
        clues.push(clue)
        // console.log(deduced)
      } else {
        // console.log(`TOSSED: ${clue.leftKey} ${clue.operator} ${clue.rightValue}`)
      }


      if (deduced.flat().every(i => i != null)) {
        foundAllClues = true
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

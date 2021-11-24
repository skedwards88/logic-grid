
function setToTrue({ rowIndex, colIndex, grid }) {
  // sets the index to true, and sets all others in the row/col to false
  console.log(`setting ${rowIndex} ${colIndex} to TRUE:  ${JSON.stringify(grid)}`)

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
  // sets the index to false, and if all but one in the
  // row or col is false, sets the remaining index to true
  console.log(`setting ${rowIndex} ${colIndex} to FALSE: ${JSON.stringify(grid)}`)

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
    if (trueIndex > 0) {
      grid = setToTrue({ rowIndex: rowIndex, colIndex: trueIndex, grid: grid })
    }
  }

  // Check if that resulted in the column being all false but one
  const totalFalseInCol = grid.reduce((tallyFalse, currentRow) => currentRow[colIndex] === false ? tallyFalse += 1 : tallyFalse += 0, 0)
  // if yes, set that remaining index to true
  if (totalFalseInCol === grid.length - 1) {
    const trueIndex = grid.map(row => row[colIndex]).findIndex(i => i === null || true)
    if (trueIndex > 0) {
      grid = setToTrue({ rowIndex: trueIndex, colIndex: colIndex, grid: grid })
    }
  }

  return grid
}

const out = setToTrue({
  rowIndex: 0, colIndex: 0, grid: [[null, null, null], [null, null, false], [null, null, null]]
})
console.log(out)

[
  [null,  false, false, false, false], 
  [false, true,  false, false, false], 
  [false, false, true, false, false], 
  [false, false, false, true, false], 
  [false, false, false, false, true]
]
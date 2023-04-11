export function setToTrue(derivedMatrix, solutionKey, rowIndex, colIndex) {
    // return early if index out of bounds
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex === undefined ||
      colIndex === undefined ||
      rowIndex > derivedMatrix[solutionKey].grid.length - 1 ||
      colIndex > derivedMatrix[solutionKey].grid[0].length - 1 
    ) {
      // console.error(`Index out of bounds in 'setToTrue': ${rowIndex}, ${colIndex}`)//todo react error
      return derivedMatrix;
    }

  // if already true, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex]) {
    return derivedMatrix;
  }

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix)); //todo make better deep copy method

  newDerivedMatrix[solutionKey].grid[rowIndex][colIndex] = true;

  // All other items in that row/col are false
  for (let index = 0; index < newDerivedMatrix[solutionKey].grid[rowIndex].length; index++) {
    // skip for the position we just set to true, skip if position is already false
    if (index != colIndex || newDerivedMatrix[solutionKey].grid[rowIndex][index] === false) {
      newDerivedMatrix = setToFalse(newDerivedMatrix, solutionKey, rowIndex, index);
    }
  }
  for (let index = 0; index < newDerivedMatrix[solutionKey].grid.length; index++) {
    // skip for the position we just set to true, skip if position is already false
    if (index != rowIndex || newDerivedMatrix[solutionKey].grid[index][colIndex] === false) {
      newDerivedMatrix = setToFalse(newDerivedMatrix, solutionKey, index, colIndex);
    }
  }

  return newDerivedMatrix;
}

function deduceSecondOrderTrue() {
  // When set an index to true (e.g. red fly)
  // check for other things that know about that row and col (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'
}

export function setToFalse(derivedMatrix, solutionKey, rowIndex, colIndex) {

  // return early if index out of bounds
  if (
    rowIndex < 0 ||
    colIndex < 0 ||
    rowIndex === undefined ||
    colIndex === undefined ||
    rowIndex > derivedMatrix[solutionKey].grid.length - 1 ||
    colIndex > derivedMatrix[solutionKey].grid[0].length - 1 
  ) {
    // console.error(`Index out of bounds in 'setToFalse': ${rowIndex}, ${colIndex}`)
    return derivedMatrix;
  }

  // if already false, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex] === false) {
    return derivedMatrix;
  }

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix)); //todo make better deep copy method

  newDerivedMatrix[solutionKey].grid[rowIndex][colIndex] = false;

  // If this leaves only one null in the row, the last null is true if there are no trues, otherwise false
  const nullIndexesInRow = newDerivedMatrix[solutionKey].grid[rowIndex].reduce(
    (indexes, currentVal, currentIndex) =>
      currentVal === null ? [...indexes, currentIndex] : indexes,
    []
  );
  if (nullIndexesInRow.length === 1) {
    if (newDerivedMatrix[solutionKey].grid[rowIndex].some((value) => value)) {
      newDerivedMatrix = setToFalse(newDerivedMatrix, solutionKey, rowIndex, nullIndexesInRow[0]);
    } else {
      newDerivedMatrix = setToTrue(newDerivedMatrix, solutionKey, rowIndex, nullIndexesInRow[0]);
    }
  }

  // If this leaves only one null in the column, the last null is true if there are no trues, otherwise false
  const nullIndexesInCol = newDerivedMatrix[solutionKey].grid.reduce(
    (indexes, currentRow, currentRowIndex) =>
      currentRow[colIndex] === null ? [...indexes, currentRowIndex] : indexes,
    []
  );
  if (nullIndexesInCol.length === 1) {
    if (newDerivedMatrix[solutionKey].grid.some((row) => row[colIndex])) {
      newDerivedMatrix = setToFalse(newDerivedMatrix, solutionKey, nullIndexesInCol[0], colIndex);
    } else {
      newDerivedMatrix = setToTrue(newDerivedMatrix, solutionKey, nullIndexesInCol[0], colIndex);
    }
  }
  
  return newDerivedMatrix;
}

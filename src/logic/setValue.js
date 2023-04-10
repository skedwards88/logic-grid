export function setToTrue(grid, rowIndex, colIndex) {
  // if already true, return early
  if (grid[rowIndex][colIndex]) {
    return grid;
  }

  let newGrid = JSON.parse(JSON.stringify(grid));
  newGrid[rowIndex][colIndex] = true;

  // All other items in that row/col are false
  for (let index = 0; index < newGrid[rowIndex].length; index++) {
    // skip for the position we just set to true, skip if position is already false
    if (index != colIndex || newGrid[rowIndex][index] === false) {
      newGrid = setToFalse(newGrid, rowIndex, index);
    }
  }
  for (let index = 0; index < newGrid.length; index++) {
    // skip for the position we just set to true, skip if position is already false
    if (index != rowIndex || newGrid[index][colIndex] === false) {
      newGrid = setToFalse(newGrid, index, colIndex);
    }
  }
  return newGrid;
}

export function setToFalse(grid, rowIndex, colIndex) {
  // if already false, return early
  if (grid[rowIndex][colIndex] === false) {
    return grid;
  }

  let newGrid = JSON.parse(JSON.stringify(grid));

  newGrid[rowIndex][colIndex] = false;

  // If this leaves only one null in the row, the last null is true if there are no trues, otherwise false
  const nullIndexesInRow = newGrid[rowIndex].reduce(
    (indexes, currentVal, currentIndex) =>
      currentVal === null ? [...indexes, currentIndex] : indexes,
    []
  );
  if (nullIndexesInRow.length === 1) {
    if (newGrid[rowIndex].some((value) => value)) {
      newGrid = setToFalse(newGrid, rowIndex, nullIndexesInRow[0]);
    } else {
      newGrid = setToTrue(newGrid, rowIndex, nullIndexesInRow[0]);
    }
  }

  // If this leaves only one null in the column, the last null is true if there are no trues, otherwise false
  const nullIndexesInCol = newGrid.reduce(
    (indexes, currentRow, currentRowIndex) =>
      currentRow[colIndex] === null ? [...indexes, currentRowIndex] : indexes,
    []
  );
  if (nullIndexesInCol.length === 1) {
    if (newGrid.some((row) => row[colIndex])) {
      newGrid = setToFalse(newGrid, nullIndexesInCol[0], colIndex);
    } else {
      newGrid = setToTrue(newGrid, nullIndexesInCol[0], colIndex);
    }
  }
  return newGrid;
}

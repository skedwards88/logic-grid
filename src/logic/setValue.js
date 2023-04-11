export function setToTrue(grid, rowIndex, colIndex) {
    // return early if index out of bounds
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex === undefined ||
      colIndex === undefined ||
      rowIndex > grid.length - 1 ||
      colIndex > grid[0].length - 1 
    ) {
      console.error(`Index out of bounds in 'setToTrue': ${rowIndex}, ${colIndex}`)//todo react error
      return grid;
    }

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

function deduceTrue() {
  // When set an index to true (e.g. red fly)
  // check for other things that know about that row and col (e.g. fly is colin)
}

export function setToFalse(grid, rowIndex, colIndex) {
  // return early if index out of bounds
  if (
    rowIndex < 0 ||
    colIndex < 0 ||
    rowIndex === undefined ||
    colIndex === undefined ||
    rowIndex > grid.length - 1 ||
    colIndex > grid[0].length - 1 
  ) {
    console.error(`Index out of bounds in 'setToFalse': ${rowIndex}, ${colIndex}`)
    return grid;
  }

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

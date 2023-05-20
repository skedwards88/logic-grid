import {propagateValue} from "./setValue.js";

function makeEmptyCopyOfMatrix(matrix) {
  let matrixCopy = JSON.parse(JSON.stringify(matrix));

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map((item) => null),
    );
  }

  return matrixCopy;
}

export function autocomplete(matrix) {
  // The `setToTrue` and `setToFalse` functions already have logic for propagating values
  // Instead of trying to piece together that here for each cell, just repopulate the matrix using those functions
  let autofilledMatrix = makeEmptyCopyOfMatrix(matrix);

  for (const key in matrix) {
    const grid = matrix[key].grid;
    const rowLabels = matrix[key].rowLabels;
    const colLabels = matrix[key].colLabels;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        const value = grid[rowIndex][columnIndex];
        const items = [rowLabels[rowIndex], colLabels[columnIndex]];
        autofilledMatrix = propagateValue(autofilledMatrix, items, value);
      }
    }
  }

  return autofilledMatrix;
}

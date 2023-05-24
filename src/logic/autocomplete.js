import {setToTrue} from "./setValue.js";

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
  let autofilledMatrix = makeEmptyCopyOfMatrix(matrix);

  // Propogate the trues in the matrix
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
        if (value) {
          autofilledMatrix = setToTrue(
            autofilledMatrix,
            rowLabels[rowIndex],
            colLabels[columnIndex],
          );
        }
      }
    }
  }

  for (const key in matrix) {
    const grid = matrix[key].grid;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        // Verify that the autofilled matrix has no nulls
        if (autofilledMatrix[key].grid[rowIndex][columnIndex] === null) {
          console.log(`incomplete`);
          throw new Error(
            "Propogating the trues did not fully complete the puzzle",
          );
        }
        // Verify that there are no disagreements between the original and autofilled matrix
        // for cases where the original is not null
        if (
          matrix[key].grid[rowIndex][columnIndex] != null &&
          matrix[key].grid[rowIndex][columnIndex] !=
            autofilledMatrix[key].grid[rowIndex][columnIndex]
        ) {
          console.log(`disagreement`);
          throw new Error(
            "Popoagating the trues leads to a disagreement with the original array",
          );
        }
      }
    }
  }

  // todo Verify that there is exactly one true per row/col ?

  return autofilledMatrix;
}

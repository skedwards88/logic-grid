import {setToTrue} from "../logic/puzzleGeneration/setValue";

function makeEmptyCopyOfMatrix(matrix) {
  let matrixCopy = JSON.parse(JSON.stringify(matrix));

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map(() => null),
    );
  }

  return matrixCopy;
}

export function autocomplete(inputMatrix) {
  let autofilledMatrix = makeEmptyCopyOfMatrix(inputMatrix);

  // Propogate the trues in the matrix
  for (const key in inputMatrix) {
    const grid = inputMatrix[key].grid;
    const rowLabels = inputMatrix[key].rowLabels;
    const columnLabels = inputMatrix[key].columnLabels;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        const value = grid[rowIndex][columnIndex];
        if (value === true) {
          autofilledMatrix = setToTrue(
            autofilledMatrix,
            rowLabels[rowIndex],
            columnLabels[columnIndex],
          );
        }
      }
    }
  }

  // Check the validity of the autocompleted matrix
  for (const key in inputMatrix) {
    const grid = inputMatrix[key].grid;
    const autofilledGrid = autofilledMatrix[key].grid;

    let columnTrueIndexes = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const trueIndexesInRow = [...autofilledGrid[rowIndex].keys()].filter(
        (i) => autofilledGrid[rowIndex][i],
      );
      // I'm fairly sure that the two checks for exactly one true per row/column
      // are redundant with the other checks,
      // but I'm not confident that I considered all cases,
      // so I'm including the checks even though it may add inefficiency

      // if not exactly one true in the row
      if (trueIndexesInRow.length != 1) {
        throw new Error(
          "Propogating the trues did not result in exactly one true/row",
        );
      }

      // if more than one true in the columns
      if (columnTrueIndexes.includes(trueIndexesInRow[0])) {
        throw new Error(
          "Propogating the trues resulted in multiple trues per column",
        );
      }
      columnTrueIndexes = [...columnTrueIndexes, ...trueIndexesInRow];

      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        // Verify that the autofilled matrix has no nulls
        if (autofilledGrid[rowIndex][columnIndex] === null) {
          console.log(`incomplete`);
          throw new Error(
            "Propogating the trues did not fully complete the puzzle",
          );
        }
        // Verify that there are no disagreements between the original and autofilled matrix
        // for cases where the original is not null
        if (
          inputMatrix[key].grid[rowIndex][columnIndex] != null &&
          inputMatrix[key].grid[rowIndex][columnIndex] !=
            autofilledGrid[rowIndex][columnIndex]
        ) {
          console.log(`disagreement`);
          throw new Error(
            "Popoagating the trues leads to a disagreement with the original array",
          );
        }
      }
    }
  }

  return autofilledMatrix;
}

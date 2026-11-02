import {setToTrue} from "../logic/puzzleGeneration/setValue";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "./puzzleGeneration/buildEmptyMatrix";

function makeEmptyCopyOfMatrix(matrixGrids: MatrixGrids): MatrixGrids {
  const matrixGridsCopy = structuredClone(matrixGrids);

  for (const key in matrixGridsCopy) {
    matrixGridsCopy[key] = matrixGridsCopy[key].map((row) =>
      row.map(() => null),
    );
  }

  return matrixGridsCopy;
}

export function autocomplete(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
): MatrixGrids {
  let autofilledMatrix = makeEmptyCopyOfMatrix(matrixGrids);

  // Propagate the trues in the matrix
  for (const key in matrixGrids) {
    const grid = matrixGrids[key];
    const rowLabels = matrixLabels[key].row.labels;
    const columnLabels = matrixLabels[key].column.labels;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        const value = grid[rowIndex][columnIndex];
        if (value === true) {
          autofilledMatrix = setToTrue({
            matrixGrids: autofilledMatrix,
            matrixLabels,
            itemA: rowLabels[rowIndex],
            itemB: columnLabels[columnIndex],
          });
        }
      }
    }
  }

  // Check the validity of the autocompleted matrix
  for (const key in matrixGrids) {
    const grid = matrixGrids[key];
    const autofilledGrid = autofilledMatrix[key];

    const columnTrueIndexes: number[] = [];
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
          "Propagating the trues did not result in exactly one true/row",
        );
      }

      // if more than one true in the columns
      if (columnTrueIndexes.includes(trueIndexesInRow[0])) {
        throw new Error(
          "Propagating the trues resulted in multiple trues per column",
        );
      }
      columnTrueIndexes.push(...trueIndexesInRow);

      for (
        let columnIndex = 0;
        columnIndex < grid[rowIndex].length;
        columnIndex++
      ) {
        // Verify that the autofilled matrix has no nulls
        if (autofilledGrid[rowIndex][columnIndex] === null) {
          throw new Error(
            "Propagating the trues did not fully complete the puzzle",
          );
        }
        // Verify that there are no disagreements between the original and autofilled matrix
        // for cases where the original is not null
        if (
          matrixGrids[key][rowIndex][columnIndex] != null &&
          matrixGrids[key][rowIndex][columnIndex] !=
            autofilledGrid[rowIndex][columnIndex]
        ) {
          throw new Error(
            "Propagating the trues leads to a disagreement with the original array",
          );
        }
      }
    }
  }

  return autofilledMatrix;
}

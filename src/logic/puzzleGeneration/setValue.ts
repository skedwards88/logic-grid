import cloneDeep from "lodash.clonedeep";
import {findMatrixKey} from "../matrixSearching/findMatrixKey";
import {type PuzzleMatrix} from "./buildEmptyMatrix";

export function setToTrue(
  derivedMatrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): PuzzleMatrix {
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  // Need to widen the type to satisfy TS
  const rowLabels: readonly (string | number)[] =
    derivedMatrix[solutionKey].row.labels;
  const columnLabels: readonly (string | number)[] =
    derivedMatrix[solutionKey].column.labels;

  const rowIndex =
    rowLabels.indexOf(itemA) > -1
      ? rowLabels.indexOf(itemA)
      : rowLabels.indexOf(itemB);
  const columnIndex =
    columnLabels.indexOf(itemA) > -1
      ? columnLabels.indexOf(itemA)
      : columnLabels.indexOf(itemB);

  // if already true, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][columnIndex]) {
    return derivedMatrix;
  }

  let newDerivedMatrix = cloneDeep(derivedMatrix);

  newDerivedMatrix[solutionKey].grid[rowIndex][columnIndex] = true;

  // All other items in that row/column are false
  for (const columnLabel of newDerivedMatrix[solutionKey].column.labels) {
    if (columnLabel === itemA || columnLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      newDerivedMatrix[solutionKey].row.labels[rowIndex],
      columnLabel,
    );
  }
  for (const rowLabel of newDerivedMatrix[solutionKey].row.labels) {
    if (rowLabel === itemA || rowLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      rowLabel,
      newDerivedMatrix[solutionKey].column.labels[columnIndex],
    );
  }

  newDerivedMatrix = deduceSecondOrderFromTrue(newDerivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

export function propagateValue(
  matrix: PuzzleMatrix,
  items: (string | number)[],
  value: boolean | null,
): PuzzleMatrix {
  const [itemA, itemB] = items;

  if (value === true) {
    return setToTrue(matrix, itemA, itemB);
  } else if (value === false) {
    return setToFalse(matrix, itemA, itemB);
  } else {
    return matrix;
  }
}

export function deduceSecondOrderFromFalse(
  derivedMatrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): PuzzleMatrix {
  // When you set an index to false
  // Check if you know a truth about either item
  // if so,
  // e.g. if you set 'dog vs red' to 'false' and you know 'dog vs Colin' is true,
  // then you know 'Colin vs red' is false as well

  let newDerivedMatrix = cloneDeep(derivedMatrix);

  for (const key in derivedMatrix) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] =
      derivedMatrix[key].row.labels;
    const columnLabels: readonly (string | number)[] =
      derivedMatrix[key].column.labels;

    if (rowLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (columnLabels.includes(itemB)) {
        continue;
      }
      const rowIndex = rowLabels.indexOf(itemA);
      for (
        let columnIndex = 0;
        columnIndex < columnLabels.length;
        columnIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            columnLabels[columnIndex],
            itemB,
          );
        }
      }
    } else if (rowLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (columnLabels.includes(itemA)) {
        continue;
      }
      const rowIndex = rowLabels.indexOf(itemB);
      for (
        let columnIndex = 0;
        columnIndex < columnLabels.length;
        columnIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            columnLabels[columnIndex],
            itemA,
          );
        }
      }
    } else if (columnLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemB)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemA);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            rowLabels[rowIndex],
            itemB,
          );
        }
      }
    } else if (columnLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemA)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemB);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            rowLabels[rowIndex],
            itemA,
          );
        }
      }
    }
  }
  return newDerivedMatrix;
}

export function deduceSecondOrderFromTrue(
  derivedMatrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): PuzzleMatrix {
  // When set an index to true (e.g. red fly)
  // check for other things that you know about that row and column (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'

  let newDerivedMatrix = cloneDeep(derivedMatrix);

  // For every grid in the matrix
  // check if the grid row/column labels include one of the ones we just set to true
  // if yes, propagate the knowledge from that row/column to the other value that we just set to true

  for (const key in derivedMatrix) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] =
      derivedMatrix[key].row.labels;
    const columnLabels: readonly (string | number)[] =
      derivedMatrix[key].column.labels;

    if (rowLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (columnLabels.includes(itemB)) {
        continue;
      }
      const rowIndex = rowLabels.indexOf(itemA);
      for (
        let columnIndex = 0;
        columnIndex < columnLabels.length;
        columnIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [columnLabels[columnIndex], itemB],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (rowLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (columnLabels.includes(itemA)) {
        continue;
      }
      const rowIndex = rowLabels.indexOf(itemB);
      for (
        let columnIndex = 0;
        columnIndex < columnLabels.length;
        columnIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [columnLabels[columnIndex], itemA],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (columnLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemB)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemA);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [rowLabels[rowIndex], itemB],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (columnLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemA)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemB);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [rowLabels[rowIndex], itemA],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    }
  }
  return newDerivedMatrix;
}

export function setToFalse(
  derivedMatrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): PuzzleMatrix {
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  // Need to widen the type to satisfy TS
  const rowLabels: readonly (string | number)[] =
    derivedMatrix[solutionKey].row.labels;
  const columnLabels: readonly (string | number)[] =
    derivedMatrix[solutionKey].column.labels;

  const rowIndex =
    rowLabels.indexOf(itemA) > -1
      ? rowLabels.indexOf(itemA)
      : rowLabels.indexOf(itemB);
  const columnIndex =
    columnLabels.indexOf(itemA) > -1
      ? columnLabels.indexOf(itemA)
      : columnLabels.indexOf(itemB);

  // if already false, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][columnIndex] === false) {
    return derivedMatrix;
  }

  let newDerivedMatrix = cloneDeep(derivedMatrix);

  newDerivedMatrix[solutionKey].grid[rowIndex][columnIndex] = false;

  // If this leaves only one null in the row, the last null is true if there are no trues, otherwise false
  const nullIndexesInRow = newDerivedMatrix[solutionKey].grid[rowIndex].reduce<
    number[]
  >(
    (indexes, currentValue, currentIndex) =>
      currentValue === null ? [...indexes, currentIndex] : indexes,
    [],
  );
  if (nullIndexesInRow.length === 1) {
    if (newDerivedMatrix[solutionKey].grid[rowIndex].some((value) => value)) {
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].row.labels[rowIndex],
        newDerivedMatrix[solutionKey].column.labels[nullIndexesInRow[0]],
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].row.labels[rowIndex],
        newDerivedMatrix[solutionKey].column.labels[nullIndexesInRow[0]],
      );
    }
  }

  // If this leaves only one null in the column, the last null is true if there are no trues, otherwise false
  const nullIndexesInColumn = newDerivedMatrix[solutionKey].grid.reduce<
    number[]
  >(
    (indexes, currentRow, currentRowIndex) =>
      currentRow[columnIndex] === null
        ? [...indexes, currentRowIndex]
        : indexes,
    [],
  );
  if (nullIndexesInColumn.length === 1) {
    if (newDerivedMatrix[solutionKey].grid.some((row) => row[columnIndex])) {
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].row.labels[nullIndexesInColumn[0]],
        newDerivedMatrix[solutionKey].column.labels[columnIndex],
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].row.labels[nullIndexesInColumn[0]],
        newDerivedMatrix[solutionKey].column.labels[columnIndex],
      );
    }
  }

  newDerivedMatrix = deduceSecondOrderFromFalse(newDerivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

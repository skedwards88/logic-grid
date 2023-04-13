import { findMatrixKey } from "./findMatrixKey.js";

export function setToTrue(derivedMatrix, itemA, itemB) {
  console.log(`'set true' ${itemA} ${itemB}`);
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex =
    derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const colIndex =
    derivedMatrix[solutionKey].colLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].colLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].colLabels.indexOf(itemB);

  // if already true, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex]) {
    console.log("returning early");
    return derivedMatrix;
  }

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix)); //todo make better deep copy method

  newDerivedMatrix[solutionKey].grid[rowIndex][colIndex] = true;

  // All other items in that row/col are false
  for (const columnLabel of newDerivedMatrix[solutionKey].colLabels) {
    if (columnLabel === itemA || columnLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      newDerivedMatrix[solutionKey].rowLabels[rowIndex],
      columnLabel
    );
  }
  for (const rowLabel of newDerivedMatrix[solutionKey].rowLabels) {
    if (rowLabel === itemA || rowLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      rowLabel,
      newDerivedMatrix[solutionKey].colLabels[colIndex]
    );
  }

  newDerivedMatrix = deduceSecondOrderFromTrue(newDerivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

export function deduceSecondOrderFromTrue(derivedMatrix, itemA, itemB) {
  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix)); //todo make better deep copy method

  // When set an index to true (e.g. red fly)
  // check for other things that you know about that row and col (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'

  // todo call this func when settotrue

  // For every grid in the matrix
  // check if the grid row/col labels include the ones we just set to true
  // if yes, check if any items in the row/col are true
  // if yes, set to true the non-shared item
  // e.g. if know red+fly and colin+fly, then colin+red
  // need to find the entry that corresponds to colin+red

  for (const key in derivedMatrix) {
    if (derivedMatrix[key].rowLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].colLabels.includes(itemB)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemA);
      for (
        let colIndex = 0;
        colIndex < derivedMatrix[key].colLabels.length;
        colIndex++
      ) {
        if (derivedMatrix[key].grid[rowIndex][colIndex]) {
          newDerivedMatrix = setToTrue(
            newDerivedMatrix,
            itemB,
            derivedMatrix[key].colLabels[colIndex]
          );
        } else if (derivedMatrix[key].grid[rowIndex][colIndex] === false) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            itemB,
            derivedMatrix[key].colLabels[colIndex]
          );
        }
      }
    } else if (derivedMatrix[key].rowLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].colLabels.includes(itemA)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemB);
      for (
        let colIndex = 0;
        colIndex < derivedMatrix[key].colLabels.length;
        colIndex++
      ) {
        if (derivedMatrix[key].grid[rowIndex][colIndex]) {
          newDerivedMatrix = setToTrue(
            newDerivedMatrix,
            itemA,
            derivedMatrix[key].colLabels[colIndex]
          );
        } else if (derivedMatrix[key].grid[rowIndex][colIndex] === false) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            itemA,
            derivedMatrix[key].colLabels[colIndex]
          );
        }
      }
    } else if (derivedMatrix[key].colLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemB)) {
        continue;
      }
      const colIndex = derivedMatrix[key].colLabels.indexOf(itemA);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        if (derivedMatrix[key].grid[rowIndex][colIndex]) {
          newDerivedMatrix = setToTrue(
            newDerivedMatrix,
            itemB,
            derivedMatrix[key].rowLabels[rowIndex]
          );
        } else if (derivedMatrix[key].grid[rowIndex][colIndex] === false) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            itemB,
            derivedMatrix[key].rowLabels[rowIndex]
          );
        }
      }
    } else if (derivedMatrix[key].colLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemA)) {
        continue;
      }
      const colIndex = derivedMatrix[key].colLabels.indexOf(itemB);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        if (derivedMatrix[key].grid[rowIndex][colIndex]) {
          newDerivedMatrix = setToTrue(
            newDerivedMatrix,
            itemA,
            derivedMatrix[key].rowLabels[rowIndex]
          );
        } else if (derivedMatrix[key].grid[rowIndex][colIndex] === false) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            itemA,
            derivedMatrix[key].rowLabels[rowIndex]
          );
        }
      }
    }
  }
  return newDerivedMatrix;
}

export function setToFalse(derivedMatrix, itemA, itemB) {
  console.log(`'set false' ${itemA} ${itemB}`);

  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex =
    derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const colIndex =
    derivedMatrix[solutionKey].colLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].colLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].colLabels.indexOf(itemB);

  // if already false, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex] === false) {
    console.log("returning early");
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
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[rowIndex],
        newDerivedMatrix[solutionKey].colLabels[nullIndexesInRow[0]]
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[rowIndex],
        newDerivedMatrix[solutionKey].colLabels[nullIndexesInRow[0]]
      );
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
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[nullIndexesInCol[0]],
        newDerivedMatrix[solutionKey].colLabels[colIndex]
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[nullIndexesInCol[0]],
        newDerivedMatrix[solutionKey].colLabels[colIndex]
      );
    }
  }

  return newDerivedMatrix;
}

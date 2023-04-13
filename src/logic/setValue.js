import { findMatrixKey } from "./findMatrixKey.js";

export function setToTrue(derivedMatrix, itemA, itemB) {
  console.log(`'set true' ${itemA} ${itemB}`)
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex = derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
    ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
    : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const colIndex = derivedMatrix[solutionKey].colLabels.indexOf(itemA) > -1
    ? derivedMatrix[solutionKey].colLabels.indexOf(itemA)
    : derivedMatrix[solutionKey].colLabels.indexOf(itemB);

  // if already true, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex]) {
    console.log('returning early')
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
    newDerivedMatrix = setToFalse(newDerivedMatrix, newDerivedMatrix[solutionKey].rowLabels[rowIndex], columnLabel)
  }
  for (const rowLabel of newDerivedMatrix[solutionKey].rowLabels) {
    if (rowLabel === itemA || rowLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(newDerivedMatrix, rowLabel, newDerivedMatrix[solutionKey].colLabels[colIndex])
  }

  return newDerivedMatrix;
}

function deduceSecondOrderTrue(derivedMatrix, solutionKey, rowIndex, colIndex) {
  // When set an index to true (e.g. red fly)
  // check for other things that know about that row and col (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'

  // todo call this func when settotrue

  // Get the label names that we just set to true (e.g. 'Colin' and 'red')
  const itemA = derivedMatrix[solutionKey].rowLabels[rowIndex];
  const itemB = derivedMatrix[solutionKey].colLabels[colIndex];

  // For every grid in the matrix
  // check if the grid row/col labels include the ones we just set to true
  // if yes, check if any items in the row/col are true
  // if yes, set to true the non-shared item
  // e.g. if know red+fly and colin+fly, then colin+red
  // need to find the entry that corresponds to colin+red
}

export function setToFalse(derivedMatrix, itemA, itemB) {
  console.log(`'set false' ${itemA} ${itemB}`)

  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex = derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
    ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
    : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const colIndex = derivedMatrix[solutionKey].colLabels.indexOf(itemA) > -1
    ? derivedMatrix[solutionKey].colLabels.indexOf(itemA)
    : derivedMatrix[solutionKey].colLabels.indexOf(itemB);

  // if already false, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][colIndex] === false) {
    console.log('returning early')
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
      newDerivedMatrix = setToFalse(newDerivedMatrix, newDerivedMatrix[solutionKey].rowLabels[rowIndex], newDerivedMatrix[solutionKey].colLabels[nullIndexesInRow[0]]);
    } else {
      newDerivedMatrix = setToTrue(newDerivedMatrix, newDerivedMatrix[solutionKey].rowLabels[rowIndex], newDerivedMatrix[solutionKey].colLabels[nullIndexesInRow[0]]);
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
      newDerivedMatrix = setToFalse(newDerivedMatrix, newDerivedMatrix[solutionKey].rowLabels[nullIndexesInCol[0]], newDerivedMatrix[solutionKey].colLabels[colIndex]);
    } else {
      newDerivedMatrix = setToTrue(newDerivedMatrix, newDerivedMatrix[solutionKey].rowLabels[nullIndexesInCol[0]], newDerivedMatrix[solutionKey].colLabels[colIndex]);
    }
  }
  
  return newDerivedMatrix;
}

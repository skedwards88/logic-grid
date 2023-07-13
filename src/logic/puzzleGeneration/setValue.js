import {findMatrixKey} from "../matrixSearching/findMatrixKey";

export function setToTrue(derivedMatrix, itemA, itemB) {
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex =
    derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const columnIndex =
    derivedMatrix[solutionKey].columnLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].columnLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].columnLabels.indexOf(itemB);

  // if already true, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][columnIndex]) {
    return derivedMatrix;
  }

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));

  newDerivedMatrix[solutionKey].grid[rowIndex][columnIndex] = true;

  // All other items in that row/column are false
  for (const columnLabel of newDerivedMatrix[solutionKey].columnLabels) {
    if (columnLabel === itemA || columnLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      newDerivedMatrix[solutionKey].rowLabels[rowIndex],
      columnLabel,
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
      newDerivedMatrix[solutionKey].columnLabels[columnIndex],
    );
  }

  newDerivedMatrix = deduceSecondOrderFromTrue(newDerivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

export function propagateValue(matrix, items, value) {
  const [itemA, itemB] = items;

  if (value === true) {
    return setToTrue(matrix, itemA, itemB);
  } else if (value === false) {
    return setToFalse(matrix, itemA, itemB);
  } else {
    return matrix;
  }
}

export function deduceSecondOrderFromFalse(derivedMatrix, itemA, itemB) {
  // When you set an index to false
  // Check if you know a truth about either item
  // if so,
  // e.g. if you set 'dog vs red' to 'false' and you know 'dog vs Colin' is true,
  // then you know 'Colin vs red' is false as well

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));

  for (const key in derivedMatrix) {
    if (derivedMatrix[key].rowLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].columnLabels.includes(itemB)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemA);
      for (
        let columnIndex = 0;
        columnIndex < derivedMatrix[key].columnLabels.length;
        columnIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            derivedMatrix[key].columnLabels[columnIndex],
            itemB,
          );
        }
      }
    } else if (derivedMatrix[key].rowLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].columnLabels.includes(itemA)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemB);
      for (
        let columnIndex = 0;
        columnIndex < derivedMatrix[key].columnLabels.length;
        columnIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            derivedMatrix[key].columnLabels[columnIndex],
            itemA,
          );
        }
      }
    } else if (derivedMatrix[key].columnLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemB)) {
        continue;
      }
      const columnIndex = derivedMatrix[key].columnLabels.indexOf(itemA);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            derivedMatrix[key].rowLabels[rowIndex],
            itemB,
          );
        }
      }
    } else if (derivedMatrix[key].columnLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemA)) {
        continue;
      }
      const columnIndex = derivedMatrix[key].columnLabels.indexOf(itemB);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        // if the value is true, propagate the false
        if (derivedMatrix[key].grid[rowIndex][columnIndex]) {
          newDerivedMatrix = setToFalse(
            newDerivedMatrix,
            derivedMatrix[key].rowLabels[rowIndex],
            itemA,
          );
        }
      }
    }
  }
  return newDerivedMatrix;
}

export function deduceSecondOrderFromTrue(derivedMatrix, itemA, itemB) {
  // When set an index to true (e.g. red fly)
  // check for other things that you know about that row and column (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));

  // For every grid in the matrix
  // check if the grid row/column labels include one of the ones we just set to true
  // if yes, propagate the knowledge from that row/column to the other value that we just set to true

  for (const key in derivedMatrix) {
    if (derivedMatrix[key].rowLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].columnLabels.includes(itemB)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemA);
      for (
        let columnIndex = 0;
        columnIndex < derivedMatrix[key].columnLabels.length;
        columnIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [derivedMatrix[key].columnLabels[columnIndex], itemB],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (derivedMatrix[key].rowLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].columnLabels.includes(itemA)) {
        continue;
      }
      const rowIndex = derivedMatrix[key].rowLabels.indexOf(itemB);
      for (
        let columnIndex = 0;
        columnIndex < derivedMatrix[key].columnLabels.length;
        columnIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [derivedMatrix[key].columnLabels[columnIndex], itemA],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (derivedMatrix[key].columnLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemB)) {
        continue;
      }
      const columnIndex = derivedMatrix[key].columnLabels.indexOf(itemA);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [derivedMatrix[key].rowLabels[rowIndex], itemB],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    } else if (derivedMatrix[key].columnLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (derivedMatrix[key].rowLabels.includes(itemA)) {
        continue;
      }
      const columnIndex = derivedMatrix[key].columnLabels.indexOf(itemB);
      for (
        let rowIndex = 0;
        rowIndex < derivedMatrix[key].rowLabels.length;
        rowIndex++
      ) {
        newDerivedMatrix = propagateValue(
          newDerivedMatrix,
          [derivedMatrix[key].rowLabels[rowIndex], itemA],
          derivedMatrix[key].grid[rowIndex][columnIndex],
        );
      }
    }
  }
  return newDerivedMatrix;
}

export function setToFalse(derivedMatrix, itemA, itemB) {
  const solutionKey = findMatrixKey(derivedMatrix, itemA, itemB);

  const rowIndex =
    derivedMatrix[solutionKey].rowLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].rowLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].rowLabels.indexOf(itemB);
  const columnIndex =
    derivedMatrix[solutionKey].columnLabels.indexOf(itemA) > -1
      ? derivedMatrix[solutionKey].columnLabels.indexOf(itemA)
      : derivedMatrix[solutionKey].columnLabels.indexOf(itemB);

  // if already false, return early
  if (derivedMatrix[solutionKey].grid[rowIndex][columnIndex] === false) {
    return derivedMatrix;
  }

  let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));

  newDerivedMatrix[solutionKey].grid[rowIndex][columnIndex] = false;

  // If this leaves only one null in the row, the last null is true if there are no trues, otherwise false
  const nullIndexesInRow = newDerivedMatrix[solutionKey].grid[rowIndex].reduce(
    (indexes, currentVal, currentIndex) =>
      currentVal === null ? [...indexes, currentIndex] : indexes,
    [],
  );
  if (nullIndexesInRow.length === 1) {
    if (newDerivedMatrix[solutionKey].grid[rowIndex].some((value) => value)) {
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[rowIndex],
        newDerivedMatrix[solutionKey].columnLabels[nullIndexesInRow[0]],
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[rowIndex],
        newDerivedMatrix[solutionKey].columnLabels[nullIndexesInRow[0]],
      );
    }
  }

  // If this leaves only one null in the column, the last null is true if there are no trues, otherwise false
  const nullIndexesInColumn = newDerivedMatrix[solutionKey].grid.reduce(
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
        newDerivedMatrix[solutionKey].rowLabels[nullIndexesInColumn[0]],
        newDerivedMatrix[solutionKey].columnLabels[columnIndex],
      );
    } else {
      newDerivedMatrix = setToTrue(
        newDerivedMatrix,
        newDerivedMatrix[solutionKey].rowLabels[nullIndexesInColumn[0]],
        newDerivedMatrix[solutionKey].columnLabels[columnIndex],
      );
    }
  }

  newDerivedMatrix = deduceSecondOrderFromFalse(newDerivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

import {findMatrixKey} from "../matrixSearching/findMatrixKey";
import {type MatrixLabels, type MatrixGrids} from "./generateSolutionMatrix";

export function setToTrue({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): MatrixGrids {
  const solutionKey = findMatrixKey({matrixGrids, matrixLabels, itemA, itemB});

  // Need to widen the type to satisfy TS
  const rowLabels: readonly (string | number)[] =
    matrixLabels[solutionKey].row.values;
  const columnLabels: readonly (string | number)[] =
    matrixLabels[solutionKey].column.values;

  const rowIndex =
    rowLabels.indexOf(itemA) > -1
      ? rowLabels.indexOf(itemA)
      : rowLabels.indexOf(itemB);
  const columnIndex =
    columnLabels.indexOf(itemA) > -1
      ? columnLabels.indexOf(itemA)
      : columnLabels.indexOf(itemB);

  // if already true, return early
  if (matrixGrids[solutionKey][rowIndex][columnIndex]) {
    return matrixGrids;
  }

  let newDerivedMatrixGrids = structuredClone(matrixGrids);

  newDerivedMatrixGrids[solutionKey][rowIndex][columnIndex] = true;

  // All other items in that row/column are false
  for (const columnLabel of matrixLabels[solutionKey].column.values) {
    if (columnLabel === itemA || columnLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrixGrids = setToFalse({
      matrixGrids: newDerivedMatrixGrids,
      matrixLabels,
      itemA: matrixLabels[solutionKey].row.values[rowIndex],
      itemB: columnLabel,
    });
  }
  for (const rowLabel of matrixLabels[solutionKey].row.values) {
    if (rowLabel === itemA || rowLabel === itemB) {
      // skip for the position we just set to true
      continue;
    }
    newDerivedMatrixGrids = setToFalse({
      matrixGrids: newDerivedMatrixGrids,
      matrixLabels,
      itemA: rowLabel,
      itemB: matrixLabels[solutionKey].column.values[columnIndex],
    });
  }

  newDerivedMatrixGrids = deduceSecondOrderFromTrue({
    matrixGrids: newDerivedMatrixGrids,
    matrixLabels,
    itemA,
    itemB,
  });

  return newDerivedMatrixGrids;
}

export function propagateValue({
  matrixGrids,
  matrixLabels,
  items,
  value,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  items: (string | number)[];
  value: boolean | null;
}): MatrixGrids {
  const [itemA, itemB] = items;

  if (value === true) {
    return setToTrue({matrixGrids, matrixLabels, itemA, itemB});
  } else if (value === false) {
    return setToFalse({matrixGrids, matrixLabels, itemA, itemB});
  } else {
    return matrixGrids;
  }
}

export function deduceSecondOrderFromFalse({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): MatrixGrids {
  // When you set an index to false
  // Check if you know a truth about either item
  // if so,
  // e.g. if you set 'dog vs red' to 'false' and you know 'dog vs Colin' is true,
  // then you know 'Colin vs red' is false as well

  let newDerivedMatrixGrids = structuredClone(matrixGrids);

  for (const key in matrixGrids) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] =
      matrixLabels[key].row.values;
    const columnLabels: readonly (string | number)[] =
      matrixLabels[key].column.values;

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
        if (matrixGrids[key][rowIndex][columnIndex]) {
          newDerivedMatrixGrids = setToFalse({
            matrixGrids: newDerivedMatrixGrids,
            matrixLabels,
            itemA: columnLabels[columnIndex],
            itemB,
          });
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
        if (matrixGrids[key][rowIndex][columnIndex]) {
          newDerivedMatrixGrids = setToFalse({
            matrixGrids: newDerivedMatrixGrids,
            matrixLabels,
            itemA: columnLabels[columnIndex],
            itemB: itemA,
          });
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
        if (matrixGrids[key][rowIndex][columnIndex]) {
          newDerivedMatrixGrids = setToFalse({
            matrixGrids: newDerivedMatrixGrids,
            matrixLabels,
            itemA: rowLabels[rowIndex],
            itemB,
          });
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
        if (matrixGrids[key][rowIndex][columnIndex]) {
          newDerivedMatrixGrids = setToFalse({
            matrixGrids: newDerivedMatrixGrids,
            matrixLabels,
            itemA: rowLabels[rowIndex],
            itemB: itemA,
          });
        }
      }
    }
  }
  return newDerivedMatrixGrids;
}

export function deduceSecondOrderFromTrue({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): MatrixGrids {
  // When set an index to true (e.g. red fly)
  // check for other things that you know about that row and column (e.g. fly is colin)
  // if 'red is fly' and 'colin is fly', then 'red is colin'

  let newDerivedMatrixGrids = structuredClone(matrixGrids);

  // For every grid in the matrix
  // check if the grid row/column labels include one of the ones we just set to true
  // if yes, propagate the knowledge from that row/column to the other value that we just set to true

  for (const key in matrixGrids) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] =
      matrixLabels[key].row.values;
    const columnLabels: readonly (string | number)[] =
      matrixLabels[key].column.values;

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
        newDerivedMatrixGrids = propagateValue({
          matrixGrids: newDerivedMatrixGrids,
          matrixLabels,
          items: [columnLabels[columnIndex], itemB],
          value: matrixGrids[key][rowIndex][columnIndex],
        });
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
        newDerivedMatrixGrids = propagateValue({
          matrixGrids: newDerivedMatrixGrids,
          matrixLabels,
          items: [columnLabels[columnIndex], itemA],
          value: matrixGrids[key][rowIndex][columnIndex],
        });
      }
    } else if (columnLabels.includes(itemA)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemB)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemA);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        newDerivedMatrixGrids = propagateValue({
          matrixGrids: newDerivedMatrixGrids,
          matrixLabels,
          items: [rowLabels[rowIndex], itemB],
          value: matrixGrids[key][rowIndex][columnIndex],
        });
      }
    } else if (columnLabels.includes(itemB)) {
      // return early if this is the key that includes A and B
      if (rowLabels.includes(itemA)) {
        continue;
      }
      const columnIndex = columnLabels.indexOf(itemB);
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        newDerivedMatrixGrids = propagateValue({
          matrixGrids: newDerivedMatrixGrids,
          matrixLabels,
          items: [rowLabels[rowIndex], itemA],
          value: matrixGrids[key][rowIndex][columnIndex],
        });
      }
    }
  }
  return newDerivedMatrixGrids;
}

export function setToFalse({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): MatrixGrids {
  const solutionKey = findMatrixKey({matrixGrids, matrixLabels, itemA, itemB});

  // Need to widen the type to satisfy TS
  const rowLabels: readonly (string | number)[] =
    matrixLabels[solutionKey].row.values;
  const columnLabels: readonly (string | number)[] =
    matrixLabels[solutionKey].column.values;

  const rowIndex =
    rowLabels.indexOf(itemA) > -1
      ? rowLabels.indexOf(itemA)
      : rowLabels.indexOf(itemB);
  const columnIndex =
    columnLabels.indexOf(itemA) > -1
      ? columnLabels.indexOf(itemA)
      : columnLabels.indexOf(itemB);

  // if already false, return early
  if (matrixGrids[solutionKey][rowIndex][columnIndex] === false) {
    return matrixGrids;
  }

  let newDerivedMatrixGrids = structuredClone(matrixGrids);

  newDerivedMatrixGrids[solutionKey][rowIndex][columnIndex] = false;

  // If this leaves only one null in the row, the last null is true if there are no trues, otherwise false
  const nullIndexesInRow = newDerivedMatrixGrids[solutionKey][rowIndex].reduce<
    number[]
  >(
    (indexes, currentValue, currentIndex) =>
      currentValue === null ? [...indexes, currentIndex] : indexes,
    [],
  );
  if (nullIndexesInRow.length === 1) {
    if (newDerivedMatrixGrids[solutionKey][rowIndex].some((value) => value)) {
      newDerivedMatrixGrids = setToFalse({
        matrixGrids: newDerivedMatrixGrids,
        matrixLabels,
        itemA: matrixLabels[solutionKey].row.values[rowIndex],
        itemB: matrixLabels[solutionKey].column.values[nullIndexesInRow[0]],
      });
    } else {
      newDerivedMatrixGrids = setToTrue({
        matrixGrids: newDerivedMatrixGrids,
        matrixLabels,
        itemA: matrixLabels[solutionKey].row.values[rowIndex],
        itemB: matrixLabels[solutionKey].column.values[nullIndexesInRow[0]],
      });
    }
  }

  // If this leaves only one null in the column, the last null is true if there are no trues, otherwise false
  const nullIndexesInColumn = newDerivedMatrixGrids[solutionKey].reduce<
    number[]
  >(
    (indexes, currentRow, currentRowIndex) =>
      currentRow[columnIndex] === null
        ? [...indexes, currentRowIndex]
        : indexes,
    [],
  );
  if (nullIndexesInColumn.length === 1) {
    if (newDerivedMatrixGrids[solutionKey].some((row) => row[columnIndex])) {
      newDerivedMatrixGrids = setToFalse({
        matrixGrids: newDerivedMatrixGrids,
        matrixLabels,
        itemA: matrixLabels[solutionKey].row.values[nullIndexesInColumn[0]],
        itemB: matrixLabels[solutionKey].column.values[columnIndex],
      });
    } else {
      newDerivedMatrixGrids = setToTrue({
        matrixGrids: newDerivedMatrixGrids,
        matrixLabels,
        itemA: matrixLabels[solutionKey].row.values[nullIndexesInColumn[0]],
        itemB: matrixLabels[solutionKey].column.values[columnIndex],
      });
    }
  }

  newDerivedMatrixGrids = deduceSecondOrderFromFalse({
    matrixGrids: newDerivedMatrixGrids,
    matrixLabels,
    itemA,
    itemB,
  });

  return newDerivedMatrixGrids;
}

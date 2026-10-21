export function findMatrixValue(matrix, itemA, itemB) {
  // Given two items, finds the value of their intersection
  for (const key in matrix) {
    if (
      matrix[key].rowLabels.includes(itemA) &&
      matrix[key].columnLabels.includes(itemB)
    ) {
      const rowIndex = matrix[key].rowLabels.indexOf(itemA);
      const columnIndex = matrix[key].columnLabels.indexOf(itemB);
      return matrix[key].grid[rowIndex][columnIndex];
    }
    if (
      matrix[key].rowLabels.includes(itemB) &&
      matrix[key].columnLabels.includes(itemA)
    ) {
      const rowIndex = matrix[key].rowLabels.indexOf(itemB);
      const columnIndex = matrix[key].columnLabels.indexOf(itemA);
      return matrix[key].grid[rowIndex][columnIndex];
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

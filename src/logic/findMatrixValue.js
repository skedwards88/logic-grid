export function findMatrixValue(matrix, itemA, itemB) {
  // todo add tests
  for (const key in matrix) {
    if (
      matrix[key].rowLabels.includes(itemA) &&
      matrix[key].colLabels.includes(itemB)
    ) {
      const rowIndex = matrix[key].rowLabels.indexOf(itemA);
      const colIndex = matrix[key].colLabels.indexOf(itemB);
      return matrix[key].grid[rowIndex][colIndex];
    }
    if (
      matrix[key].rowLabels.includes(itemB) &&
      matrix[key].colLabels.includes(itemA)
    ) {
      const rowIndex = matrix[key].rowLabels.indexOf(itemB);
      const colIndex = matrix[key].colLabels.indexOf(itemA);
      return matrix[key].grid[rowIndex][colIndex];
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

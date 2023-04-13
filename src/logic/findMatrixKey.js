export function findMatrixKey(matrix, itemA, itemB) {
  for (const key in matrix) {
    if (
      matrix[key].rowLabels.includes(itemA) &&
      matrix[key].colLabels.includes(itemB)
    ) {
      return key;
    }
    if (
      matrix[key].rowLabels.includes(itemB) &&
      matrix[key].colLabels.includes(itemA)
    ) {
      return key;
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`
  );
}

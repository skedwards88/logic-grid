export function findMatrixKey(matrix, itemA, itemB) {
  // Given two items, finds the corresponding matrix key 
  //  for the grid that contains the two items
  for (const key in matrix) {
    if (
      matrix[key].rowLabels.includes(itemA) &&
      matrix[key].columnLabels.includes(itemB)
    ) {
      return key;
    }
    if (
      matrix[key].rowLabels.includes(itemB) &&
      matrix[key].columnLabels.includes(itemA)
    ) {
      return key;
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

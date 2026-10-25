import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export function findMatrixKey(
  matrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): string {
  // Given two items, finds the corresponding matrix key
  //  for the grid that contains the two items
  for (const key in matrix) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] = matrix[key].row.labels;
    const columnLabels: readonly (string | number)[] =
      matrix[key].column.labels;

    if (rowLabels.includes(itemA) && columnLabels.includes(itemB)) {
      return key;
    }
    if (rowLabels.includes(itemB) && columnLabels.includes(itemA)) {
      return key;
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

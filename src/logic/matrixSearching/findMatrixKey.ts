import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/generateSolutionMatrix";

export function findMatrixKey({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): string {
  // Given two items, finds the corresponding matrix key
  //  for the grid that contains the two items
  for (const key in matrixGrids) {
    // Need to widen the type to satisfy TS
    const rowLabels: readonly (string | number)[] =
      matrixLabels[key].row.values;
    const columnLabels: readonly (string | number)[] =
      matrixLabels[key].column.values;

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

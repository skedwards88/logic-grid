import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/buildEmptyMatrixGrids";

export function findMatrixValue({
  matrixGrids,
  matrixLabels,
  itemA,
  itemB,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  itemA: string | number;
  itemB: string | number;
}): boolean | null {
  // Given two items, finds the value of their intersection
  for (const key in matrixGrids) {
    if (
      (matrixLabels[key].row.values as (string | number)[]).includes(itemA) &&
      (matrixLabels[key].column.values as (string | number)[]).includes(itemB)
    ) {
      const rowIndex = (
        matrixLabels[key].row.values as (string | number)[]
      ).indexOf(itemA);
      const columnIndex = (
        matrixLabels[key].column.values as (string | number)[]
      ).indexOf(itemB);
      return matrixGrids[key][rowIndex][columnIndex];
    }
    if (
      (matrixLabels[key].row.values as (string | number)[]).includes(itemB) &&
      (matrixLabels[key].column.values as (string | number)[]).includes(itemA)
    ) {
      const rowIndex = (
        matrixLabels[key].row.values as (string | number)[]
      ).indexOf(itemB);
      const columnIndex = (
        matrixLabels[key].column.values as (string | number)[]
      ).indexOf(itemA);
      return matrixGrids[key][rowIndex][columnIndex];
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

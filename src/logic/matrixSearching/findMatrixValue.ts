import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export function findMatrixValue(
  matrix: PuzzleMatrix,
  itemA: string | number,
  itemB: string | number,
): boolean | null {
  // Given two items, finds the value of their intersection
  for (const key in matrix) {
    if (
      (matrix[key].row.labels as (string | number)[]).includes(itemA) &&
      (matrix[key].column.labels as (string | number)[]).includes(itemB)
    ) {
      const rowIndex = (matrix[key].row.labels as (string | number)[]).indexOf(
        itemA,
      );
      const columnIndex = (
        matrix[key].column.labels as (string | number)[]
      ).indexOf(itemB);
      return matrix[key].grid[rowIndex][columnIndex];
    }
    if (
      (matrix[key].row.labels as (string | number)[]).includes(itemB) &&
      (matrix[key].column.labels as (string | number)[]).includes(itemA)
    ) {
      const rowIndex = (matrix[key].row.labels as (string | number)[]).indexOf(
        itemB,
      );
      const columnIndex = (
        matrix[key].column.labels as (string | number)[]
      ).indexOf(itemA);
      return matrix[key].grid[rowIndex][columnIndex];
    }
  }
  throw new Error(
    `Did not find matrix entry corresponding to ${itemA} vs ${itemB}`,
  );
}

import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {findMatrixValue} from "./findMatrixValue";

export function findFirstTrueIntersection<
  T extends readonly (string | number)[],
>({
  matrixGrids,
  matrixLabels,
  item,
  intersectingItems,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  item: number | string;
  intersectingItems: T;
}): T[number] | undefined {
  // Given an item and list of intersecting items, find the first intersecting item that is "true"
  // if one is not found, returns undefined
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    const value = findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: item,
      itemB: intersectingItems[index],
    });
    if (value === true) {
      return intersectingItems[index];
    }
  }

  return undefined;
}

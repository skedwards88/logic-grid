import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {findMatrixValue} from "./findMatrixValue";

export function findFirstTrueIntersection<T extends string | number>(
  matrix: PuzzleMatrix,
  item: number | string,
  intersectingItems: T[],
): T | undefined {
  // Given an item and list of intersecting items, find the first intersecting item that is "true"
  // if one is not found, returns undefined
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    const value = findMatrixValue(matrix, item, intersectingItems[index]);
    if (value === true) {
      return intersectingItems[index];
    }
  }

  return undefined;
}

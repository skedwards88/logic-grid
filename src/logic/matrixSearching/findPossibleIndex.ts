import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/generateSolutionMatrix";
import {findMatrixValue} from "./findMatrixValue";

export function findFirstPossibleIndex({
  matrixGrids,
  matrixLabels,
  item,
  intersectingItems,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  item: string | number;
  intersectingItems: (string | number)[];
}): number | undefined {
  // Returns the smallest index that itemA vs categoryB can be.
  for (let index = 0; index < intersectingItems.length; index++) {
    // from the first to last intersecting item, find the value for the input item
    // if we get to a null or true, that is the first possible index
    const value = findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: item,
      itemB: intersectingItems[index],
    });
    if (value === true) {
      return index;
    } else if (value === null) {
      return index;
    }
  }

  return undefined;
}

export function findLastPossibleIndex({
  matrixGrids,
  matrixLabels,
  item,
  intersectingItems,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  item: string | number;
  intersectingItems: (string | number)[];
}): number | undefined {
  for (let index = intersectingItems.length - 1; index >= 0; index--) {
    // from the last to first intersecting item, find the value for the input item
    // if we get to a null or true, that is the first possible index
    const value = findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: item,
      itemB: intersectingItems[index],
    });
    if (value === true) {
      return index;
    } else if (value === null) {
      return index;
    }
  }

  return undefined;
}

export function findAllPossibleIndexes({
  matrixGrids,
  matrixLabels,
  item,
  intersectingItems,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  item: string | number;
  intersectingItems: (string | number)[];
}): number[] {
  // If there is a true, just returns the first true index
  // Otherwise, returns all null indexes

  const possibleIndexes: number[] = [];
  for (let index = 0; index < intersectingItems.length; index++) {
    const value = findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: item,
      itemB: intersectingItems[index],
    });
    if (value === true) {
      return [index];
    } else if (value === null) {
      possibleIndexes.push(index);
    }
  }

  return possibleIndexes;
}

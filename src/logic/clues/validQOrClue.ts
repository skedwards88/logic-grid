import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/generateSolutionMatrix";
import {type OrClue} from "./getOrClue";

export function validQOrClue({
  matrixGrids,
  matrixLabels,
  clueParameters: {itemA, orItems, allItems},
  strict = false,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  clueParameters: OrClue["clueParameters"];
  strict?: boolean;
}): boolean {
  const [itemB, itemC] = orItems;
  const aVsB = findMatrixValue({matrixGrids, matrixLabels, itemA, itemB});
  const aVsC = findMatrixValue({
    matrixGrids,
    matrixLabels,
    itemA,
    itemB: itemC,
  });

  // item A cannot be both itemB and itemC
  if (aVsB && aVsC) {
    return false;
  }

  // item A cannot not be both itemB and itemC
  if (aVsB === false && aVsC === false) {
    return false;
  }

  // itemA cannot be any of the non-or items
  for (const item of allItems) {
    if (!orItems.includes(item)) {
      if (findMatrixValue({matrixGrids, matrixLabels, itemA, itemB: item})) {
        return false;
      }
    }
  }

  if (strict) {
    // itemA has to be one of B or C
    // (currently not forcing the other item to be 'false')
    if (!(aVsB || aVsC)) {
      return false;
    }
  }

  return true;
}

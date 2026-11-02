import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/buildEmptyMatrix";
import {type OrCrossCategoryClue} from "./getOrCrossCategoryClue";

export function validQOrCrossCategoryClue({
  matrixGrids,
  matrixLabels,
  clueParameters: {
    itemA,
    orItems: [itemB, itemC],
  },
  strict = false,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  clueParameters: OrCrossCategoryClue["clueParameters"];
  strict?: boolean;
}): boolean {
  // itemB cannot be itemC
  if (findMatrixValue({matrixGrids, matrixLabels, itemA: itemB, itemB: itemC}))
    return false;

  const aVsB = findMatrixValue({matrixGrids, matrixLabels, itemA, itemB});
  const aVsC = findMatrixValue({
    matrixGrids,
    matrixLabels,
    itemA,
    itemB: itemC,
  });

  // itemA cannot be both itemB and itemC
  if (aVsB && aVsC) return false;

  // itemA cannot not be both itemB and itemC
  if (aVsB === false && aVsC === false) return false;

  if (strict) {
    // itemA has to be one of B or C
    // (currently not forcing the other item to be 'false')
    if (!(aVsB || aVsC)) return false;
  }

  // (currently not checking that no other items in the C set are true if AvsB is false and vice versa)

  return true;
}

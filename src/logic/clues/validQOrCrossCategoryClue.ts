import {findMatrixValue} from "../matrixSearching/findMatrixValue";

export function validQOrCrossCategoryClue({
  matrix,
  clueParameters: {
    itemA,
    orItems: [itemB, itemC],
  },
  strict = false,
}) {
  // itemB cannot be itemC
  if (findMatrixValue(matrix, itemB, itemC)) return false;

  const aVsB = findMatrixValue(matrix, itemA, itemB);
  const aVsC = findMatrixValue(matrix, itemA, itemC);

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

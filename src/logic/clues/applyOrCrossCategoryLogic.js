import {findMatrixValue} from "../helpers/findMatrixValue.js";
import {setToFalse} from "../setValue.js";

export function applyOrCrossCategoryLogic(
  derivedMatrix,
  {itemA, itemB, itemC},
) {
  let newDerivedMatrix = derivedMatrix;

  // Know that itemB is not itemC
  newDerivedMatrix = setToFalse(newDerivedMatrix, itemB, itemC);

  // If you know that itemA is itemB, then you know itemA is not itemC
  // If you know that itemA is itemC, then you know itemA is not itemB
  if (findMatrixValue(newDerivedMatrix, itemA, itemB)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemC);
  } else if (findMatrixValue(newDerivedMatrix, itemA, itemC)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);
  }

  return newDerivedMatrix;
}

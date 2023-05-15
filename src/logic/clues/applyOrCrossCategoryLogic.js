import {findMatrixValue} from "../helpers/findMatrixValue.js";
import {setToFalse, setToTrue} from "../setValue.js";

export function applyOrCrossCategoryLogic(
  derivedMatrix,
  {itemA, itemB, itemC},
) {
  console.log('in applyOrCrossCategoryLogic')
  let newDerivedMatrix = derivedMatrix;

  // Know that itemB is not itemC
  newDerivedMatrix = setToFalse(newDerivedMatrix, itemB, itemC);

  // If you know that itemA is itemB, then you know itemA is not itemC
  // If you know that itemA is itemC, then you know itemA is not itemB
  // If you know that itemA is not itemB, then you know itemA is itemC
  // If you know that itemA is not itemC, then you know itemA is itemB
  if (findMatrixValue(newDerivedMatrix, itemA, itemB)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemC);
  } else if (findMatrixValue(newDerivedMatrix, itemA, itemC)) {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);
  } else if (findMatrixValue(newDerivedMatrix, itemA, itemB) === false) {
    newDerivedMatrix = setToTrue(newDerivedMatrix, itemA, itemC);
  } else if (findMatrixValue(newDerivedMatrix, itemA, itemC) === false) {
    newDerivedMatrix = setToTrue(newDerivedMatrix, itemA, itemB);
  }

  return newDerivedMatrix;
}

import {setToFalse} from "../setValue.js";

export function applyOrLogic(derivedMatrix, {notItems, itemB}) {
  // the "or" clue equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  // take each comparison separately
  let newDerivedMatrix = derivedMatrix;
  notItems.forEach((itemA) => {
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);
  });
  return newDerivedMatrix;
}

import {setToFalse} from "../setValue.js";

export function applyOrLogic(
  derivedMatrix,
  {colLabels, colIndexTrue, colIndexFalse, rowItem},
) {
  // the "or" clue equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  // take each comparison separately
  let newDerivedMatrix = derivedMatrix;
  for (let colIndex = 0; colIndex < colLabels.length; colIndex++) {
    if (colIndex === colIndexTrue || colIndex === colIndexFalse) {
      continue;
    }
    newDerivedMatrix = setToFalse(
      newDerivedMatrix,
      rowItem,
      colLabels[colIndex],
    );
  }
  return newDerivedMatrix;
}
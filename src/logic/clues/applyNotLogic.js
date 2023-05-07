import {setToFalse} from "../setValue.js";

export function applyNotLogic(derivedMatrix, {rowItem, colItem}) {
  let newDerivedMatrix = setToFalse(derivedMatrix, rowItem, colItem);

  return newDerivedMatrix;
}

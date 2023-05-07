import {setToFalse} from "../setValue.js";

export function applyNotLogic(derivedMatrix, {itemA, itemB}) {
  let newDerivedMatrix = setToFalse(derivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

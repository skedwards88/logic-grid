import { setToFalse } from "../puzzleGeneration/setValue";

export function applyNotLogic(derivedMatrix, { itemA, itemB }) {
  let newDerivedMatrix = setToFalse(derivedMatrix, itemA, itemB);

  return newDerivedMatrix;
}

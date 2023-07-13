import {gridsEqualQ} from "./gridsEqualQ.js";

export function matrixesEqualQ(matrixA, matrixB) {
  // exit early if we got the exact same object
  if (matrixA === matrixB) return true;

  // exit early if we didn't get valid input
  if (
    typeof matrixA !== "object" ||
    typeof matrixB !== "object" ||
    !matrixA ||
    !matrixB
  )
    throw new Error("matrixesEqualQ: Inputs are not objects");

  const matrixAKeys = Object.keys(matrixA);
  const matrixBKeys = Object.keys(matrixB);
  if (matrixAKeys.length !== matrixBKeys.length)
    throw new Error(
      "matrixesEqualQ: Inputs do not have the same number of keys",
    );

  for (let key of matrixAKeys) {
    if (!matrixBKeys.includes(key))
      throw new Error("matrixesEqualQ: Inputs have different keys");

    const matrixAGrid = matrixA[key].grid;
    const matrixBGrid = matrixB[key].grid;

    if (!gridsEqualQ(matrixAGrid, matrixBGrid)) {
      return false;
    }
  }

  return true;
}

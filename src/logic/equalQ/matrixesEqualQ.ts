import {type MatrixGrids} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {gridsEqualQ} from "./gridsEqualQ";

export function matrixesEqualQ(
  matrixGridsA: MatrixGrids,
  matrixGridsB: MatrixGrids,
): boolean {
  // exit early if we got the exact same object
  if (matrixGridsA === matrixGridsB) return true;

  // exit early if we didn't get valid input
  if (
    typeof matrixGridsA !== "object" ||
    typeof matrixGridsB !== "object" ||
    !matrixGridsA ||
    !matrixGridsB
  )
    throw new Error("matrixesEqualQ: Inputs are not objects");

  const matrixAKeys = Object.keys(matrixGridsA);
  const matrixBKeys = Object.keys(matrixGridsB);
  if (matrixAKeys.length !== matrixBKeys.length)
    throw new Error(
      "matrixesEqualQ: Inputs do not have the same number of keys",
    );

  for (const key of matrixAKeys) {
    if (!matrixBKeys.includes(key))
      throw new Error("matrixesEqualQ: Inputs have different keys");

    const matrixAGrid = matrixGridsA[key];
    const matrixBGrid = matrixGridsB[key];

    if (!gridsEqualQ(matrixAGrid, matrixBGrid)) {
      return false;
    }
  }

  return true;
}

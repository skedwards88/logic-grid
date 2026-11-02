import {type MatrixGrids} from "./puzzleGeneration/buildEmptyMatrixGrids";

export function puzzleSolvedQ(derivedMatrixGrids: MatrixGrids): boolean {
  for (const key in derivedMatrixGrids) {
    const grid = derivedMatrixGrids[key];
    for (const row of grid) {
      for (const item of row) {
        if (item === null) {
          return false;
        }
      }
    }
  }
  return true;
}

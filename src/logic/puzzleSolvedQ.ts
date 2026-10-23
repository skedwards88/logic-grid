import {type PuzzleMatrix} from "./puzzleGeneration/buildEmptyMatrix";

export function puzzleSolvedQ(derivedMatrix: PuzzleMatrix): boolean {
  for (const key in derivedMatrix) {
    const grid = derivedMatrix[key].grid;
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

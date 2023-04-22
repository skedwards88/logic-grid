import {matrixesEqualQ} from "./matrixesEqualQ.js";

export function applyCluesAdNauseam(clues, derivedMatrix) {
  // Continually apply the clues to the matrix until the clues no longer change the matrix.
  // This helps catch some of the cascading logic.
  // e.g. if you know red is more than blue, and you learn that blue is 3 (out of 4), you need now know that red is 4
  // todo maybe only reapply the clues that could change (add a return value to the clue to do this)
  let matrixMayChange = true;
  let matrixPreClues = derivedMatrix;
  let matrixPostClues = derivedMatrix;

  while (matrixMayChange) {
    for (let clueIndex = 0; clueIndex < clues.length; clueIndex++) {
      matrixPostClues = clues[clueIndex].clueLogic(matrixPostClues);
    }
    matrixMayChange = !matrixesEqualQ(matrixPreClues, matrixPostClues);
    matrixPreClues = matrixPostClues;
  }
  return derivedMatrix;
}

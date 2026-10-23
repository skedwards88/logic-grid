import {matrixesEqualQ} from "../equalQ/matrixesEqualQ";
import {applyClueLogic} from "../clues/applyClueLogic";
import {type Clue} from "./getUsefulClue";
import {type PuzzleMatrix} from "./buildEmptyMatrix";

export function applyCluesAdNauseam(
  clues: Clue[],
  derivedMatrix: PuzzleMatrix,
): PuzzleMatrix {
  // Continually apply the clues to the matrix until the clues no longer change the matrix.
  // This helps catch some of the cascading logic.
  // e.g. if you know red is more than blue, and you learn that blue is 3 (out of 4), you need now know that red is 4
  // It doesn't catch everything (e.g. if you know yellow is more than blue and yellow is more than green,
  //   it still only knows that yellow is not 1 (not that yellow is not 1 or 2))
  let matrixMayChange = true;
  let matrixPreClues = derivedMatrix;
  let matrixPostClues = derivedMatrix;

  while (matrixMayChange) {
    for (let clueIndex = 0; clueIndex < clues.length; clueIndex++) {
      matrixPostClues = applyClueLogic(clues[clueIndex], matrixPostClues);
    }
    matrixMayChange = !matrixesEqualQ(matrixPreClues, matrixPostClues);
    matrixPreClues = matrixPostClues;
  }
  return matrixPostClues;
}

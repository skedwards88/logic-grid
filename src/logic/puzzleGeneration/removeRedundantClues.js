import cloneDeep from "lodash.clonedeep";
import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import {matrixesEqualQ} from "../equalQ/matrixesEqualQ.js";

export function removeRedundantClues(clues, emptyMatrix) {
  // Remove redundant clues by seeing if each clue makes any difference
  //  if it is applied after all other clues are applied
  let nonRedundantClues = [];
  for (let clueIndex = 0; clueIndex < clues.length; clueIndex++) {
    const cluesSansClue = [
      ...nonRedundantClues, // the first part of the list is the clues we have screened for redundancy
      ...clues.slice(clueIndex + 1, clues.length), // the second part are the remaining clues, minus the current clue
    ];
    const newDerivedMatrix = cloneDeep(emptyMatrix);
    const matrixWithOtherCluesApplied = applyCluesAdNauseam(
      cluesSansClue,
      newDerivedMatrix,
    );
    const matrixWithAllCluesApplied = applyCluesAdNauseam(
      [clues[clueIndex]],
      matrixWithOtherCluesApplied,
    );
    if (
      !matrixesEqualQ(matrixWithOtherCluesApplied, matrixWithAllCluesApplied)
    ) {
      nonRedundantClues = [...nonRedundantClues, clues[clueIndex]];
    }
  }
  return nonRedundantClues;
}

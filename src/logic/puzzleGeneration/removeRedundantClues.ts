import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import {matrixesEqualQ} from "../equalQ/matrixesEqualQ";
import {type Clue} from "./getUsefulClue";
import {type MatrixGrids, type MatrixLabels} from "./buildEmptyMatrix";

export function removeRedundantClues({
  clues,
  emptyMatrixGrids,
  matrixLabels,
}: {
  clues: Clue[];
  emptyMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
}): Clue[] {
  // Remove redundant clues by seeing if each clue makes any difference
  //  if it is applied after all other clues are applied
  const nonRedundantClues: Clue[] = [];
  for (let clueIndex = 0; clueIndex < clues.length; clueIndex++) {
    const cluesSansClue = [
      ...nonRedundantClues, // the first part of the list is the clues we have screened for redundancy
      ...clues.slice(clueIndex + 1, clues.length), // the second part are the remaining clues, minus the current clue
    ];
    const newDerivedMatrixGrids = structuredClone(emptyMatrixGrids);
    const matrixWithOtherCluesApplied = applyCluesAdNauseam({
      clues: cluesSansClue,
      matrixGrids: newDerivedMatrixGrids,
      matrixLabels,
    });
    const matrixWithAllCluesApplied = applyCluesAdNauseam({
      clues: [clues[clueIndex]],
      matrixGrids: matrixWithOtherCluesApplied,
      matrixLabels,
    });
    if (
      !matrixesEqualQ(matrixWithOtherCluesApplied, matrixWithAllCluesApplied)
    ) {
      nonRedundantClues.push(clues[clueIndex]);
    }
  }
  return nonRedundantClues;
}

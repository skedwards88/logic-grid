import {getOrClue, type OrClue} from "../clues/getOrClue";
import {getNotClue, type NotClue} from "../clues/getNotClue";
import {
  getNumericComparisonClue,
  type NumericComparisonClue,
} from "../clues/getNumericComparisonClue";
import {
  getNumericComparisonCrossCategoryClue,
  type NumericComparisonCrossCategoryClue,
} from "../clues/getNumericComparisonCrossCategoryClue";
import {
  getOrCrossCategoryClue,
  type OrCrossCategoryClue,
} from "../clues/getOrCrossCategoryClue";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {matrixesEqualQ} from "../equalQ/matrixesEqualQ";
import {applyClueLogic} from "../clues/applyClueLogic";
import {type PuzzleMatrix, type SolvedPuzzleMatrix} from "./buildEmptyMatrix";

export type Clue =
  | OrClue
  | NotClue
  | NumericComparisonClue
  | NumericComparisonCrossCategoryClue
  | OrCrossCategoryClue;

export function getUsefulClue(
  solutionMatrix: SolvedPuzzleMatrix,
  derivedMatrix: PuzzleMatrix,
  includeCrossCategoryClues: boolean,
  includeNumericClues: boolean,
): {clue: Clue; newDerivedMatrix: PuzzleMatrix} {
  let clue: Clue;
  let newDerivedMatrix: PuzzleMatrix;

  let clueFunctions: ((solutionMatrix: SolvedPuzzleMatrix) => Clue)[] = [
    getNotClue,
    getOrClue,
  ];
  if (includeCrossCategoryClues) {
    clueFunctions = [...clueFunctions, getOrCrossCategoryClue];
  }
  if (includeNumericClues) {
    clueFunctions = [...clueFunctions, getNumericComparisonClue];
  }
  if (includeCrossCategoryClues && includeNumericClues) {
    clueFunctions = [...clueFunctions, getNumericComparisonCrossCategoryClue];
  }

  while (true) {
    // get a clue
    const clueFunction = pickRandomItemFromArray(clueFunctions);
    clue = clueFunction(solutionMatrix);

    // see if it changes the derivedMatrix
    newDerivedMatrix = applyClueLogic(clue, derivedMatrix);

    if (!matrixesEqualQ(newDerivedMatrix, derivedMatrix)) {
      return {
        clue,
        newDerivedMatrix,
      };
    }
  }
}

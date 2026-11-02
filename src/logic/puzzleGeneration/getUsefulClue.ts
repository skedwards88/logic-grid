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
import {
  type MatrixTemplates,
  type MatrixGrids,
  type MatrixLabels,
} from "./buildEmptyMatrix";

export type Clue =
  | OrClue
  | NotClue
  | NumericComparisonClue
  | NumericComparisonCrossCategoryClue
  | OrCrossCategoryClue;

export function getUsefulClue({
  solvedMatrixGrids,
  derivedMatrixGrids,
  matrixLabels,
  matrixTemplates,
  includeCrossCategoryClues,
  includeNumericClues,
}: {
  solvedMatrixGrids: MatrixGrids;
  derivedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
  includeCrossCategoryClues: boolean;
  includeNumericClues: boolean;
}): {clue: Clue; newDerivedMatrixGrids: MatrixGrids} {
  let clue: Clue;
  let newDerivedMatrixGrids: MatrixGrids;

  const clueFunctions: (({
    solvedMatrixGrids,
    matrixLabels,
    matrixTemplates,
  }: {
    solvedMatrixGrids: MatrixGrids;
    matrixLabels: MatrixLabels;
    matrixTemplates: MatrixTemplates;
  }) => Clue)[] = [getNotClue, getOrClue];
  if (includeCrossCategoryClues) {
    clueFunctions.push(getOrCrossCategoryClue);
  }
  if (includeNumericClues) {
    clueFunctions.push(getNumericComparisonClue);
  }
  if (includeCrossCategoryClues && includeNumericClues) {
    clueFunctions.push(getNumericComparisonCrossCategoryClue);
  }

  while (true) {
    // get a clue
    const clueFunction = pickRandomItemFromArray(clueFunctions);
    clue = clueFunction({solvedMatrixGrids, matrixLabels, matrixTemplates});

    // see if it changes the derivedMatrixGrids
    newDerivedMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: derivedMatrixGrids,
      matrixLabels,
    });

    if (!matrixesEqualQ(newDerivedMatrixGrids, derivedMatrixGrids)) {
      return {
        clue,
        newDerivedMatrixGrids,
      };
    }
  }
}

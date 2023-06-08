import {getOrClue} from "./clues/getOrClue.js";
import {getNotClue} from "./clues/getNotClue.js";
import {getNumericComparisonClue} from "./clues/getNumericComparisonClue.js";
import {getNumericComparisonCrossCategoryClue} from "./clues/getNumericComparisonCrossCategoryClue.js";
import {getOrCrossCategoryClue} from "./clues/getOrCrossCategoryClue.js";
import {pickRandom} from "./helpers/pickRandom.js";
import {matrixesEqualQ} from "./helpers/matrixesEqualQ.js";
import {applyClueLogic} from "./clues/applyClueLogic.js";

export function getUsefulClue(
  solutionMatrix,
  derivedMatrix,
  includeCrossCategoryClues,
  includeNumericClues,
) {
  let foundUsefulClue = false;
  let clue;
  let newDerivedMatrix;

  let clueFunctions = [getNotClue, getOrClue];
  if (includeCrossCategoryClues) {
    clueFunctions = [...clueFunctions, getOrCrossCategoryClue];
  }
  if (includeNumericClues) {
    clueFunctions = [...clueFunctions, getNumericComparisonClue];
  }
  if (includeCrossCategoryClues && includeNumericClues) {
    clueFunctions = [...clueFunctions, getNumericComparisonCrossCategoryClue];
  }

  while (!foundUsefulClue) {
    // get a clue
    let clueFunction = pickRandom(clueFunctions);
    clue = clueFunction(solutionMatrix);

    // see if it changes the derivedMatrix
    newDerivedMatrix = applyClueLogic(
      clue.clueType,
      derivedMatrix,
      clue.clueParameters,
    );
    foundUsefulClue = !matrixesEqualQ(newDerivedMatrix, derivedMatrix);
  }

  return {
    clue: clue,
    newDerivedMatrix: newDerivedMatrix,
  };
}

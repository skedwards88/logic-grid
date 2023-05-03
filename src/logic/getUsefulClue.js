import {getOrClue} from "./clues/getOrClue.js";
import {getNotClue} from "./clues/getNotClue.js";
import {getNumericComparisonClue} from "./clues/getNumericComparisonClue.js";
import {getNumericComparisonCrossCategoryClue} from "./clues/getNumericComparisonCrossCategoryClue.js";
import {getOrCrossCategoryClue} from "./clues/getOrCrossCategoryClue.js";
import {pickRandom} from "./helpers/pickRandom.js";
import {matrixesEqualQ} from "./helpers/matrixesEqualQ.js";

export function getUsefulClue(
  solutionMatrix,
  derivedMatrix,
  includeCrossCategoryClues,
  includeNumericClues,
) {
  let foundUsefulClue = false;
  let clue;
  let newDerivedMatrix;

  let clueFunctions = [getNotClue, getOrClue]; // todo add more clues to here as build

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
    newDerivedMatrix = clue.clueLogic(derivedMatrix);
    // todo write cleaner comparison method
    // could also check this at the time the clue was applied--more efficient but maybe less readable
    foundUsefulClue = !matrixesEqualQ(newDerivedMatrix, derivedMatrix);

    // If this put the next to last false in a row/col, the last null is true
    // If this put a true in a space, all other items in that row/col are false
  }

  return {
    clue: clue,
    newDerivedMatrix: newDerivedMatrix,
  };
}

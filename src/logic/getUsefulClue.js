import { getOrClue } from "./getOrClue.js";
import { getNotClue } from "./getNotClue.js";
import { pickRandom } from "./pickRandom.js";

export function getUsefulClue(solutionMatrix, derivedMatrix) {
  let foundUsefulClue = false;
  let clue;
  let newDerivedMatrix;

  const clueFunctions = [getNotClue, getOrClue]; // todo add more clues to here as build

  while (!foundUsefulClue) {
    // get a clue
    let clueFunction = pickRandom(clueFunctions);
    clue = clueFunction(solutionMatrix);

    // see if it changes the derivedMatrix
    newDerivedMatrix = clue.clueLogic(derivedMatrix);
    // todo write cleaner comparison method
    // could also check this at the time the clue was applied--more efficient but maybe less readable
    foundUsefulClue =
      JSON.stringify(newDerivedMatrix) !== JSON.stringify(derivedMatrix);

    // If this put the next to last false in a row/col, the last null is true
    // If this put a true in a space, all other items in that row/col are false
  }

  return {
    clue: clue,
    newDerivedMatrix: newDerivedMatrix,
  };
}

import { getOrClue } from "./getOrClue.js";
import { getNotClue } from "./getNotClue.js";

export function getUsefulClue(solution, derivedMatrix) {
  let foundUsefulClue = false;
  let clue;
  let newDerivedMatrix;

  while (!foundUsefulClue) {
    // get a clue
    clue = getOrClue(solution); // todo randomize clue type

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

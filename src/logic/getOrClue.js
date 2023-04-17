import {pickRandom, pickRandomIndex} from "./pickRandom.js";
import {setToFalse} from "./setValue.js";

// Generates an "or" clue
// e.g. "Colin is red or blue"
// which equates to "Colin is not green or yellow"
export function getOrClue(solutionMatrix) {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandom(Object.keys(solutionMatrix));
  const colLabels = solutionMatrix[solutionKey].colLabels;
  const rowLabels = solutionMatrix[solutionKey].rowLabels;
  const grid = solutionMatrix[solutionKey].grid;

  // Choose a random row label (e.g. 'Colin') // todo later randomize row vs col?
  const rowIndex = pickRandomIndex(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // get the 'true' from that row
  const colIndexTrue = grid[rowIndex].indexOf(true);
  const colItemTrue = colLabels[colIndexTrue];

  // choose any of the falses from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const colIndexFalse = pickRandom(falseIndexes);
  const colItemFalse = colLabels[colIndexFalse];

  const writtenClue = `${rowItem} is ${colItemTrue} or ${colItemFalse}`; //todo should randomize so the correct value isn't always first

  function clueLogic(derivedMatrix) {
    // the "or" clue equates to "not" clues for all other indexes
    // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
    // take each comparison separately
    let newDerivedMatrix = derivedMatrix;
    for (let colIndex = 0; colIndex < colLabels.length; colIndex++) {
      if (colIndex === colIndexTrue || colIndex === colIndexFalse) {
        continue;
      }
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        rowItem,
        colLabels[colIndex],
      );
    }
    return newDerivedMatrix;
  }
  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

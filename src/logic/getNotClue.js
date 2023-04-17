import {pickRandom, pickRandomIndex} from "./pickRandom.js";
import {setToFalse} from "./setValue.js";

// Generates a "not" clue
// e.g. "Colin is not blue"
export function getNotClue(solutionMatrix) {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandom(Object.keys(solutionMatrix));
  const colLabels = solutionMatrix[solutionKey].colLabels;
  const rowLabels = solutionMatrix[solutionKey].rowLabels;
  const grid = solutionMatrix[solutionKey].grid;

  // Choose a random row label (e.g. 'Colin')
  const rowIndex = pickRandomIndex(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // choose any of the falses from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const colIndex = pickRandom(falseIndexes);

  const colItem = colLabels[colIndex];

  const writtenClue = `${rowItem} is not ${colItem}`; //todo can randomize order

  function clueLogic(derivedMatrix) {
    let newDerivedMatrix = setToFalse(derivedMatrix, rowItem, colItem);

    return newDerivedMatrix;
  }

  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

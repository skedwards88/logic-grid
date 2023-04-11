import { pickRandom } from "./pickRandom.js";
import { setToFalse } from "./setValue.js";
import { buildSolutionKey } from "./buildSolutionKey.js";

// Generates a "not" clue
// e.g. "Colin is not blue"
export function getNotClue(solution) {
  let solutionIndexes = Array.from(solution.keys());
  let clueIndexes = Array.from(solution[0].keys());

  // choose a solution index and get the value at that index
  // e.g. [ 'Colin', 1, 'fly', 'red' ]
  const solutionIndexA = pickRandom(solutionIndexes);
  const solutionA = solution[solutionIndexA];

  // choose an item index and get the value at that index
  // e.g. 'Colin'
  const categoryIndexA = pickRandom(clueIndexes);
  const itemA = solutionA[categoryIndexA];

  // delete the used indexes so that we don't re-pick them
  solutionIndexes.splice(solutionIndexA, 1);
  clueIndexes.splice(categoryIndexA, 1);

  // choose another solution index and get the value at that index
  // e.g. [ 'Sarah', 2, 'back', 'blue' ]
  const solutionIndexB = pickRandom(solutionIndexes);
  const solutionB = solution[solutionIndexB];

  // choose another item index and get the value at that index
  // e.g. 'blue'
  const categoryIndexB = pickRandom(clueIndexes);
  const itemB = solutionB[categoryIndexB];

  const writtenClue = `${itemA} is not ${itemB}`;

  function clueLogic(derivedMatrix) {
    const solutionKey = buildSolutionKey(categoryIndexA, categoryIndexB);
    const rowItem = categoryIndexA < categoryIndexB ? itemA : itemB;
    const colItem = categoryIndexA < categoryIndexB ? itemB : itemA;

    let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));
    let solutionEntry = newDerivedMatrix[solutionKey];
    const solutionRows = solutionEntry.rowLabels;
    const solutionCols = solutionEntry.colLabels;

    const rowIndex = solutionRows.indexOf(rowItem);
    const colIndex = solutionCols.indexOf(colItem);

    solutionEntry.grid = setToFalse(solutionEntry.grid, rowIndex, colIndex);

    return newDerivedMatrix;
  }

  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

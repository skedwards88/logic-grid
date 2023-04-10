import { pickRandom } from "./pickRandom.js";
import { setToFalse } from "./setValue.js";
import { buildSolutionKey } from "./buildSolutionKey.js";

// Generates an "or" clue
// e.g. "Colin is red or blue"
// which equates to "Colin is not green or yellow"
export function getOrClue(solution) {
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

  // choose a second item index
  const categoryIndexB = pickRandom(clueIndexes);

  // choose another solution index and get the value at that index
  // e.g. [ 'Sarah', 2, 'back', 'blue' ]
  const solutionIndexB = pickRandom(solutionIndexes);
  const solutionB = solution[solutionIndexB];

  // get the actual item and an incorrect item for the second category
  const actualItemB = solutionA[categoryIndexB];
  const nonActualItemB = solutionB[categoryIndexB];

  const writtenClue = `${itemA} is ${actualItemB} or ${nonActualItemB}`; //todo should randomize so the correct value isn't always first
  console.log(JSON.stringify(writtenClue));

  // this equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  // delete this second index so that the remaining indexes are all "not"
  clueIndexes.splice(categoryIndexB, 1);

  function clueLogic(solutionMatrix) {
    const solutionKey = buildSolutionKey(categoryIndexA, categoryIndexB);

    let newSolutionMatrix = JSON.parse(JSON.stringify(solutionMatrix));
    let solutionEntry = newSolutionMatrix[solutionKey];
    let newSolutionGrid = solutionEntry.grid;

    // take each comparison separately
    for (let index = 0; index < clueIndexes.length; index++) {
      let rowIndex;
      let colIndex;

      if (categoryIndexA < categoryIndexB) {
        const solutionRows = solutionEntry.rowLabels;
        rowIndex = solutionRows.indexOf(itemA);
        colIndex = clueIndexes[index];
      } else {
        const solutionCols = solutionEntry.colLabels;
        rowIndex = clueIndexes[index];
        colIndex = solutionCols.indexOf(itemA);
      }

      newSolutionGrid = setToFalse(newSolutionGrid, rowIndex, colIndex);
      newSolutionMatrix[solutionKey].grid = newSolutionGrid;
    }
    console.log(JSON.stringify(newSolutionMatrix));
    return newSolutionMatrix;
  }
  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

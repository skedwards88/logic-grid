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

  // delete the used indexes so that we don't re-use them
  // now we won't pick the solution [ 'Colin', 1, 'fly', 'red' ]
  // or the category 'Name' ('Colin' 'Sarah', ...)
  solutionIndexes.splice(solutionIndexA, 1);
  clueIndexes.splice(categoryIndexA, 1);

  // choose a second category index and item
  // e.g. 'red'
  // this is the true value in the "or" clue
  const categoryIndexB = pickRandom(clueIndexes);
  const actualItemB = solutionA[categoryIndexB];

  // choose another solution index and get the value at that "B" index
  // e.g. [ 'Sarah', 2, 'back', 'blue' ], 'blue'
  // this is the false value in the "or" clue
  const solutionIndexB = pickRandom(solutionIndexes);
  const solutionB = solution[solutionIndexB];
  const nonActualItemB = solutionB[categoryIndexB];

  const writtenClue = `${itemA} is ${actualItemB} or ${nonActualItemB}`; //todo should randomize so the correct value isn't always first

  // this equates to "not" clues for all other indexes
  // ("Colin is 1 or 2" means "Colin is not 3", "Colin is not 4")
  const knownNotItemBs = solution.map((solutionItem) => solutionItem[categoryIndexB]).filter((item) => item !== actualItemB && item !== nonActualItemB);

  function clueLogic(derivedMatrix) {
    const solutionKey = buildSolutionKey(categoryIndexA, categoryIndexB);

    let newDerivedMatrix = JSON.parse(JSON.stringify(derivedMatrix));
    let solutionEntry = newDerivedMatrix[solutionKey];
    const solutionRows = solutionEntry.rowLabels;
    const solutionCols = solutionEntry.colLabels;

    // take each comparison separately
    for (let index = 0; index < knownNotItemBs.length; index++) {

      let rowIndex;
      let colIndex;

      if (categoryIndexA < categoryIndexB) {
        rowIndex = solutionRows.indexOf(itemA);
        colIndex = solutionCols.indexOf(knownNotItemBs[index]);
      } else {
        rowIndex = solutionRows.indexOf(knownNotItemBs[index]);
        colIndex = solutionCols.indexOf(itemA);
      }

      solutionEntry.grid = setToFalse(solutionEntry.grid, rowIndex, colIndex);
    }
    return newDerivedMatrix;
  }
  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

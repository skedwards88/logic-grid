import { pickRandom } from "./pickRandom.js";
import { setToFalse } from "./setValue.js";

// "not" clue
// e.g. "colin is not blue"
export function getNotClue(solution) {
  let solutionIndexes = Array.from(solution.keys());
  let clueIndexes = Array.from(solution[0].keys());

  // choose solution index e.g.   [ 'Colin', 1, 'fly', 'red' ]
  const solutionIndex1 = pickRandom(solutionIndexes);
  const solution1 = solution[solutionIndex1];
  // choose clue index e.g. 'Colin'
  const catIndex1 = pickRandom(clueIndexes);
  const item1 = solution1[catIndex1];

  // delete the used indexes so that we don't re-pick them
  solutionIndexes.splice(solutionIndex1, 1);
  clueIndexes.splice(catIndex1, 1);

  // choose another solution index e.g.   [ 'Sarah', 2, 'back', 'blue' ]
  const solutionIndex2 = pickRandom(solutionIndexes);
  const solution2 = solution[solutionIndex2];

  // choose another clue index e.g. 'blue'
  const catIndex2 = pickRandom(clueIndexes);
  const item2 = solution2[catIndex2];

  const writtenClue = `${item1} is not ${item2}`;

  function clueLogic(solutionMatrix) {
    const solutionKey =
      catIndex1 < catIndex2
        ? `${catIndex1}v${catIndex2}`
        : `${catIndex2}v${catIndex1}`;
    const rowItem = catIndex1 < catIndex2 ? item1 : item2;
    const colItem = catIndex1 < catIndex2 ? item2 : item1;

    let newSolutionMatrix = JSON.parse(JSON.stringify(solutionMatrix));
    let solutionEntry = newSolutionMatrix[solutionKey];
    let newSolutionGrid = solutionEntry.grid;
    const solutionRows = solutionEntry.rowLabels;
    const solutionCols = solutionEntry.colLabels;

    const rowIndex = solutionRows.indexOf(rowItem);
    const colIndex = solutionCols.indexOf(colItem);

    newSolutionGrid = setToFalse(newSolutionGrid, rowIndex, colIndex);

    newSolutionMatrix[solutionKey].grid = newSolutionGrid;

    return newSolutionMatrix;
  }
  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

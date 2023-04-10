import { pickRandom } from "./pickRandom.js";
import { setToFalse } from "./setValue.js";

// "or" clue
// e.g. "Colin is red or blue"
export function getOrClue(solution) {
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

  // choose a second clue index
  const catIndex2 = pickRandom(clueIndexes);

  // choose another solution index e.g.   [ 'Sarah', 2, 'back', 'blue' ]
  const solutionIndex2 = pickRandom(solutionIndexes);
  const solution2 = solution[solutionIndex2];

  // get the actual and an incorrect value for the second cat
  const actualItem2 = solution1[catIndex2];
  const nonActualItem2 = solution2[catIndex2];

  const writtenClue = `${item1} is ${actualItem2} or ${nonActualItem2}`;

  console.log(JSON.stringify(writtenClue));
  // this equates to "not"" clues for all other indexes
  // (colin is 1 or 2 means colin is not 3, colin is not 4)
  clueIndexes.splice(catIndex2, 1);

  function clueLogic(solutionMatrix) {
    const solutionKey =
      catIndex1 < catIndex2
        ? `${catIndex1}v${catIndex2}`
        : `${catIndex2}v${catIndex1}`;

    let newSolutionMatrix = JSON.parse(JSON.stringify(solutionMatrix));
    let solutionEntry = newSolutionMatrix[solutionKey];
    let newSolutionGrid = solutionEntry.grid;

    // take each comparison separately
    console.log(JSON.stringify(clueIndexes));
    for (let index = 0; index < clueIndexes.length; index++) {
      let rowIndex;
      let colIndex;

      if (catIndex1 < catIndex2) {
        const solutionRows = solutionEntry.rowLabels;
        rowIndex = solutionRows.indexOf(item1);
        colIndex = clueIndexes[index];
      } else {
        const solutionCols = solutionEntry.colLabels;
        rowIndex = clueIndexes[index];
        colIndex = solutionCols.indexOf(item1);
      }

      // const rowItem = catIndex1 < catIndex2 ? item1 : clueIndexes[index];
      // const colItem = catIndex1 < catIndex2 ? clueIndexes[index] : item1;

      // const rowIndex = solutionRows.indexOf(rowItem);
      // const colIndex = solutionCols.indexOf(colItem);
      // console.log(`not: ${rowItem}, ${rowIndex}; ${colItem}, ${colIndex}`)
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

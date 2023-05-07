import {puzzleSolvedQ} from "./helpers/puzzleSolvedQ.js";
import {getUsefulClue} from "./getUsefulClue.js";
import {applyCluesAdNauseam} from "./helpers/applyCluesAdNauseam.js";
import {chooseCategories} from "./chooseCategories.js";
import {generateSolutionMatrix} from "./generateSolutionMatrix.js";
import {buildEmptyMatrix} from "./buildEmptyMatrix.js";

export function generatePuzzle(numCats, numItemsPerCat) {
  const categoryLabelsAndTemplates = chooseCategories(numCats, numItemsPerCat);
  const solutionMatrix = generateSolutionMatrix(categoryLabelsAndTemplates);
  const derivedMatrix = buildEmptyMatrix(categoryLabelsAndTemplates);

  // the computer just cares about one category vs another (but doesn't care which is a row vs column)
  // but humans generally make a matrix where it does matter which category is the row vs which is the column
  // so make this lookup to avoid convoluted calculations later
  const categoryLabels = categoryLabelsAndTemplates.map((i) => i.labels);
  const matrixColumnLabels = categoryLabels.slice(1, categoryLabels.length);
  const matrixRowLabels = [
    categoryLabels[0],
    ...categoryLabels.slice(2, categoryLabels.length).reverse(),
  ];

  const includeCrossCategoryClues = numCats > 2;
  const includeNumericClues = categoryLabels.some(
    (i) => typeof i[0] === "number",
  );

  let clues = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrix = derivedMatrix;

  while (!puzzleIsSolved) {
    ({clue, newDerivedMatrix} = getUsefulClue(
      solutionMatrix,
      newDerivedMatrix,
      includeCrossCategoryClues,
      includeNumericClues,
    ));
    clues = [...clues, clue];

    newDerivedMatrix = applyCluesAdNauseam(clues, newDerivedMatrix);
    newDerivedMatrix.category0_category1.grid.forEach((element, index) => {});
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  return {
    clues: clues,
    solutionMatrix: solutionMatrix,
    derivedMatrix: derivedMatrix,
    matrixRowLabels: matrixRowLabels,
    matrixColumnLabels: matrixColumnLabels,
  };
}

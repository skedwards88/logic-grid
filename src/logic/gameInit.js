import {generatePuzzle} from "./generatePuzzle";

export function gameInit() {
  const numCategories = 4; // todo min 2, max 4
  const numItemsPerCategory = 5; // todo min 3, max 5

  const {clues, solutionMatrix, derivedMatrix, rowLabels, columnLabels} =
    generatePuzzle(numCategories, numItemsPerCategory);

  return {
    clues: clues,
    solutionMatrix: solutionMatrix,
    derivedMatrix: derivedMatrix,
    numCategories: numCategories,
    numItemsPerCategory: numItemsPerCategory,
    rowLabels: rowLabels,
    columnLabels: columnLabels,
  };
}
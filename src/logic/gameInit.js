import {generatePuzzle} from "./generatePuzzle";

export function gameInit({
  numCategories = 3,
  numItemsPerCategory = 4,
  useSaved = true,
}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("logicGridState"))
    : undefined;

  if (
    savedState &&
    savedState.clues &&
    savedState.solutionMatrix &&
    savedState.derivedMatrix &&
    savedState.numCategories &&
    savedState.numItemsPerCategory &&
    savedState.matrixRowLabels &&
    savedState.matrixColumnLabels
  ) {
    return savedState;
  }

  // Make sure the numCategories is 2-4
  numCategories = Math.min(4, Math.max(2, numCategories));
  // Make sure numItemsPerCategory is 3-5
  numItemsPerCategory = Math.min(5, Math.max(3, numItemsPerCategory));

  const {
    clues,
    solutionMatrix,
    derivedMatrix,
    matrixRowLabels,
    matrixColumnLabels,
  } = generatePuzzle(numCategories, numItemsPerCategory);

  return {
    clues: clues,
    solutionMatrix: solutionMatrix,
    derivedMatrix: derivedMatrix,
    numCategories: numCategories,
    numItemsPerCategory: numItemsPerCategory,
    matrixRowLabels: matrixRowLabels,
    matrixColumnLabels: matrixColumnLabels,
  };
}

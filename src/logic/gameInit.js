import {generatePuzzle} from "./generatePuzzle";

function generateRandomID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

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

  let {
    clues,
    solutionMatrix,
    derivedMatrix,
    matrixRowLabels,
    matrixColumnLabels,
  } = generatePuzzle(numCategories, numItemsPerCategory);

  // Every clue is not crossed off to start
  clues = clues.map((clue) => ({...clue, crossedOff: false}));

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

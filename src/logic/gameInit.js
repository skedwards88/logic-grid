import {generatePuzzle} from "../logic/puzzleGeneration/generatePuzzle";
import sendAnalytics from "./sendAnalytics";

export function gameInit({
  numCategories = 3,
  numItemsPerCategory = 4,
  easyTrue = false,
  showViolations = false,
  useSaved = true,
}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("logicGridState"))
    : undefined;

  if (
    savedState &&
    savedState.clues &&
    savedState.derivedMatrixHistory &&
    savedState.numCategories &&
    savedState.numItemsPerCategory &&
    savedState.matrixRowLabels &&
    savedState.matrixColumnLabels &&
    savedState.easyTrue != undefined &&
    savedState.showViolations != undefined
  ) {
    // Only use the saved state if it is compatible with the most recent breaking change
    if (savedState.lastBreakingChange === "20230702") {
      return savedState;
    }
  }

  // Make sure the numCategories is 2-4
  numCategories = Math.min(4, Math.max(2, numCategories));
  // Make sure numItemsPerCategory is 3-5
  numItemsPerCategory = Math.min(5, Math.max(3, numItemsPerCategory));

  let {clues, derivedMatrix, matrixRowLabels, matrixColumnLabels} =
    generatePuzzle(numCategories, numItemsPerCategory);

  // Every clue is not crossed off to start
  clues = clues.map((clue) => ({...clue, crossedOff: false}));

  sendAnalytics("new_game");

  return {
    clues: clues,
    derivedMatrixHistory: [derivedMatrix],
    numCategories: numCategories,
    numItemsPerCategory: numItemsPerCategory,
    matrixRowLabels: matrixRowLabels,
    matrixColumnLabels: matrixColumnLabels,
    easyTrue: easyTrue,
    showViolations: showViolations,
    lastBreakingChange: "20230702",
  };
}

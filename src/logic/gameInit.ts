import {generatePuzzle} from "../logic/puzzleGeneration/generatePuzzle";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "./puzzleGeneration/buildEmptyMatrixGrids";
import {type Clue} from "./puzzleGeneration/getUsefulClue";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";

export type GameState = {
  id: string;
  clues: Clue[];
  matrixLabels: MatrixLabels;
  matrixGridsHistory: MatrixGrids[];
  numCategories: number;
  numItemsPerCategory: number;
  easyTrue: boolean;
  showViolations: boolean;
  lastBreakingChange: string;
};

export function gameInit({
  numCategories = 3,
  numItemsPerCategory = 4,
  easyTrue = false,
  showViolations = false,
  useSaved = true,
}: {
  numCategories?: number;
  numItemsPerCategory?: number;
  easyTrue?: boolean;
  showViolations?: boolean;
  useSaved?: boolean;
}): GameState {
  const savedState = useSaved
    ? getFromStorage<GameState>("logicGridState")
    : undefined;

  if (
    savedState?.clues &&
    savedState.matrixGridsHistory &&
    savedState.numCategories &&
    savedState.numItemsPerCategory &&
    savedState.easyTrue != undefined &&
    savedState.showViolations != undefined
  ) {
    // Only use the saved state if it is compatible with the most recent breaking change
    if (savedState.lastBreakingChange === "20230702") {
      // return savedState;
    }
  }

  // Make sure the numCategories is 2-4
  numCategories = Math.min(4, Math.max(2, numCategories));
  // Make sure numItemsPerCategory is 3-5
  numItemsPerCategory = Math.min(5, Math.max(3, numItemsPerCategory));

  const {clues, matrixGrids, matrixLabels} = generatePuzzle(
    numCategories,
    numItemsPerCategory,
  );

  return {
    id: crypto.randomUUID(), // just a random ID to track when the user generates a new puzzle
    clues,
    matrixLabels,
    matrixGridsHistory: [matrixGrids],
    numCategories,
    numItemsPerCategory,
    easyTrue,
    showViolations,
    lastBreakingChange: "20230702",
  };
}

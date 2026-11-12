import {generatePuzzle} from "../logic/puzzleGeneration/generatePuzzle";
import type {
  MatrixGrids,
  MatrixLabels,
} from "./puzzleGeneration/generateSolutionMatrix";
import type {Clue} from "./puzzleGeneration/getUsefulClue";
import {getFromStorage} from "@skedwards88/shared-components/src/logic/safeStorage";

const LAST_BREAKING_CHANGE = "20261101";
export const SAVED_STATE_KEY = "logicGridState";

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

function savedStateValidQ(input: unknown): input is GameState {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- object narrowed above; reading keys as unknown
  const savedState = input as Record<string, unknown>;

  if (savedState["lastBreakingChange"] !== LAST_BREAKING_CHANGE) {
    return false;
  }

  if (
    typeof savedState["id"] !== "string" ||
    typeof savedState["numCategories"] !== "number" ||
    typeof savedState["numItemsPerCategory"] !== "number" ||
    typeof savedState["easyTrue"] !== "boolean" ||
    typeof savedState["showViolations"] !== "boolean"
  ) {
    return false;
  }

  // This isn't full validation of these fields, but index.js clears localstorage and reloads once if the state causes errors
  if (
    !Array.isArray(savedState["clues"]) ||
    typeof savedState["matrixLabels"] !== "object" ||
    !Array.isArray(savedState["matrixGridsHistory"])
  ) {
    return false;
  }

  return true;
}

export function gameInit({
  numCategories = 3,
  numItemsPerCategory = 4,
  easyTrue = true,
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
    ? getFromStorage<unknown>(SAVED_STATE_KEY)
    : undefined;

  if (savedStateValidQ(savedState)) {
    return savedState;
  }

  // Make sure the numCategories is 2-4
  const clampedNumCategories = Math.min(4, Math.max(2, numCategories));
  // Make sure numItemsPerCategory is 3-5
  const clampedNumItemsPerCategory = Math.min(
    5,
    Math.max(3, numItemsPerCategory),
  );

  const {clues, matrixGrids, matrixLabels} = generatePuzzle(
    clampedNumCategories,
    clampedNumItemsPerCategory,
  );

  return {
    id: crypto.randomUUID(), // just a random ID to track when the user generates a new puzzle
    clues,
    matrixLabels,
    matrixGridsHistory: [matrixGrids],
    numCategories: clampedNumCategories,
    numItemsPerCategory: clampedNumItemsPerCategory,
    easyTrue,
    showViolations,
    lastBreakingChange: LAST_BREAKING_CHANGE,
  };
}

import {applyNotLogic} from "./applyNotLogic";
import {applyOrLogic} from "./applyOrLogic";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";
import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic";
import {type Clue} from "../puzzleGeneration/getUsefulClue";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export function applyClueLogic(clue: Clue, matrix: PuzzleMatrix): PuzzleMatrix {
  switch (clue.clueType) {
    case "not":
      return applyNotLogic(matrix, clue.clueParameters);
    case "or":
      return applyOrLogic(matrix, clue.clueParameters);
    case "numericComparison":
      return applyNumericComparisonLogic(matrix, clue.clueParameters);
    case "numericComparisonCrossCategory":
      return applyNumericComparisonCrossCategoryLogic(
        matrix,
        clue.clueParameters,
      );
    case "orCrossCategory":
      return applyOrCrossCategoryLogic(matrix, clue.clueParameters);
    default: {
      const exhaustiveCheck: never = clue;

      throw new Error(`Invalid clue type ${String(exhaustiveCheck)}`);
    }
  }
}

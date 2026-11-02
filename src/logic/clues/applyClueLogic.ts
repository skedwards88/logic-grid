import {applyNotLogic} from "./applyNotLogic";
import {applyOrLogic} from "./applyOrLogic";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";
import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic";
import {type Clue} from "../puzzleGeneration/getUsefulClue";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrix";

export function applyClueLogic({
  clue,
  matrixGrids,
  matrixLabels,
}: {
  clue: Clue;
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
}): MatrixGrids {
  switch (clue.clueType) {
    case "not":
      return applyNotLogic(matrixGrids, matrixLabels, clue.clueParameters);
    case "or":
      return applyOrLogic(matrixGrids, matrixLabels, clue.clueParameters);
    case "numericComparison":
      return applyNumericComparisonLogic(
        matrixGrids,
        matrixLabels,
        clue.clueParameters,
      );
    case "numericComparisonCrossCategory":
      return applyNumericComparisonCrossCategoryLogic(
        matrixGrids,
        matrixLabels,
        clue.clueParameters,
      );
    case "orCrossCategory":
      return applyOrCrossCategoryLogic(
        matrixGrids,
        matrixLabels,
        clue.clueParameters,
      );
    default: {
      const exhaustiveCheck: never = clue;

      throw new Error(`Invalid clue type ${String(exhaustiveCheck)}`);
    }
  }
}

// not strict: the current solution does not violate the clue
// strict: the current solution satisfies all aspects of the clue
// neither of these cases checks for correctness:
//  e.g. "red is 1 or 2" will be valid for "red is 1" and for "red is 2"

import {validQNotClue} from "./validQNotClue";
import {validQOrClue} from "./validQOrClue";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue";
import {validQNumericComparisonCrossCategoryClue} from "./validQNumericComparisonCrossCategoryClue";
import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {type Clue} from "../puzzleGeneration/getUsefulClue";

export function validQ({
  clue,
  matrixGrids,
  matrixLabels,
  strict = false,
}: {
  clue: Clue;
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  strict?: boolean;
}): boolean {
  switch (clue.clueType) {
    case "not":
      return validQNotClue({
        matrixGrids,
        matrixLabels,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "or":
      return validQOrClue({
        matrixGrids,
        matrixLabels,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "numericComparison":
      return validQNumericComparisonClue({
        matrixGrids,
        matrixLabels,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "numericComparisonCrossCategory":
      return validQNumericComparisonCrossCategoryClue({
        matrixGrids,
        matrixLabels,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "orCrossCategory":
      return validQOrCrossCategoryClue({
        matrixGrids,
        matrixLabels,
        clueParameters: clue.clueParameters,
        strict,
      });
    default: {
      const exhaustiveCheck: never = clue;

      throw new Error(`Invalid clue type ${String(exhaustiveCheck)}`);
    }
  }
}

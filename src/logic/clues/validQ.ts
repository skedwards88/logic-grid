// not strict: the current solution does not violate the clue
// strict: the current solution satisfies all aspects of the clue
// neither of these cases checks for correctness:
//  e.g. "red is 1 or 2" will be valid for "red is 1" and for "red is 2"

import {validQNotClue} from "./validQNotClue";
import {validQOrClue} from "./validQOrClue";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue";
import {validQNumericComparisonCrossCategoryClue} from "./validQNumericComparisonCrossCategoryClue";
import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {type Clue} from "../puzzleGeneration/getUsefulClue";

export function validQ({
  clue,
  matrix,
  strict,
}: {
  clue: Clue;
  matrix: PuzzleMatrix;
  strict: boolean;
}): boolean {
  switch (clue.clueType) {
    case "not":
      return validQNotClue({
        matrix,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "or":
      return validQOrClue({
        matrix,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "numericComparison":
      return validQNumericComparisonClue({
        matrix,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "numericComparisonCrossCategory":
      return validQNumericComparisonCrossCategoryClue({
        matrix,
        clueParameters: clue.clueParameters,
        strict,
      });
    case "orCrossCategory":
      return validQOrCrossCategoryClue({
        matrix,
        clueParameters: clue.clueParameters,
        strict,
      });
    default: {
      const exhaustiveCheck: never = clue;

      throw new Error(`Invalid clue type ${String(exhaustiveCheck)}`);
    }
  }
}

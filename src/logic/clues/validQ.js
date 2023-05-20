// not strict: the current solution does not violate the clue
// strict: the current solution satisfies all aspects of the clue
// neither of these cases checks for correctness: 
//  e.g. "red is 1 or 2" will be valid for "red is 1" and for "red is 2"

import {validQNotClue} from "./validQNotClue.js";
import {validQOrClue} from "./validQOrClue.js";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue.js";
import {validQNumericComparisonCrossCategoryClue} from "./validQNumericComparisonCrossCategoryClue.js";
import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue.js";

export function validQ({clue, matrix, strict}) {
  const clueParameters = clue.clueParameters
  switch (clue.clueType) {
    case "not":
      return validQNotClue({matrix, clueParameters, strict});
    case "or":
      return validQOrClue({matrix, clueParameters, strict});
    case "numericComparison":
      return validQNumericComparisonClue({matrix, clueParameters, strict});
    case "numericComparisonCrossCategory":
      return validQNumericComparisonCrossCategoryClue({matrix, clueParameters, strict});
    case "orCrossCategory":
      return validQOrCrossCategoryClue({matrix, clueParameters, strict});
    default:
      throw new Error(`Invalid clue type: ${clue.clueType}`);
  }
}

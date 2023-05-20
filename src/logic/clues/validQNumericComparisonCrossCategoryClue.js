import {findMatrixValue} from "../helpers/findMatrixValue";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue.js";

export function validQNumericComparisonCrossCategoryClue({
  matrix,
  clueParameters: {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  },
  strict = false,
}) {
  // in strict mode, the greaterItem cannot be the lesserItem
  if (strict && findMatrixValue(matrix, greaterItem, lesserItem)) {
    return false;
  }

  return validQNumericComparisonClue({
    matrix,
    clueParameters: {
      greaterItem,
      lesserItem,
      numericLabels,
      actualNumericDiff,
      numericDiffClue,
    },
    strict,
  });
}

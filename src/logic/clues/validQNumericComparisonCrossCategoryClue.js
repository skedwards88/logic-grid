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
  // the greaterItem cannot be the lesserItem
  if (findMatrixValue(matrix, greaterItem, lesserItem)) {
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

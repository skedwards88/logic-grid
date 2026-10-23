import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {type NumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue";

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
}: {
  matrix: PuzzleMatrix;
  clueParameters: NumericComparisonCrossCategoryClue["clueParameters"];
  strict?: boolean;
}): boolean {
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

import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {type NumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import {validQNumericComparisonClue} from "./validQNumericComparisonClue";

export function validQNumericComparisonCrossCategoryClue({
  matrixGrids,
  matrixLabels,
  clueParameters: {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  },
  strict = false,
}: {
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  clueParameters: NumericComparisonCrossCategoryClue["clueParameters"];
  strict?: boolean;
}): boolean {
  // in strict mode, the greaterItem cannot be the lesserItem
  if (
    strict &&
    findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: greaterItem,
      itemB: lesserItem,
    })
  ) {
    return false;
  }

  return validQNumericComparisonClue({
    matrixGrids,
    matrixLabels,
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

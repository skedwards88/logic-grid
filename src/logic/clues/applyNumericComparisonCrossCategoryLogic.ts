import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {setToFalse} from "../puzzleGeneration/setValue";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {type NumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";

export function applyNumericComparisonCrossCategoryLogic(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
  {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  }: NumericComparisonCrossCategoryClue["clueParameters"],
): MatrixGrids {
  // Know that greaterItem is not lesserItem
  const newMatrixGrids = setToFalse({
    matrixGrids,
    matrixLabels,
    itemA: greaterItem,
    itemB: lesserItem,
  });

  // the rest of the logic is the same as the applyNumericComparisonLogic logic
  return applyNumericComparisonLogic(newMatrixGrids, matrixLabels, {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  });
}

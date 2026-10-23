import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {setToFalse} from "../puzzleGeneration/setValue";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {type NumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";

export function applyNumericComparisonCrossCategoryLogic(
  derivedMatrix: PuzzleMatrix,
  {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  }: NumericComparisonCrossCategoryClue["clueParameters"],
): PuzzleMatrix {
  let newDerivedMatrix = derivedMatrix;

  // Know that greaterItem is not lesserItem
  newDerivedMatrix = setToFalse(newDerivedMatrix, greaterItem, lesserItem);

  // the rest of the logic is the same as the applyNumericComparisonLogic logic
  return applyNumericComparisonLogic(newDerivedMatrix, {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  });
}

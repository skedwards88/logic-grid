import {setToFalse} from "../puzzleGeneration/setValue.js";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic.js";
export function applyNumericComparisonCrossCategoryLogic(
  derivedMatrix,
  {greaterItem, lesserItem, numericLabels, actualNumericDiff, numericDiffClue},
) {
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

import {
  findFirstPossibleIndex,
  findLastPossibleIndex,
} from "../matrixSearching/findPossibleIndex";
import {setToFalse, setToTrue} from "../puzzleGeneration/setValue.js";
import {findMatrixValue} from "../matrixSearching/findMatrixValue.js";
import {getNumericDiff} from "../helpers/getNumericDiff.js";
import {getNumericSum} from "../helpers/getNumericSum.js";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff.js";

export function applyNumericComparisonLogic(
  derivedMatrix,
  {greaterItem, lesserItem, numericLabels, actualNumericDiff, numericDiffClue},
) {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  let newDerivedMatrix = derivedMatrix;

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const lesserItemLowestPossibleIndex = findFirstPossibleIndex(
    derivedMatrix,
    lesserItem,
    numericLabels,
  );

  const lesserItemLowestPossibleValue =
    numericLabels[lesserItemLowestPossibleIndex];

  if (
    actualNumericDiff === numericDiffClue &&
    findMatrixValue(derivedMatrix, lesserItem, lesserItemLowestPossibleValue)
  ) {
    // If we know the exact diff
    // and we know the value of the lesser item
    // then we know the value of the greater item
    newDerivedMatrix = setToTrue(
      newDerivedMatrix,
      greaterItem,
      getNumericSum(lesserItemLowestPossibleValue, numericDiffClue),
    );
  } else if (actualNumericDiff === numericDiffClue) {
    // If we know the exact diff,
    // then we exclude any combos that don't match the diff
    for (
      let numericIndex = 0;
      numericIndex < numericLabels.length;
      numericIndex++
    ) {
      const matchingDiffs = numericLabels.filter(
        (value) =>
          getNumericDiff(numericLabels[numericIndex], value) ===
          numericDiffClue,
      );
      if (matchingDiffs.length === 0) {
        newDerivedMatrix = setToFalse(
          newDerivedMatrix,
          greaterItem,
          numericLabels[numericIndex],
        );
      }
    }
  } else {
    // Otherwise, we just know that the larger item is at least minimumNumericDiff (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const greaterItemLowestPossibleIndex = numericLabels.findIndex(
      (i) =>
        i >=
        getNumericSum(
          lesserItemLowestPossibleValue,
          numericDiffClue ?? minimumNumericDiff,
        ),
    );
    for (
      let numericIndex = 0;
      numericIndex < greaterItemLowestPossibleIndex;
      numericIndex++
    ) {
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        greaterItem,
        numericLabels[numericIndex],
      );
    }
  }

  const greaterItemHighestPossibleIndex = findLastPossibleIndex(
    derivedMatrix,
    greaterItem,
    numericLabels,
  );

  const greaterItemHighestPossibleValue =
    numericLabels[greaterItemHighestPossibleIndex];

  if (
    actualNumericDiff === numericDiffClue &&
    findMatrixValue(derivedMatrix, greaterItem, greaterItemHighestPossibleValue)
  ) {
    // If we know the exact diff
    // and we know the value of the greater item
    // then we know the value of the lesser item
    newDerivedMatrix = setToTrue(
      newDerivedMatrix,
      lesserItem,
      getNumericDiff(greaterItemHighestPossibleValue, numericDiffClue),
    );
  } else if (actualNumericDiff === numericDiffClue) {
    // If we know the exact diff,
    // then we exclude any combos that don't match the diff
    for (
      let numericIndex = 0;
      numericIndex < numericLabels.length;
      numericIndex++
    ) {
      const matchingDiffs = numericLabels.filter(
        (value) =>
          getNumericDiff(value, numericLabels[numericIndex]) ===
          numericDiffClue,
      );
      if (matchingDiffs.length === 0) {
        newDerivedMatrix = setToFalse(
          newDerivedMatrix,
          lesserItem,
          numericLabels[numericIndex],
        );
      }
    }
  } else {
    // Otherwise, we just know that the larger item is at least minimumNumericDiff (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const lesserItemHighestPossibleIndex = numericLabels.findLastIndex(
      (i) =>
        i <=
        getNumericDiff(
          greaterItemHighestPossibleValue,
          numericDiffClue ?? minimumNumericDiff,
        ),
    );
    for (
      let numericIndex = numericLabels.length - 1;
      numericIndex > lesserItemHighestPossibleIndex;
      numericIndex--
    ) {
      newDerivedMatrix = setToFalse(
        newDerivedMatrix,
        lesserItem,
        numericLabels[numericIndex],
      );
    }
  }
  return newDerivedMatrix;
}

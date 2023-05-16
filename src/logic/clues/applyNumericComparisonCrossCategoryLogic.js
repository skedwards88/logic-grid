import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
} from "../helpers/getPossibleIndex.js";
import {setToFalse, setToTrue} from "../setValue.js";
import {findMatrixValue} from "../helpers/findMatrixValue.js";

export function applyNumericComparisonCrossCategoryLogic(
  derivedMatrix,
  {greaterItem, lesserItem, numericLabels, actualNumericDiff, numericDiffClue},
) {
  // todo this relies on labels being sorted by size

  let newDerivedMatrix = derivedMatrix;

  // Know that greaterItem is not lesserItem
  newDerivedMatrix = setToFalse(newDerivedMatrix, greaterItem, lesserItem);

  const lesserItemLowestPossibleIndex = getFirstPossibleIndex(
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
      lesserItemLowestPossibleValue + numericDiffClue,
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
        (value) => numericLabels[numericIndex] - value === numericDiffClue,
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
    // Otherwise, we just know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const greaterItemLowestPossibleIndex = numericLabels.findIndex(
      (i) =>
        i >=
        lesserItemLowestPossibleValue + (numericDiffClue ? numericDiffClue : 1),
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

  const greaterItemHighestPossibleIndex = getLastPossibleIndex(
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
      greaterItemHighestPossibleValue - numericDiffClue,
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
        (value) => value - numericLabels[numericIndex] === numericDiffClue,
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
    // Otherwise, we just know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const lesserItemHighestPossibleIndex = numericLabels.findLastIndex(
      (i) =>
        i <=
        greaterItemHighestPossibleValue -
          (numericDiffClue ? numericDiffClue : 1),
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

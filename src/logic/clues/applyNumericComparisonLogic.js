
import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
} from "../helpers/getPossibleIndex.js";
import {setToFalse, setToTrue} from "../setValue.js";
import {findMatrixValue} from "../helpers/findMatrixValue.js";

export function applyNumericComparisonLogic(
  derivedMatrix,
  {
    itemANumericValue,
    itemBNumericValue,
    itemB,
    itemA,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  },
) {
  let newDerivedMatrix = derivedMatrix;

  // we know that the value of the numeric item for itemA is greater/less than for itemB,
  // but we can only use what the other clues have told us about itemA/B, which will change as we get more clues
  // so pull the current info about A/B when this function is executed

  // todo this relies on labels being sorted by size

  const [greaterItem, lesserItem] =
    itemANumericValue < itemBNumericValue ? [itemB, itemA] : [itemA, itemB];

  // Know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
  // than the lowest index (or the lowest index that the smaller item can be)
  // If we know the exact diff, then can exclude the "at least"
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
    // if we know the exact diff
    // and we know the value of the lesser item
    //then we know the value of the greater item
    newDerivedMatrix = setToTrue(
      newDerivedMatrix,
      greaterItem,
      lesserItemLowestPossibleValue + numericDiffClue,
    );
  } else {
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

  // Know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
  // than the lowest index (or the lowest index that the smaller item can be)
  // If we know the exact diff, then can exclude the "at least"
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
    // if we know the exact diff
    // and we know the value of the greater item
    //then we know the value of the lesser item
    newDerivedMatrix = setToTrue(
      newDerivedMatrix,
      lesserItem,
      greaterItemHighestPossibleValue - numericDiffClue,
    );
  } else {
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
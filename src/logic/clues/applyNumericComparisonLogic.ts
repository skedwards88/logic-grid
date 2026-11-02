import {
  findFirstPossibleIndex,
  findLastPossibleIndex,
} from "../matrixSearching/findPossibleIndex";
import {setToFalse, setToTrue} from "../puzzleGeneration/setValue";
import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getNumericSum} from "../helpers/getNumericSum";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {type NumericComparisonClue} from "./getNumericComparisonClue";

export function applyNumericComparisonLogic(
  matrixGrids: MatrixGrids,
  matrixLabels: MatrixLabels,
  {
    greaterItem,
    lesserItem,
    numericLabels,
    actualNumericDiff,
    numericDiffClue,
  }: NumericComparisonClue["clueParameters"],
): MatrixGrids {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  let newMatrixGrids = matrixGrids;

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const lesserItemLowestPossibleIndex = findFirstPossibleIndex({
    matrixGrids,
    matrixLabels,
    item: lesserItem,
    intersectingItems: numericLabels,
  });

  if (lesserItemLowestPossibleIndex === undefined) {
    throw new Error("No possible index");
  }

  const lesserItemLowestPossibleValue =
    numericLabels[lesserItemLowestPossibleIndex];

  if (
    actualNumericDiff === numericDiffClue &&
    findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: lesserItem,
      itemB: lesserItemLowestPossibleValue,
    })
  ) {
    // If we know the exact diff
    // and we know the value of the lesser item
    // then we know the value of the greater item
    newMatrixGrids = setToTrue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA: greaterItem,
      itemB: getNumericSum(lesserItemLowestPossibleValue, numericDiffClue),
    });
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
        newMatrixGrids = setToFalse({
          matrixGrids: newMatrixGrids,
          matrixLabels,
          itemA: greaterItem,
          itemB: numericLabels[numericIndex],
        });
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
      newMatrixGrids = setToFalse({
        matrixGrids: newMatrixGrids,
        matrixLabels,
        itemA: greaterItem,
        itemB: numericLabels[numericIndex],
      });
    }
  }

  const greaterItemHighestPossibleIndex = findLastPossibleIndex({
    matrixGrids,
    matrixLabels,
    item: greaterItem,
    intersectingItems: numericLabels,
  });

  if (greaterItemHighestPossibleIndex === undefined) {
    throw new Error("No possible index");
  }

  const greaterItemHighestPossibleValue =
    numericLabels[greaterItemHighestPossibleIndex];

  if (
    actualNumericDiff === numericDiffClue &&
    findMatrixValue({
      matrixGrids,
      matrixLabels,
      itemA: greaterItem,
      itemB: greaterItemHighestPossibleValue,
    })
  ) {
    // If we know the exact diff
    // and we know the value of the greater item
    // then we know the value of the lesser item
    newMatrixGrids = setToTrue({
      matrixGrids: newMatrixGrids,
      matrixLabels,
      itemA: lesserItem,
      itemB: getNumericDiff(greaterItemHighestPossibleValue, numericDiffClue),
    });
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
        newMatrixGrids = setToFalse({
          matrixGrids: newMatrixGrids,
          matrixLabels,
          itemA: lesserItem,
          itemB: numericLabels[numericIndex],
        });
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
      newMatrixGrids = setToFalse({
        matrixGrids: newMatrixGrids,
        matrixLabels,
        itemA: lesserItem,
        itemB: numericLabels[numericIndex],
      });
    }
  }
  return newMatrixGrids;
}

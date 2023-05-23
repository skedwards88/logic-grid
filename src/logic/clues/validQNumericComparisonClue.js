import {findMatrixValue} from "../helpers/findMatrixValue";
import {findMatrixLabel} from "../helpers/findMatrixLabel";
import {getAllPossibleIndexes} from "../helpers/getPossibleIndex.js";

export function validQNumericComparisonClue({
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
  const greaterValue = findMatrixLabel(matrix, greaterItem, numericLabels);
  const lesserValue = findMatrixLabel(matrix, lesserItem, numericLabels);

  // if strict mode, both items must be known
  if (strict && (greaterValue === undefined || lesserValue === undefined)) {
    return false;
  }

  // if either item has more than two trues, return false
  let lesserTrues = [];
  let greaterTrues = [];
  for (const numericValue of numericLabels) {
    const lesserValue = findMatrixValue(matrix, lesserItem, numericValue);
    if (lesserValue) {
      lesserTrues.push(lesserValue);
    }
    const greaterValue = findMatrixValue(matrix, greaterItem, numericValue);
    if (greaterValue) {
      greaterTrues.push(greaterValue);
    }
  }

  if (lesserTrues.length > 1 || greaterTrues.length > 1) {
    return false;
  }

  if (greaterValue != undefined && lesserValue != undefined) {
    if (actualNumericDiff === numericDiffClue) {
      // exact diff and both known: diff between the known values needs to match exactly
      if (greaterValue - lesserValue != numericDiffClue) {
        return false;
      }
    } else if (numericDiffClue != undefined) {
      // non-exact diff and both known: diff between the known values needs to be at least non-exact diff
      if (greaterValue - lesserValue < numericDiffClue) {
        return false;
      }
    } else {
      // unknown diff and both known: the greater item must be more than the lesser item
      if (greaterValue <= lesserValue) {
        return false;
      }
    }
  } else {
    const lesserItemPossibleIndexes = getAllPossibleIndexes(
      matrix,
      lesserItem,
      numericLabels,
    );

    const greaterItemPossibleIndexes = getAllPossibleIndexes(
      matrix,
      greaterItem,
      numericLabels,
    );

    const lesserItemPossibleValues = lesserItemPossibleIndexes.map(
      (index) => numericLabels[index],
    );
    const greaterItemPossibleValues = greaterItemPossibleIndexes.map(
      (index) => numericLabels[index],
    );

    let possibleDiffs = [];

    for (const lesserValue of lesserItemPossibleValues) {
      for (const greaterValue of greaterItemPossibleValues) {
        possibleDiffs = [...possibleDiffs, greaterValue - lesserValue];
      }
    }

    if (actualNumericDiff === numericDiffClue) {
      // exact diff and not both known: at least one of the remaining possibilities needs to match exactly
      let copaseticValues;
      for (const lesserValue of lesserItemPossibleValues) {
        const matchingDiffs = greaterItemPossibleValues.filter(
          (greaterValue) => greaterValue - lesserValue === numericDiffClue,
        );
        if (matchingDiffs.length > 0) {
          copaseticValues = true;
          break;
        }
      }
      if (!copaseticValues) {
        return false;
      }
    } else {
      // non-exact diff and not both known: at least one of the remaining possibilities needs to be at least non-exact diff
      // unknown diff and not both known: at least one of the remaining possibilities needs to allow greater to be more than less
      const diff = numericDiffClue ?? 1;
      let copaseticValues;
      for (const lesserValue of lesserItemPossibleValues) {
        const matchingDiffs = greaterItemPossibleValues.filter(
          (greaterValue) => greaterValue - lesserValue >= diff,
        );
        if (matchingDiffs.length > 0) {
          copaseticValues = true;
          break;
        }
      }
      if (!copaseticValues) {
        return false;
      }
    }
  }

  return true;
}

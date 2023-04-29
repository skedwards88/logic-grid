import {pickRandoms, pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
} from "../helpers/getPossibleIndex.js";
import {setToFalse} from "../setValue.js";
import {findMatrixLabel} from "../helpers/findMatrixLabel.js";

// Generates a numeric clue that spans categories
// e.g. The red house has more trees than Colin's house
export function getNumericComparisonCrossCategoryClue(solutionMatrix) {
  // find two grids in the solution matrix that uses a numeric category
  // todo if there are none, error? or return undefined? can we rely on there always being one?
  // todo if everything is known about that grid, return undefined?
  let numericEntries = [];
  for (const key of shuffleArray(Object.keys(solutionMatrix))) {
    if (typeof solutionMatrix[key].rowLabels[0] === "number") {
      numericEntries = [...numericEntries, {key: key, numericIsRows: true}];
    } else if (typeof solutionMatrix[key].colLabels[0] === "number") {
      numericEntries = [...numericEntries, {key: key, numericIsRows: false}];
    }
    if (numericEntries.length >= 2) {
      break;
    }
  }

  // figure out the numeric labels
  const numericLabels = numericEntries[0].numericIsRows
    ? solutionMatrix[numericEntries[0].key].rowLabels
    : solutionMatrix[numericEntries[0].key].colLabels; // todo make sure can rely on these being sorted

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandoms(numericLabels, 2);
  const itemALabels = numericEntries[0].numericIsRows
    ? solutionMatrix[numericEntries[0].key].colLabels
    : solutionMatrix[numericEntries[0].key].rowLabels;
  const itemA = findMatrixLabel(solutionMatrix, itemANumericValue, itemALabels);
  const itemBLabels = numericEntries[1].numericIsRows
    ? solutionMatrix[numericEntries[1].key].colLabels
    : solutionMatrix[numericEntries[1].key].rowLabels;
  const itemB = findMatrixLabel(solutionMatrix, itemBNumericValue, itemBLabels);

  // e.g. if numeric labels are [10,15,20,30,40]
  // and chose 15 and 40
  // possible diffs are 5, 15, 25
  const inclusiveNumericLabels = numericLabels.filter(
    (i) =>
      i >= Math.min(itemANumericValue, itemBNumericValue) &&
      i <= Math.max(itemANumericValue, itemBNumericValue),
  );
  let numericDiffOptions = [undefined];
  for (let index = 1; index < inclusiveNumericLabels.length; index++) {
    numericDiffOptions = [
      ...numericDiffOptions,
      inclusiveNumericLabels[index] - inclusiveNumericLabels[0],
    ];
  }
  const numericDiffClue = pickRandom(numericDiffOptions);

  const writtenClue = `${itemA} is ${
    numericDiffClue ? `${numericDiffClue} ` : ""
  }${
    itemANumericValue < itemBNumericValue ? "less than" : "greater than"
  } ${itemB}`;

  function clueLogic(derivedMatrix) {
    let newDerivedMatrix = derivedMatrix;

    // Know that itemA is not itemB
    newDerivedMatrix = setToFalse(newDerivedMatrix, itemA, itemB);

    // we know that the value of the numeric item for itemA is greater/less than for itemB,
    // but we can only use what the other clues have told us about itemA/B, which will change as we get more clues
    // so pull the current info about A/B when this function is executed

    // todo this relies on labels being sorted by size

    const [greaterItem, lesserItem] =
      itemANumericValue < itemBNumericValue ? [itemB, itemA] : [itemA, itemB];

    // Know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const lesserItemLowestPossibleIndex = getFirstPossibleIndex(
      derivedMatrix,
      lesserItem,
      numericLabels,
    );
    const lesserItemLowestPossibleValue =
      numericLabels[lesserItemLowestPossibleIndex];
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

    // Know that the larger item is at least 1 (if diff is undefined) or n (if diff is defined) index higher
    // than the lowest index (or the lowest index that the smaller item can be)
    const greaterItemHighestPossibleIndex = getLastPossibleIndex(
      derivedMatrix,
      greaterItem,
      numericLabels,
    );
    const greaterItemHighestPossibleValue =
      numericLabels[greaterItemHighestPossibleIndex];
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
    return newDerivedMatrix;
  }

  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

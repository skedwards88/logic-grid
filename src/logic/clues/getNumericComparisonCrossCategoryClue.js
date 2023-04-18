import {pickRandoms} from "../helpers/pickRandom.js";
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

  const writtenClue = `${itemA} is ${
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

    // Know that the larger item is at least 1 index higher than the lowest index (or the lowest index that the smaller item can be)
    let lesserItemLowestPossibleIndex = getFirstPossibleIndex(
      derivedMatrix,
      lesserItem,
      numericLabels,
    );
    let greaterItemLowestPossibleIndex = lesserItemLowestPossibleIndex + 1;
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

    // Know that the larger item is at least 1 index higher than the lowest index (or the lowest index that the smaller item can be)
    let greaterItemHighestPossibleIndex = getLastPossibleIndex(
      derivedMatrix,
      greaterItem,
      numericLabels,
    );
    let lesserItemHighestPossibleIndex = greaterItemHighestPossibleIndex - 1;
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

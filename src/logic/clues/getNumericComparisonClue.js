import {pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
} from "../helpers/getPossibleIndex.js";
import {setToFalse} from "../setValue.js";

// Generates a numeric clue
// e.g. The red house has more trees than the white house
// todo later also:
//    the red house has an even number of trees (maybe not; this is a glorified "or")
//    the red house has more than 3 trees (maybe not; this is a glorified "or")
//    the red house has more trees than Colin's house (also tells you red is not Colin)
//    the red house does not have the most or fewest trees (maybe not; this is a glorified "or")
//    the red house or Colin's house has 3 trees (also tells you red is not Colin)
//    the red house has 2 more trees than the green house
export function getNumericComparisonClue(solutionMatrix) {
  // choose a grid in the solution matrix that uses a numeric category
  // todo if there are none, error? or return undefined? can we rely on there always being one?
  // todo if everything is known about that grid, return undefined?
  const shuffledKeys = shuffleArray(Object.keys(solutionMatrix));
  let selectedKey;
  let numericIsRows;
  for (const key of shuffledKeys) {
    if (typeof solutionMatrix[key].rowLabels[0] === "number") {
      selectedKey = key;
      numericIsRows = true;
      break;
    }
    if (typeof solutionMatrix[key].colLabels[0] === "number") {
      selectedKey = key;
      numericIsRows = false;
      break;
    }
  }

  // figure out the numeric labels
  const numericLabels = numericIsRows
    ? solutionMatrix[selectedKey].rowLabels
    : solutionMatrix[selectedKey].colLabels; // todo make sure can rely on these being sorted

  // choose two random items in the other label set
  const otherLabels = numericIsRows
    ? solutionMatrix[selectedKey].colLabels
    : solutionMatrix[selectedKey].rowLabels;
  const otherLabelIndexes = otherLabels.map((label, index) => index);
  const itemAIndex = pickRandom(otherLabelIndexes);
  const itemA = otherLabels[itemAIndex];
  const itemBIndex = pickRandom([
    ...otherLabelIndexes.slice(0, itemAIndex),
    ...otherLabelIndexes.slice(itemAIndex + 1, otherLabelIndexes.length),
  ]);
  const itemB = otherLabels[itemBIndex];

  // Figure out the corresponding numeric value of those items
  const itemANumericIndex = numericIsRows
    ? solutionMatrix[selectedKey].grid
        .map((row) => row.indexOf(true))
        .indexOf(itemAIndex)
    : solutionMatrix[selectedKey].grid[itemAIndex].indexOf(true);
  const itemANumericValue = numericLabels[itemANumericIndex];
  const itemBNumericIndex = numericIsRows
    ? solutionMatrix[selectedKey].grid
        .map((row) => row.indexOf(true))
        .indexOf(itemBIndex)
    : solutionMatrix[selectedKey].grid[itemBIndex].indexOf(true);
  const itemBNumericValue = numericLabels[itemBNumericIndex];

  const writtenClue = `${itemA} is ${
    itemANumericValue < itemBNumericValue ? "less than" : "greater than"
  } ${itemB}`;

  function clueLogic(derivedMatrix) {
    let newDerivedMatrix = derivedMatrix;

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

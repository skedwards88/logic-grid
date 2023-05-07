import {pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
} from "../helpers/getPossibleIndex.js";
import {setToFalse, setToTrue} from "../setValue.js";
import {findMatrixValue} from "../helpers/findMatrixValue.js";

// Generates a numeric clue
// e.g. The red house has more trees than the white house
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

  // e.g. if numeric labels are [10,15,20,30,40]
  // and chose 15 and 40
  // possible diffs are 5, 15, 25, as well as undefined
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
  const actualNumericDiff = Math.abs(itemANumericValue - itemBNumericValue);

  const [numericDescriptionTemplates, nonNumericDescriptionTemplates] =
    numericIsRows
      ? [
          solutionMatrix[selectedKey].rowDescriptionTemplates,
          solutionMatrix[selectedKey].colDescriptionTemplates,
        ]
      : [
          solutionMatrix[selectedKey].colDescriptionTemplates,
          solutionMatrix[selectedKey].rowDescriptionTemplates,
        ];

  const leadingDescription =
    nonNumericDescriptionTemplates.leadingDescription.replace("VALUE", itemA);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericDescriptionTemplates.diffLesserDescription
      : numericDescriptionTemplates.diffGreaterDescription;
  const numericComparisonVerb = numericDescriptionTemplates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate.replace("VALUE", numericDiffClue)
    : numericDescriptionTemplate.replace("VALUE", "some");

  const trailingDescription = numericIsRows
    ? solutionMatrix[
        selectedKey
      ].colDescriptionTemplates.trailingDescription.replace("VALUE", itemB)
    : solutionMatrix[
        selectedKey
      ].rowDescriptionTemplates.trailingDescription.replace("VALUE", itemB);

  const writtenClue = `${leadingDescription} ${numericComparisonVerb} ${
    numericDiffClue === undefined || actualNumericDiff === numericDiffClue
      ? ""
      : "at least "
  }${numericDescription} than ${trailingDescription}.`;

  function clueLogic(derivedMatrix) {
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
          lesserItemLowestPossibleValue +
            (numericDiffClue ? numericDiffClue : 1),
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
      findMatrixValue(
        derivedMatrix,
        greaterItem,
        greaterItemHighestPossibleValue,
      )
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

  return {
    writtenClue: writtenClue,
    clueLogic: clueLogic,
  };
}

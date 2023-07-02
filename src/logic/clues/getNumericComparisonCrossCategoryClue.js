import {pickRandoms, pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {findFirstTrueIntersection} from "../helpers/findFirstTrueIntersection.js";
import {arraysEqualQ} from "../helpers/arraysEqualQ.js";

// Generates a numeric clue that spans categories
// e.g. The red house has more trees than Colin's house
export function getNumericComparisonCrossCategoryClue(solutionMatrix) {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  // find two grids in the solution matrix that uses a numeric category
  // (upstream logic ensures that this function is only called if there is a numeric category)
  let numericLabels;
  let numericDescriptionTemplates;
  let itemALabels;
  let itemATemplates;
  let itemBLabels;
  let itemBTemplates;
  for (const key of shuffleArray(Object.keys(solutionMatrix))) {
    if (!itemALabels) {
      // If we haven't found a numeric entry, choose the first that we find
      if (typeof solutionMatrix[key].rowLabels[0] === "number") {
        numericLabels = solutionMatrix[key].rowLabels;
        numericDescriptionTemplates =
          solutionMatrix[key].rowDescriptionTemplates;
        itemALabels = solutionMatrix[key].columnLabels;
        itemATemplates = solutionMatrix[key].columnDescriptionTemplates;
      } else if (typeof solutionMatrix[key].columnLabels[0] === "number") {
        numericLabels = solutionMatrix[key].columnLabels;
        numericDescriptionTemplates =
          solutionMatrix[key].columnDescriptionTemplates;
        itemALabels = solutionMatrix[key].rowLabels;
        itemATemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    } else {
      // in case there are multiple numeric labels, make sure we find one that matches the one we already found
      if (arraysEqualQ(solutionMatrix[key].rowLabels, numericLabels)) {
        itemBLabels = solutionMatrix[key].columnLabels;
        itemBTemplates = solutionMatrix[key].columnDescriptionTemplates;
      } else if (
        arraysEqualQ(solutionMatrix[key].columnLabels, numericLabels)
      ) {
        itemBLabels = solutionMatrix[key].rowLabels;
        itemBTemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    }
  }

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandoms(numericLabels, 2);
  const itemA = findFirstTrueIntersection(
    solutionMatrix,
    itemANumericValue,
    itemALabels,
  );
  const itemB = findFirstTrueIntersection(
    solutionMatrix,
    itemBNumericValue,
    itemBLabels,
  );

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

  const itemADescription = itemATemplates.description(itemA);

  const itemBDescription = itemBTemplates.description(itemB);

  // figure out the minimum numeric diff
  let minimumNumericDiff = Math.abs(numericLabels[0] - numericLabels[1]);
  for (let index = 1; index < numericLabels.length - 1; index++) {
    const diff = Math.abs(numericLabels[index] - numericLabels[index + 1]);
    if (diff < minimumNumericDiff) {
      minimumNumericDiff = diff;
    }
  }

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericDescriptionTemplates.diffLesserDescription
      : numericDescriptionTemplates.diffGreaterDescription;
  const numericComparisonVerb = numericDescriptionTemplates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate(numericDiffClue)
    : numericDescriptionTemplate(`at least ${minimumNumericDiff}`);

  let relationWord = "";
  if (actualNumericDiff === numericDiffClue) {
    relationWord = "exactly ";
  } else if (numericDiffClue != undefined) {
    relationWord = "at least ";
  }
  let writtenClue = `${itemADescription} ${numericComparisonVerb} ${relationWord}${numericDescription} than ${itemBDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  const [greaterItem, lesserItem] =
    itemANumericValue < itemBNumericValue ? [itemB, itemA] : [itemA, itemB];

  return {
    writtenClue: writtenClue,
    clueType: "numericComparisonCrossCategory",
    clueParameters: {
      greaterItem,
      lesserItem,
      numericLabels,
      actualNumericDiff,
      numericDiffClue,
    },
  };
}

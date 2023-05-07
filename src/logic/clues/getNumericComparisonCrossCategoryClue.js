import {pickRandoms, pickRandom} from "../helpers/pickRandom.js";
import {shuffleArray} from "../helpers/shuffleArray.js";
import {findMatrixLabel} from "../helpers/findMatrixLabel.js";
import {arraysEqualQ} from "../helpers/arraysEqualQ.js";

// Generates a numeric clue that spans categories
// e.g. The red house has more trees than Colin's house
export function getNumericComparisonCrossCategoryClue(solutionMatrix) {
  // find two grids in the solution matrix that uses a numeric category
  // todo if there are none, error? or return undefined? can we rely on there always being one?
  // todo if everything is known about that grid, return undefined?
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
        itemALabels = solutionMatrix[key].colLabels;
        itemATemplates = solutionMatrix[key].colDescriptionTemplates;
      } else if (typeof solutionMatrix[key].colLabels[0] === "number") {
        numericLabels = solutionMatrix[key].colLabels;
        numericDescriptionTemplates =
          solutionMatrix[key].colDescriptionTemplates;
        itemALabels = solutionMatrix[key].rowLabels;
        itemATemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    } else {
      // in case there are multiple numeric labels, make sure we find one that matches the one we already found // todo add test for this case
      if (arraysEqualQ(solutionMatrix[key].rowLabels, numericLabels)) {
        itemBLabels = solutionMatrix[key].colLabels;
        itemBTemplates = solutionMatrix[key].colDescriptionTemplates;
      } else if (arraysEqualQ(solutionMatrix[key].colLabels, numericLabels)) {
        itemBLabels = solutionMatrix[key].rowLabels;
        itemBTemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    }
  }

  // todo make sure can rely on the numeric labels being sorted

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandoms(numericLabels, 2);
  const itemA = findMatrixLabel(solutionMatrix, itemANumericValue, itemALabels);
  const itemB = findMatrixLabel(solutionMatrix, itemBNumericValue, itemBLabels);

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

  const itemADescription = itemATemplates.leadingDescription.replace(
    "VALUE",
    itemA,
  );

  const itemBDescription = itemBTemplates.trailingDescription.replace(
    "VALUE",
    itemB,
  );

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericDescriptionTemplates.diffLesserDescription
      : numericDescriptionTemplates.diffGreaterDescription;
  const numericComparisonVerb = numericDescriptionTemplates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate.replace("VALUE", numericDiffClue)
    : numericDescriptionTemplate.replace("VALUE", "some");

  const writtenClue = `${itemADescription} ${numericComparisonVerb} ${
    numericDiffClue === undefined || actualNumericDiff === numericDiffClue
      ? ""
      : "at least "
  }${numericDescription} than ${itemBDescription}.`;

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

import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export type NumericComparisonClue = {
  writtenClue: string;
  crossedOff: boolean;
  clueType: "numericComparison";
  clueParameters: {
    greaterItem: string | number;
    lesserItem: string | number;
    numericLabels: number[];
    actualNumericDiff: number;
    numericDiffClue: number | undefined;
  };
};

// Generates a numeric clue
// e.g. The red house has more trees than the white house
export function getNumericComparisonClue(
  solutionMatrix: PuzzleMatrix,
): NumericComparisonClue {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  // choose a grid in the solution matrix that uses a numeric category
  // (upstream logic ensures that this function is only called if there is a numeric category)
  const shuffledKeys = shuffleArray(Object.keys(solutionMatrix));
  let selectedKey;
  let numericIsRows;
  for (const key of shuffledKeys) {
    if (typeof solutionMatrix[key].rowLabels[0] === "number") {
      selectedKey = key;
      numericIsRows = true;
      break;
    }
    if (typeof solutionMatrix[key].columnLabels[0] === "number") {
      selectedKey = key;
      numericIsRows = false;
      break;
    }
  }

  if (numericIsRows === undefined || selectedKey === undefined) {
    throw new Error(
      `getNumericComparisonClue called without a numeric category`,
    );
  }

  // figure out the numeric labels
  const numericLabels = numericIsRows
    ? (solutionMatrix[selectedKey].rowLabels as number[])
    : (solutionMatrix[selectedKey].columnLabels as number[]);

  // choose two random items in the other label set
  const otherLabels = numericIsRows
    ? solutionMatrix[selectedKey].columnLabels
    : solutionMatrix[selectedKey].rowLabels;
  const otherLabelIndexes = otherLabels.map((_, index) => index);
  const itemAIndex = pickRandomItemFromArray(otherLabelIndexes);
  const itemA = otherLabels[itemAIndex];
  const itemBIndex = pickRandomItemFromArray([
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
  // (in the case of undefined, "at least" and the minimum diff is used)
  const inclusiveNumericLabels = numericLabels.filter(
    (i) =>
      i >= Math.min(itemANumericValue, itemBNumericValue) &&
      i <= Math.max(itemANumericValue, itemBNumericValue),
  );
  let numericDiffOptions: (number | undefined)[] = [undefined];
  for (let index = 1; index < inclusiveNumericLabels.length; index++) {
    numericDiffOptions = [
      ...numericDiffOptions,
      getNumericDiff(inclusiveNumericLabels[index], inclusiveNumericLabels[0]),
    ];
  }
  const numericDiffClue = pickRandomItemFromArray(numericDiffOptions);
  const actualNumericDiff = Math.abs(
    getNumericDiff(itemANumericValue, itemBNumericValue),
  );

  const [numericDescriptionTemplates, nonNumericDescriptionTemplates] =
    numericIsRows
      ? [
          solutionMatrix[selectedKey].rowDescriptionTemplates,
          solutionMatrix[selectedKey].columnDescriptionTemplates,
        ]
      : [
          solutionMatrix[selectedKey].columnDescriptionTemplates,
          solutionMatrix[selectedKey].rowDescriptionTemplates,
        ];

  const leadingDescription = nonNumericDescriptionTemplates.description(itemA);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericDescriptionTemplates.diffLesserDescription
      : numericDescriptionTemplates.diffGreaterDescription;
  const numericComparisonVerb = numericDescriptionTemplates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate(numericDiffClue)
    : numericDescriptionTemplate(minimumNumericDiff);

  const trailingDescription = numericIsRows
    ? solutionMatrix[selectedKey].columnDescriptionTemplates.description(itemB)
    : solutionMatrix[selectedKey].rowDescriptionTemplates.description(itemB);

  const relationWord =
    actualNumericDiff === numericDiffClue ? "exactly " : "at least ";

  let writtenClue = `${leadingDescription} ${numericComparisonVerb} ${relationWord}${numericDescription} than ${trailingDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  const [greaterItem, lesserItem] =
    itemANumericValue < itemBNumericValue ? [itemB, itemA] : [itemA, itemB];

  return {
    writtenClue,
    crossedOff: false,
    clueType: "numericComparison",
    clueParameters: {
      greaterItem,
      lesserItem,
      numericLabels,
      actualNumericDiff,
      numericDiffClue,
    },
  };
}

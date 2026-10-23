import {
  pickRandomItemsFromArray,
  pickRandomItemFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {findFirstTrueIntersection} from "../matrixSearching/findFirstTrueIntersection";
import {arraysEqualQ} from "../equalQ/arraysEqualQ";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export type NumericComparisonCrossCategoryClue = {
  writtenClue: string;
  crossedOff: boolean;
  clueType: "numericComparisonCrossCategory";
  clueParameters: {
    greaterItem: string | number;
    lesserItem: string | number;
    numericLabels: number[];
    actualNumericDiff: number;
    numericDiffClue: number | undefined;
  };
};

// Generates a numeric clue that spans categories
// e.g. The red house has more trees than Colin's house
export function getNumericComparisonCrossCategoryClue(
  solutionMatrix: PuzzleMatrix,
): NumericComparisonCrossCategoryClue {
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
    const rowLabels = solutionMatrix[key].rowLabels;
    const columnLabels = solutionMatrix[key].columnLabels;
    if (!itemALabels) {
      // If we haven't found a numeric entry, choose the first that we find
      if (
        rowLabels.every((label): label is number => typeof label === "number")
      ) {
        numericLabels = rowLabels;
        numericDescriptionTemplates =
          solutionMatrix[key].rowDescriptionTemplates;
        itemALabels = columnLabels;
        itemATemplates = solutionMatrix[key].columnDescriptionTemplates;
      } else if (
        columnLabels.every(
          (label): label is number => typeof label === "number",
        )
      ) {
        numericLabels = columnLabels;
        numericDescriptionTemplates =
          solutionMatrix[key].columnDescriptionTemplates;
        itemALabels = rowLabels;
        itemATemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    } else {
      if (!numericLabels) {
        throw new Error("numericLabels not set as expected");
      }

      // in case there are multiple numeric labels, make sure we find one that matches the one we already found
      if (arraysEqualQ(rowLabels, numericLabels)) {
        itemBLabels = columnLabels;
        itemBTemplates = solutionMatrix[key].columnDescriptionTemplates;
      } else if (arraysEqualQ(columnLabels, numericLabels)) {
        itemBLabels = rowLabels;
        itemBTemplates = solutionMatrix[key].rowDescriptionTemplates;
      }
    }
  }

  if (
    !numericLabels ||
    !itemALabels ||
    !itemBLabels ||
    !itemATemplates ||
    !itemBTemplates ||
    !numericDescriptionTemplates
  ) {
    throw new Error("Labels and templates not set as expected");
  }

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandomItemsFromArray(
    numericLabels,
    2,
  );
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

  if (itemA === undefined || itemB === undefined) {
    throw new Error("Unable to find items");
  }

  // e.g. if numeric labels are [10,15,20,30,40]
  // and chose 15 and 40
  // possible diffs are 5, 15, 25, as well as undefined
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

  const itemADescription = itemATemplates.description(itemA);

  const itemBDescription = itemBTemplates.description(itemB);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericDescriptionTemplates.diffLesserDescription
      : numericDescriptionTemplates.diffGreaterDescription;
  const numericComparisonVerb = numericDescriptionTemplates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate(numericDiffClue)
    : numericDescriptionTemplate(minimumNumericDiff);

  const relationWord =
    actualNumericDiff === numericDiffClue ? "exactly " : "at least ";
  let writtenClue = `${itemADescription} ${numericComparisonVerb} ${relationWord}${numericDescription} than ${itemBDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  const [greaterItem, lesserItem] =
    itemANumericValue < itemBNumericValue ? [itemB, itemA] : [itemA, itemB];

  return {
    writtenClue,
    crossedOff: false,
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

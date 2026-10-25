import {
  pickRandomItemFromArray,
  pickRandomItemsFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {
  type Axis,
  type NumberAxis,
  type PuzzleMatrix,
} from "../puzzleGeneration/buildEmptyMatrix";
import {findFirstTrueIntersection} from "../matrixSearching/findFirstTrueIntersection";

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
  let numericAxis: NumberAxis | undefined;
  let otherAxis: Axis | undefined;
  for (const key of shuffledKeys) {
    if (solutionMatrix[key].row.kind === "number") {
      numericAxis = solutionMatrix[key].row;
      otherAxis = solutionMatrix[key].column;
      break;
    }
    if (solutionMatrix[key].column.kind === "number") {
      numericAxis = solutionMatrix[key].column;
      otherAxis = solutionMatrix[key].row;
      break;
    }
  }

  if (numericAxis === undefined || otherAxis === undefined) {
    throw new Error(
      `getNumericComparisonClue called without a numeric category`,
    );
  }

  // figure out the numeric labels
  const numericLabels = numericAxis.labels;

  // choose two random items in the other label set
  const otherLabels = otherAxis.labels;
  const [itemA, itemB] = pickRandomItemsFromArray<string | number>(
    otherLabels,
    2,
  );

  // Figure out the corresponding numeric value of those items
  const itemANumericValue = findFirstTrueIntersection(
    solutionMatrix,
    itemA,
    numericLabels,
  );
  const itemBNumericValue = findFirstTrueIntersection(
    solutionMatrix,
    itemB,
    numericLabels,
  );

  if (itemANumericValue === undefined || itemBNumericValue === undefined) {
    throw new Error("Unable to find item intersections");
  }
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

  // Overkill but I didn't find a better way to satisfy TS
  const leadingDescription =
    otherAxis.kind === "number"
      ? otherAxis.templates.generateDescription(itemA as number)
      : otherAxis.templates.generateDescription(itemA as string);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericAxis.templates.generateDiffLesserDescription
      : numericAxis.templates.generateDiffGreaterDescription;
  const numericComparisonVerb = numericAxis.templates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate(numericDiffClue)
    : numericDescriptionTemplate(minimumNumericDiff);

  // Overkill but I didn't find a better way to satisfy TS
  const trailingDescription =
    otherAxis.kind === "number"
      ? otherAxis.templates.generateDescription(itemB as number)
      : otherAxis.templates.generateDescription(itemB as string);

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

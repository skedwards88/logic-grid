import {
  pickRandomItemsFromArray,
  pickRandomItemFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {findFirstTrueIntersection} from "../matrixSearching/findFirstTrueIntersection";
import {arraysEqualQ} from "../equalQ/arraysEqualQ";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {
  type Axis,
  type NumberAxis,
  type PuzzleMatrix,
} from "../puzzleGeneration/buildEmptyMatrix";

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
  let numericAxis: NumberAxis | undefined;
  let axisA: Axis | undefined;
  let axisB: Axis | undefined;

  for (const key of shuffleArray(Object.keys(solutionMatrix))) {
    const {row, column} = solutionMatrix[key];

    if (!numericAxis) {
      // If we haven't found a numeric axis, choose the first that we find
      if (row.kind === "number") {
        numericAxis = row;
        axisA = column;
      } else if (column.kind === "number") {
        numericAxis = column;
        axisA = row;
      }
    } else {
      // in case there are multiple numeric axes, make sure we find one that matches the one we already found
      if (
        row.kind === "number" &&
        arraysEqualQ(row.labels, numericAxis.labels)
      ) {
        axisB = column;
      } else if (
        column.kind === "number" &&
        arraysEqualQ(column.labels, numericAxis.labels)
      ) {
        axisB = row;
      }
    }
  }

  if (!numericAxis || !axisA || !axisB) {
    throw new Error("Axes not set as expected");
  }

  const numericLabels = numericAxis.labels;

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandomItemsFromArray(
    numericLabels,
    2,
  );
  const itemA = findFirstTrueIntersection(
    solutionMatrix,
    itemANumericValue,
    axisA.labels,
  );
  const itemB = findFirstTrueIntersection(
    solutionMatrix,
    itemBNumericValue,
    axisB.labels,
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

  // Overkill but I didn't find a better way to satisfy TS
  const itemADescription =
    axisA.kind === "number"
      ? axisA.templates.generateDescription(itemA as number)
      : axisA.templates.generateDescription(itemA as string);

  const itemBDescription =
    axisB.kind === "number"
      ? axisB.templates.generateDescription(itemB as number)
      : axisB.templates.generateDescription(itemB as string);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericAxis.templates.generateDiffLesserDescription
      : numericAxis.templates.generateDiffGreaterDescription;
  const numericComparisonVerb = numericAxis.templates.verb || "is";
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

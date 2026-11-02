import {
  pickRandomItemFromArray,
  pickRandomItemsFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {getNumericDiff} from "../helpers/getNumericDiff";
import {getMinimumNumericDiff} from "../helpers/getMinimumNumericDiff";
import {
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
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
export function getNumericComparisonClue({
  solvedMatrixGrids,
  matrixLabels,
  matrixTemplates,
}: {
  solvedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
}): NumericComparisonClue {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  // choose a grid in the solution matrix that uses a numeric category
  // (upstream logic ensures that this function is only called if there is a numeric category)
  const shuffledKeys = shuffleArray(Object.keys(solvedMatrixGrids));
  let axisKey: string | undefined;
  let numericAxisDimension: "column" | "row" | undefined;
  let otherAxisDimension: "column" | "row" | undefined;

  for (const key of shuffledKeys) {
    if (matrixTemplates[key].row.kind === "number") {
      axisKey = key;
      numericAxisDimension = "row";
      otherAxisDimension = "column";
      break;
    }
    if (matrixTemplates[key].column.kind === "number") {
      axisKey = key;
      numericAxisDimension = "column";
      otherAxisDimension = "row";
      break;
    }
  }

  if (
    axisKey === undefined ||
    numericAxisDimension === undefined ||
    otherAxisDimension === undefined
  ) {
    throw new Error(
      `getNumericComparisonClue called without a numeric category`,
    );
  }

  // figure out the numeric labels
  const numericLabels = matrixLabels[axisKey][numericAxisDimension]
    .values as number[];

  // choose two random items in the other label set
  const otherLabels = matrixLabels[axisKey][otherAxisDimension].values;
  const [itemA, itemB] = pickRandomItemsFromArray<string | number>(
    otherLabels,
    2,
  );

  // Figure out the corresponding numeric value of those items
  const itemANumericValue = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemA,
    intersectingItems: numericLabels,
  });
  const itemBNumericValue = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemB,
    intersectingItems: numericLabels,
  });

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
  const otherAxisTemplates = matrixTemplates[axisKey][otherAxisDimension];
  const numericAxisTemplates = matrixTemplates[axisKey][numericAxisDimension];
  const leadingDescription =
    otherAxisTemplates.kind === "number"
      ? otherAxisTemplates.templates.generateDescription(itemA as number)
      : otherAxisTemplates.templates.generateDescription(itemA as string);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  // This shouldn't be hit, but it's required for TS now that I split the templates out from the other info
  if (numericAxisTemplates.kind !== "number") {
    throw new Error("");
  }

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? numericAxisTemplates.templates.generateDiffLesserDescription
      : numericAxisTemplates.templates.generateDiffGreaterDescription;
  const numericComparisonVerb = numericAxisTemplates.templates.verb || "is";
  const numericDescription = numericDiffClue
    ? numericDescriptionTemplate(numericDiffClue)
    : numericDescriptionTemplate(minimumNumericDiff);

  // Overkill but I didn't find a better way to satisfy TS
  const trailingDescription =
    otherAxisTemplates.kind === "number"
      ? otherAxisTemplates.templates.generateDescription(itemB as number)
      : otherAxisTemplates.templates.generateDescription(itemB as string);

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

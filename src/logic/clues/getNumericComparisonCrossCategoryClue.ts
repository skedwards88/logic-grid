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
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "../puzzleGeneration/generateSolutionMatrix";

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
export function getNumericComparisonCrossCategoryClue({
  solvedMatrixGrids,
  matrixLabels,
  matrixTemplates,
}: {
  solvedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
}): NumericComparisonCrossCategoryClue {
  // Note: this relies on labels being sorted by size, which occurs when the puzzle labels are generated

  // find two grids in the solution matrix that uses a numeric category
  // (upstream logic ensures that this function is only called if there is a numeric category)
  let numericAxisKey: string | undefined;
  let axisAKey: string | undefined;
  let axisBKey: string | undefined;
  let numericAxisDimension: "column" | "row" | undefined;
  let axisADimension: "column" | "row" | undefined;
  let axisBDimension: "column" | "row" | undefined;

  for (const key of shuffleArray(Object.keys(solvedMatrixGrids))) {
    if (!numericAxisKey || !numericAxisDimension) {
      // If we haven't found a numeric axis, choose the first that we find
      if (
        matrixLabels[key].row.values.every((label) => typeof label === "number")
      ) {
        numericAxisDimension = "row";
        axisADimension = "column";
        numericAxisKey = key;
        axisAKey = key;
      } else if (
        matrixLabels[key].column.values.every(
          (label) => typeof label === "number",
        )
      ) {
        numericAxisDimension = "column";
        axisADimension = "row";
        numericAxisKey = key;
        axisAKey = key;
      }
    } else {
      // in case there are multiple numeric axes, make sure we find one that matches the one we already found
      if (
        matrixLabels[key].row.values.every(
          (label) => typeof label === "number",
        ) &&
        arraysEqualQ(
          matrixLabels[key].row.values,
          matrixLabels[numericAxisKey][numericAxisDimension].values as number[],
        )
      ) {
        axisBDimension = "column";
        axisBKey = key;
      } else if (
        matrixLabels[key].column.values.every(
          (label) => typeof label === "number",
        ) &&
        arraysEqualQ(
          matrixLabels[key].column.values,
          matrixLabels[numericAxisKey][numericAxisDimension].values as number[],
        )
      ) {
        axisBDimension = "row";
        axisBKey = key;
      }
    }
  }

  if (
    !numericAxisKey ||
    !numericAxisDimension ||
    !axisAKey ||
    !axisADimension ||
    !axisBKey ||
    !axisBDimension
  ) {
    throw new Error("Axes not set as expected");
  }

  const numericLabels = matrixLabels[numericAxisKey][numericAxisDimension]
    .values as number[];

  // choose two random items in two separate non-numeric label sets
  // make sure that the items don't have the same numeric value
  const [itemANumericValue, itemBNumericValue] = pickRandomItemsFromArray(
    numericLabels,
    2,
  );
  const itemA = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemANumericValue,
    intersectingItems: matrixLabels[axisAKey][axisADimension].values,
  });
  const itemB = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemBNumericValue,
    intersectingItems: matrixLabels[axisBKey][axisBDimension].values,
  });

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
  const numericDiffOptions: (number | undefined)[] = [undefined];
  for (let index = 1; index < inclusiveNumericLabels.length; index++) {
    numericDiffOptions.push(
      getNumericDiff(inclusiveNumericLabels[index], inclusiveNumericLabels[0]),
    );
  }
  const numericDiffClue = pickRandomItemFromArray(numericDiffOptions);
  const actualNumericDiff = Math.abs(
    getNumericDiff(itemANumericValue, itemBNumericValue),
  );

  // Overkill but I didn't find a better way to satisfy TS
  const templatesA = matrixTemplates[axisAKey][axisADimension];
  const templatesB = matrixTemplates[axisBKey][axisBDimension];
  const templatesNumeric =
    matrixTemplates[numericAxisKey][numericAxisDimension];
  // This shouldn't be hit, but it's required for TS now that I split the templates out from the other info
  if (templatesNumeric.kind !== "number") {
    throw new Error("");
  }
  const itemADescription =
    templatesA.kind === "number"
      ? templatesA.templates.generateDescription(itemA as number)
      : templatesA.templates.generateDescription(itemA as string);

  const itemBDescription =
    templatesB.kind === "number"
      ? templatesB.templates.generateDescription(itemB as number)
      : templatesB.templates.generateDescription(itemB as string);

  const minimumNumericDiff = getMinimumNumericDiff(numericLabels);

  const numericDescriptionTemplate =
    itemANumericValue < itemBNumericValue
      ? templatesNumeric.templates.generateDiffLesserDescription
      : templatesNumeric.templates.generateDiffGreaterDescription;
  const numericComparisonVerb = templatesNumeric.templates.verb || "is";
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

import {findFirstTrueIntersection} from "../matrixSearching/findFirstTrueIntersection";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "../puzzleGeneration/buildEmptyMatrix";

export type OrCrossCategoryClue = {
  writtenClue: string;
  crossedOff: boolean;
  clueType: "orCrossCategory";
  clueParameters: {
    itemA: string | number;
    orItems: [string | number, string | number];
  };
};

// Generates an "or" clue that spans categories
// e.g. "Colin is red or 2"
export function getOrCrossCategoryClue({
  solvedMatrixGrids,
  matrixLabels,
  matrixTemplates,
}: {
  solvedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
}): OrCrossCategoryClue {
  // choose two grids in the solution matrix that share one set of labels
  let keyAB;
  let keyAC;

  let axisAKey: string | undefined;
  let axisBKey: string | undefined;
  let axisCKey: string | undefined;
  let axisADimension: "column" | "row" | undefined;
  let axisBDimension: "column" | "row" | undefined;
  let axisCDimension: "column" | "row" | undefined;

  for (const key of shuffleArray(Object.keys(solvedMatrixGrids))) {
    if (!keyAB) {
      keyAB = key;
    } else if (
      matrixLabels[keyAB].column.values[0] ===
      matrixLabels[key].column.values[0]
    ) {
      keyAC = key;

      axisAKey = keyAC;
      axisBKey = keyAB;
      axisCKey = keyAC;
      axisADimension = "column";
      axisBDimension = "row";
      axisCDimension = "row";
    } else if (
      matrixLabels[keyAB].row.values[0] === matrixLabels[key].column.values[0]
    ) {
      keyAC = key;

      axisAKey = keyAC;
      axisBKey = keyAB;
      axisCKey = keyAC;
      axisADimension = "column";
      axisBDimension = "column";
      axisCDimension = "row";
    } else if (
      matrixLabels[keyAB].row.values[0] === matrixLabels[key].row.values[0]
    ) {
      keyAC = key;

      axisAKey = keyAC;
      axisBKey = keyAB;
      axisCKey = keyAC;
      axisADimension = "row";
      axisBDimension = "column";
      axisCDimension = "column";
    } else if (
      matrixLabels[keyAB].column.values[0] === matrixLabels[key].row.values[0]
    ) {
      keyAC = key;

      axisAKey = keyAC;
      axisBKey = keyAB;
      axisCKey = keyAC;
      axisADimension = "row";
      axisBDimension = "row";
      axisCDimension = "column";
    }
    if (keyAC) {
      break;
    }
  }

  if (
    !axisAKey ||
    !axisBKey ||
    !axisCKey ||
    !axisADimension ||
    !axisBDimension ||
    !axisCDimension
  ) {
    throw new Error("Axes not set as expected");
  }

  // the shared label set will have our first item
  // e.g. "colin" in "colin is red or 1"
  const itemA = pickRandomItemFromArray<string | number>(
    matrixLabels[axisAKey][axisADimension].values,
  );

  // the opposing label sets will have our other two items, one true one false
  // e.g. "red" and "1" in "colin is red or 1"
  // we've already randomized the key order above,
  //   so we can just make the first item true and the second false
  const itemB = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemA,
    intersectingItems: matrixLabels[axisBKey][axisBDimension].values,
  });
  const itemCNot = findFirstTrueIntersection({
    matrixGrids: solvedMatrixGrids,
    matrixLabels,
    item: itemA,
    intersectingItems: matrixLabels[axisCKey][axisCDimension].values,
  });
  const itemC = shuffleArray(
    matrixLabels[axisCKey][axisCDimension].values,
  ).find((i) => i != itemCNot);

  if (itemB === undefined || itemC === undefined) {
    throw new Error("Unable to find items");
  }

  // Overkill but I didn't find a better way to satisfy TS
  const templatesA = matrixTemplates[axisAKey][axisADimension];
  const descriptionA =
    templatesA.kind === "number"
      ? templatesA.templates.generateDescription(itemA as number)
      : templatesA.templates.generateDescription(itemA as string);
  const templatesB = matrixTemplates[axisBKey][axisBDimension];
  const descriptionB =
    templatesB.kind === "number"
      ? templatesB.templates.generateDescription(itemB as number)
      : templatesB.templates.generateDescription(itemB as string);
  const templatesC = matrixTemplates[axisCKey][axisCDimension];
  const descriptionC =
    templatesC.kind === "number"
      ? templatesC.templates.generateDescription(itemC as number)
      : templatesC.templates.generateDescription(itemC as string);

  const [leadingDescription, trailingDescription] = shuffleArray([
    descriptionB,
    descriptionC,
  ]);
  let writtenClue = `${descriptionA} is either ${leadingDescription} or ${trailingDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue,
    crossedOff: false,
    clueType: "orCrossCategory",
    clueParameters: {itemA, orItems: [itemB, itemC]},
  };
}

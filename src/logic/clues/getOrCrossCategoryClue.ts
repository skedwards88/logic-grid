import {findFirstTrueIntersection} from "../matrixSearching/findFirstTrueIntersection";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import type {Axis} from "../puzzleGeneration/buildEmptyMatrix";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

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
export function getOrCrossCategoryClue(
  solutionMatrix: PuzzleMatrix,
): OrCrossCategoryClue {
  // choose two grids in the solution matrix that share one set of labels
  let keyAB;
  let keyAC;
  let axisA: Axis | undefined;
  let axisB: Axis | undefined;
  let axisC: Axis | undefined;
  for (const key of shuffleArray(Object.keys(solutionMatrix))) {
    if (!keyAB) {
      keyAB = key;
    } else if (
      solutionMatrix[keyAB].column.labels[0] ===
      solutionMatrix[key].column.labels[0]
    ) {
      keyAC = key;
      axisA = solutionMatrix[key].column;
      axisB = solutionMatrix[keyAB].row;
      axisC = solutionMatrix[key].row;
    } else if (
      solutionMatrix[keyAB].row.labels[0] ===
      solutionMatrix[key].column.labels[0]
    ) {
      keyAC = key;
      axisA = solutionMatrix[key].column;
      axisB = solutionMatrix[keyAB].column;
      axisC = solutionMatrix[key].row;
    } else if (
      solutionMatrix[keyAB].row.labels[0] === solutionMatrix[key].row.labels[0]
    ) {
      keyAC = key;
      axisA = solutionMatrix[key].row;
      axisB = solutionMatrix[keyAB].column;
      axisC = solutionMatrix[key].column;
    } else if (
      solutionMatrix[keyAB].column.labels[0] ===
      solutionMatrix[key].row.labels[0]
    ) {
      keyAC = key;
      axisA = solutionMatrix[key].row;
      axisB = solutionMatrix[keyAB].row;
      axisC = solutionMatrix[key].column;
    }
    if (keyAC) {
      break;
    }
  }

  if (!axisA || !axisB || !axisC) {
    throw new Error("Axes not set as expected");
  }

  // the shared label set will have our first item
  // e.g. "colin" in "colin is red or 1"
  const itemA = pickRandomItemFromArray<string | number>(axisA.labels);

  // the opposing label sets will have our other two items, one true one false
  // e.g. "red" and "1" in "colin is red or 1"
  // we've already randomized the key order above,
  //   so we can just make the first item true and the second false
  const itemB = findFirstTrueIntersection(solutionMatrix, itemA, axisB.labels);
  const itemCNot = findFirstTrueIntersection(
    solutionMatrix,
    itemA,
    axisC.labels,
  );
  const itemC = shuffleArray(axisC.labels).find((i) => i != itemCNot);

  if (itemB === undefined || itemC === undefined) {
    throw new Error("Unable to find items");
  }

  // Overkill but I didn't find a better way to satisfy TS
  const descriptionA =
    axisA.kind === "number"
      ? axisA.templates.generateDescription(itemA as number)
      : axisA.templates.generateDescription(itemA as string);
  const descriptionB =
    axisB.kind === "number"
      ? axisB.templates.generateDescription(itemB as number)
      : axisB.templates.generateDescription(itemB as string);
  const descriptionC =
    axisC.kind === "number"
      ? axisC.templates.generateDescription(itemC as number)
      : axisC.templates.generateDescription(itemC as string);

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

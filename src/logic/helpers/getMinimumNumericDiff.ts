import {getNumericDiff} from "./getNumericDiff";

export function getMinimumNumericDiff(numericLabels: number[]): number {
  if (!Array.isArray(numericLabels)) {
    throw new Error("getMinimumNumericDiff: Input is not array");
  }

  // If not enough numbers to compare, error
  if (numericLabels.length < 2) {
    throw new Error(
      `Not enough values to determine minimum numeric diff in ${String(numericLabels)}`,
    );
  }

  // Set the minimum to the diff between the first two items initially
  let minimumNumericDiff = Math.abs(
    getNumericDiff(numericLabels[0], numericLabels[1]),
  );

  for (let index = 1; index < numericLabels.length - 1; index++) {
    const diff = Math.abs(
      getNumericDiff(numericLabels[index], numericLabels[index + 1]),
    );
    if (diff < minimumNumericDiff) {
      minimumNumericDiff = diff;
    }
  }

  return minimumNumericDiff;
}

import {arraysEqualQ} from "./arraysEqualQ.js";

export function gridsEqualQ(gridA, gridB) {
  if (!Array.isArray(gridA) || !Array.isArray(gridB) || !gridA || !gridB)
    throw new Error("gridsEqualQ: Inputs are not arrays");

  if (gridA.length !== gridB.length)
    throw new Error("gridsEqualQ: Input grids are different lengths");

  for (let rowIndex = 0; rowIndex < gridA.length; rowIndex++) {
    const rowA = gridA[rowIndex];
    const rowB = gridB[rowIndex];

    if (!arraysEqualQ(rowA, rowB)) {
      return false;
    }
  }

  return true;
}

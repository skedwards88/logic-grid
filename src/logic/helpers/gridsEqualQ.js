export function gridsEqualQ(gridA, gridB) {
  if (!Array.isArray(gridA) || !Array.isArray(gridB) || !gridA || !gridB)
    throw new Error("gridEqualQ: Inputs are not arrays");

  if (gridA.length !== gridB.length)
    throw new Error("gridEqualQ: Input grids are different lengths");

  for (let rowIndex = 0; rowIndex < gridA.length; rowIndex++) {
    const rowA = gridA[rowIndex];
    const rowB = gridB[rowIndex];

    if (!Array.isArray(rowA) || !Array.isArray(rowB)) {
      throw new Error("gridEqualQ: Rows are not arrays");
    }
    if (rowA.length !== rowB.length) {
      throw new Error("gridEqualQ: Rows are different lengths");
    }

    for (let columnIndex = 0; columnIndex < rowA.length; columnIndex++) {
      if (rowA[columnIndex] !== rowB[columnIndex]) return false;
    }
  }

  return true;
}

import {type MatrixLabels} from "../puzzleGeneration/buildEmptyMatrix";

function getUniqueLabels(allLabels: string[][]): string[][] {
  const seen = new Set<string>();

  return allLabels.filter((labels) => {
    const identifier = labels.join("");
    if (seen.has(identifier)) {
      return false;
    } else {
      seen.add(identifier);
      return true;
    }
  });
}

export function getDisplayLabels(puzzleMatrix: MatrixLabels): {
  rowDisplayLabels: string[][];
  columnDisplayLabels: string[][];
} {
  // Get the unique display labels, retaining order of the labels
  const matrixes = Object.values(puzzleMatrix);

  return {
    rowDisplayLabels: getUniqueLabels(
      matrixes.map((matrix) => matrix.row.displayLabels),
    ),
    columnDisplayLabels: getUniqueLabels(
      matrixes.map((matrix) => matrix.column.displayLabels),
    ),
  };
}

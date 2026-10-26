import {type PuzzleMatrix, type Axis} from "./buildEmptyMatrix";
import {generateSolution} from "./generateSolution";

export function generateSolutionMatrix(
  categoryLabelsAndTemplates: Axis[],
): PuzzleMatrix {
  // the computer just cares about one category vs another (but doesn't care which is a row vs column)
  // but humans generally make a matrix where it does matter which category is the row vs which is the column
  // Columns = 2nd...last categories
  // Rows = 1st, then last...3rd categories
  const matrixColumnInfo = categoryLabelsAndTemplates.slice(
    1,
    categoryLabelsAndTemplates.length,
  );
  const matrixRowInfo = [
    categoryLabelsAndTemplates[0],
    ...categoryLabelsAndTemplates
      .slice(2, categoryLabelsAndTemplates.length)
      .reverse(),
  ];

  const solution = generateSolution(
    categoryLabelsAndTemplates.map((i) => i.labels),
  );

  const solutionMatrix: PuzzleMatrix = {};

  for (let rowIndex = 0; rowIndex < matrixRowInfo.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrixColumnInfo.length - rowIndex;
      columnIndex++
    ) {
      const rowLabels = matrixRowInfo[rowIndex].labels;

      const columnLabels = matrixColumnInfo[columnIndex].labels;

      const grid: boolean[][] = [];
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        const row: boolean[] = [];
        for (
          let columnIndex = 0;
          columnIndex < columnLabels.length;
          columnIndex++
        ) {
          if (
            solution.some(
              (solutionEntry) =>
                solutionEntry.includes(rowLabels[rowIndex]) &&
                solutionEntry.includes(columnLabels[columnIndex]),
            )
          ) {
            row.push(true);
          } else {
            row.push(false);
          }
        }
        grid.push(row);
      }

      solutionMatrix[`rowSet${rowIndex}_columnSet${columnIndex}`] = {
        row: matrixRowInfo[rowIndex],
        column: matrixColumnInfo[columnIndex],
        grid,
      };
    }
  }
  return solutionMatrix;
}

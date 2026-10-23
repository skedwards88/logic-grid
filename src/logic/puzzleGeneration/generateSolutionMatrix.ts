import {
  type TempBroadUnsolvedMatrix,
  type SolvedPuzzleMatrix,
} from "./buildEmptyMatrix";
import {generateSolution} from "./generateSolution";

export function generateSolutionMatrix(
  categoryLabelsAndTemplates: {
    labels: (string | number)[];
    displayLabels: (string | number)[];
    descriptionTemplates: TempBroadUnsolvedMatrix["rowDescriptionTemplates"];
  }[],
): SolvedPuzzleMatrix {
  // the computer just cares about one category vs another (but doesn't care which is a row vs column)
  // but humans generally make a matrix where it does matter which category is the row vs which is the column
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

  const solutionMatrix: SolvedPuzzleMatrix = {};

  for (let rowIndex = 0; rowIndex < matrixRowInfo.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrixColumnInfo.length - rowIndex;
      columnIndex++
    ) {
      const rowLabels = matrixRowInfo[rowIndex].labels;
      const rowDescriptionTemplates =
        matrixRowInfo[rowIndex].descriptionTemplates;
      const columnLabels = matrixColumnInfo[columnIndex].labels;
      const columnDescriptionTemplates =
        matrixColumnInfo[columnIndex].descriptionTemplates;

      let grid: boolean[][] = [];
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        let row: boolean[] = [];
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
            row = [...row, true];
          } else {
            row = [...row, false];
          }
        }
        grid = [...grid, row];
      }

      solutionMatrix[`rowSet${rowIndex}_columnSet${columnIndex}`] = {
        rowLabels,
        columnLabels,
        rowDescriptionTemplates,
        columnDescriptionTemplates,
        grid,
      };
    }
  }
  return solutionMatrix;
}

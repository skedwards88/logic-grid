import { generateSolution } from "./generateSolution.js";

export function generateSolutionMatrix(categoryLabelsAndTemplates) {
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

  let solutionMatrix = {};

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

      let grid = [];
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < columnLabels.length; columnIndex++) {
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
        rowLabels: rowLabels,
        columnLabels: columnLabels,
        rowDescriptionTemplates: rowDescriptionTemplates,
        columnDescriptionTemplates: columnDescriptionTemplates,
        grid: grid,
      };
    }
  }
  return solutionMatrix;
}

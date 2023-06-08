export function generateSolutionMatrix(solution, categoryLabelsAndTemplates) {
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

  let solutionMatrix = {};

  for (let rowIndex = 0; rowIndex < matrixRowInfo.length; rowIndex++) {
    for (
      let colIndex = 0;
      colIndex < matrixColumnInfo.length - rowIndex;
      colIndex++
    ) {
      const rowLabels = matrixRowInfo[rowIndex].labels;
      const rowDescriptionTemplates =
        matrixRowInfo[rowIndex].descriptionTemplates;
      const colLabels = matrixColumnInfo[colIndex].labels;
      const colDescriptionTemplates =
        matrixColumnInfo[colIndex].descriptionTemplates;

      let grid = [];
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        let row = [];
        for (let colIndex = 0; colIndex < colLabels.length; colIndex++) {
          if (
            solution.some(
              (solutionEntry) =>
                solutionEntry.includes(rowLabels[rowIndex]) &&
                solutionEntry.includes(colLabels[colIndex]),
            )
          ) {
            row = [...row, true];
          } else {
            row = [...row, false];
          }
        }
        grid = [...grid, row];
      }

      solutionMatrix[`rowSet${rowIndex}_columnSet${colIndex}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        rowDescriptionTemplates: rowDescriptionTemplates,
        colDescriptionTemplates: colDescriptionTemplates,
        grid: grid,
      };
    }
  }
  return solutionMatrix;
}

import {
  type Axis,
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "./buildEmptyMatrix";
import {generateSolution} from "./generateSolution";

export function generateSolutionMatrix(categoryLabelsAndTemplates: Axis[]): {
  solvedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
} {
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

  const solvedMatrixGrids: MatrixGrids = {};
  const matrixTemplates: MatrixTemplates = {};
  const matrixLabels: MatrixLabels = {};

  for (let rowIndex = 0; rowIndex < matrixRowInfo.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrixColumnInfo.length - rowIndex;
      columnIndex++
    ) {
      const columnInfo = matrixColumnInfo[columnIndex];
      const rowInfo = matrixRowInfo[rowIndex];

      const grid: boolean[][] = [];
      for (let rowIndex = 0; rowIndex < rowInfo.labels.length; rowIndex++) {
        const row: boolean[] = [];
        for (
          let columnIndex = 0;
          columnIndex < columnInfo.labels.length;
          columnIndex++
        ) {
          if (
            solution.some(
              (solutionEntry) =>
                solutionEntry.includes(rowInfo.labels[rowIndex]) &&
                solutionEntry.includes(columnInfo.labels[columnIndex]),
            )
          ) {
            row.push(true);
          } else {
            row.push(false);
          }
        }
        grid.push(row);
      }

      solvedMatrixGrids[`rowSet${rowIndex}_columnSet${columnIndex}`] = grid;

      const columnLabels =
        columnInfo.kind === "number"
          ? {labels: columnInfo.labels, displayLabels: columnInfo.displayLabels}
          : {
              labels: columnInfo.labels,
              displayLabels: columnInfo.displayLabels,
            };

      const rowLabels =
        rowInfo.kind === "number"
          ? {labels: rowInfo.labels, displayLabels: rowInfo.displayLabels}
          : {labels: rowInfo.labels, displayLabels: rowInfo.displayLabels};

      matrixLabels[`rowSet${rowIndex}_columnSet${columnIndex}`] = {
        row: rowLabels,
        column: columnLabels,
      };

      const columnTemplates =
        columnInfo.kind === "number"
          ? {kind: columnInfo.kind, templates: columnInfo.templates}
          : {
              kind: columnInfo.kind,
              templates: columnInfo.templates,
            };

      const rowTemplates =
        rowInfo.kind === "number"
          ? {kind: rowInfo.kind, templates: rowInfo.templates}
          : {kind: rowInfo.kind, templates: rowInfo.templates};

      matrixTemplates[`rowSet${rowIndex}_columnSet${columnIndex}`] = {
        row: rowTemplates,
        column: columnTemplates,
      };
    }
  }

  return {solvedMatrixGrids, matrixLabels, matrixTemplates};
}

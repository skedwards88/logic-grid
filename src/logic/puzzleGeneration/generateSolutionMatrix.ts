import {
  type SolvedPuzzleMatrix,
  type Axis,
  type StringAxis,
  type NumberAxis,
} from "./buildEmptyMatrix";
import {generateSolution} from "./generateSolution";

export function generateSolutionMatrix(
  categoryLabelsAndTemplates: Axis[],
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

      const rowDescriptionTemplates = matrixRowInfo[rowIndex].templates;

      const columnLabels = matrixColumnInfo[columnIndex].labels;

      const columnDescriptionTemplates =
        matrixColumnInfo[columnIndex].templates;

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
        row: addTypeInfo(rowLabels, rowDescriptionTemplates),
        column: addTypeInfo(columnLabels, columnDescriptionTemplates),
        grid,
      };
    }
  }
  return solutionMatrix;
}

function addTypeInfo(
  labels: string[] | number[],
  templates: Axis["templates"],
): Axis {
  if (labels.every((label) => typeof label === "number")) {
    return {
      labels,
      kind: "number",
      templates,
    } as NumberAxis;
  } else {
    return {
      labels,
      kind: "string",
      templates,
    } as StringAxis;
  }
}

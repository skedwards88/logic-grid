import {type Axis} from "./chooseCategories";
import {generateSolution} from "./generateSolution";

export type Grid = (boolean | null)[][];

export type StringLabels = {
  values: string[];
  displayLabels: string[];
};

export type NumberLabels = {
  values: number[];
  displayLabels: string[];
};

export type Labels = StringLabels | NumberLabels;

export type StringTemplates = {
  kind: "string";
  templates: {
    generateDescription: (value: string) => string;
    verb?: string;
  };
};

export type NumberTemplates = {
  kind: "number";
  templates: {
    generateDescription: (value: number) => string;
    generateDiffGreaterDescription: (value: number) => string;
    generateDiffLesserDescription: (value: number) => string;
    verb?: string;
  };
};

export type Templates = StringTemplates | NumberTemplates;

export type MatrixLabels = Record<
  string,
  {
    row: Labels;
    column: Labels;
  }
>;

export type MatrixTemplates = Record<
  string,
  {
    row: Templates;
    column: Templates;
  }
>;

export type MatrixGrids = Record<string, Grid>;

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
    categoryLabelsAndTemplates.map((i) => i.values),
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
      for (let rowIndex = 0; rowIndex < rowInfo.values.length; rowIndex++) {
        const row: boolean[] = [];
        for (
          let columnIndex = 0;
          columnIndex < columnInfo.values.length;
          columnIndex++
        ) {
          if (
            solution.some(
              (solutionEntry) =>
                solutionEntry.includes(rowInfo.values[rowIndex]) &&
                solutionEntry.includes(columnInfo.values[columnIndex]),
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
          ? {values: columnInfo.values, displayLabels: columnInfo.displayLabels}
          : {
              values: columnInfo.values,
              displayLabels: columnInfo.displayLabels,
            };

      const rowLabels =
        rowInfo.kind === "number"
          ? {values: rowInfo.values, displayLabels: rowInfo.displayLabels}
          : {values: rowInfo.values, displayLabels: rowInfo.displayLabels};

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

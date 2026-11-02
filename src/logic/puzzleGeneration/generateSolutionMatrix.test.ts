import {type Axis} from "./buildEmptyMatrixGrids";
import {generateSolutionMatrix} from "./generateSolutionMatrix";

describe("generateSolutionMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        values: ["cat", "dog", "cow"],
        displayLabels: ["cat", "dog", "cow"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        values: [1, 2, 3],
        displayLabels: [1, 2, 3].map((l) => l.toString()),
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        values: ["red", "orange", "blue"],
        displayLabels: ["red", "orange", "blue"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
    ];
    const {solvedMatrixGrids, matrixLabels, matrixTemplates} =
      generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solvedMatrixGrids).length).toBe(expectedNumberOfKeys);
    expect(Object.keys(solvedMatrixGrids)).toEqual(Object.keys(matrixLabels));
    expect(Object.keys(solvedMatrixGrids)).toEqual(
      Object.keys(matrixTemplates),
    );

    for (const key in solvedMatrixGrids) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].row.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].row.values,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].column.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].column.values,
      );

      // rows and columns are different
      expect(matrixLabels[key].column.values).not.toEqual(
        matrixLabels[key].row.values,
      );

      // grid has expected number of rows
      expect(solvedMatrixGrids[key].length).toBe(
        matrixLabels[key].row.values.length,
      );

      // grid rows have expected number of columns
      for (const row of solvedMatrixGrids[key]) {
        expect(row.length).toBe(matrixLabels[key].column.values.length);
      }

      // every item in the grid is true or false
      solvedMatrixGrids[key].forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solvedMatrixGrids[key]) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solvedMatrixGrids[key][0].length;
        columnIndex++
      ) {
        const column = solvedMatrixGrids[key].map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 5 items per)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        values: ["cat", "dog", "cow", "horse", "spider"],
        displayLabels: ["cat", "dog", "cow", "horse", "spider"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        values: [1, 2, 3, 4, 5],
        displayLabels: [1, 2, 3, 4, 5].map((l) => l.toString()),
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        values: ["red", "blue", "green", "orange", "yellow"],
        displayLabels: ["red", "blue", "green", "orange", "yellow"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
      {
        kind: "string",
        values: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        displayLabels: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        templates: {
          generateDescription: (value) => `${value}'s pet`,
        },
      },
    ];
    const {solvedMatrixGrids, matrixLabels, matrixTemplates} =
      generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solvedMatrixGrids).length).toBe(expectedNumberOfKeys);
    expect(Object.keys(solvedMatrixGrids)).toEqual(Object.keys(matrixLabels));
    expect(Object.keys(solvedMatrixGrids)).toEqual(
      Object.keys(matrixTemplates),
    );

    for (const key in solvedMatrixGrids) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].row.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].row.values,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].column.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].column.values,
      );

      // rows and columns are different
      expect(matrixLabels[key].column.values).not.toEqual(
        matrixLabels[key].row.values,
      );

      // grid has expected number of rows
      expect(solvedMatrixGrids[key].length).toBe(
        matrixLabels[key].row.values.length,
      );

      // grid rows have expected number of columns
      for (const row of solvedMatrixGrids[key]) {
        expect(row.length).toBe(matrixLabels[key].column.values.length);
      }

      // every item in the grid is true or false
      solvedMatrixGrids[key].forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solvedMatrixGrids[key]) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solvedMatrixGrids[key][0].length;
        columnIndex++
      ) {
        const column = solvedMatrixGrids[key].map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 3 items per)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        values: ["cat", "dog", "cow"],
        displayLabels: ["cat", "dog", "cow"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        values: [1, 2, 3],
        displayLabels: [1, 2, 3].map((l) => l.toString()),
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        values: ["red", "blue", "green"],
        displayLabels: ["red", "blue", "green"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
      {
        kind: "string",
        values: ["Tom", "Bob", "Jim"],
        displayLabels: ["Tom", "Bob", "Jim"],
        templates: {
          generateDescription: (value) => `${value}'s pet`,
        },
      },
    ];
    const {solvedMatrixGrids, matrixLabels, matrixTemplates} =
      generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solvedMatrixGrids).length).toBe(expectedNumberOfKeys);
    expect(Object.keys(solvedMatrixGrids)).toEqual(Object.keys(matrixLabels));
    expect(Object.keys(solvedMatrixGrids)).toEqual(
      Object.keys(matrixTemplates),
    );

    for (const key in solvedMatrixGrids) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].row.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].row.values,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(matrixLabels[key].column.values),
      ]);
      expect(labelsAndTemplates.map((i) => i.values)).toContainEqual(
        matrixLabels[key].column.values,
      );

      // rows and columns are different
      expect(matrixLabels[key].column.values).not.toEqual(
        matrixLabels[key].row.values,
      );

      // grid has expected number of rows
      expect(solvedMatrixGrids[key].length).toBe(
        matrixLabels[key].row.values.length,
      );

      // grid rows have expected number of columns
      for (const row of solvedMatrixGrids[key]) {
        expect(row.length).toBe(matrixLabels[key].column.values.length);
      }

      // every item in the grid is true or false
      solvedMatrixGrids[key].forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solvedMatrixGrids[key]) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solvedMatrixGrids[key][0].length;
        columnIndex++
      ) {
        const column = solvedMatrixGrids[key].map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });
});

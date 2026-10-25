import {type Axis} from "./buildEmptyMatrix";
import {generateSolutionMatrix} from "./generateSolutionMatrix";

describe("generateSolutionMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        labels: ["cat", "dog", "cow"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        labels: [1, 2, 3],
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        labels: ["red", "orange", "blue"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
    ];
    const solutionMatrix = generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].row.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].row.labels,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].column.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].column.labels,
      );

      // rows and columns are different
      expect(solutionMatrix[key].column.labels).not.toEqual(
        solutionMatrix[key].row.labels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].row.labels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].column.labels.length);
      }

      // every item in the grid is true or false
      solutionMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solutionMatrix[key].grid) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solutionMatrix[key].grid[0].length;
        columnIndex++
      ) {
        const column = solutionMatrix[key].grid.map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 5 items per)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        labels: ["cat", "dog", "cow", "horse", "spider"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        labels: [1, 2, 3, 4, 5],
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        labels: ["red", "blue", "green", "orange", "yellow"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
      {
        kind: "string",
        labels: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        templates: {
          generateDescription: (value) => `${value}'s pet`,
        },
      },
    ];
    const solutionMatrix = generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].row.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].row.labels,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].column.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].column.labels,
      );

      // rows and columns are different
      expect(solutionMatrix[key].column.labels).not.toEqual(
        solutionMatrix[key].row.labels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].row.labels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].column.labels.length);
      }

      // every item in the grid is true or false
      solutionMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solutionMatrix[key].grid) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solutionMatrix[key].grid[0].length;
        columnIndex++
      ) {
        const column = solutionMatrix[key].grid.map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 3 items per)", () => {
    const labelsAndTemplates: Axis[] = [
      {
        kind: "string",
        labels: ["cat", "dog", "cow"],
        templates: {
          generateDescription: (value) => `the ${value}`,
        },
      },
      {
        kind: "number",
        labels: [1, 2, 3],
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        kind: "string",
        labels: ["red", "blue", "green"],
        templates: {
          generateDescription: (value) => `the ${value} animal`,
        },
      },
      {
        kind: "string",
        labels: ["Tom", "Bob", "Jim"],
        templates: {
          generateDescription: (value) => `${value}'s pet`,
        },
      },
    ];
    const solutionMatrix = generateSolutionMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].row.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].row.labels,
      );

      // columns are one of the label lists
      expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].column.labels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toContainEqual(
        solutionMatrix[key].column.labels,
      );

      // rows and columns are different
      expect(solutionMatrix[key].column.labels).not.toEqual(
        solutionMatrix[key].row.labels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].row.labels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].column.labels.length);
      }

      // every item in the grid is true or false
      solutionMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toEqual(expect.any(Boolean));
        });
      });

      // there is only one true per row
      for (const row of solutionMatrix[key].grid) {
        const trues = row.filter((i) => i);
        expect(trues.length).toBe(1);
      }

      // there is only one true per column
      for (
        let columnIndex = 0;
        columnIndex < solutionMatrix[key].grid[0].length;
        columnIndex++
      ) {
        const column = solutionMatrix[key].grid.map((row) => row[columnIndex]);
        const trues = column.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });
});

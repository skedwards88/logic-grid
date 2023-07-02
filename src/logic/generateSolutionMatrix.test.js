import {generateSolutionMatrix} from "./generateSolutionMatrix";

describe("generateSolutionMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          description: (value) => `the ${value}`,
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          description: (value) => `${value} years old`,
          diffGreaterDescription: (value) => `${value} years older`,
          diffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        labels: ["red", "orange", "blue"],
        descriptionTemplates: {
          description: (value) => `the ${value} animal`,
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
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // columns are one of the label lists
      const expectedColumns = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].columnLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedColumns);

      // rows and columns are different
      expect(solutionMatrix[key].columnLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].columnLabels.length);
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
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow", "horse", "spider"],
        descriptionTemplates: {
          description: (value) => `the ${value}`,
        },
      },
      {
        labels: [1, 2, 3, 4, 5],
        descriptionTemplates: {
          description: (value) => `${value} years old`,
          diffGreaterDescription: (value) => `${value} years older`,
          diffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        labels: ["red", "blue", "green", "orange", "yellow"],
        descriptionTemplates: {
          description: (value) => `the ${value} animal`,
        },
      },
      {
        labels: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        descriptionTemplates: {
          description: (value) => `${value}'s pet`,
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
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // columns are one of the label lists
      const expectedColumns = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].columnLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedColumns);

      // rows and columns are different
      expect(solutionMatrix[key].columnLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].columnLabels.length);
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
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          description: (value) => `the ${value}`,
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          description: (value) => `${value} years old`,
          diffGreaterDescription: (value) => `${value} years older`,
          diffLesserDescription: (value) => `${value} years younger`,
        },
      },
      {
        labels: ["red", "blue", "green"],
        descriptionTemplates: {
          description: (value) => `the ${value} animal`,
        },
      },
      {
        labels: ["Tom", "Bob", "Jim"],
        descriptionTemplates: {
          description: (value) => `${value}'s pet`,
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
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // columns are one of the label lists
      const expectedColumns = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].columnLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedColumns);

      // rows and columns are different
      expect(solutionMatrix[key].columnLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].columnLabels.length);
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

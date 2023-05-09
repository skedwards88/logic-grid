import {generateSolutionMatrix} from "./generateSolutionMatrix";

describe("generateSolutionMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          description: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          description: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "orange", "blue"],
        descriptionTemplates: {
          description: "the VALUE animal",
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

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

      // rows and cols are different
      expect(solutionMatrix[key].colLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].colLabels.length);
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
        let colIndex = 0;
        colIndex < solutionMatrix[key].grid[0].length;
        colIndex++
      ) {
        const col = solutionMatrix[key].grid.map((row) => row[colIndex]);
        const trues = col.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 5 items per)", () => {
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow", "horse", "spider"],
        descriptionTemplates: {
          description: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3, 4, 5],
        descriptionTemplates: {
          description: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "blue", "green", "orange", "yellow"],
        descriptionTemplates: {
          description: "the VALUE animal",
        },
      },
      {
        labels: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        descriptionTemplates: {
          description: "VALUE's pet",
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

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

      // rows and cols are different
      expect(solutionMatrix[key].colLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].colLabels.length);
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
        let colIndex = 0;
        colIndex < solutionMatrix[key].grid[0].length;
        colIndex++
      ) {
        const col = solutionMatrix[key].grid.map((row) => row[colIndex]);
        const trues = col.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 3 items per)", () => {
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          description: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          description: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "blue", "green"],
        descriptionTemplates: {
          description: "the VALUE animal",
        },
      },
      {
        labels: ["Tom", "Bob", "Jim"],
        descriptionTemplates: {
          description: "VALUE's pet",
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

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

      // rows and cols are different
      expect(solutionMatrix[key].colLabels).not.toEqual(
        solutionMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(solutionMatrix[key].grid.length).toBe(
        solutionMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of solutionMatrix[key].grid) {
        expect(row.length).toBe(solutionMatrix[key].colLabels.length);
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
        let colIndex = 0;
        colIndex < solutionMatrix[key].grid[0].length;
        colIndex++
      ) {
        const col = solutionMatrix[key].grid.map((row) => row[colIndex]);
        const trues = col.filter((i) => i);
        expect(trues.length).toBe(1);
      }
    }
  });
});

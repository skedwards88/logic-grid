import {generateSolutionMatrix} from "./generateSolutionMatrix";

describe("generateSolutionMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
    ];
    const solutionMatrix = generateSolutionMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

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
    const labels = [
      ["cat", "dog", "cow", "horse", "spider"],
      [1, 2, 3, 4, 5],
      ["red", "blue", "green", "orange", "yellow"],
      ["Tom", "Bob", "Jim", "Joe", "Abe"],
    ];
    const solutionMatrix = generateSolutionMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

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
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
      ["Tom", "Bob", "Jim"],
    ];
    const solutionMatrix = generateSolutionMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(solutionMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in solutionMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(solutionMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

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

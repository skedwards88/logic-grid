import {buildEmptyMatrix} from "./buildEmptyMatrix";

describe("buildEmptyMatrix", () => {
  test("given a list of category labels, generates a solution matrix (same number of categories and items per category)", () => {
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
    ];
    const emptyMatrix = buildEmptyMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

      // rows and cols are different
      expect(emptyMatrix[key].colLabels).not.toEqual(
        emptyMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(emptyMatrix[key].grid.length).toBe(
        emptyMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of emptyMatrix[key].grid) {
        expect(row.length).toBe(emptyMatrix[key].colLabels.length);
      }

      // every item in the grid is null
      emptyMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toBe(null);
        });
      });
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 5 items per)", () => {
    const labels = [
      ["cat", "dog", "cow", "horse", "spider"],
      [1, 2, 3, 4, 5],
      ["red", "blue", "green", "orange", "yellow"],
      ["Tom", "Bob", "Jim", "Joe", "Abe"],
    ];
    const emptyMatrix = buildEmptyMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

      // rows and cols are different
      expect(emptyMatrix[key].colLabels).not.toEqual(
        emptyMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(emptyMatrix[key].grid.length).toBe(
        emptyMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of emptyMatrix[key].grid) {
        expect(row.length).toBe(emptyMatrix[key].colLabels.length);
      }

      // every item in the grid is null
      emptyMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toBe(null);
        });
      });
    }
  });

  test("given a list of category labels, generates a solution matrix (4 categories, 3 items per)", () => {
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
      ["Tom", "Bob", "Jim"],
    ];
    const emptyMatrix = buildEmptyMatrix(labels);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labels.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labels).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labels).toEqual(expectedCols);

      // rows and cols are different
      expect(emptyMatrix[key].colLabels).not.toEqual(
        emptyMatrix[key].rowLabels,
      );

      // grid has expected number of rows
      expect(emptyMatrix[key].grid.length).toBe(
        emptyMatrix[key].rowLabels.length,
      );

      // grid rows have expected number of columns
      for (const row of emptyMatrix[key].grid) {
        expect(row.length).toBe(emptyMatrix[key].colLabels.length);
      }

      // every item in the grid is null
      emptyMatrix[key].grid.forEach((row) => {
        row.forEach((item) => {
          expect(item).toBe(null);
        });
      });
    }
  });
});

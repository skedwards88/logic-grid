import {buildEmptyMatrix} from "./buildEmptyMatrix";

describe("buildEmptyMatrix", () => {
  test("given a list of category labels and templates, generates a solution matrix (same number of categories and items per category)", () => {
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          leadingDescription: "The VALUE",
          trailingDescription: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          leadingDescription: "The VALUE year old animal",
          trailingDescription: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "orange", "blue"],
        descriptionTemplates: {
          leadingDescription: "The VALUE animal",
          trailingDescription: "the VALUE animal",
        },
      },
    ];
    const emptyMatrix = buildEmptyMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

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
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow", "horse", "spider"],
        descriptionTemplates: {
          leadingDescription: "The VALUE",
          trailingDescription: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3, 4, 5],
        descriptionTemplates: {
          leadingDescription: "The VALUE year old animal",
          trailingDescription: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "blue", "green", "orange", "yellow"],
        descriptionTemplates: {
          leadingDescription: "The VALUE animal",
          trailingDescription: "the VALUE animal",
        },
      },
      {
        labels: ["Tom", "Bob", "Jim", "Joe", "Abe"],
        descriptionTemplates: {
          leadingDescription: "VALUE's pet",
          trailingDescription: "VALUE's pet",
        },
      },
    ];
    const emptyMatrix = buildEmptyMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

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
    const labelsAndTemplates = [
      {
        labels: ["cat", "dog", "cow"],
        descriptionTemplates: {
          leadingDescription: "The VALUE",
          trailingDescription: "the VALUE",
        },
      },
      {
        labels: [1, 2, 3],
        descriptionTemplates: {
          leadingDescription: "The VALUE year old animal",
          trailingDescription: "VALUE years old",
          diffGreaterDescription: "VALUE years older",
          diffLesserDescription: "VALUE years younger",
        },
      },
      {
        labels: ["red", "blue", "green"],
        descriptionTemplates: {
          leadingDescription: "The VALUE animal",
          trailingDescription: "the VALUE animal",
        },
      },
      {
        labels: ["Tom", "Bob", "Jim"],
        descriptionTemplates: {
          leadingDescription: "VALUE's pet",
          trailingDescription: "VALUE's pet",
        },
      },
    ];

    const emptyMatrix = buildEmptyMatrix(labelsAndTemplates);

    // matrix has correct number of entries
    let expectedNumberOfKeys = 0;
    for (let n = labelsAndTemplates.length - 1; n > 0; n--) {
      expectedNumberOfKeys += n;
    }
    expect(Object.keys(emptyMatrix).length).toBe(expectedNumberOfKeys);

    for (const key in emptyMatrix) {
      // rows are one of the label lists
      const expectedRows = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].rowLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedRows);

      // cols are one of the label lists
      const expectedCols = expect.arrayContaining([
        expect.objectContaining(emptyMatrix[key].colLabels),
      ]);
      expect(labelsAndTemplates.map((i) => i.labels)).toEqual(expectedCols);

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

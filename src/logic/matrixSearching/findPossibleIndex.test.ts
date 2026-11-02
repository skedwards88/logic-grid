import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import type {
  MatrixGrids,
  MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {
  findFirstPossibleIndex,
  findLastPossibleIndex,
  findAllPossibleIndexes,
} from "./findPossibleIndex";

const matrixGrids: MatrixGrids = {
  "0v1": [
    [true, false, false, false],
    [null, null, null, null], // all null
    [false, false, true, false],
    [false, false, false, true],
  ],

  "0v3": [
    [false, true, false, null], // true before null
    [false, true, false, false], // true, no null
    [false, null, true, false], // null before true
    [false, false, false, true],
  ],

  "1v3": [
    [false, false, null, false], // null, no true
    [false, true, null, false],
    [false, false, null, false],
    [false, false, null, true],
  ],
};

const matrixLabels: MatrixLabels = {
  "0v1": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  "0v3": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  "1v3": {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("findFirstPossibleIndex", () => {
  test("returns the index of the first true or null (case where there is a true and no null)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is a null and no true)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: 1,
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(2);
  });

  test("returns the index of the first true or null (case where there is null before a true)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Fefe",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is true before a null)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Colin",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (swap column and row input)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "blue",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(0);
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "green",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(0);
  });

  test("returns undefined when there are no trues or nulls", () => {
    expect(
      findFirstPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "red",
        intersectingItems: ["Colin", "Sarah", "Fefe", "Meme"],
      }),
    ).toEqual(undefined);
  });
});

describe("findLastPossibleIndex", () => {
  test("returns the index of the last true or null (case where there is a true and no null)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(1);
  });

  test("returns the index of the last true or null (case where there is a null and no true)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: 1,
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is null before a true)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Fefe",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is true before a null)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Colin",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual(3);
  });

  test("returns the index of the last true or null (swap column and row input)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "blue",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(3);
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "green",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(3);
  });

  test("returns undefined when there are no trues or nulls", () => {
    expect(
      findLastPossibleIndex({
        matrixGrids,
        matrixLabels,
        item: "red",
        intersectingItems: ["Colin", "Sarah", "Fefe", "Meme"],
      }),
    ).toEqual(undefined);
  });
});

describe("findAllPossibleIndexes", () => {
  test("returns the index of the true when there is a single true", () => {
    expect(
      findAllPossibleIndexes({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual([1]);
  });

  test("returns the index of the first true when there are multiple trues", () => {
    expect(
      findAllPossibleIndexes({
        matrixGrids,
        matrixLabels,
        item: "blue",
        intersectingItems: ["Colin", "Sarah", "Fefe", "Meme"],
      }),
    ).toEqual([0]);
  });

  test("returns the index of the all nulls when there are no trues", () => {
    expect(
      findAllPossibleIndexes({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual([0, 1, 2, 3]);
  });

  test("returns an empty array when there are no trues or nulls", () => {
    expect(
      findAllPossibleIndexes({
        matrixGrids,
        matrixLabels,
        item: "red",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual([]);
  });
});

import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";
import {findMatrixValue} from "./findMatrixValue";

const matrixGrids: MatrixGrids = {
  "0v1": [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],

  "0v2": [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],

  "0v3": [
    [null, null, null, null],
    [null, null, false, null],
    [null, null, null, null],
    [null, null, null, null],
  ],

  "1v2": [
    [true, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  "1v3": [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],

  "2v3": [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
};

const matrixLabels: MatrixLabels = {
  "0v1": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  "0v2": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["fly", "back", "breast", "free"]),
  },
  "0v3": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  "1v2": {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["fly", "back", "breast", "free"]),
  },
  "1v3": {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  "2v3": {
    row: populateSparseTestEntryLabels(["fly", "back", "breast", "free"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("findMatrixValue", () => {
  test("finds the value that corresponds to the intersection of two items", () => {
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "Sarah",
        itemB: "green",
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "green",
        itemB: "Sarah",
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: 1,
        itemB: "fly",
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "fly",
        itemB: 1,
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "fly",
        itemB: "yellow",
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "yellow",
        itemB: "fly",
      }),
    ).toBe(null);
  });

  test("throws an error if the intersection is not found", () => {
    expect(() =>
      findMatrixValue({
        matrixGrids,
        matrixLabels,
        itemA: "dog",
        itemB: "Sarah",
      }),
    ).toThrow("Did not find matrix entry corresponding to dog vs Sarah");
  });
});

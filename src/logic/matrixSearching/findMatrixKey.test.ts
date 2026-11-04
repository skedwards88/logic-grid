import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";
import {findMatrixKey} from "./findMatrixKey";

const matrixGrids: MatrixGrids = {
  "0v1": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  "0v2": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  "0v3": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  "1v2": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  "1v3": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  "2v3": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
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

// Custom matcher to check if array includes one of the items, but not both
expect.extend({
  toIncludeOneOf(
    received: (string | number)[],
    item1: string | number,
    item2: string | number,
  ) {
    const item1Found = received.includes(item1);
    const item2Found = received.includes(item2);

    if (item1Found && !item2Found) {
      return {
        message: (): string =>
          `expected array to include only one of ${item1} or ${item2}`,
        pass: true,
      };
    }

    if (!item1Found && item2Found) {
      return {
        message: (): string =>
          `expected array to include only one of ${item1} or ${item2}`,
        pass: true,
      };
    }

    return {
      message: (): string =>
        `expected array to include only one of ${item1} or ${item2}, but found ${
          item1Found ? item1 : ""
        } ${item2Found ? item2 : ""}`,
      pass: false,
    };
  },
});

describe("findMatrixKey", () => {
  test("finds the matrix entry that corresponds to the intersection of two items", () => {
    const foundKey = findMatrixKey({
      matrixGrids,
      matrixLabels,
      itemA: "Sarah",
      itemB: "green",
    });
    expect(foundKey).toEqual("0v3");
    expect(matrixLabels[foundKey].row.values).toIncludeOneOf("Sarah", "green");
    expect(matrixLabels[foundKey].column.values).toIncludeOneOf(
      "Sarah",
      "green",
    );
  });

  test("finds the matrix entry that corresponds to the intersection of two items (opposite order)", () => {
    const foundKey = findMatrixKey({
      matrixGrids,
      matrixLabels,
      itemA: "green",
      itemB: "Sarah",
    });
    expect(foundKey).toEqual("0v3");
    expect(matrixLabels[foundKey].row.values).toIncludeOneOf("green", "Sarah");
    expect(matrixLabels[foundKey].column.values).toIncludeOneOf(
      "green",
      "Sarah",
    );
  });

  test("throws an error if the key is not found", () => {
    expect(() =>
      findMatrixKey({
        matrixGrids,
        matrixLabels,
        itemA: "dog",
        itemB: "Sarah",
      }),
    ).toThrow("Did not find matrix entry corresponding to dog vs Sarah");
  });
});

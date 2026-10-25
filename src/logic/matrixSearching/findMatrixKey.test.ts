import {populateSparseTestEntry} from "../helpers/testHelpers";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";
import {findMatrixKey} from "./findMatrixKey";

const matrix: PuzzleMatrix = {
  "0v1": {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v2": {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v3": {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "1v2": {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "1v3": {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "2v3": {
    row: populateSparseTestEntry(["fly", "back", "breast", "free"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
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
    const foundKey = findMatrixKey(matrix, "Sarah", "green");
    expect(foundKey).toEqual("0v3");
    expect(matrix[foundKey].row.labels).toIncludeOneOf("Sarah", "green");
    expect(matrix[foundKey].column.labels).toIncludeOneOf("Sarah", "green");
  });

  test("finds the matrix entry that corresponds to the intersection of two items (opposite order)", () => {
    const foundKey = findMatrixKey(matrix, "green", "Sarah");
    expect(foundKey).toEqual("0v3");
    expect(matrix[foundKey].row.labels).toIncludeOneOf("green", "Sarah");
    expect(matrix[foundKey].column.labels).toIncludeOneOf("green", "Sarah");
  });

  test("throws an error if the key is not found", () => {
    expect(() => findMatrixKey(matrix, "dog", "Sarah")).toThrow(
      "Did not find matrix entry corresponding to dog vs Sarah",
    );
  });
});

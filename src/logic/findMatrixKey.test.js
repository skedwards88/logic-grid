import {findMatrixKey} from "./findMatrixKey.js";

const matrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "1v2": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "2v3": {
    rowLabels: ["fly", "back", "breast", "free"],
    colLabels: ["red", "blue", "green", "yellow"],
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
  toIncludeOneOf(received, item1, item2) {
    const item1Found = received.includes(item1);
    const item2Found = received.includes(item2);

    if (item1Found && !item2Found) {
      return {
        message: () =>
          `expected array to include only one of ${item1} or ${item2}`,
        pass: true,
      };
    }

    if (!item1Found && item2Found) {
      return {
        message: () =>
          `expected array to include only one of ${item1} or ${item2}`,
        pass: true,
      };
    }

    return {
      message: () =>
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
    expect(matrix[foundKey].rowLabels).toIncludeOneOf("Sarah", "green");
    expect(matrix[foundKey].colLabels).toIncludeOneOf("Sarah", "green");
  });

  test("finds the matrix entry that corresponds to the intersection of two items (opposite order)", () => {
    const foundKey = findMatrixKey(matrix, "green", "Sarah");
    expect(foundKey).toEqual("0v3");
    expect(matrix[foundKey].rowLabels).toIncludeOneOf("green", "Sarah");
    expect(matrix[foundKey].colLabels).toIncludeOneOf("green", "Sarah");
  });

  test("throws an error if the key is not found", () => {
    expect(() => findMatrixKey(matrix, "dog", "Sarah")).toThrow(
      "Did not find matrix entry corresponding to dog vs Sarah",
    );
  });
});

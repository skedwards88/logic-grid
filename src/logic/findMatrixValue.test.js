import {findMatrixValue} from "./findMatrixValue.js";

const matrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "1v2": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "2v3": {
    rowLabels: ["fly", "back", "breast", "free"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};

describe("findMatrixValue", () => {
  test("finds the value that corresponds to the intersection of two items", () => {
    expect(findMatrixValue(matrix, "Sarah", "green")).toBe(false);
    expect(findMatrixValue(matrix, "green", "Sarah")).toBe(false);
    expect(findMatrixValue(matrix, 1, "fly")).toBe(true);
    expect(findMatrixValue(matrix, "fly", 1)).toBe(true);
    expect(findMatrixValue(matrix, "fly", "yellow")).toBe(null);
    expect(findMatrixValue(matrix, "yellow", "fly")).toBe(null);
  });

  test("throws an error if the intersection is not found", () => {
    expect(() => findMatrixValue(matrix, "dog", "Sarah")).toThrow(
      "Did not find matrix entry corresponding to dog vs Sarah",
    );
  });
});

import {populateSparseTestEntry} from "../helpers/testHelpers";
import {matrixesEqualQ} from "./matrixesEqualQ";

const matrixA = {
  "0v1": {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [true, false, false, false],
      [false, null, false, null],
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
};

describe("matrixesEqualQ", () => {
  test("returns true if the inputs are the same object", () => {
    expect(matrixesEqualQ(matrixA, matrixA)).toBe(true);
  });

  test("returns true if the all the grids in the matrix are the same (does not check other row/column labels)", () => {
    const matrixB = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, null],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const matrixC = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "red", "green"]),
        grid: [
          [true, false, false, null],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    expect(matrixesEqualQ(matrixC, matrixB)).toBe(true);
  });

  test("returns false if the any grids in the matrix are not the same", () => {
    const matrixB = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, null],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const matrixC = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, null],
          [false, true, null, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    expect(matrixesEqualQ(matrixC, matrixB)).toBe(false);
  });

  test("throws an error if a inputs are not objects", () => {
    const gridB = true;

    // @ts-expect-error intentionally testing invalid input
    expect(() => matrixesEqualQ(matrixA, gridB)).toThrow(
      "matrixesEqualQ: Inputs are not objects",
    );
  });

  test("throws an error if a inputs have different number of keys", () => {
    const matrixB = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    expect(() => matrixesEqualQ(matrixA, matrixB)).toThrow(
      "matrixesEqualQ: Inputs do not have the same number of keys",
    );
  });

  test("throws an error if a inputs have different keys", () => {
    const matrixB = {
      ...matrixA,
      "0v3": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const matrixC = {
      ...matrixA,
      "0v4": {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["fly", "back", "breast", "free"]),
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    expect(() => matrixesEqualQ(matrixC, matrixB)).toThrow(
      "matrixesEqualQ: Inputs have different keys",
    );
  });
});

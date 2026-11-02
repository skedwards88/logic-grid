import {matrixesEqualQ} from "./matrixesEqualQ";

const matrixGridsA = {
  "0v1": [
    [true, false, false, false],
    [false, null, false, null],
    [false, false, true, false],
    [false, false, false, true],
  ],
  "0v2": [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],
};

describe("matrixesEqualQ", () => {
  test("returns true if the inputs are the same object", () => {
    expect(matrixesEqualQ(matrixGridsA, matrixGridsA)).toBe(true);
  });

  test("returns true if the all the grids in the matrix are the same (does not check other row/column labels)", () => {
    const matrixGridsB = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, null],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };
    const matrixC = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, null],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };
    expect(matrixesEqualQ(matrixC, matrixGridsB)).toBe(true);
  });

  test("returns false if the any grids in the matrix are not the same", () => {
    const matrixB = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, null],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };
    const matrixC = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, null],
        [false, true, null, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };
    expect(matrixesEqualQ(matrixC, matrixB)).toBe(false);
  });

  test("throws an error if a inputs are not objects", () => {
    const gridB = true;

    // @ts-expect-error intentionally testing invalid input
    expect(() => matrixesEqualQ(matrixGridsA, gridB)).toThrow(
      "matrixesEqualQ: Inputs are not objects",
    );
  });

  test("throws an error if a inputs have different number of keys", () => {
    const matrixB = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };

    expect(() => matrixesEqualQ(matrixGridsA, matrixB)).toThrow(
      "matrixesEqualQ: Inputs do not have the same number of keys",
    );
  });

  test("throws an error if a inputs have different keys", () => {
    const matrixB = {
      ...matrixGridsA,
      "0v3": [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };
    const matrixC = {
      ...matrixGridsA,
      "0v4": [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };

    expect(() => matrixesEqualQ(matrixC, matrixB)).toThrow(
      "matrixesEqualQ: Inputs have different keys",
    );
  });
});

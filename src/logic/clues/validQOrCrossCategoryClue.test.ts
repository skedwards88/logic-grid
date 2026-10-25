import cloneDeep from "lodash.clonedeep";
import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue";
import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {populateSparseTestEntry} from "../helpers/testHelpers";

const completeMatrix = {
  NameVsNumber: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [true, false, false, false],
      [null, false, true, false],
      [false, true, false, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [false, true, false, false],
      [null, false, false, false],
      [false, false, false, true],
      [false, false, true, null],
    ],
  },
  NumberVsColor: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [false, true, false, false],
      [false, false, false, true],
      [false, false, true, false],
      [true, false, false, false],
    ],
  },
};

describe("validQOrCrossCategoryClue, non-strict", () => {
  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 4];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["blue", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if both 'or's are null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);

    expect(validQ).toBe(true);
  });

  test("returns true if one 'or' is null and one is false", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 2];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [1, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [3, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 3];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = cloneDeep(completeMatrix);
    validQOrCrossCategoryClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        orItems: ["blue", 2],
      },
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

describe("validQOrCrossCategoryClue, strict", () => {
  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 4];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["blue", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or's are null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);

    expect(validQ).toBe(false);
  });

  test("returns false if one 'or' is null and one is false", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 2];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(false);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [1, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [3, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 3];
    const validQ = validQOrCrossCategoryClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = cloneDeep(completeMatrix);
    validQOrCrossCategoryClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        orItems: ["blue", 2],
      },
      strict: true,
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

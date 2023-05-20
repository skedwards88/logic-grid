import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue";
import {findMatrixValue} from "../helpers/findMatrixValue";

const completeMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [null, false, true, false],
      [false, true, false, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, false],
      [null, false, false, false],
      [false, false, false, true],
      [false, false, true, null],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
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
    const orItems = ["red", 4];
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
    const orItems = ["blue", 1];
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
    const orItems = ["red", 1];
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
    const orItems = ["red", 2];
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
    const orItems = [1, "red"];
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
    const orItems = [3, "red"];
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
    const orItems = ["red", 1];
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
    const orItems = ["red", 3];
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
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
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
    const orItems = ["red", 4];
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
    const orItems = ["blue", 1];
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
    const orItems = ["red", 1];
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
    const orItems = ["red", 2];
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
    const orItems = [1, "red"];
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
    const orItems = ["red", 1];
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
    const orItems = [3, "red"];
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
    const orItems = ["red", 3];
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
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
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

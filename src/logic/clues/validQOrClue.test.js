import {validQOrClue} from "./validQOrClue";
import {findMatrixValue} from "../helpers/findMatrixValue";

const completeMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, true, false],
      [false, true, null, null],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, false],
      [true, false, false, false],
      [false, false, false, true],
      [null, null, null, false],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, false],
      [false, false, false, true],
      [true, false, false, false],
      [false, false, true, false],
    ],
  },
};

describe("validQOrClue, strict", () => {
  test("returns false if the item is any of the non-'or' items", () => {
    const itemA = "Colin";
    const orItems = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, allItems[0])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Sarah";
    const orItems = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or's are null", () => {
    const itemA = "Meme";
    const orItems = ["blue", "green"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);

    expect(validQ).toBe(false);
  });

  test("returns false if one 'or' is null and one is false", () => {
    const itemA = "Meme";
    const orItems = ["blue", "yellow"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(false);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems = [1, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "red";
    const orItems = [4, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems = [3, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
    validQOrClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        orItems: ["red", "blue", "green", "yellow"],
        allItems: [],
      },
      strict: true,
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

describe("validQOrClue, non-strict", () => {
  test("returns false if the item is any of the non-'or' items", () => {
    const itemA = "Colin";
    const orItems = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, allItems[0])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Sarah";
    const orItems = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if both 'or's are null", () => {
    const itemA = "Meme";
    const orItems = ["blue", "green"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);

    expect(validQ).toBe(true);
  });

  test("returns true if one 'or' is null and one is false", () => {
    const itemA = "Meme";
    const orItems = ["blue", "yellow"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems = [1, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(true);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "red";
    const orItems = [4, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(false);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems = [3, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        orItems,
        allItems,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, orItems[0])).toBe(null);
    expect(findMatrixValue(completeMatrix, itemA, orItems[1])).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
    validQOrClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        orItems: ["red", "blue", "green", "yellow"],
        allItems: [],
      },
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

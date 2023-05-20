import {validQNotClue} from "./validQNotClue";
import {findMatrixValue} from "../helpers/findMatrixValue";

const completeMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, false, true, false],
      [false, true, false, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, false],
      [true, false, false, false],
      [false, false, false, true],
      [false, false, true, false],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, false],
      [false, false, false, true],
      [true, false, false, false],
      [false, false, true, false],
    ],
  },
};

const sparseMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};

describe("validQNotClue, strict", () => {
  test("returns false if the intersection is true", () => {
    const itemA = "Colin";
    const itemB = "blue";
    const validQ = validQNotClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, itemB)).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if the intersection is false", () => {
    const itemA = "Colin";
    const itemB = "red";
    const validQ = validQNotClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(findMatrixValue(completeMatrix, itemA, itemB)).toBe(false);
    expect(validQ).toBe(true);
  });

  test("returns false if the intersection is null", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrix: sparseMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(findMatrixValue(sparseMatrix, itemA, itemB)).toBe(null);
    expect(validQ).toBe(false);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
    validQNotClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        itemB: "red",
      },
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

describe("validQNotClue, not strict", () => {
  test("returns false if the intersection is true", () => {
    const itemA = "Colin";
    const itemB = "blue";
    const validQ = validQNotClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, itemB)).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if the intersection is false", () => {
    const itemA = "Colin";
    const itemB = "red";
    const validQ = validQNotClue({
      matrix: completeMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(findMatrixValue(completeMatrix, itemA, itemB)).toBe(false);
    expect(validQ).toBe(true);
  });

  test("returns true if the intersection is null", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrix: sparseMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(findMatrixValue(sparseMatrix, itemA, itemB)).toBe(null);
    expect(validQ).toBe(true);
  });

  test("strict can be explicitly set", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrix: sparseMatrix,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: false,
    });

    expect(findMatrixValue(sparseMatrix, itemA, itemB)).toBe(null);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(completeMatrix));
    validQNotClue({
      matrix: matrixCopy,
      clueParameters: {
        itemA: "Colin",
        itemB: "red",
      },
    });
    expect(matrixCopy).toEqual(completeMatrix);
  });
});

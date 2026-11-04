import {validQNotClue} from "./validQNotClue";
import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";

const matrixLabels: MatrixLabels = {
  NameVsNumber: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  NumberVsColor: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

const completeMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [true, false, false, false],
    [false, false, true, false],
    [false, true, false, false],
    [false, false, false, true],
  ],
  NameVsColor: [
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [false, false, true, false],
  ],
  NumberVsColor: [
    [false, true, false, false],
    [false, false, false, true],
    [true, false, false, false],
    [false, false, true, false],
  ],
};

const sparseMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [true, false, false, false],
    [false, null, null, null],
    [false, null, null, null],
    [false, null, null, null],
  ],
  NameVsColor: [
    [false, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  NumberVsColor: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
};

describe("validQNotClue, strict", () => {
  test("returns false if the intersection is true", () => {
    const itemA = "Colin";
    const itemB = "blue";
    const validQ = validQNotClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if the intersection is false", () => {
    const itemA = "Colin";
    const itemB = "red";
    const validQ = validQNotClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(false);
    expect(validQ).toBe(true);
  });

  test("returns false if the intersection is null", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrixGrids: sparseMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: sparseMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(null);
    expect(validQ).toBe(false);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixGridsCopy = structuredClone(completeMatrixGrids);
    validQNotClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        itemB: "red",
      },
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

describe("validQNotClue, not strict", () => {
  test("returns false if the intersection is true", () => {
    const itemA = "Colin";
    const itemB = "blue";
    const validQ = validQNotClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if the intersection is false", () => {
    const itemA = "Colin";
    const itemB = "red";
    const validQ = validQNotClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(false);
    expect(validQ).toBe(true);
  });

  test("returns true if the intersection is null", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrixGrids: sparseMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: sparseMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(null);
    expect(validQ).toBe(true);
  });

  test("strict can be explicitly set", () => {
    const itemA = 1;
    const itemB = "red";
    const validQ = validQNotClue({
      matrixGrids: sparseMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        itemB,
      },
      strict: false,
    });

    expect(
      findMatrixValue({
        matrixGrids: sparseMatrixGrids,
        matrixLabels,
        itemA,
        itemB,
      }),
    ).toBe(null);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixGridsCopy = structuredClone(completeMatrixGrids);
    validQNotClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        itemB: "red",
      },
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

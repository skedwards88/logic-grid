import cloneDeep from "lodash.clonedeep";
import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {populateSparseTestEntry} from "../helpers/testHelpers";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

const emptyMatrix: PuzzleMatrix = {
  NameVsNumber: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsColor: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  ColorVsNumber: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};

describe("applyNumericComparisonLogic", () => {
  test('applies a "numeric comparison" clue (clue diff undefined, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: undefined,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 1, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 1,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 2,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know greater value)', () => {
    const inputMatrix = {
      ...emptyMatrix,
      ColorVsNumber: {
        row: populateSparseTestEntry([1, 2, 3, 4]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [false, true, false, false],
          [null, false, null, null],
        ],
      },
    };
    const newDerivedMatrix = applyNumericComparisonLogic(inputMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 2,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, true, false, false],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrix = {
      ...emptyMatrix,
      ColorVsNumber: {
        row: populateSparseTestEntry([1, 2, 3, 4]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ],
      },
    };
    const newDerivedMatrix = applyNumericComparisonLogic(inputMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 2,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, true, false, false],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 0.2, actual diff 0.2)', () => {
    const emptyMatrixWithDecimals = {
      NameVsNumber: {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry([3.5, 3.6, 3.7, 3.8]),
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NameVsColor: {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      ColorVsNumber: {
        row: populateSparseTestEntry([3.5, 3.6, 3.7, 3.8]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const newDerivedMatrix = applyNumericComparisonLogic(
      emptyMatrixWithDecimals,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [3.5, 3.6, 3.7, 3.8],
        actualNumericDiff: 0.2,
        numericDiffClue: 0.2,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = cloneDeep(emptyMatrix);
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 1,
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

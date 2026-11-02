import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";

const emptyMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  NameVsColor: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  ColorVsNumber: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
};

const matrixLabels: MatrixLabels = {
  NameVsNumber: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  ColorVsNumber: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("applyNumericComparisonLogic", () => {
  test('applies a "numeric comparison" clue (clue diff undefined, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: undefined,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 1, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 1,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know greater value)', () => {
    const inputMatrixGrids = {
      ...emptyMatrixGrids,
      ColorVsNumber: [
        [null, false, null, null],
        [null, false, null, null],
        [false, true, false, false],
        [null, false, null, null],
      ],
    };

    const inputMatrixLabels = {
      ...matrixLabels,
      ColorVsNumber: {
        row: populateSparseTestEntryLabels([1, 2, 3, 4]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
    };

    const newMatrixGrids = applyNumericComparisonLogic(
      inputMatrixGrids,
      inputMatrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, true, false, false],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrixGrids = {
      ...emptyMatrixGrids,
      ColorVsNumber: [
        [true, false, false, false],
        [false, null, null, null],
        [false, null, null, null],
        [false, null, null, null],
      ],
    };

    const inputMatrixLabels = {
      ...matrixLabels,
      ColorVsNumber: {
        row: populateSparseTestEntryLabels([1, 2, 3, 4]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
    };

    const newMatrixGrids = applyNumericComparisonLogic(
      inputMatrixGrids,
      inputMatrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, true, false, false],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (clue diff 0.2, actual diff 0.2)', () => {
    const matrixLabelsWithDecimels = {
      NameVsNumber: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([3.5, 3.6, 3.7, 3.8]),
      },
      NameVsColor: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
      ColorVsNumber: {
        row: populateSparseTestEntryLabels([3.5, 3.6, 3.7, 3.8]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
    };
    const newMatrixGrids = applyNumericComparisonLogic(
      emptyMatrixGrids,
      matrixLabelsWithDecimels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [3.5, 3.6, 3.7, 3.8],
        actualNumericDiff: 0.2,
        numericDiffClue: 0.2,
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = structuredClone(emptyMatrixGrids);
    const newMatrixGrids = applyNumericComparisonLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "red",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 1,
      },
    );
    expect(matrixCopy).toEqual(emptyMatrixGrids);
    expect(matrixCopy).not.toEqual(newMatrixGrids);
  });
});

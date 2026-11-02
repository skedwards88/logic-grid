import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";

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

describe("applyNumericComparisonCrossCategoryLogic", () => {
  test('applies a "numeric comparison" clue (diff undefined, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: undefined,
      },
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, null, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (diff 1, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 1,
      },
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, null, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2)', () => {
    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, false, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, false, null, null],
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know greater value)', () => {
    const inputMatrixGrids: MatrixGrids = {
      ...emptyMatrixGrids,
      ColorVsNumber: [
        [null, false, null, null],
        [null, false, null, null],
        [false, true, false, false],
        [null, false, null, null],
      ],
    };

    const inputMatrixLabels: MatrixLabels = {
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

    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      inputMatrixGrids,
      inputMatrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [true, false, false, false],
        [false, null, null, null],
        [false, null, null, null],
        [false, null, null, null],
      ],
      NameVsColor: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(inputMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(inputMatrixGrids[key]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrixGrids: MatrixGrids = {
      ...emptyMatrixGrids,
      NameVsNumber: [
        [false, true, false, false],
        [null, false, null, null],
        [null, false, null, null],
        [null, false, null, null],
      ],
    };

    const inputMatrixLabels: MatrixLabels = {
      ...matrixLabels,
      NameVsNumber: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([1, 2, 3, 4]),
      },
    };

    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      inputMatrixGrids,
      inputMatrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 2,
      },
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsColor: [
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, false, null, null],
        [null, false, null, null],
        [null, false, null, null],
        [false, true, false, false],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(inputMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(inputMatrixGrids[key]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixGridsCopy = structuredClone(emptyMatrixGrids);
    const newMatrixGrids = applyNumericComparisonCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 1,
      },
    );
    expect(matrixGridsCopy).toEqual(emptyMatrixGrids);
    expect(matrixGridsCopy).not.toEqual(newMatrixGrids);
  });
});

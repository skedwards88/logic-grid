import cloneDeep from "lodash.clonedeep";
import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";
import {addTemplatesForTestMatrix} from "../helpers/addTemplatesForTestMatrix";

const emptyMatrix = addTemplatesForTestMatrix({
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  ColorVsNumber: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
});

describe("applyNumericComparisonCrossCategoryLogic", () => {
  test('applies a "numeric comparison" clue (diff undefined, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      emptyMatrix,
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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (diff 1, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      emptyMatrix,
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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      emptyMatrix,
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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know greater value)', () => {
    const inputMatrix = addTemplatesForTestMatrix({
      ...emptyMatrix,
      ColorVsNumber: {
        rowLabels: [1, 2, 3, 4],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [false, true, false, false],
          [null, false, null, null],
        ],
      },
    });

    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      inputMatrix,
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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        inputMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrix = addTemplatesForTestMatrix({
      ...emptyMatrix,
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        columnLabels: [1, 2, 3, 4],
        grid: [
          [false, true, false, false],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
    });

    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      inputMatrix,
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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        inputMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = cloneDeep(emptyMatrix);
    const newDerivedMatrix = applyNumericComparisonCrossCategoryLogic(
      emptyMatrix,
      {
        greaterItem: "blue",
        lesserItem: "Colin",
        numericLabels: [1, 2, 3, 4],
        actualNumericDiff: 2,
        numericDiffClue: 1,
      },
    );
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

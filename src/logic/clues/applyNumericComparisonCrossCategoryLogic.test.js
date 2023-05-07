import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";

const emptyMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  ColorVsNumber: {
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

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
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

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
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

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(emptyMatrix));
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

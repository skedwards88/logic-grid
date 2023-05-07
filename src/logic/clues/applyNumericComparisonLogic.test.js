import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";

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

describe("applyNumericComparisonLogic", () => {
  test('applies a "numeric comparison" clue (diff undefined, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: undefined,
    });
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(expectedGrid);
  });

  test('applies a "numeric comparison" clue (diff 1, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 1,
    });
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(expectedGrid);
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 2,
    });
    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(expectedGrid);
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(emptyMatrix));
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

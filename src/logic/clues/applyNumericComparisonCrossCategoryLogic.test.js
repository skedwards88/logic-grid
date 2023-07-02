import {applyNumericComparisonCrossCategoryLogic} from "./applyNumericComparisonCrossCategoryLogic";

const emptyMatrix = {
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

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know greater value)', () => {
    const inputMatrix = {
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
    };
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

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test('applies a "numeric comparison" clue (diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrix = {
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
    };
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

    for (const key in newDerivedMatrix) {
      if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [false, true, false, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
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

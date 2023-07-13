import {applyNumericComparisonLogic} from "./applyNumericComparisonLogic";

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

describe("applyNumericComparisonLogic", () => {
  test('applies a "numeric comparison" clue (clue diff undefined, actual diff 2)', () => {
    const newDerivedMatrix = applyNumericComparisonLogic(emptyMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: undefined,
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know greater value)', () => {
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
    const newDerivedMatrix = applyNumericComparisonLogic(inputMatrix, {
      greaterItem: "blue",
      lesserItem: "red",
      numericLabels: [1, 2, 3, 4],
      actualNumericDiff: 2,
      numericDiffClue: 2,
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, false, null, null],
          [false, true, false, false],
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a "numeric comparison" clue (clue diff 2, actual diff 2, know lesser value)', () => {
    const inputMatrix = {
      ...emptyMatrix,
      ColorVsNumber: {
        rowLabels: [1, 2, 3, 4],
        columnLabels: ["red", "blue", "green", "yellow"],
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

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, false, null, null],
          [false, true, false, false],
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a "numeric comparison" clue (clue diff 0.2, actual diff 0.2)', () => {
    const emptyMatrixWithDecimals = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        columnLabels: [3.5, 3.6, 3.7, 3.8],
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
        rowLabels: [3.5, 3.6, 3.7, 3.8],
        columnLabels: ["red", "blue", "green", "yellow"],
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

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrixWithDecimals[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

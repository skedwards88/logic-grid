import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic";

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

describe("applyOrCrossCategoryLogic", () => {
  test('applies a cross category "or" clue when you know nothing about the matrix', () => {
    const newDerivedMatrix = applyOrCrossCategoryLogic(emptyMatrix, {
      itemA: "Colin",
      itemB: "blue",
      itemC: 3,
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a cross category "or" clue when know that itemA is itemB', () => {
    let partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix.NameVsColor.grid = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      itemB: "blue",
      itemC: 3,
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a cross category "or" clue when know that itemA is itemC', () => {
    let partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix.NameVsColor.grid = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      itemB: 3,
      itemC: "blue",
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemB', () => {
    let partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix.NameVsColor.grid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      itemB: "blue",
      itemC: 3,
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [false, false, true, false],
          [null, null, false, null],
          [null, null, false, null],
          [null, null, false, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemC', () => {
    let partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix.NameVsColor.grid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      itemB: 3,
      itemC: "blue",
    });

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [false, false, true, false],
          [null, null, false, null],
          [null, null, false, null],
          [null, null, false, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const newDerivedMatrix = applyOrCrossCategoryLogic(emptyMatrix, {
      itemA: "Colin",
      itemB: "blue",
      itemC: 3,
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

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
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    colDescriptionTemplates: {
      description: "VALUE years old",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
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
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    colDescriptionTemplates: {
      description: "the VALUE car",
    },
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
    colDescriptionTemplates: {
      description: "the VALUE car",
    },
    rowDescriptionTemplates: {
      description: "VALUE years old",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
};

describe("applyOrCrossCategoryLogic", () => {
  test('applies a cross category "or" clue', () => {
    const newDerivedMatrix = applyOrCrossCategoryLogic(emptyMatrix, {
      itemA: "Colin",
      itemB: "blue",
      itemC: 3,
    });
    const expectedGrid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
      [null, null, null, null],
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

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual([
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      partiallySolvedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      partiallySolvedMatrix["ColorVsNumber"]["grid"],
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
      [null, null, null, null],
    ]);
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

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual([
      [false, false, true, false],
      [null, null, false, null],
      [null, null, false, null],
      [null, null, false, null],
    ]);

    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      partiallySolvedMatrix["NameVsColor"]["grid"],
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
      [null, null, null, null],
    ]);
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

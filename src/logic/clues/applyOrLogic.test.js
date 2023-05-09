import {applyOrLogic} from "./applyOrLogic";

const emptyMatrix = {
  "0v1": {
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
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
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
      description: "the VALUE",
    },
  },
  "0v3": {
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
  "1v2": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    colDescriptionTemplates: {
      description: "the VALUE",
    },
    rowDescriptionTemplates: {
      description: "VALUE years old",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
  "1v3": {
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
  "2v3": {
    rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    rowDescriptionTemplates: {
      description: "the VALUE",
    },
    colDescriptionTemplates: {
      description: "the VALUE car",
    },
  },
};

describe("applyOrLogic", () => {
  test('applies an "or" clue', () => {
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      notItems: ["Sarah", "Colin"],
      itemB: "blue",
    });
    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["0v2"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["0v3"]["grid"]).not.toEqual(
      emptyMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v2"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["2v3"]["grid"]).toEqual(emptyMatrix["2v3"]["grid"]);

    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(expectedGrid);
  });

  test('applies an "or" clue (string and number)', () => {
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      notItems: [1, 4],
      itemB: "blue",
    });
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
    ];
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["0v2"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["1v2"]["grid"]).toEqual(emptyMatrix["0v1"]["grid"]);
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["2v3"]["grid"]).toEqual(emptyMatrix["2v3"]["grid"]);

    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      notItems: ["Sarah", "Colin"],
      itemB: "blue",
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

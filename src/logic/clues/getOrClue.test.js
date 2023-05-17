import {getOrClue} from "./getOrClue";
import * as pickRandomModule from "../helpers/pickRandom";
import {applyClueLogic} from "./applyClueLogic";

const solutionMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
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
  NameVsMake: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    colDescriptionTemplates: {
      description: "the VALUE",
    },
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    colDescriptionTemplates: {
      description: "the VALUE car",
    },
  },
  NumberVsMake: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
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
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
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
  MakeVsColor: {
    rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: "the VALUE",
    },
    colDescriptionTemplates: {
      description: "the VALUE car",
    },
  },
};

let emptyMatrix = JSON.parse(JSON.stringify(solutionMatrix));
for (const key in emptyMatrix) {
  emptyMatrix[key].grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
}

describe("getOrClue", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns an "or" clue for a given solution matrix (using mocked values)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce("MakeVsColor") // solutionKey
      .mockReturnValueOnce(1); // colIndex (corresponds to 'blue')
    jest.spyOn(pickRandomModule, "pickRandomIndex").mockReturnValueOnce(0); // rowIndex (corresponds to 'Ford')

    const expectedClue = "The Ford is either the red car or the blue car.";
    const clue = getOrClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);
    expect(pickRandomModule.pickRandomIndex).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "MakeVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getOrClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("or");
    ["itemA", "orItems", "allItems"].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
    expect(clue.clueParameters.orItems.length).toBe(2);
    expect(clue.clueParameters.allItems.length).toBe(4);
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    getOrClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const clue = getOrClue(solutionMatrix);
    const newDerived = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

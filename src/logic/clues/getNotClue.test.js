import cloneDeep from "lodash.clonedeep";
import {getNotClue} from "./getNotClue";
import * as pickRandomModule from "../helpers/pickRandom";
import {applyClueLogic} from "./applyClueLogic";

const solutionMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: (value) => `${value}'s car`,
    },
    columnDescriptionTemplates: {
      description: (value) => `${value} years old`,
      diffGreaterDescription: (value) => `${value} years older`,
      diffLesserDescription: (value) => `${value} years younger`,
    },
  },
  NameVsMake: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: (value) => `${value}'s car`,
    },
    columnDescriptionTemplates: {
      description: (value) => `the ${value}`,
    },
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: (value) => `${value}'s car`,
    },
    columnDescriptionTemplates: {
      description: (value) => `the ${value} car`,
    },
  },
  NumberVsMake: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    columnDescriptionTemplates: {
      description: (value) => `the ${value}`,
    },
    rowDescriptionTemplates: {
      description: (value) => `${value} years old`,
      diffGreaterDescription: (value) => `${value} years older`,
      diffLesserDescription: (value) => `${value} years younger`,
    },
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    columnDescriptionTemplates: {
      description: (value) => `the ${value} car`,
    },
    rowDescriptionTemplates: {
      description: (value) => `${value} years old`,
      diffGreaterDescription: (value) => `${value} years older`,
      diffLesserDescription: (value) => `${value} years younger`,
    },
  },
  MakeVsColor: {
    rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      description: (value) => `the ${value}`,
    },
    columnDescriptionTemplates: {
      description: (value) => `the ${value} car`,
    },
  },
};

let emptyMatrix = cloneDeep(solutionMatrix);
for (const key in emptyMatrix) {
  emptyMatrix[key].grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
}

describe("getNotClue", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns a "not" clue for a given solution matrix (using mocked values)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce("MakeVsColor") // solutionKey
      .mockReturnValueOnce(1); // columnIndex (corresponds to 'blue')
    jest.spyOn(pickRandomModule, "pickRandomIndex").mockReturnValueOnce(0); // rowIndex (corresponds to 'Ford')

    const expectedClue = [
      "The Ford is not the blue car.",
      "The blue car is not the Ford.",
    ];
    const clue = getNotClue(solutionMatrix);
    expect(expectedClue).toContain(clue.writtenClue);

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

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNotClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("not");
    ["itemA", "itemB"].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = cloneDeep(solutionMatrix);
    getNotClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNotClue(solutionMatrix);
    const newDerived = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

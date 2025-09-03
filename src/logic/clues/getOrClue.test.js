jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual("@skedwards88/word_logic");
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomIndexFromArray: jest.fn(actual.pickRandomIndexFromArray),
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
  };
});

import {
  pickRandomIndexFromArray,
  pickRandomItemFromArray,
} from "@skedwards88/word_logic";

import cloneDeep from "lodash.clonedeep";
import {getOrClue} from "./getOrClue";
import {applyClueLogic} from "./applyClueLogic";

afterEach(() => {
  jest.clearAllMocks();
  pickRandomIndexFromArray.mockImplementation(
    jest.requireActual("@skedwards88/word_logic").pickRandomIndexFromArray,
  );
  pickRandomItemFromArray.mockImplementation(
    jest.requireActual("@skedwards88/word_logic").pickRandomItemFromArray,
  );
});

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

describe("getOrClue", () => {
  test('returns an "or" clue for a given solution matrix (using mocked values)', () => {
    pickRandomItemFromArray
      .mockReturnValueOnce("MakeVsColor") // solutionKey
      .mockReturnValueOnce(1); // columnIndex (corresponds to 'blue')
    pickRandomIndexFromArray.mockReturnValueOnce(0); // rowIndex (corresponds to 'Ford')

    const expectedClue = [
      "The Ford is either the red car or the blue car.",
      "The Ford is either the blue car or the red car.",
    ];
    const clue = getOrClue(solutionMatrix);
    expect(expectedClue).toContain(clue.writtenClue);
    expect(pickRandomItemFromArray).toHaveBeenCalledTimes(2);
    expect(pickRandomIndexFromArray).toHaveBeenCalledTimes(1);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getOrClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
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

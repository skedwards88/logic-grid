import * as wordLogic from "@skedwards88/word_logic";
import cloneDeep from "lodash.clonedeep";
import {getOrClue} from "./getOrClue";
import {applyClueLogic} from "./applyClueLogic";
import {
  type PuzzleMatrix,
  type SolvedPuzzleMatrix,
} from "../puzzleGeneration/buildEmptyMatrix";

jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual<typeof wordLogic>(
    "@skedwards88/word_logic",
  );
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomIndexFromArray: jest.fn(actual.pickRandomIndexFromArray),
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
  };
});

const mockedWordLogic = jest.mocked(wordLogic);
const actualWordLogic = jest.requireActual<typeof wordLogic>(
  "@skedwards88/word_logic",
);

afterEach(() => {
  jest.clearAllMocks();
  mockedWordLogic.pickRandomIndexFromArray.mockImplementation(
    actualWordLogic.pickRandomIndexFromArray,
  );
  mockedWordLogic.pickRandomItemFromArray.mockImplementation(
    actualWordLogic.pickRandomItemFromArray,
  );
});

const solutionMatrix: SolvedPuzzleMatrix = {
  NameVsNumber: {
    row: {
      kind: "string",
      labels: ["Colin", "Sarah", "Fefe", "Meme"],
      templates: {
        generateDescription: (value) => `${value}'s car`,
      },
    },
    column: {
      kind: "number",
      labels: [1, 2, 3, 4],
      templates: {
        generateDescription: (value) => `${value} years old`,
        generateDiffGreaterDescription: (value) => `${value} years older`,
        generateDiffLesserDescription: (value) => `${value} years younger`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NameVsMake: {
    row: {
      kind: "string",
      labels: ["Colin", "Sarah", "Fefe", "Meme"],
      templates: {
        generateDescription: (value) => `${value}'s car`,
      },
    },
    column: {
      kind: "string",
      labels: ["Ford", "Honda", "Kia", "Subaru"],
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    row: {
      kind: "string",
      labels: ["Colin", "Sarah", "Fefe", "Meme"],
      templates: {
        generateDescription: (value) => `${value}'s car`,
      },
    },
    column: {
      kind: "string",
      labels: ["red", "blue", "green", "yellow"],
      templates: {
        generateDescription: (value) => `the ${value} car`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NumberVsMake: {
    row: {
      kind: "number",
      labels: [1, 2, 3, 4],
      templates: {
        generateDescription: (value) => `${value} years old`,
        generateDiffGreaterDescription: (value) => `${value} years older`,
        generateDiffLesserDescription: (value) => `${value} years younger`,
      },
    },
    column: {
      kind: "string",
      labels: ["Ford", "Honda", "Kia", "Subaru"],
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NumberVsColor: {
    row: {
      kind: "number",
      labels: [1, 2, 3, 4],
      templates: {
        generateDescription: (value) => `${value} years old`,
        generateDiffGreaterDescription: (value) => `${value} years older`,
        generateDiffLesserDescription: (value) => `${value} years younger`,
      },
    },
    column: {
      kind: "string",
      labels: ["red", "blue", "green", "yellow"],
      templates: {
        generateDescription: (value) => `the ${value} car`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  MakeVsColor: {
    row: {
      kind: "string",
      labels: ["Ford", "Honda", "Kia", "Subaru"],
      templates: {
        generateDescription: (value) => `the ${value}`,
      },
    },
    column: {
      kind: "string",
      labels: ["red", "blue", "green", "yellow"],
      templates: {
        generateDescription: (value) => `the ${value} car`,
      },
    },
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
};

const emptyMatrix = cloneDeep<PuzzleMatrix>(solutionMatrix);
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
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce("MakeVsColor") // solutionKey
      .mockReturnValueOnce(1); // columnIndex (corresponds to 'blue')
    mockedWordLogic.pickRandomIndexFromArray.mockReturnValueOnce(0); // rowIndex (corresponds to 'Ford')

    const expectedClue = [
      "The Ford is either the red car or the blue car.",
      "The Ford is either the blue car or the red car.",
    ];
    const clue = getOrClue(solutionMatrix);
    expect(expectedClue).toContain(clue.writtenClue);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(2);
    expect(mockedWordLogic.pickRandomIndexFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "MakeVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
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
    const newDerived = applyClueLogic(clue, derivedCopy);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

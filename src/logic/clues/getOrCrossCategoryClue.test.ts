import * as wordLogic from "@skedwards88/word_logic";
import {getOrCrossCategoryClue} from "./getOrCrossCategoryClue";
import {applyClueLogic} from "./applyClueLogic";
import {
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "../puzzleGeneration/generateSolutionMatrix";
import {buildEmptyMatrixGrids} from "../puzzleGeneration/buildEmptyMatrixGrids";

jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual<typeof wordLogic>(
    "@skedwards88/word_logic",
  );
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
    shuffleArray: jest.fn(actual.shuffleArray),
  };
});

const mockedWordLogic = jest.mocked(wordLogic);
const actualWordLogic = jest.requireActual<typeof wordLogic>(
  "@skedwards88/word_logic",
);
afterEach(() => {
  jest.clearAllMocks();
  mockedWordLogic.pickRandomItemFromArray.mockImplementation(
    actualWordLogic.pickRandomItemFromArray,
  );
  mockedWordLogic.shuffleArray.mockImplementation(actualWordLogic.shuffleArray);
});

describe("getOrCrossCategoryClue", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const solvedMatrixGrids: MatrixGrids = {
    NameVsNumber: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    NameVsColor: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    ColorVsNumber: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  };

  const matrixLabels: MatrixLabels = {
    NameVsNumber: {
      row: {
        values: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        values: [1, 2, 3, 4],
        displayLabels: [1, 2, 3, 4].map((l) => l.toString()),
      },
    },
    NameVsColor: {
      row: {
        values: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        values: ["red", "blue", "green", "yellow"],
        displayLabels: ["red", "blue", "green", "yellow"],
      },
    },
    ColorVsNumber: {
      row: {
        values: [1, 2, 3, 4],
        displayLabels: [1, 2, 3, 4].map((l) => l.toString()),
      },
      column: {
        values: ["red", "blue", "green", "yellow"],
        displayLabels: ["red", "blue", "green", "yellow"],
      },
    },
  };

  const matrixTemplates: MatrixTemplates = {
    NameVsNumber: {
      row: {
        kind: "string",
        templates: {
          generateDescription: (value) => `${value}'s car`,
        },
      },
      column: {
        kind: "number",
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
    },
    NameVsColor: {
      row: {
        kind: "string",
        templates: {
          generateDescription: (value) => `${value}'s car`,
        },
      },
      column: {
        kind: "string",
        templates: {
          generateDescription: (value) => `the ${value} car`,
        },
      },
    },
    ColorVsNumber: {
      row: {
        kind: "number",
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      column: {
        kind: "string",
        templates: {
          generateDescription: (value) => `the ${value} car`,
        },
      },
    },
  };

  const emptyMatrixGrids = buildEmptyMatrixGrids(solvedMatrixGrids);

  test('returns a "cross category or" clue for a given solution matrix (using mocked random values)', () => {
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce("Colin"); // itemA
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getOrCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const expectedClue = [
      "Colin's car is either 1 years old or the blue car.",
      "Colin's car is either the blue car or 1 years old.",
    ];
    expect(expectedClue).toContain(clue.writtenClue);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newDerivedMatrix[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getOrCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("orCrossCategory");
    ["itemA", "orItems"].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
    expect(clue.clueParameters.orItems.length).toBe(2);
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getOrCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getOrCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newDerived = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });

    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newDerived).not.toEqual(emptyMatrixGrids);
  });
});

import * as wordLogic from "@skedwards88/word_logic";
import {getOrClue} from "./getOrClue";
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

const solvedMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],
  NameVsMake: [
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
  NumberVsMake: [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],
  NumberVsColor: [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],
  MakeVsColor: [
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
  NameVsMake: {
    row: {
      values: ["Colin", "Sarah", "Fefe", "Meme"],
      displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    },
    column: {
      values: ["Ford", "Honda", "Kia", "Subaru"],
      displayLabels: ["Ford", "Honda", "Kia", "Subaru"],
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
  NumberVsMake: {
    row: {
      values: [1, 2, 3, 4],
      displayLabels: [1, 2, 3, 4].map((l) => l.toString()),
    },
    column: {
      values: ["Ford", "Honda", "Kia", "Subaru"],
      displayLabels: ["Ford", "Honda", "Kia", "Subaru"],
    },
  },
  NumberVsColor: {
    row: {
      values: [1, 2, 3, 4],
      displayLabels: [1, 2, 3, 4].map((l) => l.toString()),
    },
    column: {
      values: ["red", "blue", "green", "yellow"],
      displayLabels: ["red", "blue", "green", "yellow"],
    },
  },
  MakeVsColor: {
    row: {
      values: ["Ford", "Honda", "Kia", "Subaru"],
      displayLabels: ["Ford", "Honda", "Kia", "Subaru"],
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
  NameVsMake: {
    row: {
      kind: "string",
      templates: {
        generateDescription: (value) => `${value}'s car`,
      },
    },
    column: {
      kind: "string",
      templates: {
        generateDescription: (value) => `the ${value}`,
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
  NumberVsMake: {
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
        generateDescription: (value) => `the ${value}`,
      },
    },
  },
  NumberVsColor: {
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
  MakeVsColor: {
    row: {
      kind: "string",
      templates: {
        generateDescription: (value) => `the ${value}`,
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
    const clue = getOrClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(expectedClue).toContain(clue.writtenClue);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(2);
    expect(mockedWordLogic.pickRandomIndexFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "MakeVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newDerivedMatrix[changedKey]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getOrClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

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
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getOrClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getOrClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newDerivedGrids = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });

    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newDerivedGrids).not.toEqual(emptyMatrixGrids);
  });
});

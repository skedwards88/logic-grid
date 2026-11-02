import * as wordLogic from "@skedwards88/word_logic";
import {getNumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import {applyClueLogic} from "./applyClueLogic";
import {
  buildEmptyMatrixGrids,
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "../puzzleGeneration/buildEmptyMatrixGrids";

jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual<typeof wordLogic>(
    "@skedwards88/word_logic",
  );
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomItemsFromArray: jest.fn(actual.pickRandomItemsFromArray),
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
  mockedWordLogic.pickRandomItemsFromArray.mockImplementation(
    actualWordLogic.pickRandomItemsFromArray,
  );
  mockedWordLogic.pickRandomItemFromArray.mockImplementation(
    actualWordLogic.pickRandomItemFromArray,
  );
  mockedWordLogic.shuffleArray.mockImplementation(actualWordLogic.shuffleArray);
});

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff = 1", () => {
  const numericLabels = [1, 2, 3, 4];
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values to return clue "undefined")', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, null, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(2);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 2 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, false, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(3);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 3 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [true, false, false, false],
        [false, null, null, null],
        [false, null, null, null],
        [false, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, false, null],
        [null, null, false, null],
        [false, false, true, false],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparisonCrossCategory");
    [
      "greaterItem",
      "lesserItem",
      "numericLabels",
      "actualNumericDiff",
      "numericDiffClue",
    ].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });
    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newMatrixGrids).not.toEqual(emptyMatrixGrids);
  });
});

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff > 1", () => {
  const numericLabels = [10, 20, 30, 40];
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, null, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 20 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [null, null, false, false],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 30 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      NameVsNumber: [
        [true, false, false, false],
        [false, null, null, null],
        [false, null, null, null],
        [false, null, null, null],
      ],
      NameVsColor: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      ColorVsNumber: [
        [null, null, false, null],
        [null, null, false, null],
        [null, null, false, null],
        [false, false, true, false],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparisonCrossCategory");
    [
      "greaterItem",
      "lesserItem",
      "numericLabels",
      "actualNumericDiff",
      "numericDiffClue",
    ].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });
    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newMatrixGrids).not.toEqual(emptyMatrixGrids);
  });
});

describe("getNumericComparisonCrossCategoryClue, not evenly spaced", () => {
  const numericLabels = [10, 15, 30, 40];
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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
        values: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff undefined)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const expectedGridNameVsNumber = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridNameVsColor = [
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridColorVsNumber = [
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    expect(newMatrixGrids["NameVsNumber"]).not.toEqual(
      emptyMatrixGrids["NameVsNumber"],
    );
    expect(newMatrixGrids["NameVsNumber"]).toEqual(expectedGridNameVsNumber);

    expect(newMatrixGrids["NameVsColor"]).not.toEqual(
      emptyMatrixGrids["NameVsColor"],
    );
    expect(newMatrixGrids["NameVsColor"]).toEqual(expectedGridNameVsColor);

    expect(newMatrixGrids["ColorVsNumber"]).not.toEqual(
      emptyMatrixGrids["ColorVsNumber"],
    );
    expect(newMatrixGrids["ColorVsNumber"]).toEqual(expectedGridColorVsNumber);

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const expectedGridNameVsNumber = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const expectedGridNameVsColor = [
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridColorVsNumber = [
      [null, null, false, null],
      [null, null, false, null],
      [false, false, true, false],
      [null, null, false, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 20 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    expect(newMatrixGrids["NameVsNumber"]).not.toEqual(
      emptyMatrixGrids["NameVsNumber"],
    );
    expect(newMatrixGrids["NameVsNumber"]).toEqual(expectedGridNameVsNumber);

    expect(newMatrixGrids["NameVsColor"]).not.toEqual(
      emptyMatrixGrids["NameVsColor"],
    );
    expect(newMatrixGrids["NameVsColor"]).toEqual(expectedGridNameVsColor);

    expect(newMatrixGrids["ColorVsNumber"]).not.toEqual(
      emptyMatrixGrids["ColorVsNumber"],
    );
    expect(newMatrixGrids["ColorVsNumber"]).toEqual(expectedGridColorVsNumber);

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const expectedGridNameVsNumber = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const expectedGridNameVsColor = [
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridColorVsNumber = [
      [null, null, false, null],
      [null, null, false, null],
      [null, null, false, null],
      [false, false, true, false],
    ];

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 30 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    expect(newMatrixGrids["NameVsNumber"]).not.toEqual(
      emptyMatrixGrids["NameVsNumber"],
    );
    expect(newMatrixGrids["NameVsNumber"]).toEqual(expectedGridNameVsNumber);

    expect(newMatrixGrids["NameVsColor"]).not.toEqual(
      emptyMatrixGrids["NameVsColor"],
    );
    expect(newMatrixGrids["NameVsColor"]).toEqual(expectedGridNameVsColor);

    expect(newMatrixGrids["ColorVsNumber"]).not.toEqual(
      emptyMatrixGrids["ColorVsNumber"],
    );
    expect(newMatrixGrids["ColorVsNumber"]).toEqual(expectedGridColorVsNumber);

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparisonCrossCategory");
    [
      "greaterItem",
      "lesserItem",
      "numericLabels",
      "actualNumericDiff",
      "numericDiffClue",
    ].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });
    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newMatrixGrids).not.toEqual(emptyMatrixGrids);
  });
});

describe("getNumericComparisonCrossCategoryClue, numbers must match", () => {
  const numericLabelsYears = [1, 2, 3, 4];
  const numericLabelsMiles = [10, 20, 30, 40];
  const numericLabelsDollars = [100, 200, 300, 400];
  const solvedMatrixGrids: MatrixGrids = {
    YearsVsMiles: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    MilesVsDollars: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    DollarsVsYears: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  };

  const matrixLabels: MatrixLabels = {
    YearsVsMiles: {
      row: {
        values: numericLabelsYears,
        displayLabels: numericLabelsYears.map((l) => l.toString()),
      },
      column: {
        values: numericLabelsMiles,
        displayLabels: numericLabelsMiles.map((l) => l.toString()),
      },
    },
    MilesVsDollars: {
      row: {
        values: numericLabelsMiles,
        displayLabels: numericLabelsMiles.map((l) => l.toString()),
      },
      column: {
        values: numericLabelsDollars,
        displayLabels: numericLabelsDollars.map((l) => l.toString()),
      },
    },
    DollarsVsYears: {
      row: {
        values: numericLabelsDollars,
        displayLabels: numericLabelsDollars.map((l) => l.toString()),
      },
      column: {
        values: numericLabelsYears,
        displayLabels: numericLabelsYears.map((l) => l.toString()),
      },
    },
  };

  const matrixTemplates: MatrixTemplates = {
    YearsVsMiles: {
      row: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the ${value} years old car`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      column: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the car with ${value} miles`,
          generateDiffGreaterDescription: (value) => `${value} more miles`,
          generateDiffLesserDescription: (value) => `${value} less miles`,
          verb: "has",
        },
      },
    },
    MilesVsDollars: {
      row: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the car with ${value} miles`,
          generateDiffGreaterDescription: (value) => `${value} more miles`,
          generateDiffLesserDescription: (value) => `${value} less miles`,
          verb: "has",
        },
      },
      column: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the ${value} dollar car`,
          generateDiffGreaterDescription: (value) => `${value} dollars more`,
          generateDiffLesserDescription: (value) => `${value} dollars less`,
        },
      },
    },
    DollarsVsYears: {
      row: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the ${value} dollar car`,
          generateDiffGreaterDescription: (value) => `${value} dollars more`,
          generateDiffLesserDescription: (value) => `${value} dollars less`,
        },
      },
      column: {
        kind: "number",
        templates: {
          generateDescription: (value) => `the ${value} years old car`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
    },
  };

  const emptyMatrixGrids = buildEmptyMatrixGrids(solvedMatrixGrids);

  test("works even if multiple numeric categories", () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabelsYears[0],
      numericLabelsYears[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(1);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The car with 10 miles is at least 1 years younger than the 300 dollar car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      YearsVsMiles: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [false, null, null, null],
      ],
      MilesVsDollars: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      DollarsVsYears: [
        [null, null, null, null],
        [null, null, null, null],
        [false, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toEqual(emptyMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparisonCrossCategory");
    [
      "greaterItem",
      "lesserItem",
      "numericLabels",
      "actualNumericDiff",
      "numericDiffClue",
    ].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixGridsCopy = structuredClone(solvedMatrixGrids);
    getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonCrossCategoryClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: derivedGridsCopy,
      matrixLabels,
    });
    expect(derivedGridsCopy).toEqual(emptyMatrixGrids);
    expect(newMatrixGrids).not.toEqual(emptyMatrixGrids);
  });
});

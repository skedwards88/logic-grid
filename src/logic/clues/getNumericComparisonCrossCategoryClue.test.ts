import * as wordLogic from "@skedwards88/word_logic";
import cloneDeep from "lodash.clonedeep";
import {getNumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
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
        labels: numericLabels,
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
    ColorVsNumber: {
      row: {
        kind: "number",
        labels: numericLabels,
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
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values to return clue "undefined")', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([1, 3]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([1, 3]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(2);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 2 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([1, 3]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(3);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 3 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonCrossCategoryClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerivedMatrix = applyClueLogic(clue, derivedCopy);
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff > 1", () => {
  const numericLabels = [10, 20, 30, 40];
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
        labels: numericLabels,
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
    ColorVsNumber: {
      row: {
        kind: "number",
        labels: numericLabels,
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
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      numericLabels[0],
      numericLabels[2],
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
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

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 20 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
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

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 30 years younger than the green car."`,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonCrossCategoryClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerivedMatrix = applyClueLogic(clue, derivedCopy);
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, not evenly spaced", () => {
  const numericLabels = [10, 15, 30, 40];
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
        labels: numericLabels,
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
    ColorVsNumber: {
      row: {
        kind: "number",
        labels: numericLabels,
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

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

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

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 20 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

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

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 30 years younger than the green car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonCrossCategoryClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerivedMatrix = applyClueLogic(clue, derivedCopy);
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, numbers must match", () => {
  const numericLabelsYears = [1, 2, 3, 4];
  const numericLabelsMiles = [10, 20, 30, 40];
  const numericLabelsDollars = [100, 200, 300, 400];
  const solutionMatrix: SolvedPuzzleMatrix = {
    YearsVsMiles: {
      row: {
        kind: "number",
        labels: numericLabelsYears,
        templates: {
          generateDescription: (value) => `${value} years old`,
          generateDiffGreaterDescription: (value) => `${value} years older`,
          generateDiffLesserDescription: (value) => `${value} years younger`,
        },
      },
      column: {
        kind: "number",
        labels: numericLabelsMiles,
        templates: {
          generateDescription: (value) => `the car with ${value} miles`,
          generateDiffGreaterDescription: (value) => `${value} more moles`,
          generateDiffLesserDescription: (value) => `${value} less miles`,
          verb: "has",
        },
      },
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    },
    MilesVsDollars: {
      row: {
        kind: "number",
        labels: numericLabelsMiles,
        templates: {
          generateDescription: (value) => `the car with ${value} miles`,
          generateDiffGreaterDescription: (value) => `${value} more moles`,
          generateDiffLesserDescription: (value) => `${value} less miles`,
          verb: "has",
        },
      },
      column: {
        kind: "number",
        labels: numericLabelsDollars,
        templates: {
          generateDescription: (value) => `the ${value} dollar car`,
          generateDiffGreaterDescription: (value) => `${value} dollars more`,
          generateDiffLesserDescription: (value) => `${value} dollars less`,
        },
      },
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    },
    DollarsVsYears: {
      row: {
        kind: "number",
        labels: numericLabelsDollars,
        templates: {
          generateDescription: (value) => `the ${value} dollar car`,
          generateDiffGreaterDescription: (value) => `${value} dollars more`,
          generateDiffLesserDescription: (value) => `${value} dollars less`,
        },
      },
      column: {
        kind: "number",
        labels: numericLabelsYears,
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
  test("works even if multiple numeric categories", () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([1, 3]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(1);
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The car with 10 miles is at least 1 years younger than the 300 dollar car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

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
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonCrossCategoryClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerivedMatrix = applyClueLogic(clue, derivedCopy);
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

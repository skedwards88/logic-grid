import * as wordLogic from "@skedwards88/word_logic";
import {getNumericComparisonClue} from "./getNumericComparisonClue";
import {applyClueLogic} from "./applyClueLogic";
import {
  type MatrixTemplates,
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrix";

jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual<typeof wordLogic>(
    "@skedwards88/word_logic",
  );
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
    pickRandomItemsFromArray: jest.fn(actual.pickRandomItemsFromArray),
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
  mockedWordLogic.pickRandomItemsFromArray.mockImplementation(
    actualWordLogic.pickRandomItemsFromArray,
  );
  mockedWordLogic.shuffleArray.mockImplementation(actualWordLogic.shuffleArray);
});

describe("getNumericComparisonClue, evenly spaced and diff = 1", () => {
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
    NumberVsColor: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  };

  const matrixLabels: MatrixLabels = {
    NameVsNumber: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
    },
    NameVsColor: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
        displayLabels: ["red", "blue", "green", "yellow"],
      },
    },
    NumberVsColor: {
      row: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
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
  };
  const emptyMatrixGrids = structuredClone(solvedMatrixGrids);
  for (const key in emptyMatrixGrids) {
    emptyMatrixGrids[key] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Sarah",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "yellow",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 1 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 1 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 2 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 3 (exact))', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 3 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, exact diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 1 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 2 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 3 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparison");
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
    getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
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

describe("getNumericComparisonClue, evenly spaced but diff > 1", () => {
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
    NumberVsColor: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  };

  const matrixLabels: MatrixLabels = {
    NameVsNumber: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
    },
    NameVsColor: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
        displayLabels: ["red", "blue", "green", "yellow"],
      },
    },
    NumberVsColor: {
      row: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
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
  };

  const emptyMatrixGrids = structuredClone(solvedMatrixGrids);
  for (const key in emptyMatrixGrids) {
    emptyMatrixGrids[key] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Sarah",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "yellow",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 10 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 10 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 10 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparison");
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
    getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
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

describe("getNumericComparisonClue, not evenly spaced", () => {
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
    NumberVsColor: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  };

  const matrixLabels: MatrixLabels = {
    NameVsNumber: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
    },
    NameVsColor: {
      row: {
        labels: ["Colin", "Sarah", "Fefe", "Meme"],
        displayLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
        displayLabels: ["red", "blue", "green", "yellow"],
      },
    },
    NumberVsColor: {
      row: {
        labels: numericLabels,
        displayLabels: numericLabels.map((l) => l.toString()),
      },
      column: {
        labels: ["red", "blue", "green", "yellow"],
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
  };

  const emptyMatrixGrids = structuredClone(solvedMatrixGrids);
  for (const key in emptyMatrixGrids) {
    emptyMatrixGrids[key] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Sarah",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "yellow",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 5 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 5 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "Colin",
      "Meme",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 5 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, true, false, false],
      [false, false, null, null],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemsFromArray.mockReturnValueOnce([
      "red",
      "blue",
    ]);
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) =>
      [...arr].reverse(),
    );

    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemsFromArray).toHaveBeenCalledTimes(1);
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(1);

    const newMatrixGrids = applyClueLogic({
      clue,
      matrixGrids: emptyMatrixGrids,
      matrixLabels,
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("numericComparison");
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
    getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
      matrixLabels,
      matrixTemplates,
    });
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixGridsCopy).toEqual(structuredClone(solvedMatrixGrids));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedGridsCopy = structuredClone(emptyMatrixGrids);
    const clue = getNumericComparisonClue({
      solvedMatrixGrids: solvedMatrixGrids,
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

import * as wordLogic from "@skedwards88/word_logic";
import cloneDeep from "lodash.clonedeep";
import {getNumericComparisonClue} from "./getNumericComparisonClue";
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

describe("getNumericComparisonClue, evenly spaced and diff = 1", () => {
  const numericLabels = [1, 2, 3, 4];
  const solutionMatrix: SolvedPuzzleMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      columnLabels: numericLabels,
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
    NumberVsColor: {
      rowLabels: numericLabels,
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 1 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 1 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 2 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
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
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 3 (exact))', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 3 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, exact diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 1 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 2 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 3 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonClue(solutionMatrix);
    const newDerived = applyClueLogic(clue, derivedCopy);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonClue, evenly spaced but diff > 1", () => {
  const numericLabels = [10, 20, 30, 40];
  const solutionMatrix: SolvedPuzzleMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      columnLabels: numericLabels,
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
    NumberVsColor: {
      rowLabels: numericLabels,
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 10 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 10 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
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
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 10 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonClue(solutionMatrix);
    const newDerived = applyClueLogic(clue, derivedCopy);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonClue, not evenly spaced", () => {
  const numericLabels = [10, 15, 30, 40];
  const solutionMatrix: SolvedPuzzleMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      columnLabels: numericLabels,
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
    NumberVsColor: {
      rowLabels: numericLabels,
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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Sarah's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 5 years younger than the yellow car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 5 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
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
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NameVsNumber";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 5 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, true, false, false],
      [false, false, null, null],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    mockedWordLogic.pickRandomItemFromArray
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    mockedWordLogic.shuffleArray.mockImplementation((arr) => arr.reverse());

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(mockedWordLogic.pickRandomItemFromArray).toHaveBeenCalledTimes(3);

    const newDerivedMatrix = applyClueLogic(clue, emptyMatrix);

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getNumericComparisonClue(solutionMatrix);

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
    const matrixCopy = cloneDeep(solutionMatrix);
    getNumericComparisonClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(cloneDeep(solutionMatrix));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = cloneDeep(emptyMatrix);
    const clue = getNumericComparisonClue(solutionMatrix);
    const newDerived = applyClueLogic(clue, derivedCopy);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

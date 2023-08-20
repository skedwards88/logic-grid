import cloneDeep from "lodash.clonedeep";
import {getNumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {applyClueLogic} from "./applyClueLogic";

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff = 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [1, 2, 3, 4];
  const solutionMatrix = {
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
    ColorVsNumber: {
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
  let emptyMatrix = cloneDeep(solutionMatrix);
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values to return clue "undefined")', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(undefined);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(2);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 2 years younger than the green car."`,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(3);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 3 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, false, null],
          [null, null, false, null],
          [false, false, true, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff > 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [10, 20, 30, 40];
  const solutionMatrix = {
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
    ColorVsNumber: {
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
  let emptyMatrix = cloneDeep(solutionMatrix);
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(undefined);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than the green car."`,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );
    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(mockedDiff);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 20 years younger than the green car."`,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, false],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);

    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(mockedDiff);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 30 years younger than the green car."`,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NameVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, false, null],
          [null, null, false, null],
          [false, false, true, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, not evenly spaced", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [10, 15, 30, 40];
  const solutionMatrix = {
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
    ColorVsNumber: {
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
  let emptyMatrix = cloneDeep(solutionMatrix);
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff undefined)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(undefined);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

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
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

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

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(mockedDiff);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

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
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

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

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);

    jest
      .spyOn(pickRandomModule, "pickRandoms")
      .mockReturnValueOnce([numericLabels[0], numericLabels[2]]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(mockedDiff);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

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
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

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

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
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
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, numbers must match", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabelsYears = [1, 2, 3, 4];
  const numericLabelsMiles = [10, 20, 30, 40];
  const numericLabelsDollars = [100, 200, 300, 400];
  const solutionMatrix = {
    YearsVsMiles: {
      rowLabels: numericLabelsYears,
      columnLabels: numericLabelsMiles,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: (value) => `${value} years old`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
      },
      columnDescriptionTemplates: {
        description: (value) => `the car with ${value} miles`,
        diffGreaterDescription: (value) => `${value} more moles`,
        diffLesserDescription: (value) => `${value} less miles`,
        verb: "has",
      },
    },
    MilesVsDollars: {
      rowLabels: numericLabelsMiles,
      columnLabels: numericLabelsDollars,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: (value) => `the car with ${value} miles`,
        diffGreaterDescription: (value) => `${value} more moles`,
        diffLesserDescription: (value) => `${value} less miles`,
        verb: "has",
      },
      columnDescriptionTemplates: {
        description: (value) => `the ${value} dollar car`,
        diffGreaterDescription: (value) => `${value} dollars more`,
        diffLesserDescription: (value) => `${value} dollars less`,
      },
    },
    DollarsVsYears: {
      rowLabels: numericLabelsDollars,
      columnLabels: numericLabelsYears,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: (value) => `the ${value} dollar car`,
        diffGreaterDescription: (value) => `${value} dollars more`,
        diffLesserDescription: (value) => `${value} dollars less`,
      },
      columnDescriptionTemplates: {
        description: (value) => `${value} years old`,
        diffGreaterDescription: (value) => `${value} years older`,
        diffLesserDescription: (value) => `${value} years younger`,
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
  test("works even if multiple numeric categories", () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(1);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The car with 10 miles is at least 1 years younger than the 300 dollar car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "YearsVsMiles") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else if (key === "MilesVsDollars") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else if (key === "DollarsVsYears") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyMatrix);
  });
});

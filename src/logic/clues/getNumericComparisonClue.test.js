import {getNumericComparisonClue} from "./getNumericComparisonClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {logicFactory} from "./logicFactory";

describe("getNumericComparisonClue, evenly spaced and diff = 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [1, 2, 3, 4];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };

  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 2 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, diff 3 (exact))', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 3 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, exact diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 1 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 2 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 3 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

describe("getNumericComparisonClue, evenly spaced but diff > 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [10, 20, 30, 40];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };

  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 10 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

describe("getNumericComparisonClue, not evenly spaced", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const numericLabels = [10, 15, 30, 40];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };

  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    "0v3": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    "1v3": {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
      rowDescriptionTemplates: {
        description: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 5 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

import {getNumericComparisonClue} from "./getNumericComparisonClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {logicFactory} from "./logicFactory";

describe("getNumericComparisonClue, evenly spaced and diff = 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const numericLabels = [1, 2, 3, 4];
  const solutionMatrix = {
    NameVsNumber: {
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
    NameVsColor: {
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
    NumberVsColor: {
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
  let emptyMatrix = JSON.parse(JSON.stringify(solutionMatrix));
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 1 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 2 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 3 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, false],
          [false, null, null, false],
          [false, false, false, true],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 1 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 2 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 3 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, false, null, null],
          [false, false, null, null],
          [false, true, false, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonClue, evenly spaced but diff > 1", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const numericLabels = [10, 20, 30, 40];
  const solutionMatrix = {
    NameVsNumber: {
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
    NameVsColor: {
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
    NumberVsColor: {
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
  let emptyMatrix = JSON.parse(JSON.stringify(solutionMatrix));
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 10 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, false],
          [false, null, null, false],
          [false, false, false, true],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 10 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, false, null, null],
          [false, false, null, null],
          [false, true, false, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

describe("getNumericComparisonClue, not evenly spaced", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const numericLabels = [10, 15, 30, 40];
  const solutionMatrix = {
    NameVsNumber: {
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
    NameVsColor: {
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
    NumberVsColor: {
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
  let emptyMatrix = JSON.parse(JSON.stringify(solutionMatrix));
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is some years younger than Sarah's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the yellow car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, false],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is some years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 5 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is at least 20 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is exactly 30 years younger than Meme's car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
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
          [false, null, null, false],
          [false, null, null, false],
          [false, false, false, true],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is exactly 5 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, true, false, false],
          [false, false, null, null],
          [false, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 20 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
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

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The red car is at least 30 years younger than the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, false, null, null],
          [false, false, null, null],
          [false, true, false, false],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

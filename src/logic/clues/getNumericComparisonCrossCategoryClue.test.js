import {getNumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {logicFactory} from "./logicFactory";

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff = 1", () => {
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  const emptyDerivedMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    NameVsColor: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
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
      `"Colin's car is some years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 2)', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(2);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGridNameVsNumber = [
      [null, null, false, false],
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
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is 2 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values and diff 3)', () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(3);
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
      `"Colin's car is at least 3 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyDerivedMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, evenly spaced and diff > 1", () => {
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  const emptyDerivedMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    NameVsColor: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
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
      `"Colin's car is some years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
      [null, null, false, false],
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
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is 20 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyDerivedMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, not evenly spaced", () => {
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
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
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  const emptyDerivedMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    NameVsColor: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values)', () => {
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
      `"Colin's car is some years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
      [null, null, false, false],
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
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is 20 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
    );

    expect(newDerivedMatrix["NameVsColor"]["grid"]).not.toEqual(
      emptyDerivedMatrix["NameVsColor"]["grid"],
    );
    expect(newDerivedMatrix["NameVsColor"]["grid"]).toEqual(
      expectedGridNameVsColor,
    );

    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).not.toEqual(
      emptyDerivedMatrix["ColorVsNumber"]["grid"],
    );
    expect(newDerivedMatrix["ColorVsNumber"]["grid"]).toEqual(
      expectedGridColorVsNumber,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyDerivedMatrix);
  });
});

describe("getNumericComparisonCrossCategoryClue, numbers must match", () => {
  const numericLabelsYears = [1, 2, 3, 4];
  const numericLabelsMiles = [10, 20, 30, 40];
  const numericLabelsDollars = [100, 200, 300, 400];
  const solutionMatrix = {
    YearsVsMiles: {
      rowLabels: numericLabelsYears,
      colLabels: numericLabelsMiles,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE miles car",
        trailingDescription: "VALUE miles",
        diffGreaterDescription: "VALUE miles more",
        diffLesserDescription: "VALUE miles less",
      },
    },
    MilesVsC: {
      rowLabels: numericLabelsMiles,
      colLabels: numericLabelsDollars,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE miles car",
        trailingDescription: "VALUE miles",
        diffGreaterDescription: "VALUE miles more",
        diffLesserDescription: "VALUE miles less",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE dollar car",
        trailingDescription: "the VALUE dollar car",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
      },
    },
    DollarsVsYears: {
      rowLabels: numericLabelsDollars,
      colLabels: numericLabelsYears,
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE dollar car",
        trailingDescription: "the VALUE dollar car",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  const emptyDerivedMatrix = {
    YearsVsMiles: {
      rowLabels: numericLabelsYears,
      colLabels: numericLabelsMiles,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE miles car",
        trailingDescription: "VALUE miles",
        diffGreaterDescription: "VALUE miles more",
        diffLesserDescription: "VALUE miles less",
      },
    },
    MilesVsDollars: {
      rowLabels: numericLabelsMiles,
      colLabels: numericLabelsDollars,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE miles car",
        trailingDescription: "VALUE miles",
        diffGreaterDescription: "VALUE miles more",
        diffLesserDescription: "VALUE miles less",
      },
      colDescriptionTemplates: {
        leadingDescription: "The VALUE dollar car",
        trailingDescription: "the VALUE dollar car",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
      },
    },
    DollarsVsYears: {
      rowLabels: numericLabelsDollars,
      colLabels: numericLabelsYears,
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      colDescriptionTemplates: {
        leadingDescription: "The VALUE dollar car",
        trailingDescription: "the VALUE dollar car",
        diffGreaterDescription: "VALUE dollars more",
        diffLesserDescription: "VALUE dollars less",
      },
      rowDescriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
  };
  test("works even if multiple numeric categories", () => {
    jest.spyOn(pickRandomModule, "pickRandoms").mockReturnValueOnce([1, 3]);
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce(1);
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGridYearsVsMiles = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];
    const expectedGridMilesVsDollars = [
      [null, null, false, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridDollarsVsYears = [
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"The 10 miles car is at least 1 years younger than the 300 dollar car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["YearsVsMiles"]["grid"]).not.toEqual(
      emptyDerivedMatrix["YearsVsMiles"]["grid"],
    );

    expect(newDerivedMatrix["YearsVsMiles"]["grid"]).toEqual(
      expectedGridYearsVsMiles,
    );

    expect(newDerivedMatrix["MilesVsDollars"]["grid"]).not.toEqual(
      emptyDerivedMatrix["MilesVsDollars"]["grid"],
    );
    expect(newDerivedMatrix["MilesVsDollars"]["grid"]).toEqual(
      expectedGridMilesVsDollars,
    );

    expect(newDerivedMatrix["DollarsVsYears"]["grid"]).not.toEqual(
      emptyDerivedMatrix["DollarsVsYears"]["grid"],
    );
    expect(newDerivedMatrix["DollarsVsYears"]["grid"]).toEqual(
      expectedGridDollarsVsYears,
    );

    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
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
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      derivedCopy,
      clue.clueParameters,
    );
    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerivedMatrix).not.toEqual(emptyDerivedMatrix);
  });
});

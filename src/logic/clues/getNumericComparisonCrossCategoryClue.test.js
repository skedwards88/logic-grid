import {getNumericComparisonCrossCategoryClue} from "./getNumericComparisonCrossCategoryClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";

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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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
      `"Colin's car is 3 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

  test("returns a clue object with a writtenClue string and clueLogic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueLogic");
    expect(typeof clue.writtenClue).toBe("string");
    expect(typeof clue.clueLogic).toBe("function");
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerived = clue.clueLogic(derivedCopy);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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
      `"Colin's car is 30 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

  test("returns a clue object with a writtenClue string and clueLogic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueLogic");
    expect(typeof clue.writtenClue).toBe("string");
    expect(typeof clue.clueLogic).toBe("function");
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerived = clue.clueLogic(derivedCopy);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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
      `"Colin's car is 30 years younger than the green car."`,
    );
    expect(pickRandomModule.pickRandoms).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);

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

  test("returns a clue object with a writtenClue string and clueLogic function", () => {
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueLogic");
    expect(typeof clue.writtenClue).toBe("string");
    expect(typeof clue.clueLogic).toBe("function");
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonCrossCategoryClue(solutionMatrix);
    const newDerived = clue.clueLogic(derivedCopy);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

import {getOrCrossCategoryClue} from "./getOrCrossCategoryClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {logicFactory} from "./logicFactory";

describe("getOrCrossCategoryClue", () => {
  const solutionMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: [1, 2, 3, 4],
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
    ColorVsNumber: {
      rowLabels: [1, 2, 3, 4],
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
  const emptyDerivedMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: [1, 2, 3, 4],
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
        description: "VALUE's car",
      },
      colDescriptionTemplates: {
        description: "the VALUE car",
      },
    },
    ColorVsNumber: {
      rowLabels: [1, 2, 3, 4],
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
  test('returns a "cross category or" clue for a given solution matrix (using mocked random values)', () => {
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce("Colin"); // itemA
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedGridNameVsNumber = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridNameVsColor = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const expectedGridColorVsNumber = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getOrCrossCategoryClue(solutionMatrix);
    expect(clue.writtenClue).toMatchInlineSnapshot(
      `"Colin's car is either 1 years old or the blue car."`,
    );
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerivedMatrix = clueLogicFunction(
      emptyDerivedMatrix,
      clue.clueParameters,
    );

    expect(newDerivedMatrix["NameVsNumber"]["grid"]).toEqual(
      expectedGridNameVsNumber,
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

    jest.restoreAllMocks();
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getOrCrossCategoryClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("orCrossCategory");
    ["itemA", "itemB", "itemC"].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getOrCrossCategoryClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getOrCrossCategoryClue(solutionMatrix);
    const clueLogicFunction = logicFactory(clue.clueType);
    const newDerived = clueLogicFunction(derivedCopy, clue.clueParameters);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

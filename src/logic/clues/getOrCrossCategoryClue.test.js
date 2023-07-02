import {getOrCrossCategoryClue} from "./getOrCrossCategoryClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";
import {applyClueLogic} from "./applyClueLogic";

describe("getOrCrossCategoryClue", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const solutionMatrix = {
    NameVsNumber: {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      columnLabels: [1, 2, 3, 4],
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
      rowLabels: [1, 2, 3, 4],
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

  let emptyMatrix = JSON.parse(JSON.stringify(solutionMatrix));
  for (const key in emptyMatrix) {
    emptyMatrix[key].grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
  }

  test('returns a "cross category or" clue for a given solution matrix (using mocked random values)', () => {
    jest.spyOn(pickRandomModule, "pickRandom").mockReturnValueOnce("Colin"); // itemA
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const clue = getOrCrossCategoryClue(solutionMatrix);
    const expectedClue = [
      "Colin's car is either 1 years old or the blue car.",
      "Colin's car is either the blue car or 1 years old.",
    ];
    expect(expectedClue).toContain(clue.writtenClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(1);
    const newDerivedMatrix = applyClueLogic(
      clue.clueType,
      emptyMatrix,
      clue.clueParameters,
    );

    for (const key in newDerivedMatrix) {
      if (key === "ColorVsNumber") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("returns a clue object with a writtenClue string, clue type, and parameters for the clue logic function", () => {
    const clue = getOrCrossCategoryClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueType");
    expect(clue).toHaveProperty("clueParameters");
    expect(typeof clue.writtenClue).toBe("string");
    expect(clue.clueType).toEqual("orCrossCategory");
    ["itemA", "orItems"].forEach((name) => {
      expect(clue.clueParameters).toHaveProperty(name);
    });
    expect(clue.clueParameters.orItems.length).toBe(2);
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    getOrCrossCategoryClue(solutionMatrix);
    // because the matrix includes function values (which we don't care about), stringify for comparison
    expect(matrixCopy).toEqual(JSON.parse(JSON.stringify(solutionMatrix)));
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyMatrix));
    const clue = getOrCrossCategoryClue(solutionMatrix);
    const newDerived = applyClueLogic(
      clue.clueType,
      derivedCopy,
      clue.clueParameters,
    );

    expect(derivedCopy).toEqual(emptyMatrix);
    expect(newDerived).not.toEqual(emptyMatrix);
  });
});

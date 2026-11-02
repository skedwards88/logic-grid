import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import * as applyClueLogicModule from "../clues/applyClueLogic";
import {type Clue} from "./getUsefulClue";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {type MatrixGrids, type MatrixLabels} from "./buildEmptyMatrixGrids";

describe("applyCluesAdNauseam", () => {
  beforeEach(() => jest.spyOn(applyClueLogicModule, "applyClueLogic"));
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("solves an empty puzzle to completion (2)", () => {
    const inputMatrixGrids: MatrixGrids = {
      box1: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      box2: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],

      box3: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const matrixLabels: MatrixLabels = {
      box1: {
        row: populateSparseTestEntryLabels([80, 85, 90, 95]),
        column: populateSparseTestEntryLabels([
          "Wayne",
          "Alonzo",
          "Connor",
          "Megan",
        ]),
      },
      box2: {
        row: populateSparseTestEntryLabels(["teal", "yellow", "blue", "lime"]),
        column: populateSparseTestEntryLabels([
          "Wayne",
          "Alonzo",
          "Connor",
          "Megan",
        ]),
      },
      box3: {
        row: populateSparseTestEntryLabels([80, 85, 90, 95]),
        column: populateSparseTestEntryLabels([
          "teal",
          "yellow",
          "blue",
          "lime",
        ]),
      },
    };

    const clues: Clue[] = [
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Connor",
          itemB: "teal",
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: 95,
          orItems: ["Connor", "Megan"],
          allItems: ["Wayne", "Alonzo", "Connor", "Megan"],
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: 80,
          itemB: "blue",
        },
      },
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: 85, orItems: ["Alonzo", "blue"]},
      },
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: "blue", orItems: [90, "Megan"]},
      },
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: "Wayne", orItems: [90, "teal"]},
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "lime",
          lesserItem: "blue",
          numericLabels: [80, 85, 90, 95],
          actualNumericDiff: 5,
          numericDiffClue: undefined,
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: 95,
          itemB: "teal",
        },
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "Connor",
          lesserItem: "Wayne",
          numericLabels: [80, 85, 90, 95],
          actualNumericDiff: 5,
          numericDiffClue: undefined,
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: 85,
          itemB: "blue",
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Wayne",
          orItems: ["teal", "yellow"],
          allItems: ["teal", "yellow", "blue", "lime"],
        },
      },
    ];

    const derivedMatrix = applyCluesAdNauseam({
      clues,
      matrixGrids: inputMatrixGrids,
      matrixLabels,
    });

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      3 * clues.length,
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      box1: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      box2: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
      box3: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(derivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(derivedMatrix[key]).toEqual(expectedChanges[key]);

      expect(derivedMatrix[key]).not.toEqual(inputMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(derivedMatrix[key]).toEqual(inputMatrixGrids[key]);
    }
  });

  test("solves an empty puzzle to completion", () => {
    const inputMatrixGrids: MatrixGrids = {
      box1: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      box2: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
      box3: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const matrixLabels: MatrixLabels = {
      box1: {
        row: populateSparseTestEntryLabels([
          "ghoul",
          "mummy",
          "troll",
          "vampire",
        ]),
        column: populateSparseTestEntryLabels([10, 15, 20, 25]),
      },
      box2: {
        row: populateSparseTestEntryLabels([
          "ghoul",
          "mummy",
          "troll",
          "vampire",
        ]),
        column: populateSparseTestEntryLabels([
          "m&ms",
          "resses",
          "twix",
          "twizzlers",
        ]),
      },
      box3: {
        row: populateSparseTestEntryLabels([
          "m&ms",
          "resses",
          "twix",
          "twizzlers",
        ]),
        column: populateSparseTestEntryLabels([10, 15, 20, 25]),
      },
    };

    const clues: Clue[] = [
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "mummy",
          orItems: ["twix", "m&ms"],
          allItems: ["m&ms", "resses", "twix", "twizzlers"],
        },
      },
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: "vampire", orItems: [25, "twix"]},
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "resses",
          lesserItem: "twix",
          numericLabels: [10, 15, 20, 25],
          actualNumericDiff: 5,
          numericDiffClue: 5,
        },
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "ghoul",
          lesserItem: "mummy",
          numericLabels: [10, 15, 20, 25],
          actualNumericDiff: 10,
          numericDiffClue: 10,
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "twix",
          orItems: [10, 25],
          allItems: [10, 15, 20, 25],
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "ghoul",
          itemB: "m&ms",
        },
      },
    ];

    const derivedMatrix = applyCluesAdNauseam({
      clues,
      matrixGrids: inputMatrixGrids,
      matrixLabels,
    });

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      4 * clues.length,
    );

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      box1: [
        [false, false, true, false],
        [true, false, false, false],
        [false, true, false, false],
        [false, false, false, true],
      ],
      box2: [
        [false, false, false, true],
        [false, false, true, false],
        [false, true, false, false],
        [true, false, false, false],
      ],
      box3: [
        [false, false, false, true],
        [false, true, false, false],
        [true, false, false, false],
        [false, false, true, false],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(derivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(derivedMatrix[key]).toEqual(expectedChanges[key]);

      expect(derivedMatrix[key]).not.toEqual(inputMatrixGrids[key]);
    }

    for (const key of unchangedKeys) {
      expect(derivedMatrix[key]).toEqual(inputMatrixGrids[key]);
    }

    // todo count number of times called
  });

  test("expands the solution to a partial puzzle", () => {
    const inputMatrixGrids: MatrixGrids = {
      box1: [
        [null, null, false, null],
        [null, null, null, null],
        [null, false, null, false],
        [false, false, null, null],
      ],
      box2: [
        [null, null, false, null],
        [null, null, null, null],
        [null, false, null, false],
        [false, false, null, null],
      ],
      box3: [
        [null, null, false, false],
        [null, null, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    };

    const matrixLabels: MatrixLabels = {
      box1: {
        row: populateSparseTestEntryLabels([80, 85, 90, 95]),
        column: populateSparseTestEntryLabels([
          "Wayne",
          "Alonzo",
          "Connor",
          "Megan",
        ]),
      },
      box2: {
        row: populateSparseTestEntryLabels(["teal", "yellow", "blue", "lime"]),
        column: populateSparseTestEntryLabels([
          "Wayne",
          "Alonzo",
          "Connor",
          "Megan",
        ]),
      },
      box3: {
        row: populateSparseTestEntryLabels([80, 85, 90, 95]),
        column: populateSparseTestEntryLabels([
          "teal",
          "yellow",
          "blue",
          "lime",
        ]),
      },
    };

    const clues: Clue[] = [
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: 85, orItems: ["Alonzo", "blue"]},
      },
    ];

    const derivedMatrix = applyCluesAdNauseam({
      clues,
      matrixGrids: inputMatrixGrids,
      matrixLabels,
    });

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      2 * clues.length,
    );

    const changedKey = "box1";
    const unchangedKeys = Object.keys(derivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(derivedMatrix[changedKey]).not.toEqual(inputMatrixGrids[changedKey]);
    expect(derivedMatrix[changedKey]).toEqual([
      [null, false, false, null],
      [false, true, false, false],
      [null, false, null, false],
      [false, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(derivedMatrix[key]).toEqual(inputMatrixGrids[key]);
    }
  });

  test("does not change the input matrix", () => {
    const inputMatrixGrids: MatrixGrids = {
      box1: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],

      box2: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],

      box3: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const matrixLabels: MatrixLabels = {
      box1: {
        row: populateSparseTestEntryLabels([
          "ghoul",
          "mummy",
          "troll",
          "vampire",
        ]),
        column: populateSparseTestEntryLabels([10, 15, 20, 25]),
      },
      box2: {
        row: populateSparseTestEntryLabels([
          "ghoul",
          "mummy",
          "troll",
          "vampire",
        ]),
        column: populateSparseTestEntryLabels([
          "m&ms",
          "resses",
          "twix",
          "twizzlers",
        ]),
      },
      box3: {
        row: populateSparseTestEntryLabels([
          "m&ms",
          "resses",
          "twix",
          "twizzlers",
        ]),
        column: populateSparseTestEntryLabels([10, 15, 20, 25]),
      },
    };

    const clues: Clue[] = [
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "mummy",
          orItems: ["twix", "m&ms"],
          allItems: ["m&ms", "resses", "twix", "twizzlers"],
        },
      },
      {
        clueType: "orCrossCategory",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {itemA: "vampire", orItems: [25, "twix"]},
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "resses",
          lesserItem: "twix",
          numericLabels: [10, 15, 20, 25],
          actualNumericDiff: 5,
          numericDiffClue: 5,
        },
      },
      {
        clueType: "numericComparison",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          greaterItem: "ghoul",
          lesserItem: "mummy",
          numericLabels: [10, 15, 20, 25],
          actualNumericDiff: 10,
          numericDiffClue: 10,
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "twix",
          orItems: [10, 25],
          allItems: [10, 15, 20, 25],
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "ghoul",
          itemB: "m&ms",
        },
      },
    ];
    const inputMatrixGridsCopy = structuredClone(inputMatrixGrids);

    const derivedMatrix = applyCluesAdNauseam({
      clues,
      matrixGrids: inputMatrixGrids,
      matrixLabels,
    });
    expect(inputMatrixGrids).toEqual(inputMatrixGridsCopy);
    expect(inputMatrixGrids).not.toEqual(derivedMatrix);
  });
});

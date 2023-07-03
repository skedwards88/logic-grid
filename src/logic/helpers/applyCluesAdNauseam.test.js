import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import * as applyClueLogicModule from "../clues/applyClueLogic";

// function visualizeOutput(derivedMatrix) {
//   for (const key in derivedMatrix) {
//     console.log(
//       derivedMatrix[key].grid.map((row) =>
//         row.map((item) => (item ? "O" : item === false ? "X" : " ")),
//       ),
//     );
//   }
// }

describe("applyCluesAdNauseam", () => {
  beforeEach(() => jest.spyOn(applyClueLogicModule, "applyClueLogic"));
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("solves an empty puzzle to completion (2)", () => {
    const inputMatrix = {
      box1: {
        rowLabels: [80, 85, 90, 95],
        columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box2: {
        rowLabels: ["teal", "yellow", "blue", "lime"],
        columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box3: {
        rowLabels: [80, 85, 90, 95],
        columnLabels: ["teal", "yellow", "blue", "lime"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const clues = [
      {
        clueType: "not",
        clueParameters: {
          itemA: "Connor",
          itemB: "teal",
        },
      },
      {
        clueType: "or",
        clueParameters: {
          itemA: 95,
          orItems: ["Connor", "Megan"],
          allItems: ["Wayne", "Alonzo", "Connor", "Megan"],
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: 80,
          itemB: "blue",
        },
      },
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: 85, orItems: ["Alonzo", "blue"]},
      },
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: "blue", orItems: [90, "Megan"]},
      },
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: "Wayne", orItems: [90, "teal"]},
      },
      {
        clueType: "numericComparison",
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
        clueParameters: {
          itemA: 95,
          itemB: "teal",
        },
      },
      {
        clueType: "numericComparison",
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
        clueParameters: {
          itemA: 85,
          itemB: "blue",
        },
      },
      {
        clueType: "or",
        clueParameters: {
          itemA: "Wayne",
          orItems: ["teal", "yellow"],
          allItems: ["teal", "yellow", "blue", "lime"],
        },
      },
    ];

    const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      3 * clues.length,
    );

    for (const key in derivedMatrix) {
      if (key === "box1") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ]);
      } else if (key === "box2") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ]);
      } else if (key === "box3") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ]);
      } else {
        expect(derivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("solves an empty puzzle to completion", () => {
    const inputMatrix = {
      box1: {
        rowLabels: ["ghoul", "mummy", "troll", "vampire"],
        columnLabels: [10, 15, 20, 25],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box2: {
        rowLabels: ["ghoul", "mummy", "troll", "vampire"],
        columnLabels: ["m&ms", "resses", "twix", "twizzlers"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box3: {
        rowLabels: ["m&ms", "resses", "twix", "twizzlers"],
        columnLabels: [10, 15, 20, 25],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const clues = [
      {
        clueType: "or",
        clueParameters: {
          itemA: "mummy",
          orItems: ["twix", "m&ms"],
          allItems: ["m&ms", "resses", "twix", "twizzlers"],
        },
      },
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: "vampire", orItems: [25, "twix"]},
      },
      {
        clueType: "numericComparison",
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
        clueParameters: {
          itemA: "twix",
          orItems: [10, 25],
          allItems: [10, 15, 20, 25],
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: "ghoul",
          itemB: "m&ms",
        },
      },
    ];

    const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      4 * clues.length,
    );

    for (const key in derivedMatrix) {
      if (key === "box1") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [false, false, true, false],
          [true, false, false, false],
          [false, true, false, false],
          [false, false, false, true],
        ]);
      } else if (key === "box2") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [false, false, false, true],
          [false, false, true, false],
          [false, true, false, false],
          [true, false, false, false],
        ]);
      } else if (key === "box3") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [false, false, false, true],
          [false, true, false, false],
          [true, false, false, false],
          [false, false, true, false],
        ]);
      } else {
        expect(derivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }

    // todo count number of times called
  });

  test("expands the solution to a partial puzzle", () => {
    const inputMatrix = {
      box1: {
        rowLabels: [80, 85, 90, 95],
        columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
        grid: [
          [null, null, false, null],
          [null, null, null, null],
          [null, false, null, false],
          [false, false, null, null],
        ],
      },
      box2: {
        rowLabels: ["teal", "yellow", "blue", "lime"],
        columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
        grid: [
          [null, null, false, null],
          [null, null, null, null],
          [null, false, null, false],
          [false, false, null, null],
        ],
      },
      box3: {
        rowLabels: [80, 85, 90, 95],
        columnLabels: ["teal", "yellow", "blue", "lime"],
        grid: [
          [null, null, false, false],
          [null, null, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const clues = [
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: 85, orItems: ["Alonzo", "blue"]},
      },
    ];

    const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);

    expect(applyClueLogicModule.applyClueLogic).toHaveBeenCalledTimes(
      2 * clues.length,
    );

    for (const key in derivedMatrix) {
      if (key === "box1") {
        expect(derivedMatrix[key]["grid"]).not.toEqual(
          inputMatrix[key]["grid"],
        );
        expect(derivedMatrix[key]["grid"]).toEqual([
          [null, false, false, null],
          [false, true, false, false],
          [null, false, null, false],
          [false, false, null, null],
        ]);
      } else {
        expect(derivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("does not change the input matrix", () => {
    const inputMatrix = {
      box1: {
        rowLabels: ["ghoul", "mummy", "troll", "vampire"],
        columnLabels: [10, 15, 20, 25],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box2: {
        rowLabels: ["ghoul", "mummy", "troll", "vampire"],
        columnLabels: ["m&ms", "resses", "twix", "twizzlers"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      box3: {
        rowLabels: ["m&ms", "resses", "twix", "twizzlers"],
        columnLabels: [10, 15, 20, 25],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const clues = [
      {
        clueType: "or",
        clueParameters: {
          itemA: "mummy",
          orItems: ["twix", "m&ms"],
          allItems: ["m&ms", "resses", "twix", "twizzlers"],
        },
      },
      {
        clueType: "orCrossCategory",
        clueParameters: {itemA: "vampire", orItems: [25, "twix"]},
      },
      {
        clueType: "numericComparison",
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
        clueParameters: {
          itemA: "twix",
          orItems: [10, 25],
          allItems: [10, 15, 20, 25],
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: "ghoul",
          itemB: "m&ms",
        },
      },
    ];
    const inputMatrixCopy = JSON.parse(JSON.stringify(inputMatrix));

    const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);
    expect(inputMatrix).toEqual(inputMatrixCopy);
    expect(inputMatrix).not.toEqual(derivedMatrix);
  });
});

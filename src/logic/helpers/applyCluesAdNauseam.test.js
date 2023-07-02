import { applyCluesAdNauseam } from "./applyCluesAdNauseam";

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
      description: "VALUE's car",
    },
    columnDescriptionTemplates: {
      description: "the VALUE year old car",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
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
      description: "VALUE's car",
    },
    columnDescriptionTemplates: {
      description: "the VALUE car",
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
      description: "the VALUE car",
    },
    rowDescriptionTemplates: {
      description: "the VALUE year old car",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
};

const emptyMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    columnDescriptionTemplates: {
      description: "the VALUE year old car",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    rowDescriptionTemplates: {
      description: "VALUE's car",
    },
    columnDescriptionTemplates: {
      description: "the VALUE car",
    },
  },
  ColorVsNumber: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
    columnDescriptionTemplates: {
      description: "the VALUE car",
    },
    rowDescriptionTemplates: {
      description: "the VALUE year old car",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
};

describe("applyCluesAdNauseam", () => {
  // test("todo count number of times called", () => {
  //   const colinNotRed = {
  //     clueType: "not",
  //     clueParameters: {
  //       itemA: "Colin",
  //       itemB: "blue"
  //     }
  //   };

  //   const derivedMatrix = applyCluesAdNauseam([colinNotRed], emptyMatrix);

  //   expect(derivedMatrix["NameVsNumber"]["grid"]).toEqual(emptyMatrix["NameVsNumber"]["grid"]);

  //   expect(derivedMatrix["ColorVsNumber"]["grid"]).toEqual(emptyMatrix["ColorVsNumber"]["grid"]);

  //   expect(derivedMatrix["NameVsColor"]["grid"]).toEqual([
  //     [null, false, null, null],
  //     [null, null, null, null],
  //     [null, null, null, null],
  //     [null, null, null, null],
  //   ]);

  // });

  // test("does not change the input matrix", () => {
  //   const colinNotRed = {
  //     clueType: "not",
  //     clueParameters: {
  //       itemA: "Colin",
  //       itemB: "red"
  //     }
  //   };

  //   const emptyMatrixCopy = JSON.parse(JSON.stringify(emptyMatrix));

  //   const derivedMatrix = applyCluesAdNauseam([colinNotRed], emptyMatrix);

  //   expect(emptyMatrix).toEqual(emptyMatrixCopy);
  //   expect(emptyMatrix).not.toEqual(derivedMatrix);
  // });

  // test("todo name", () => {
  //   const inputMatrix = {
  //     NameVsNumber: {
  //       rowLabels: [80, 85, 90, 95],
  //       columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
  //       grid: [
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //       ],
  //     },
  //     NameVsColor: {
  //       rowLabels: ["teal", "yellow", "blue", "lime"],
  //       columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
  //       grid: [
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //       ],
  //     },
  //     ColorVsNumber: {
  //       rowLabels: [80, 85, 90, 95],
  //       columnLabels: ["teal", "yellow", "blue", "lime"],
  //       grid: [
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //         [null, null, null, null],
  //       ],
  //     },
  //   };

  //   const clues = [
  //     {
  //       clueType: "not",
  //       clueParameters: {
  //         itemA: "Connor",
  //         itemB: "teal",
  //       },
  //     },
  //     {
  //       clueType: "or",
  //       clueParameters: {
  //         notItems: ["Wayne", "Alonzo"],
  //         itemB: 95,
  //       },
  //     },
  //     {
  //       clueType: "not",
  //       clueParameters: {
  //         itemA: 80,
  //         itemB: "blue",
  //       },
  //     },
  //     {
  //       clueType: "orCrossCategory",
  //       clueParameters: {itemA: 85, itemB: "Alonzo", itemC: "blue"},
  //     },
  //     {
  //       clueType: "orCrossCategory",
  //       clueParameters: {itemA: "blue", itemB: 90, itemC: "Megan"},
  //     },
  //     {
  //       clueType: "orCrossCategory",
  //       clueParameters: {itemA: "Wayne", itemB: "teal", itemC: 90},

  //     },
  //     {
  //       clueType: "numericComparison",
  //       clueParameters: {
  //         greaterItem: "lime",
  //         lesserItem: "blue",
  //         numericLabels: [80,85,90,95],
  //         actualNumericDiff: 5,
  //         numericDiffClue: undefined,
  //       },
  //     },
  //     {
  //       clueType: "not",
  //       clueParameters: {
  //         itemA: 95,
  //         itemB: "teal",
  //       },
  //     },
  //     {
  //       clueType: "numericComparison",
  //       clueParameters: {
  //         greaterItem: "Connor",
  //         lesserItem: "Wayne",
  //         numericLabels: [80,85,90,95],
  //         actualNumericDiff: 5,
  //         numericDiffClue: undefined,
  //       },
  //     },
  //     {
  //       clueType: "not",
  //       clueParameters: {
  //         itemA: 85,
  //         itemB: "blue",
  //       },
  //     },
  //     {
  //       clueType: "or",
  //       clueParameters: {
  //         notItems: ["blue", "lime"],
  //         itemB: "Wayne",
  //       },
  //     },
  //   ];

  //   const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);
  //   console.log(JSON.stringify(derivedMatrix));
  //   console.log(derivedMatrix)
  //   console.log(
  //     derivedMatrix.NameVsNumber.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );

  //   console.log(
  //     derivedMatrix.ColorVsNumber.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );

  //   console.log(
  //     derivedMatrix.NameVsColor.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );
  // });

  test("todo name", () => {
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
        clueParameters: { itemA: "vampire", orItems: [25, "twix"] },
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
      // {
      //   clueType: "numericComparisonCrossCategory",
      //   clueParameters: {
      //     greaterItem: "forest",
      //     lesserItem: "Tim",
      //     numericLabels: [200, 400, 800, 1000],
      //     actualNumericDiff: 400,
      //     numericDiffClue: 400,
      //   },
      // },

      // {
      //   clueType: "numericComparison",
      //   clueParameters: {
      //     greaterItem: "Beth",
      //     lesserItem: "Bessie",
      //     numericLabels: [200, 400, 800, 1000],
      //     actualNumericDiff: 200,
      //     numericDiffClue: 200,
      //   },
      // },
    ];

    const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);
    console.log(
      derivedMatrix.box1.grid.map((row) =>
        row.map((item) => (item ? "O" : item === false ? "X" : " ")),
      ),
    );

    console.log(
      derivedMatrix.box2.grid.map((row) =>
        row.map((item) => (item ? "O" : item === false ? "X" : " ")),
      ),
    );

    console.log(
      derivedMatrix.box3.grid.map((row) =>
        row.map((item) => (item ? "O" : item === false ? "X" : " ")),
      ),
    );
  });

  // test("todo name 2", () => {
  //   const inputMatrix = {
  //     NameVsNumber: {
  //       rowLabels: [80, 85, 90, 95],
  //       columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
  //       grid: [
  //         [null,null,false,null],
  //         [null,null,null,null],
  //         [null,false,null,false],
  //         [false,false,null,null]
  //       ],
  //     },
  //     NameVsColor: {
  //       rowLabels: ["teal", "yellow", "blue", "lime"],
  //       columnLabels: ["Wayne", "Alonzo", "Connor", "Megan"],
  //       grid: [
  //         [null,null,false,null],
  //         [null,null,null,null],
  //         [null,false,null,false],
  //         [false,false,null,null]
  //       ],
  //     },
  //     ColorVsNumber: {
  //       rowLabels: [80, 85, 90, 95],
  //       columnLabels: ["teal", "yellow", "blue", "lime"],
  //       grid: [
  //         [null,null,false,false],
  //         [null,null,false,false],
  //         [false,false,true,false],
  //         [false,false,false,true]
  //       ],
  //     },
  //   };

  //   const clues = [
  //     {
  //       clueType: "orCrossCategory",
  //       clueParameters: {itemA: 85, itemB: "Alonzo", itemC: "blue"},
  //     },
  //   ];

  //   const derivedMatrix = applyCluesAdNauseam(clues, inputMatrix);
  //   console.log(
  //     derivedMatrix.NameVsNumber.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );

  //   console.log(
  //     derivedMatrix.ColorVsNumber.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );

  //   console.log(
  //     derivedMatrix.NameVsColor.grid.map((row) =>
  //       row.map((item) => (item ? "O" : item === false ? "X" : " ")),
  //     ),
  //   );
  // });
});

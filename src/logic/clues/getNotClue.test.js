import {getNotClue} from "./getNotClue";
import * as pickRandomModule from "../helpers/pickRandom";

const solutionMatrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
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
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
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
      leadingDescription: "The VALUE",
      trailingDescription: "the VALUE",
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
      leadingDescription: "VALUE's car",
      trailingDescription: "VALUE's car",
    },
    colDescriptionTemplates: {
      leadingDescription: "The VALUE car",
      trailingDescription: "the VALUE car",
    },
  },
  "1v2": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    colDescriptionTemplates: {
      leadingDescription: "The VALUE",
      trailingDescription: "the VALUE",
    },
    rowDescriptionTemplates: {
      leadingDescription: "The VALUE year old car",
      trailingDescription: "VALUE years old",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
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
  "2v3": {
    rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
    rowDescriptionTemplates: {
      leadingDescription: "The VALUE",
      trailingDescription: "the VALUE",
    },
    colDescriptionTemplates: {
      leadingDescription: "The VALUE car",
      trailingDescription: "the VALUE car",
    },
  },
};

describe("getNotClue", () => {
  test('returns a "not" clue for a given solution matrix (using mocked values)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce("2v3") // solutionKey
      .mockReturnValueOnce(1); // colIndex (corresponds to 'blue')
    jest.spyOn(pickRandomModule, "pickRandomIndex").mockReturnValueOnce(0); // rowIndex (corresponds to 'Ford')

    const derivedMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: ["Ford", "Honda", "Kia", "Subaru"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
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
      },
      "1v2": {
        rowLabels: [1, 2, 3, 4],
        colLabels: ["Ford", "Honda", "Kia", "Subaru"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      "1v3": {
        rowLabels: [1, 2, 3, 4],
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      "2v3": {
        rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const expectedClue = "The Ford is not the blue car.";
    const clue = getNotClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);

    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);
    expect(pickRandomModule.pickRandomIndex).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = clue.clueLogic(derivedMatrix);

    expect(newDerivedMatrix["1v2"]["grid"]).toEqual(
      derivedMatrix["1v2"]["grid"],
    );
    expect(newDerivedMatrix["2v3"]["grid"]).not.toEqual(
      derivedMatrix["2v3"]["grid"],
    );
    expect(newDerivedMatrix["2v3"]["grid"]).toMatchInlineSnapshot(`
[
  [
    null,
    false,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
  ],
]
`);
    expect(newDerivedMatrix).toMatchInlineSnapshot(`
{
  "0v1": {
    "colLabels": [
      1,
      2,
      3,
      4,
    ],
    "grid": [
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      "Colin",
      "Sarah",
      "Fefe",
      "Meme",
    ],
  },
  "0v2": {
    "colLabels": [
      "Ford",
      "Honda",
      "Kia",
      "Subaru",
    ],
    "grid": [
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      "Colin",
      "Sarah",
      "Fefe",
      "Meme",
    ],
  },
  "0v3": {
    "colLabels": [
      "red",
      "blue",
      "green",
      "yellow",
    ],
    "grid": [
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      "Colin",
      "Sarah",
      "Fefe",
      "Meme",
    ],
  },
  "1v2": {
    "colLabels": [
      "Ford",
      "Honda",
      "Kia",
      "Subaru",
    ],
    "grid": [
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      1,
      2,
      3,
      4,
    ],
  },
  "1v3": {
    "colLabels": [
      "red",
      "blue",
      "green",
      "yellow",
    ],
    "grid": [
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      1,
      2,
      3,
      4,
    ],
  },
  "2v3": {
    "colLabels": [
      "red",
      "blue",
      "green",
      "yellow",
    ],
    "grid": [
      [
        null,
        false,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
      [
        null,
        null,
        null,
        null,
      ],
    ],
    "rowLabels": [
      "Ford",
      "Honda",
      "Kia",
      "Subaru",
    ],
  },
}
`);

    jest.restoreAllMocks();
  });

  test("returns a clue object with a writtenClue string and clueLogic function", () => {
    const clue = getNotClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueLogic");
    expect(typeof clue.writtenClue).toBe("string");
    expect(typeof clue.clueLogic).toBe("function");
  });

  test("does not modify the solution matrix", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNotClue(matrixCopy);

    expect(matrixCopy).toEqual(solutionMatrix);
  });
});

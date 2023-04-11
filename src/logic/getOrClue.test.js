import { getOrClue } from './getOrClue';
import { pickRandom, pickRandomIndex } from './pickRandom';

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
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
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
  },
  "1v2": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
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
  },
  "2v3": {
    rowLabels: ["fly", "back", "breast", "free"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
};

jest.mock('./pickRandom');

describe('getOrClue', () => {
  beforeEach(() => {
    pickRandom.mockReset();
    pickRandomIndex.mockReset();
  });

  test('returns a "not" clue for a given solution matrix', () => {
    const derivedMatrix = {
      "0v1":{
        "rowLabels":["Colin","Sarah","Fefe","Meme"],
        "colLabels":[1,2,3,4],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      },
      "0v2":{
        "rowLabels":["Colin","Sarah","Fefe","Meme"],
        "colLabels":["fly","back","breast","free"],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      },
      "0v3":{
        "rowLabels":["Colin","Sarah","Fefe","Meme"],
        "colLabels":["red","blue","green","yellow"],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      },
      "1v2":{
        "rowLabels":[1,2,3,4],
        "colLabels":["fly","back","breast","free"],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      },
      "1v3":{
        "rowLabels":[1,2,3,4],
        "colLabels":["red","blue","green","yellow"],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      },
      "2v3":{
        "rowLabels":["fly","back","breast","free"],
        "colLabels":["red","blue","green","yellow"],
        "grid":[
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null],
          [null,null,null,null]
        ]
      }
    };
    pickRandom.mockReturnValueOnce("2v3"); // solutionKey
    pickRandomIndex.mockReturnValueOnce(0); //rowIndex (corresponds to 'fly')
    pickRandom.mockReturnValueOnce(1); // colIndex (corresponds to 'blue')
    const expectedClue = 'fly is red or blue';
    const clue = getOrClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandom).toHaveBeenCalledTimes(2);
    expect(pickRandomIndex).toHaveBeenCalledTimes(1);

    const newDerivedMatrix = clue.clueLogic(derivedMatrix)

    expect(newDerivedMatrix["1v2"]["grid"]).toEqual(derivedMatrix["1v2"]["grid"])
    expect(newDerivedMatrix["2v3"]["grid"]).not.toEqual(derivedMatrix["2v3"]["grid"])
    expect(newDerivedMatrix["2v3"]["grid"]).toMatchInlineSnapshot(`
[
  [
    null,
    null,
    false,
    false,
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
`)
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
      "fly",
      "back",
      "breast",
      "free",
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
      "fly",
      "back",
      "breast",
      "free",
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
        null,
        false,
        false,
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
      "fly",
      "back",
      "breast",
      "free",
    ],
  },
}
`)
  });
});

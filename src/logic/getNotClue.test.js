import { getNotClue } from './getNotClue';
import { pickRandom } from './pickRandom';

jest.mock('./pickRandom');

describe('getNotClue', () => {
  beforeEach(() => {
    pickRandom.mockReset();
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
    const solution = [
      ['Colin', 1, 'fly', 'red'],
      ['Sarah', 2, 'back', 'blue'],
      ['Fefe', 3, 'breast', 'green'],
      ['Meme', 4, 'free', 'yellow'],
    ];
    pickRandom.mockReturnValueOnce(0); // solutionIndexA
    pickRandom.mockReturnValueOnce(2); // categoryIndexA
    pickRandom.mockReturnValueOnce(1); // solutionIndexB
    pickRandom.mockReturnValueOnce(3); // categoryIndexB
    const expectedClue = 'fly is not blue';
    const clue = getNotClue(solution);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandom).toHaveBeenCalledTimes(4);

    const newDerivedMatrix = clue.clueLogic(derivedMatrix)

    expect(newDerivedMatrix["1v2"]["grid"]).toEqual(derivedMatrix["1v2"]["grid"])
    expect(newDerivedMatrix["2v3"]["grid"]).not.toEqual(derivedMatrix["2v3"]["grid"])
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

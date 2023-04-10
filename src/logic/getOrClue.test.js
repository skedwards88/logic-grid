import { getOrClue } from './getOrClue';
import { pickRandom } from './pickRandom';

jest.mock('./pickRandom');

describe('getOrClue', () => {
  beforeEach(() => {
    pickRandom.mockReset();
  });

  test('returns a "not" clue for a given solution matrix', () => {
    const solutionMatrix = {
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
    pickRandom.mockReturnValueOnce(3); // categoryIndexB
    pickRandom.mockReturnValueOnce(1); // solutionIndexB
    const expectedClue = 'fly is red or blue';
    const clue = getOrClue(solution);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandom).toHaveBeenCalledTimes(4);

    const newSolutionMatrix = clue.clueLogic(solutionMatrix)

    expect(newSolutionMatrix["1v2"]["grid"]).toEqual(solutionMatrix["1v2"]["grid"])
    expect(newSolutionMatrix["2v3"]["grid"]).not.toEqual(solutionMatrix["2v3"]["grid"])
    expect(newSolutionMatrix["2v3"]["grid"]).toMatchInlineSnapshot(`
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
    expect(newSolutionMatrix).toMatchInlineSnapshot(`
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

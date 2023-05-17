import {removeRedundantClues} from "./removeRedundantClues";

const emptyMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
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
  },
};

describe("removeRedundantClues", () => {
  test("removes a redundant clue that appears last", () => {
    const clues = [
      {
        clueType: "or",
        clueParameters: {
          itemA: "Colin",
          orItems: ["red", "yellow"],
          allItems: ["green", "blue", "red", "yellow"],
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
    ];

    const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);
    expect(nonRedundantClues).toEqual([clues[0]]);
  });

  test("removes a redundant clue that appears first", () => {
    const clues = [
      {
        clueType: "not",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "or",
        clueParameters: {
          itemA: "Colin",
          orItems: ["red", "yellow"],
          allItems: ["green", "blue", "red", "yellow"],
        },
      },
    ];

    const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);
    expect(nonRedundantClues).toEqual([clues[1]]);
  });

  test("does not doubly remove redundant clues", () => {
    const clues = [
      {
        clueType: "not",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: "green",
          itemB: "Colin",
        },
      },
    ];

    const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);
    expect(nonRedundantClues).toEqual([clues[1]]);
  });

  test("will doubly remove redundant clues if the clues are truly redundant with another clue", () => {
    const clues = [
      {
        clueType: "not",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "not",
        clueParameters: {
          itemA: "green",
          itemB: "Colin",
        },
      },
      {
        clueType: "or",
        clueParameters: {
          itemA: "Colin",
          orItems: ["red", "yellow"],
          allItems: ["green", "blue", "red", "yellow"],
        },
      },
    ];

    const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);
    expect(nonRedundantClues).toEqual([clues[2]]);
  });
});

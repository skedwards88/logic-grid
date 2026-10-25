import {populateSparseTestEntry} from "../helpers/testHelpers";
import {type Clue} from "./getUsefulClue";
import {removeRedundantClues} from "./removeRedundantClues";

const emptyMatrix = {
  NameVsNumber: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsColor: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  ColorVsNumber: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
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
    const clues: Clue[] = [
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Colin",
          orItems: ["red", "yellow"],
          allItems: ["green", "blue", "red", "yellow"],
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
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
    const clues: Clue[] = [
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
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
    const clues: Clue[] = [
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
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
    const clues: Clue[] = [
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "Colin",
          itemB: "green",
        },
      },
      {
        clueType: "not",
        crossedOff: false,
        writtenClue: "test",
        clueParameters: {
          itemA: "green",
          itemB: "Colin",
        },
      },
      {
        clueType: "or",
        crossedOff: false,
        writtenClue: "test",
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

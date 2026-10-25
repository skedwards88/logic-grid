import {populateSparseTestEntry} from "../helpers/testHelpers";
import {findFirstTrueIntersection} from "./findFirstTrueIntersection";

const matrix = {
  NameVsNumber: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry([1, 2, 3, 4]),
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [false, false, false, true],
      [false, true, false, false],
      [false, false, true, false],
      [true, false, false, false],
    ],
  },
  NumberVsColor: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [false, false, true, false],
      [false, true, false, false],
      [true, false, false, false],
      [false, false, false, true],
    ],
  },
};

describe("findFirstTrueIntersection", () => {
  test("returns the item that forms a 'true' with the input item (row vs column)", () => {
    expect(
      findFirstTrueIntersection(matrix, "Sarah", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual("blue");
  });

  test("returns the item that forms a 'true' with the input item (column vs row)", () => {
    expect(
      findFirstTrueIntersection(matrix, "blue", [
        "Colin",
        "Sarah",
        "Fefe",
        "Meme",
      ]),
    ).toEqual("Sarah");
  });

  test("works on non-strings", () => {
    expect(
      findFirstTrueIntersection(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual("green");
    expect(findFirstTrueIntersection(matrix, "blue", [1, 2, 3, 4])).toEqual(2);
  });

  test("returns undefined if there is not a 'true' intersection", () => {
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
      NumberVsColor: {
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

    expect(
      findFirstTrueIntersection(emptyMatrix, "blue", [
        "Colin",
        "Sarah",
        "Fefe",
        "Meme",
      ]),
    ).toEqual(undefined);
  });
});

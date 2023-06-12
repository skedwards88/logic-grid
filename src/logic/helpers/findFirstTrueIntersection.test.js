import {findFirstTrueIntersection} from "./findFirstTrueIntersection.js";

const matrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, false, false, true],
      [false, true, false, false],
      [false, false, true, false],
      [true, false, false, false],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, false, true, false],
      [false, true, false, false],
      [true, false, false, false],
      [false, false, false, true],
    ],
  },
};

describe("findFirstTrueIntersection", () => {
  test("returns the item that forms a 'true' with the input item (row vs col)", () => {
    expect(
      findFirstTrueIntersection(matrix, "Sarah", ["red", "blue", "green", "yellow"]),
    ).toEqual("blue");
  });

  test("returns the item that forms a 'true' with the input item (col vs row)", () => {
    expect(
      findFirstTrueIntersection(matrix, "blue", ["Colin", "Sarah", "Fefe", "Meme"]),
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
      NumberVsColor: {
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
    expect(
      findFirstTrueIntersection(emptyMatrix, "blue", ["Colin", "Sarah", "Fefe", "Meme"]),
    ).toEqual(undefined);
  });
});
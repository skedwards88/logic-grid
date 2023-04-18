import {findMatrixLabel} from "./findMatrixLabel.js";

const matrix = {
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
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, false, false, true],
      [false, true, false, false],
      [false, false, true, false],
      [true, false, false, false],
    ],
  },
  "1v3": {
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

describe("findMatrixLabel", () => {
  test("returns the item that forms a 'true' with the input item (row vs col)", () => {
    expect(
      findMatrixLabel(matrix, "Sarah", ["red", "blue", "green", "yellow"]),
    ).toEqual("blue");
  });

  test("returns the item that forms a 'true' with the input item (col vs row)", () => {
    expect(
      findMatrixLabel(matrix, "blue", ["Colin", "Sarah", "Fefe", "Meme"]),
    ).toEqual("Sarah");
  });

  test("works on non-strings", () => {
    expect(
      findMatrixLabel(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual("green");
    expect(findMatrixLabel(matrix, "blue", [1, 2, 3, 4])).toEqual(2);
  });
});

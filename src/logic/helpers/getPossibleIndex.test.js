import {
  getFirstPossibleIndex,
  getLastPossibleIndex,
  getAllPossibleIndexes,
} from "./getPossibleIndex.js";

const matrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [null, null, null, null], // all null
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, null], // true before null
      [false, true, false, false], // true, no null
      [false, null, true, false], // null before true
      [false, false, false, true],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, false, null, false], // null, no true
      [false, true, null, false],
      [false, false, null, false],
      [false, false, null, true],
    ],
  },
};

describe("getFirstPossibleIndex", () => {
  test("returns the index of the first true or null (case where there is a true and no null)", () => {
    expect(
      getFirstPossibleIndex(matrix, "Sarah", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is a null and no true)", () => {
    expect(
      getFirstPossibleIndex(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the first true or null (case where there is null before a true)", () => {
    expect(
      getFirstPossibleIndex(matrix, "Fefe", ["red", "blue", "green", "yellow"]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is true before a null)", () => {
    expect(
      getFirstPossibleIndex(matrix, "Colin", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (swap col and row input)", () => {
    expect(getFirstPossibleIndex(matrix, "blue", [1, 2, 3, 4])).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(getFirstPossibleIndex(matrix, "Sarah", [1, 2, 3, 4])).toEqual(0);
    expect(getFirstPossibleIndex(matrix, "green", [1, 2, 3, 4])).toEqual(0);
  });
});

describe("getLastPossibleIndex", () => {
  test("returns the index of the last true or null (case where there is a true and no null)", () => {
    expect(
      getLastPossibleIndex(matrix, "Sarah", ["red", "blue", "green", "yellow"]),
    ).toEqual(1);
  });

  test("returns the index of the last true or null (case where there is a null and no true)", () => {
    expect(
      getLastPossibleIndex(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is null before a true)", () => {
    expect(
      getLastPossibleIndex(matrix, "Fefe", ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is true before a null)", () => {
    expect(
      getLastPossibleIndex(matrix, "Colin", ["red", "blue", "green", "yellow"]),
    ).toEqual(3);
  });

  test("returns the index of the last true or null (swap col and row input)", () => {
    expect(getLastPossibleIndex(matrix, "blue", [1, 2, 3, 4])).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(getLastPossibleIndex(matrix, "Sarah", [1, 2, 3, 4])).toEqual(3);
    expect(getLastPossibleIndex(matrix, "green", [1, 2, 3, 4])).toEqual(3);
  });
});

describe("getAllPossibleIndexes", () => {
  test("returns the index of the true when there is a single true", () => {
    expect(
      getAllPossibleIndexes(matrix, "Sarah", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual([1]);
  });

  test("returns the index of the first true when there are multiple trues", () => {
    expect(
      getAllPossibleIndexes(matrix, "blue", ["Colin", "Sarah", "Fefe", "Meme"]),
    ).toEqual([0]);
  });

  test("returns the index of the all nulls when there are no trues", () => {
    expect(getAllPossibleIndexes(matrix, "Sarah", [1, 2, 3, 4])).toEqual([
      0, 1, 2, 3,
    ]);
  });

  test("returns an empty array when there are no trues or nulls", () => {
    expect(getAllPossibleIndexes(matrix, "red", [1, 2, 3, 4])).toEqual([]);
  });
});

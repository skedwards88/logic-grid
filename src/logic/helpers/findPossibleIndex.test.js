import {
  findFirstPossibleIndex,
  findLastPossibleIndex,
  findAllPossibleIndexes,
} from "./findPossibleIndex.js";

const matrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [null, null, null, null], // all null
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, true, false, null], // true before null
      [false, true, false, false], // true, no null
      [false, null, true, false], // null before true
      [false, false, false, true],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [false, false, null, false], // null, no true
      [false, true, null, false],
      [false, false, null, false],
      [false, false, null, true],
    ],
  },
};

describe("findFirstPossibleIndex", () => {
  test("returns the index of the first true or null (case where there is a true and no null)", () => {
    expect(
      findFirstPossibleIndex(matrix, "Sarah", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is a null and no true)", () => {
    expect(
      findFirstPossibleIndex(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the first true or null (case where there is null before a true)", () => {
    expect(
      findFirstPossibleIndex(matrix, "Fefe", ["red", "blue", "green", "yellow"]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (case where there is true before a null)", () => {
    expect(
      findFirstPossibleIndex(matrix, "Colin", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual(1);
  });

  test("returns the index of the first true or null (swap column and row input)", () => {
    expect(findFirstPossibleIndex(matrix, "blue", [1, 2, 3, 4])).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(findFirstPossibleIndex(matrix, "Sarah", [1, 2, 3, 4])).toEqual(0);
    expect(findFirstPossibleIndex(matrix, "green", [1, 2, 3, 4])).toEqual(0);
  });
});

describe("findLastPossibleIndex", () => {
  test("returns the index of the last true or null (case where there is a true and no null)", () => {
    expect(
      findLastPossibleIndex(matrix, "Sarah", ["red", "blue", "green", "yellow"]),
    ).toEqual(1);
  });

  test("returns the index of the last true or null (case where there is a null and no true)", () => {
    expect(
      findLastPossibleIndex(matrix, 1, ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is null before a true)", () => {
    expect(
      findLastPossibleIndex(matrix, "Fefe", ["red", "blue", "green", "yellow"]),
    ).toEqual(2);
  });

  test("returns the index of the last true or null (case where there is true before a null)", () => {
    expect(
      findLastPossibleIndex(matrix, "Colin", ["red", "blue", "green", "yellow"]),
    ).toEqual(3);
  });

  test("returns the index of the last true or null (swap column and row input)", () => {
    expect(findLastPossibleIndex(matrix, "blue", [1, 2, 3, 4])).toEqual(1);
  });

  test("returns the index of the first true or null (case with multiple nulls)", () => {
    expect(findLastPossibleIndex(matrix, "Sarah", [1, 2, 3, 4])).toEqual(3);
    expect(findLastPossibleIndex(matrix, "green", [1, 2, 3, 4])).toEqual(3);
  });
});

describe("findAllPossibleIndexes", () => {
  test("returns the index of the true when there is a single true", () => {
    expect(
      findAllPossibleIndexes(matrix, "Sarah", [
        "red",
        "blue",
        "green",
        "yellow",
      ]),
    ).toEqual([1]);
  });

  test("returns the index of the first true when there are multiple trues", () => {
    expect(
      findAllPossibleIndexes(matrix, "blue", ["Colin", "Sarah", "Fefe", "Meme"]),
    ).toEqual([0]);
  });

  test("returns the index of the all nulls when there are no trues", () => {
    expect(findAllPossibleIndexes(matrix, "Sarah", [1, 2, 3, 4])).toEqual([
      0, 1, 2, 3,
    ]);
  });

  test("returns an empty array when there are no trues or nulls", () => {
    expect(findAllPossibleIndexes(matrix, "red", [1, 2, 3, 4])).toEqual([]);
  });
});

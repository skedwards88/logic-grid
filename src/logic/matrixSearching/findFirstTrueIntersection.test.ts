import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";
import {findFirstTrueIntersection} from "./findFirstTrueIntersection";

const matrixGrids: MatrixGrids = {
  NameVsNumber: [
    [true, false, false, false],
    [false, true, false, false],
    [false, false, true, false],
    [false, false, false, true],
  ],

  NameVsColor: [
    [false, false, false, true],
    [false, true, false, false],
    [false, false, true, false],
    [true, false, false, false],
  ],

  NumberVsColor: [
    [false, false, true, false],
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
  ],
};

const matrixLabels: MatrixLabels = {
  NameVsNumber: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  NumberVsColor: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("findFirstTrueIntersection", () => {
  test("returns the item that forms a 'true' with the input item (row vs column)", () => {
    expect(
      findFirstTrueIntersection({
        matrixGrids,
        matrixLabels,
        item: "Sarah",
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual("blue");
  });

  test("returns the item that forms a 'true' with the input item (column vs row)", () => {
    expect(
      findFirstTrueIntersection({
        matrixGrids,
        matrixLabels,
        item: "blue",
        intersectingItems: ["Colin", "Sarah", "Fefe", "Meme"],
      }),
    ).toEqual("Sarah");
  });

  test("works on non-strings", () => {
    expect(
      findFirstTrueIntersection({
        matrixGrids,
        matrixLabels,
        item: 1,
        intersectingItems: ["red", "blue", "green", "yellow"],
      }),
    ).toEqual("green");
    expect(
      findFirstTrueIntersection({
        matrixGrids,
        matrixLabels,
        item: "blue",
        intersectingItems: [1, 2, 3, 4],
      }),
    ).toEqual(2);
  });

  test("returns undefined if there is not a 'true' intersection", () => {
    const emptyMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],

      NameVsColor: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],

      NumberVsColor: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const emptyMatrixLabels: MatrixLabels = {
      NameVsNumber: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([1, 2, 3, 4]),
      },
      NameVsColor: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
      NumberVsColor: {
        row: populateSparseTestEntryLabels([1, 2, 3, 4]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
    };

    expect(
      findFirstTrueIntersection({
        matrixGrids: emptyMatrixGrids,
        matrixLabels: emptyMatrixLabels,
        item: "blue",
        intersectingItems: ["Colin", "Sarah", "Fefe", "Meme"],
      }),
    ).toEqual(undefined);
  });
});

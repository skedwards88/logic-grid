import {applyOrLogic} from "./applyOrLogic";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {
  type MatrixGrids,
  type MatrixLabels,
} from "../puzzleGeneration/generateSolutionMatrix";

const emptyMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  NameVsMake: [
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
  NumberVsMake: [
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
  MakeVsColor: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
};

const matrixLabels: MatrixLabels = {
  NameVsNumber: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  NameVsMake: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["Ford", "Honda", "Kia", "Subaru"]),
  },
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  NumberVsMake: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["Ford", "Honda", "Kia", "Subaru"]),
  },
  NumberVsColor: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  MakeVsColor: {
    row: populateSparseTestEntryLabels(["Ford", "Honda", "Kia", "Subaru"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("applyOrLogic", () => {
  test('applies an "or" clue (when all items are strings)', () => {
    const newMatrixGrids = applyOrLogic(emptyMatrixGrids, matrixLabels, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });

    const changedKey = "NameVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies an "or" clue (when some items are numbers)', () => {
    const newMatrixGrids = applyOrLogic(emptyMatrixGrids, matrixLabels, {
      itemA: "blue",
      orItems: [2, 3],
      allItems: [1, 2, 3, 4],
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toEqual(emptyMatrixGrids[key]);
    }
  });

  test("works even if the clue has no effect", () => {
    const inputMatrixGrids: MatrixGrids = {
      ...emptyMatrixGrids,
      NameVsColor: [
        [null, false, null, null],
        [null, false, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const inputMatrixLabels: MatrixLabels = {
      ...matrixLabels,
      NameVsColor: {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([
          "red",
          "blue",
          "green",
          "yellow",
        ]),
      },
    };
    const newMatrixGrids = applyOrLogic(inputMatrixGrids, inputMatrixLabels, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });

    for (const key in newMatrixGrids) {
      expect(newMatrixGrids[key]).toEqual(inputMatrixGrids[key]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = structuredClone(emptyMatrixGrids);
    const newMatrixGrids = applyOrLogic(emptyMatrixGrids, matrixLabels, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });
    expect(matrixCopy).toEqual(emptyMatrixGrids);
    expect(matrixCopy).not.toEqual(newMatrixGrids);
  });
});

import cloneDeep from "lodash.clonedeep";
import {applyOrLogic} from "./applyOrLogic";
import {populateSparseTestEntry} from "../helpers/testHelpers";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

const emptyMatrix: PuzzleMatrix = {
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
  NameVsMake: {
    row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntry(["Ford", "Honda", "Kia", "Subaru"]),
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
  NumberVsMake: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["Ford", "Honda", "Kia", "Subaru"]),
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
  MakeVsColor: {
    row: populateSparseTestEntry(["Ford", "Honda", "Kia", "Subaru"]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};

describe("applyOrLogic", () => {
  test('applies an "or" clue (when all items are strings)', () => {
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });

    const changedKey = "NameVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies an "or" clue (when some items are numbers)', () => {
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      itemA: "blue",
      orItems: [2, 3],
      allItems: [1, 2, 3, 4],
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("works even if the clue has no effect", () => {
    const inputMatrix: PuzzleMatrix = {
      ...emptyMatrix,
      NameVsColor: {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const newDerivedMatrix = applyOrLogic(inputMatrix, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });

    for (const key in newDerivedMatrix) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = cloneDeep(emptyMatrix);
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      itemA: "blue",
      orItems: ["Meme", "Fefe"],
      allItems: ["Colin", "Sarah", "Fefe", "Meme"],
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

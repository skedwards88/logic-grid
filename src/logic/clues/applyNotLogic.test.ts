import cloneDeep from "lodash.clonedeep";
import {applyNotLogic} from "./applyNotLogic";
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

describe("applyNotLogic", () => {
  test("sets an intersection to false (when both items are strings)", () => {
    const newDerivedMatrix = applyNotLogic(emptyMatrix, {
      itemA: "Colin",
      itemB: "blue",
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
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("sets an intersection to false (when one item is string, one is number)", () => {
    const newDerivedMatrix = applyNotLogic(emptyMatrix, {
      itemA: 3,
      itemB: "blue",
    });

    const changedKey = "NumberVsColor";
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => key != changedKey,
    );

    expect(newDerivedMatrix[changedKey]["grid"]).not.toEqual(
      emptyMatrix[changedKey]["grid"],
    );
    expect(newDerivedMatrix[changedKey]["grid"]).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("works even if the intersection is already false", () => {
    const inputMatrix: PuzzleMatrix = {
      ...emptyMatrix,
      NameVsColor: {
        row: populateSparseTestEntry(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const newDerivedMatrix = applyNotLogic(inputMatrix, {
      itemA: "Colin",
      itemB: "blue",
    });

    for (const key in newDerivedMatrix) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = cloneDeep(emptyMatrix);
    const newDerivedMatrix = applyNotLogic(emptyMatrix, {
      itemA: "Sarah",
      itemB: "blue",
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

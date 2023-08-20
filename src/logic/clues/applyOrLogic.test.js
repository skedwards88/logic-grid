import cloneDeep from "lodash.clonedeep";
import {applyOrLogic} from "./applyOrLogic";

const emptyMatrix = {
  NameVsNumber: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsMake: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NameVsColor: {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NumberVsMake: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["Ford", "Honda", "Kia", "Subaru"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  NumberVsColor: {
    rowLabels: [1, 2, 3, 4],
    columnLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  MakeVsColor: {
    rowLabels: ["Ford", "Honda", "Kia", "Subaru"],
    columnLabels: ["red", "blue", "green", "yellow"],
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
    for (const key in newDerivedMatrix) {
      if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test('applies an "or" clue (when some items are numbers)', () => {
    const newDerivedMatrix = applyOrLogic(emptyMatrix, {
      itemA: "blue",
      orItems: [2, 3],
      allItems: [1, 2, 3, 4],
    });
    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("works even if the clue has no effect", () => {
    const inputMatrix = {
      ...emptyMatrix,
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        columnLabels: ["red", "blue", "green", "yellow"],
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

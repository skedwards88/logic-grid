import cloneDeep from "lodash.clonedeep";
import {applyNotLogic} from "./applyNotLogic";

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

describe("applyNotLogic", () => {
  test("sets an intersection to false (when both items are strings)", () => {
    const newDerivedMatrix = applyNotLogic(emptyMatrix, {
      itemA: "Colin",
      itemB: "blue",
    });

    for (const key in newDerivedMatrix) {
      if (key === "NameVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("sets an intersection to false (when one item is string, one is number)", () => {
    const newDerivedMatrix = applyNotLogic(emptyMatrix, {
      itemA: 3,
      itemB: "blue",
    });

    for (const key in newDerivedMatrix) {
      if (key === "NumberVsColor") {
        expect(newDerivedMatrix[key]["grid"]).not.toEqual(
          emptyMatrix[key]["grid"],
        );
        expect(newDerivedMatrix[key]["grid"]).toEqual([
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ]);
      } else {
        expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
      }
    }
  });

  test("works even if the intersection is already false", () => {
    const inputMatrix = {
      ...emptyMatrix,
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        columnLabels: ["red", "blue", "green", "yellow"],
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

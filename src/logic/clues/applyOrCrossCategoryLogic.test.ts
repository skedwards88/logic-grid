import cloneDeep from "lodash.clonedeep";
import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic";
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
  ColorVsNumber: {
    row: populateSparseTestEntry([1, 2, 3, 4]),
    column: populateSparseTestEntry(["red", "blue", "green", "yellow"]),
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};

describe("applyOrCrossCategoryLogic", () => {
  test('applies a cross category "or" clue when you know nothing about the matrix', () => {
    const newDerivedMatrix = applyOrCrossCategoryLogic(emptyMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });

    const changedKey = "ColorVsNumber";
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

  test('applies a cross category "or" clue when know that itemA is itemB', () => {
    const partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix["NameVsColor"].grid = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      ColorVsNumber: [
        [null, null, null, null],
        [null, null, null, null],
        [null, false, null, null],
        [null, null, null, null],
      ],
      NameVsNumber: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a cross category "or" clue when know that itemA is itemC', () => {
    const partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix["NameVsColor"].grid = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      ColorVsNumber: [
        [null, null, null, null],
        [null, null, null, null],
        [null, false, null, null],
        [null, null, null, null],
      ],
      NameVsNumber: [
        [null, null, false, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemB', () => {
    const partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix["NameVsColor"].grid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      ColorVsNumber: [
        [null, null, null, null],
        [null, null, null, null],
        [null, false, null, null],
        [null, null, null, null],
      ],
      NameVsNumber: [
        [false, false, true, false],
        [null, null, false, null],
        [null, null, false, null],
        [null, null, false, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemC', () => {
    const partiallySolvedMatrix = {...emptyMatrix};
    partiallySolvedMatrix["NameVsColor"].grid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newDerivedMatrix = applyOrCrossCategoryLogic(partiallySolvedMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });

    const expectedChanges: Record<string, (boolean | null)[][]> = {
      ColorVsNumber: [
        [null, null, null, null],
        [null, null, null, null],
        [null, false, null, null],
        [null, null, null, null],
      ],
      NameVsNumber: [
        [false, false, true, false],
        [null, null, false, null],
        [null, null, false, null],
        [null, null, false, null],
      ],
    };

    const changedKeys = Object.keys(expectedChanges);
    const unchangedKeys = Object.keys(newDerivedMatrix).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(expectedChanges[key]);

      expect(newDerivedMatrix[key]["grid"]).not.toEqual(
        emptyMatrix[key]["grid"],
      );
    }

    for (const key of unchangedKeys) {
      expect(newDerivedMatrix[key]["grid"]).toEqual(emptyMatrix[key]["grid"]);
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixCopy = cloneDeep(emptyMatrix);
    const newDerivedMatrix = applyOrCrossCategoryLogic(emptyMatrix, {
      itemA: "Colin",
      orItems: ["blue", 3],
    });
    expect(matrixCopy).toEqual(emptyMatrix);
    expect(matrixCopy).not.toEqual(newDerivedMatrix);
  });
});

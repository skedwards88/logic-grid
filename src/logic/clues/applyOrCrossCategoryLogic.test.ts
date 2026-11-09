import {applyOrCrossCategoryLogic} from "./applyOrCrossCategoryLogic";
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
  NameVsColor: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  ColorVsNumber: [
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
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  ColorVsNumber: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

describe("applyOrCrossCategoryLogic", () => {
  test('applies a cross category "or" clue when you know nothing about the matrix', () => {
    const newMatrixGrids = applyOrCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );

    const changedKey = "ColorVsNumber";
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => key != changedKey,
    );

    expect(newMatrixGrids[changedKey]).not.toStrictEqual(
      emptyMatrixGrids[changedKey],
    );
    expect(newMatrixGrids[changedKey]).toStrictEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, false, null, null],
      [null, null, null, null],
    ]);

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(emptyMatrixGrids[key]);
    }
  });

  test('applies a cross category "or" clue when know that itemA is itemB', () => {
    const partiallySolvedMatrixGrids = {...emptyMatrixGrids};
    partiallySolvedMatrixGrids["NameVsColor"] = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newMatrixGrids = applyOrCrossCategoryLogic(
      partiallySolvedMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );

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
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }
  });

  test('applies a cross category "or" clue when know that itemA is itemC', () => {
    const partiallySolvedMatrixGrids = {...emptyMatrixGrids};
    partiallySolvedMatrixGrids["NameVsColor"] = [
      [false, true, false, false],
      [null, false, null, null],
      [null, false, null, null],
      [null, false, null, null],
    ];
    const newMatrixGrids = applyOrCrossCategoryLogic(
      partiallySolvedMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );

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
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemB', () => {
    const partiallySolvedMatrixGrids = {...emptyMatrixGrids};
    partiallySolvedMatrixGrids["NameVsColor"] = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newMatrixGrids = applyOrCrossCategoryLogic(
      partiallySolvedMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );

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
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }
  });

  test('applies a cross category "or" clue when know that itemA is not itemC', () => {
    const partiallySolvedMatrixGrids = {...emptyMatrixGrids};
    partiallySolvedMatrixGrids["NameVsColor"] = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const newMatrixGrids = applyOrCrossCategoryLogic(
      partiallySolvedMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );

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
    const unchangedKeys = Object.keys(newMatrixGrids).filter(
      (key) => !changedKeys.includes(key),
    );

    for (const key of changedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(expectedChanges[key]);

      expect(newMatrixGrids[key]).not.toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }

    for (const key of unchangedKeys) {
      expect(newMatrixGrids[key]).toStrictEqual(
        partiallySolvedMatrixGrids[key],
      );
    }
  });

  test("does not modify the input matrix when applying the clue", () => {
    const matrixGridsCopy = structuredClone(emptyMatrixGrids);
    const newMatrixGrids = applyOrCrossCategoryLogic(
      emptyMatrixGrids,
      matrixLabels,
      {
        itemA: "Colin",
        orItems: ["blue", 3],
      },
    );
    expect(matrixGridsCopy).toStrictEqual(emptyMatrixGrids);
    expect(matrixGridsCopy).not.toStrictEqual(newMatrixGrids);
  });
});

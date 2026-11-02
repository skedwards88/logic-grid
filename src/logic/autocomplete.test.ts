import {autocomplete} from "./autocomplete";
import {populateSparseTestEntryLabels} from "./helpers/testHelpers";
import {
  type MatrixLabels,
  type MatrixGrids,
} from "./puzzleGeneration/generateSolutionMatrix";

describe("autocomplete", () => {
  const matrixLabels: MatrixLabels = {
    NameVsNumber: {
      row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
      column: populateSparseTestEntryLabels([1, 2, 3]),
    },
    NameVsColor: {
      row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
      column: populateSparseTestEntryLabels(["red", "blue", "green"]),
    },
    ColorVsNumber: {
      row: populateSparseTestEntryLabels(["red", "blue", "green"]),
      column: populateSparseTestEntryLabels([1, 2, 3]),
    },
  };
  test("it autocompletes a puzzle if enough trues are known to do so", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, null, null],
        [null, null, true],
        [false, true, null],
      ],
      NameVsColor: [
        [null, null, true],
        [null, true, null],
        [true, null, null],
      ],
      ColorVsNumber: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, false, false],
        [false, false, true],
        [false, true, false],
      ],

      NameVsColor: [
        [false, false, true],
        [false, true, false],
        [true, false, false],
      ],

      ColorVsNumber: [
        [false, true, false],
        [false, false, true],
        [true, false, false],
      ],
    };

    const outputMatrix = autocomplete(inputMatrixGrids, matrixLabels);
    expect(outputMatrix).toEqual(expectedMatrixGrids);
  });

  test("It should not change the input matrix grids", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [false, false, true],
        [null, true, null],
        [true, null, null],
      ],

      NameVsColor: [
        [null, true, null],
        [true, null, null],
        [null, null, true],
      ],

      ColorVsNumber: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const matrixGridsCopy = structuredClone(inputMatrixGrids);
    const outputMatrix = autocomplete(inputMatrixGrids, matrixLabels);

    expect(matrixGridsCopy).toEqual(inputMatrixGrids);
    expect(matrixGridsCopy).not.toEqual(outputMatrix);
  });

  test("it relies on trues, not falses (so even if trues could be inferred from falses, they aren't)", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [null, false, false],
        [false, null, false],
        [false, false, null],
      ],

      NameVsColor: [
        [null, false, false],
        [false, null, false],
        [false, false, null],
      ],

      ColorVsNumber: [
        [null, false, false],
        [false, null, false],
        [false, false, null],
      ],
    };

    expect(() => autocomplete(inputMatrixGrids, matrixLabels)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it can't complete the matrix", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, null, null],
        [null, null, null],
        [false, null, null],
      ],

      NameVsColor: [
        [null, null, true],
        [null, true, null],
        [true, null, null],
      ],

      ColorVsNumber: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    expect(() => autocomplete(inputMatrixGrids, matrixLabels)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it results in multiple trues per column", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, null, null],
        [null, null, true],
        [true, null, null],
      ],

      NameVsColor: [
        [null, null, true],
        [null, true, null],
        [true, null, null],
      ],

      ColorVsNumber: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    expect(() => autocomplete(inputMatrixGrids, matrixLabels)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it results in multiple trues per row", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, null, true],
        [null, null, null],
        [false, null, null],
      ],

      NameVsColor: [
        [null, null, true],
        [null, true, null],
        [true, null, null],
      ],

      ColorVsNumber: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    expect(() => autocomplete(inputMatrixGrids, matrixLabels)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if the autocompleted solution conflicts with the input matrix", () => {
    const inputMatrixGrids: MatrixGrids = {
      NameVsNumber: [
        [true, null, null],
        [null, null, true],
        [false, true, null],
      ],

      NameVsColor: [
        [null, null, true],
        [null, true, null],
        [true, null, null],
      ],

      ColorVsNumber: [
        [null, false, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    expect(() => autocomplete(inputMatrixGrids, matrixLabels)).toThrow(
      "Propagating the trues leads to a disagreement with the original array",
    );
  });
});

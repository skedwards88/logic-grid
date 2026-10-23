import cloneDeep from "lodash.clonedeep";
import {autocomplete} from "./autocomplete";
import {addTemplatesForTestMatrix} from "./helpers/addTemplatesForTestMatrix";

describe("autocomplete", () => {
  test("it autocompletes a puzzle if enough trues are known to do so", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, null, null],
          [null, null, true],
          [false, true, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, null, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    const expectedMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, false, false],
          [false, false, true],
          [false, true, false],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [false, false, true],
          [false, true, false],
          [true, false, false],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [false, true, false],
          [false, false, true],
          [true, false, false],
        ],
      },
    });

    const outputMatrix = autocomplete(inputMatrix);
    expect(outputMatrix).toEqual(expectedMatrix);
  });

  test("It should not change the input matrix", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [false, false, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, true, null],
          [true, null, null],
          [null, null, true],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    const matrixCopy = cloneDeep(inputMatrix);
    const outputMatrix = autocomplete(inputMatrix);

    expect(matrixCopy).toEqual(inputMatrix);
    expect(matrixCopy).not.toEqual(outputMatrix);
  });

  test("it relies on trues, not falses (so even if trues could be inferred from falses, they aren't)", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, false, false],
          [false, null, false],
          [false, false, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, false, false],
          [false, null, false],
          [false, false, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, false, false],
          [false, null, false],
          [false, false, null],
        ],
      },
    });

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it can't complete the matrix", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, null, null],
          [null, null, null],
          [false, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, null, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it results in multiple trues per column", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, null, null],
          [null, null, true],
          [true, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, null, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if it results in multiple trues per row", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, null, true],
          [null, null, null],
          [false, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, null, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propagating the trues did not result in exactly one true/row",
    );
  });

  test("it throws an error if the autocompleted solution conflicts with the input matrix", () => {
    const inputMatrix = addTemplatesForTestMatrix({
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: [1, 2, 3],
        grid: [
          [true, null, null],
          [null, null, true],
          [false, true, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        columnLabels: ["red", "blue", "green"],
        grid: [
          [null, null, true],
          [null, true, null],
          [true, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        columnLabels: [1, 2, 3],
        grid: [
          [null, false, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    });

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propagating the trues leads to a disagreement with the original array",
    );
  });
});

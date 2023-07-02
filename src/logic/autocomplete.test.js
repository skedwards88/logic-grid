import {autocomplete} from "./autocomplete.js";

describe("autocomplete", () => {
  test("it autocompletes a puzzle if enough trues are known to do so", () => {
    const inputMatrix = {
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
    };

    const outputMatrix = autocomplete(inputMatrix);
    expect(outputMatrix).toEqual({
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
  });

  test("It should not change the input matrix", () => {
    const inputMatrix = {
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
    };

    const matrixCopy = JSON.parse(JSON.stringify(inputMatrix));
    const outputMatrix = autocomplete(inputMatrix);

    expect(matrixCopy).toEqual(inputMatrix);
    expect(matrixCopy).not.toEqual(outputMatrix);
  });

  test("it relies on trues, not falses", () => {
    const inputMatrix = {
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
    };

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propogating the trues did not fully complete the puzzle",
    );
  });

  test("it throws an error if it can't complete the matrix", () => {
    const inputMatrix = {
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
    };

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Propogating the trues did not fully complete the puzzle",
    );
  });

  test("it throws an error if the autocompleted solution conflicts with the input matrix", () => {
    const inputMatrix = {
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
    };

    expect(() => autocomplete(inputMatrix)).toThrow(
      "Popoagating the trues leads to a disagreement with the original array",
    );
  });
});

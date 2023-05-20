import {autocomplete} from "./autocomplete.js";

describe("autocomplete", () => {
  test("It should not change the input matrix", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, false, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        colLabels: [1, 2, 3],
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

  test("if there is only one null in the row and there are no trues in the row, it should set the last null to true", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, false, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [false, false, true],
          [null, null, false],
          [null, null, false],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("if there is only one null in the column and there are no trues in the column, it should set the last null to true", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, null, null],
          [null, null, null],
          [false, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [false, null, null],
          [true, false, false],
          [false, null, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("if there is only one null in the row and there is a true in the row, it should set the last null to false", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, false, false, null],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("if there is only one null in the column and there is a true in the column, it should set the last null to false", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [null, null, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      ColorVsNumber: {
        rowLabels: ["red", "blue", "green"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [true, false, false, false],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("a false will be propagated to another gird if a corresponding true is known", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: [1, 2, 3],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsColor") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("when an item is true, all other items in that row/col are set to false", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, true, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [false, true, false],
          [null, false, null],
          [null, false, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });

  test("linked trues are expanded", () => {
    const inputMatrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: [1, 2, 3],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = autocomplete(inputMatrix);

    for (const key in outputMatrix) {
      if (key === "NameVsNumber") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ]);
      } else if (key === "NameVsColor") {
        expect(outputMatrix[key]["grid"]).not.toEqual(inputMatrix[key]["grid"]);
        expect(outputMatrix[key]["grid"]).toEqual([
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ]);
      } else {
        expect(outputMatrix[key]["grid"]).toEqual(inputMatrix[key]["grid"]);
      }
    }
  });
});

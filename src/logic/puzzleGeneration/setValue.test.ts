import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import {type MatrixGrids, type MatrixLabels} from "./buildEmptyMatrix";
import {
  setToFalse,
  setToTrue,
  deduceSecondOrderFromTrue,
  deduceSecondOrderFromFalse,
} from "./setValue";

const matrixLabels: MatrixLabels = {
  "0v1": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
    column: populateSparseTestEntryLabels([1, 2, 3]),
  },
  "0v2": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
    column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
  },
  "0v3": {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green"]),
  },
  "1v2": {
    row: populateSparseTestEntryLabels([1, 2, 3]),
    column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
  },
  "1v3": {
    row: populateSparseTestEntryLabels([1, 2, 3]),
    column: populateSparseTestEntryLabels(["red", "blue", "green"]),
  },
  "2v3": {
    row: populateSparseTestEntryLabels(["fly", "back", "breast"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green"]),
  },
};

const emptyInputMatrixGrids: MatrixGrids = {
  "0v1": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  "0v2": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  "0v3": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  "1v2": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  "1v3": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  "2v3": [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

describe("setToFalse", () => {
  test("It should set the specified position to false", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    const outputGrid = outputMatrixGrids["0v3"];
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("The item order does not matter", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "Colin",
    });
    const outputGrid = outputMatrixGrids["0v3"];
    expect(outputGrid).toEqual(expectedGrid);

    const outputMatrix2 = setToFalse({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    const outputGrid2 = outputMatrix2["0v3"];
    expect(outputGrid2).toEqual(expectedGrid);
  });

  test("It also works if the item is not a string", () => {
    const expectedGrid = [
      [null, null, null],
      [null, null, null],
      [false, null, null],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: 3,
      itemB: "red",
    });
    const outputGrid = outputMatrixGrids["1v3"];
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("It should not change the input matrix", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    expect(outputMatrixGrids).not.toBe(emptyInputMatrixGrids);
    expect(emptyInputMatrixGrids["0v3"]).not.toEqual(expectedGrid);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("It should return the original grid if the specified position is already false", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels([1, 2, 3]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, false],
        [null, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Sarah",
      itemB: 3,
    });

    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });

  test("if it leaves only one null in the row and there are no trues in the row, it should set the last null to true", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels([1, 2, 3]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, false, true],
      [null, null, false],
      [null, null, false],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: 2,
    });
    expect(outputMatrixGrids["0v1"]).toEqual(expectedGrid);
    expect(inputMatrixGrids["0v1"]).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the column and there are no trues in the column, it should set the last null to true", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels([1, 2, 3]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];
    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Fefe",
      itemB: 1,
    });
    expect(outputMatrixGrids["0v1"]).toEqual(expectedGrid);
    expect(inputMatrixGrids["0v1"]).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the row and there is a true in the row, it should set the last null to false", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([1, 2, 3, 4]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, null, null],
        [false, null, null, null],
        [false, null, null, null],
        [false, null, null, null],
      ],
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: 3,
    });
    expect(outputMatrixGrids["0v1"]).toEqual(expectedGrid);
    expect(inputMatrixGrids["0v1"]).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the column and there is a true in the column, it should set the last null to false", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
        column: populateSparseTestEntryLabels([1, 2, 3, 4]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false, false],
        [false, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Fefe",
      itemB: 1,
    });
    expect(outputMatrixGrids["0v1"]).toEqual(expectedGrid);
    expect(inputMatrixGrids["0v1"]).not.toEqual(expectedGrid);
  });

  test("cascading can occur", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = setToFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual([
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual([
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  });
});

describe("setToTrue", () => {
  test("It should set the specified position to true", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrixGrids = setToTrue({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    const outputGrid = outputMatrixGrids["0v3"];
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("The item order does not matter", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrixGrids = setToTrue({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "Colin",
    });
    const outputGrid = outputMatrixGrids["0v3"];
    expect(outputGrid).toEqual(expectedGrid);

    const outputMatrix2 = setToTrue({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    const outputGrid2 = outputMatrix2["0v3"];
    expect(outputGrid2).toEqual(expectedGrid);
  });

  test("It also works if the item is not a string", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrixGrids = setToTrue({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: 1,
      itemB: "red",
    });
    const outputGrid = outputMatrixGrids["1v3"];
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("It should not change the input matrix", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrixGrids = setToTrue({
      matrixGrids: emptyInputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    expect(outputMatrixGrids).not.toBe(emptyInputMatrixGrids);
    expect(emptyInputMatrixGrids["0v3"]).not.toEqual(expectedGrid);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("It should return the original grid if the specified position is already true", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels([1, 2, 3]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = setToTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: 1,
    });
    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });

  test("all other items in that row/column are set to false", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels([1, 2, 3]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["fly", "back", "breast"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrixGrids = setToTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: 2,
    });
    expect(outputMatrixGrids["0v1"]).toEqual(expectedGrid);
    expect(inputMatrixGrids["0v1"]).not.toEqual(expectedGrid);
  });

  test("cascading can occur", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = setToTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "red",
    });
    expect(outputMatrixGrids["0v1"]).toEqual([
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual([
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ]);
  });
});

describe("deduceSecondOrderFromTrue", () => {
  test("deduces a false value (itemA in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [false, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [null, null, null],
      [false, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "red",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a false value (itemB in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [false, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [null, null, null],
      [false, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a false value (item A in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [null, false, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [null, false, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).not.toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v2"]).toEqual(expectedGrid);
  });

  test("deduces a false value (item B in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [null, false, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [null, false, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "Colin",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).not.toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v2"]).toEqual(expectedGrid);
  });

  test("no changes if no additional info is known", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "red",
    });
    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });

  test("no changes if no additional info is known (swapped input order)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "dog",
    });
    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });

  test("deduces a true value (itemA in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [true, false, false],
        [false, null, null],
      ],

      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "red",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a true value (itemB in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [true, false, false],
        [false, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a true value (item A in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [false, true, false],
        [null, false, null],
        [null, false, null],
      ],
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).not.toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v2"]).toEqual(expectedGrid);
  });

  test("deduces a true value (item B in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [false, true, false],
        [null, false, null],
        [null, false, null],
      ],
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "Colin",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).not.toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v2"]).toEqual(expectedGrid);
  });
});

describe("deduceSecondOrderFromFalse", () => {
  test("deduces a false value (itemA in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "Colin",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a false value (itemB in row)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],

      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "Colin",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a false value (item A in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "red",
      itemB: "dog",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("deduces a false value (item B in column)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v2": [
        [false, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrixGrids = deduceSecondOrderFromFalse({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "dog",
      itemB: "red",
    });
    expect(outputMatrixGrids["0v1"]).toEqual(inputMatrixGrids["0v1"]);
    expect(outputMatrixGrids["0v2"]).toEqual(inputMatrixGrids["0v2"]);
    expect(outputMatrixGrids["0v3"]).not.toEqual(inputMatrixGrids["0v3"]);
    expect(outputMatrixGrids["0v3"]).toEqual(expectedGrid);
  });

  test("no changes if no trues about inputs are known", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],

      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],

      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "green",
      itemB: "mouse",
    });
    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });

  test("no changes if no trues about inputs are known (swapped input order)", () => {
    const matrixLabels: MatrixLabels = {
      "0v1": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
      },
      "0v2": {
        row: populateSparseTestEntryLabels(["dog", "cat", "mouse"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
      "0v3": {
        row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe"]),
        column: populateSparseTestEntryLabels(["red", "blue", "green"]),
      },
    };

    const inputMatrixGrids: MatrixGrids = {
      "0v1": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      "0v2": [
        [true, false, false],
        [false, null, null],
        [false, null, null],
      ],
      "0v3": [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const outputMatrixGrids = deduceSecondOrderFromTrue({
      matrixGrids: inputMatrixGrids,
      matrixLabels,
      itemA: "mouse",
      itemB: "green",
    });
    expect(outputMatrixGrids).toEqual(inputMatrixGrids);
  });
});

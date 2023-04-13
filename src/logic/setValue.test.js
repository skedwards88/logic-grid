import {
  setToFalse,
  setToTrue,
  deduceSecondOrderFromTrue,
  deduceSecondOrderFromFalse,
} from "./setValue.js";

const emptyInputMatrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe"],
    colLabels: [1, 2, 3],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe"],
    colLabels: ["fly", "back", "breast"],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe"],
    colLabels: ["red", "blue", "green"],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  "1v2": {
    rowLabels: [1, 2, 3],
    colLabels: ["fly", "back", "breast"],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3],
    colLabels: ["red", "blue", "green"],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  "2v3": {
    rowLabels: ["fly", "back", "breast"],
    colLabels: ["red", "blue", "green"],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
};

describe("setToFalse", () => {
  test("It should set the specified position to false", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, "Colin", "red");
    const outputGrid = outputMatrix["0v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("The item order does not matter", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, "red", "Colin");
    const outputGrid = outputMatrix["0v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);

    const outputMatrix2 = setToFalse(emptyInputMatrix, "Colin", "red");
    const outputGrid2 = outputMatrix2["0v3"].grid;
    expect(outputGrid2).toEqual(expectedGrid);
  });

  test("It also works if the item is not a string", () => {
    const expectedGrid = [
      [null, null, null],
      [null, null, null],
      [false, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, 3, "red");
    const outputGrid = outputMatrix["1v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("It should not change the input matrix", () => {
    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = setToFalse(emptyInputMatrix, "Colin", "red");
    expect(outputMatrix).not.toBe(emptyInputMatrix);
    expect(emptyInputMatrix["0v3"].grid).not.toEqual(expectedGrid); //todo tobe vs toequal
    expect(emptyInputMatrix["0v3"].grid).not.toBe(expectedGrid);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("It should return the original grid if the specified position is already false", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [null, null, null],
          [null, null, false],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["fly", "back", "breast"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = setToFalse(inputMatrix, "Sarah", 3);

    expect(outputMatrix).toEqual(inputMatrix);
  });

  test("if it leaves only one null in the row and there are no trues in the row, it should set the last null to true", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["fly", "back", "breast"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, false, true],
      [null, null, false],
      [null, null, false],
    ];

    const outputMatrix = setToFalse(inputMatrix, "Colin", 2);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the column and there are no trues in the column, it should set the last null to true", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];
    const outputMatrix = setToFalse(inputMatrix, "Fefe", 1);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the row and there is a true in the row, it should set the last null to false", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, false, null, null],
          [false, null, null, null],
          [false, null, null, null],
          [false, null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];
    const outputMatrix = setToFalse(inputMatrix, "Colin", 3);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test("if it leaves only one null in the column and there is a true in the column, it should set the last null to false", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, false, false, false],
          [false, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const outputMatrix = setToFalse(inputMatrix, "Fefe", 1);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test("cascading can occur", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = setToFalse(inputMatrix, "Colin", "dog");
    expect(outputMatrix["0v1"].grid).toEqual([
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    expect(outputMatrix["0v2"].grid).toEqual(inputMatrix["0v2"].grid);
    expect(outputMatrix["0v3"].grid).toEqual([
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

    const outputMatrix = setToTrue(emptyInputMatrix, "Colin", "red");
    const outputGrid = outputMatrix["0v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("The item order does not matter", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrix = setToTrue(emptyInputMatrix, "red", "Colin");
    const outputGrid = outputMatrix["0v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);

    const outputMatrix2 = setToTrue(emptyInputMatrix, "Colin", "red");
    const outputGrid2 = outputMatrix2["0v3"].grid;
    expect(outputGrid2).toEqual(expectedGrid);
  });

  test("It also works if the item is not a string", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrix = setToTrue(emptyInputMatrix, 1, "red");
    const outputGrid = outputMatrix["1v3"].grid;
    expect(outputGrid).toEqual(expectedGrid);
  });

  test("It should not change the input matrix", () => {
    const expectedGrid = [
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ];

    const outputMatrix = setToTrue(emptyInputMatrix, "Colin", "red");
    expect(outputMatrix).not.toBe(emptyInputMatrix);
    expect(emptyInputMatrix["0v3"].grid).not.toEqual(expectedGrid); //todo tobe vs toequal
    expect(emptyInputMatrix["0v3"].grid).not.toBe(expectedGrid);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("It should return the original grid if the specified position is already true", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [true, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["fly", "back", "breast"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = setToTrue(inputMatrix, "Colin", 1);
    expect(outputMatrix).toEqual(inputMatrix);
  });

  test("all other items in that row/col are set to false", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: [1, 2, 3],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["fly", "back", "breast"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrix = setToTrue(inputMatrix, "Colin", 2);
    expect(outputMatrix["0v1"].grid).toEqual(expectedGrid);
    expect(inputMatrix["0v1"].grid).not.toEqual(expectedGrid);
  });

  test("cascading can occur", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = setToTrue(inputMatrix, "Colin", "red");
    expect(outputMatrix["0v1"].grid).toEqual([
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ]);
    expect(outputMatrix["0v2"].grid).toEqual(inputMatrix["0v2"].grid);
    expect(outputMatrix["0v3"].grid).toEqual([
      [true, false, false],
      [false, null, null],
      [false, null, null],
    ]);
  });
});

describe("deduceSecondOrderFromTrue", () => {
  test("deduces a false value (itemA in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [false, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [null, null, null],
      [false, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "dog", "red");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (itemB in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [false, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [null, null, null],
      [false, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "red", "dog");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (item A in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, false, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [null, false, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "Colin", "dog");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).not.toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v2"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (item B in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, false, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [null, false, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "dog", "Colin");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).not.toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v2"].grid).toEqual(expectedGrid);
  });

  test("no changes if no additional info is known", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "dog", "red");
    expect(outputMatrix).toEqual(inputMatrix);
  });

  test("no changes if no additional info is known (swapped input order)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "red", "dog");
    expect(outputMatrix).toEqual(inputMatrix);
  });

  test("deduces a true value (itemA in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [false, null, null],
          [true, false, false],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "dog", "red");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a true value (itemB in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [false, null, null],
          [true, false, false],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [true, false, false],
      [false, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "red", "dog");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a true value (item A in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [false, true, false],
          [null, false, null],
          [null, false, null],
        ],
      },
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "Colin", "dog");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).not.toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v2"].grid).toEqual(expectedGrid);
  });

  test("deduces a true value (item B in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [false, true, false],
          [null, false, null],
          [null, false, null],
        ],
      },
    };

    const expectedGrid = [
      [false, true, false],
      [null, false, null],
      [null, false, null],
    ];

    const outputMatrix = deduceSecondOrderFromTrue(inputMatrix, "dog", "Colin");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).not.toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v2"].grid).toEqual(expectedGrid);
  });
});

describe("deduceSecondOrderFromFalse", () => {
  test("deduces a false value (itemA in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromFalse(
      inputMatrix,
      "Colin",
      "dog"
    );
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (itemB in row)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromFalse(
      inputMatrix,
      "dog",
      "Colin"
    );
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (item A in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromFalse(inputMatrix, "red", "dog");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("deduces a false value (item B in column)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [false, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const expectedGrid = [
      [false, null, null],
      [null, null, null],
      [null, null, null],
    ];

    const outputMatrix = deduceSecondOrderFromFalse(inputMatrix, "dog", "red");
    expect(outputMatrix["0v1"]).toEqual(inputMatrix["0v1"]);
    expect(outputMatrix["0v2"]).toEqual(inputMatrix["0v2"]);
    expect(outputMatrix["0v3"]).not.toEqual(inputMatrix["0v3"]);
    expect(outputMatrix["0v3"].grid).toEqual(expectedGrid);
  });

  test("no changes if no trues about inputs are known", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = deduceSecondOrderFromTrue(
      inputMatrix,
      "green",
      "mouse"
    );
    expect(outputMatrix).toEqual(inputMatrix);
  });

  test("no changes if no trues about inputs are known (swapped input order)", () => {
    const inputMatrix = {
      "0v1": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["dog", "cat", "mouse"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
      "0v2": {
        rowLabels: ["dog", "cat", "mouse"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [true, false, false],
          [false, null, null],
          [false, null, null],
        ],
      },
      "0v3": {
        rowLabels: ["Colin", "Sarah", "Fefe"],
        colLabels: ["red", "blue", "green"],
        grid: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      },
    };

    const outputMatrix = deduceSecondOrderFromTrue(
      inputMatrix,
      "mouse",
      "green"
    );
    expect(outputMatrix).toEqual(inputMatrix);
  });
});

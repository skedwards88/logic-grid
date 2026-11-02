import {validQOrCrossCategoryClue} from "./validQOrCrossCategoryClue";
import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import type {
  MatrixGrids,
  MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrixGrids";

const matrixLabels: MatrixLabels = {
  NameVsNumber: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels([1, 2, 3, 4]),
  },
  NameVsColor: {
    row: populateSparseTestEntryLabels(["Colin", "Sarah", "Fefe", "Meme"]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
  NumberVsColor: {
    row: populateSparseTestEntryLabels([1, 2, 3, 4]),
    column: populateSparseTestEntryLabels(["red", "blue", "green", "yellow"]),
  },
};

const completeMatrixGrids: MatrixGrids = {
  NameVsNumber: [
    [true, false, false, false],
    [null, false, true, false],
    [false, true, false, false],
    [false, false, false, true],
  ],

  NameVsColor: [
    [false, true, false, false],
    [null, false, false, false],
    [false, false, false, true],
    [false, false, true, null],
  ],

  NumberVsColor: [
    [false, true, false, false],
    [false, false, false, true],
    [false, false, true, false],
    [true, false, false, false],
  ],
};

describe("validQOrCrossCategoryClue, non-strict", () => {
  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 4];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["blue", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns true if both 'or's are null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(null);

    expect(validQ).toBe(true);
  });

  test("returns true if one 'or' is null and one is false", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 2];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [1, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [3, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 3];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixGridsCopy = structuredClone(completeMatrixGrids);
    validQOrCrossCategoryClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        orItems: ["blue", 2],
      },
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

describe("validQOrCrossCategoryClue, strict", () => {
  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 4];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are true", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["blue", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or's are null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(null);

    expect(validQ).toBe(false);
  });

  test("returns false if one 'or' is null and one is false", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 2];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);

    expect(validQ).toBe(false);
  });

  test("returns true if the first 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [1, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(false);

    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = ["red", 1];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(false);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(true);
  });

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [3, "red"];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(true);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(null);
    expect(validQ).toBe(true);
  });

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = ["red", 3];
    const validQ = validQOrCrossCategoryClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
      },
      strict: true,
    });

    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[0],
      }),
    ).toBe(null);
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: orItems[1],
      }),
    ).toBe(true);
    expect(validQ).toBe(true);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrixGridsCopy = structuredClone(completeMatrixGrids);
    validQOrCrossCategoryClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        orItems: ["blue", 2],
      },
      strict: true,
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

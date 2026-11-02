import {validQOrClue} from "./validQOrClue";
import {findMatrixValue} from "../matrixSearching/findMatrixValue";
import {populateSparseTestEntryLabels} from "../helpers/testHelpers";
import type {
  MatrixGrids,
  MatrixLabels,
} from "../puzzleGeneration/buildEmptyMatrix";

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
    [false, true, true, false],
    [false, true, null, null],
    [false, false, false, true],
  ],
  NameVsColor: [
    [false, true, false, false],
    [true, false, false, false],
    [false, false, false, true],
    [null, null, null, false],
  ],
  NumberVsColor: [
    [false, true, false, false],
    [false, false, false, true],
    [true, false, false, false],
    [false, false, true, false],
  ],
};

describe("validQOrClue, strict", () => {
  test("returns false if the item is any of the non-'or' items", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: allItems[0],
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Meme";
    const orItems: [string | number, string | number] = ["blue", "green"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Meme";
    const orItems: [string | number, string | number] = ["blue", "yellow"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const orItems: [string | number, string | number] = [1, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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

  test("returns true if the first 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems: [string | number, string | number] = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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

  test("returns true if the second 'or' is true and the other is false", () => {
    const itemA = "red";
    const orItems: [string | number, string | number] = [4, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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

  test("returns true if the second 'or' is true and the other is null", () => {
    const itemA = "Fefe";
    const orItems: [string | number, string | number] = [3, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    validQOrClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        orItems: ["red", "blue"],
        allItems: [],
      },
      strict: true,
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

describe("validQOrClue, non-strict", () => {
  test("returns false if the item is any of the non-'or' items", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    expect(
      findMatrixValue({
        matrixGrids: completeMatrixGrids,
        matrixLabels,
        itemA,
        itemB: allItems[0],
      }),
    ).toBe(true);
    expect(validQ).toBe(false);
  });

  test("returns false if both 'or' values are false", () => {
    const itemA = "Colin";
    const orItems: [string | number, string | number] = [2, 4];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Sarah";
    const orItems: [string | number, string | number] = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Meme";
    const orItems: [string | number, string | number] = ["blue", "green"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Meme";
    const orItems: [string | number, string | number] = ["blue", "yellow"];
    const allItems = ["red", "blue", "green", "yellow"];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const orItems: [string | number, string | number] = [1, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Fefe";
    const orItems: [string | number, string | number] = [2, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "red";
    const orItems: [string | number, string | number] = [4, 3];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    const itemA = "Fefe";
    const orItems: [string | number, string | number] = [3, 2];
    const allItems = [1, 2, 3, 4];
    const validQ = validQOrClue({
      matrixGrids: completeMatrixGrids,
      matrixLabels,
      clueParameters: {
        itemA,
        orItems,
        allItems,
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
    validQOrClue({
      matrixGrids: matrixGridsCopy,
      matrixLabels,
      clueParameters: {
        itemA: "Colin",
        orItems: ["red", "blue"],
        allItems: [],
      },
    });
    expect(matrixGridsCopy).toEqual(completeMatrixGrids);
  });
});

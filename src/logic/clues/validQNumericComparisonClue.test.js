import {validQNumericComparisonClue} from "./validQNumericComparisonClue";

describe("validQNumericComparisonClue, non-strict, exact diff", () => {
  test("returns true if both items are known and they are separated by the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by the exact diff even if one item is 0", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [0, 2, 3, 4];
    const actualNumericDiff = 4;
    const numericDiffClue = 4;
    const matrix = {
      NumberVsColor: {
        rowLabels: [0, 2, 3, 4],
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and they are separated by more than the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by less than the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by the negative exact diff", () => {
    const greaterItem = "blue";
    const lesserItem = "yellow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "blue";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "Sarah";
    const lesserItem = "Colin";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, null, null, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the lesser item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the greater item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });
});

describe("validQNumericComparisonClue, strict, exact diff", () => {
  test("returns true if both items are known and they are separated by the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by the exact diff even if one item is 0", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [0, 2, 3, 4];
    const actualNumericDiff = 4;
    const numericDiffClue = 4;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and they are separated by more than the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by less than the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by the negative exact diff", () => {
    const greaterItem = "blue";
    const lesserItem = "yellow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "blue";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "Sarah";
    const lesserItem = "Colin";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, null, null, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("does not modify the input matrix when validating the clue", () => {
    const matrix = {
      NameVsNumber: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: [1, 2, 3, 4],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NameVsColor: {
        rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: [1, 2, 3, 4],
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const matrixCopy = JSON.parse(JSON.stringify(matrix));
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    validQNumericComparisonClue({
      matrix: matrixCopy,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });
    expect(matrixCopy).toEqual(matrix);
  });
});

describe("validQNumericComparisonClue, non-strict, non-exact diff", () => {
  test("returns true if both items are known and they are separated by the given diff", () => {
    const greaterItem = "green";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by the given diff even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "red";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by more than the diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and they are separated by less than the diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by the negative diff", () => {
    const greaterItem = "blue";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the lesser item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the greater item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });
});

describe("validQNumericComparisonClue, strict, non-exact diff", () => {
  test("returns true if both items are known and they are separated by the given diff", () => {
    const greaterItem = "green";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by the given diff even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "red";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and they are separated by more than the diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and they are separated by less than the diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if both items are known and they are separated by the negative diff", () => {
    const greaterItem = "blue";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns true if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });
});

describe("validQNumericComparisonClue, non-strict, unknown diff", () => {
  test("returns true if both items are known and the greater item is greater than the lesser item", () => {
    const greaterItem = "green";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and the greater item is greater than the lesser item e even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "red";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and the greater item is less than the lesser item", () => {
    const greaterItem = "blue";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns true if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(true);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the lesser item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });

  test("returns false if the greater item is all falses", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
    });

    expect(validQ).toBe(false);
  });
});

describe("validQNumericComparisonClue, strict, unknown diff", () => {
  test("returns true if both items are known and the greater item is greater than the lesser item", () => {
    const greaterItem = "green";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns true if both items are known and the greater item is greater than the lesser item even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "red";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };

    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(true);
  });

  test("returns false if both items are known and the greater item is less than the lesser item", () => {
    const greaterItem = "blue";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the greater item is known but the lesser item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the greater item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "green";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the lesser item is known but the greater item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if only the lesser item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but both items have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the lesser item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but the greater item does not have options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });

  test("returns false if neither item is known but neither item has options to be valid", () => {
    const greaterItem = "yellow";
    const lesserItem = "blue";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsColor: {
        rowLabels: numericLabels,
        colLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },
    };
    const validQ = validQNumericComparisonClue({
      matrix: matrix,
      clueParameters: {
        greaterItem,
        lesserItem,
        numericLabels,
        actualNumericDiff,
        numericDiffClue,
      },
      strict: true,
    });

    expect(validQ).toBe(false);
  });
});

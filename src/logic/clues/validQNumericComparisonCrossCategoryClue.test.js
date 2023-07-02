import {validQNumericComparisonCrossCategoryClue} from "./validQNumericComparisonCrossCategoryClue";

describe("validQNumericComparisonCrossCategoryClue, non-strict, exact diff", () => {
  test("returns true if both items are known and they are separated by the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and they are separated by the exact diff even if one item is 0", () => {
    const greaterItem = "yellow";
    const lesserItem = "dog";
    const numericLabels = [0, 2, 3, 4];
    const actualNumericDiff = 4;
    const numericDiffClue = 4;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: [0, 2, 3, 4],
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: [0, 2, 3, 4],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "ape";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const greaterItem = "ape";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the lesser item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the greater item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

describe("validQNumericComparisonCrossCategoryClue, strict, exact diff", () => {
  test("returns true if both items are known and they are separated by the exact diff", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are set to each other", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and they are separated by the exact diff even if one item is 0", () => {
    const greaterItem = "yellow";
    const lesserItem = "dog";
    const numericLabels = [0, 2, 3, 4];
    const actualNumericDiff = 4;
    const numericDiffClue = 4;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "ape";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const greaterItem = "cat";
    const lesserItem = "red";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
      NumberVsAnimal: {
        rowLabels: [1, 2, 3, 4],
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: [1, 2, 3, 4],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const matrixCopy = JSON.parse(JSON.stringify(matrix));
    const greaterItem = "yellow";
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 2;
    validQNumericComparisonCrossCategoryClue({
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

describe("validQNumericComparisonCrossCategoryClue, non-strict, non-exact diff", () => {
  test("returns true if both items are known and they are separated by the given diff", () => {
    const greaterItem = "green";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and they are separated by the given diff even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "dog";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the greater item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the greater item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

describe("validQNumericComparisonCrossCategoryClue, strict, non-exact diff", () => {
  test("returns true if both items are known and they are separated by the given diff", () => {
    const greaterItem = "green";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and they are separated by the given diff even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "dog";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "dog";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = 1;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = 2;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

describe("validQNumericComparisonCrossCategoryClue, non-strict, unknown diff", () => {
  test("returns true if both items are known and the greater item is greater than the lesser item", () => {
    const greaterItem = "green";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and the greater item is greater than the lesser item e even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "dog";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the lesser item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, true, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
  test("returns false if the greater item has more than one true", () => {
    const greaterItem = "yellow";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

describe("validQNumericComparisonCrossCategoryClue, strict, unknown diff", () => {
  test("returns true if both items are known and the greater item is greater than the lesser item", () => {
    const greaterItem = "green";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns false if the items are equal to each other", () => {
    const greaterItem = "blue";
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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

  test("returns true if both items are known and the greater item is greater than the lesser item even if one item is 0", () => {
    const greaterItem = "green";
    const lesserItem = "dog";
    const numericLabels = [0, 1, 2, 3];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };

    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 2;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [true, false, false, false],
          [false, true, false, false],
          [false, false, true, false],
          [false, false, false, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, true],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cow";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, false, null],
          [null, null, false, null],
          [null, null, null, true],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, null],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, true, null, null],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, false, null, null],
          [null, false, null, null],
          [null, null, null, null],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, false],
          [null, null, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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
    const lesserItem = "cat";
    const numericLabels = [1, 2, 3, 4];
    const actualNumericDiff = 3;
    const numericDiffClue = undefined;
    const matrix = {
      NumberVsAnimal: {
        rowLabels: numericLabels,
        columnLabels: ["dog", "cat", "cow", "ape"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },
      NumberVsColor: {
        rowLabels: numericLabels,
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, false, null, null],
          [null, null, null, null],
          [null, false, null, false],
          [null, null, null, false],
        ],
      },

      AnimalVsColor: {
        rowLabels: ["dog", "cat", "cow", "ape"],
        columnLabels: ["red", "blue", "green", "yellow"],
        grid: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
      },
    };
    const validQ = validQNumericComparisonCrossCategoryClue({
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

import {gridsEqualQ} from "./gridsEqualQ";

describe("gridsEqualQ", () => {
  test("returns true if the grids are equal", () => {
    const gridA = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    const gridB = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    expect(gridsEqualQ(gridA, gridB)).toBe(true);
  });

  test("returns false if the grids are not equal", () => {
    const gridA = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    const gridB = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, true, false],
    ];
    expect(gridsEqualQ(gridA, gridB)).toBe(false);
  });

  test("throws an error if input is not an array", () => {
    const gridA = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    const gridB = {
      a: [
        [true, false, false],
        [false, false, true],
        [false, true, false],
        [true, true, false],
      ],
    };

    expect(() => gridsEqualQ(gridA, gridB)).toThrow(
      "gridsEqualQ: Inputs are not arrays",
    );
  });

  test("throws an error if inputs are different lengths", () => {
    const gridA = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    const gridB = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
    ];

    expect(() => gridsEqualQ(gridA, gridB)).toThrow(
      "gridsEqualQ: Input grids are different lengths",
    );
  });

  test("throws an error if a row is not an array", () => {
    const gridA = [
      [true, false, false],
      true,
      [false, true, false],
      [true, false, false],
    ];
    const gridB = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, true, false],
    ];

    expect(() => gridsEqualQ(gridA, gridB)).toThrow(
      "arraysEqualQ: Inputs are not arrays",
    );
  });

  test("throws an error if rows are different lengths", () => {
    const gridA = [
      [true, false, false],
      [true],
      [false, true, false],
      [true, false, false],
    ];
    const gridB = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, true, false],
    ];

    expect(() => gridsEqualQ(gridA, gridB)).toThrow(
      "arraysEqualQ: Arrays are different lengths",
    );
  });
});

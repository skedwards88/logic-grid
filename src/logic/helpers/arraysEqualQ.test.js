import {arraysEqualQ} from "./arraysEqualQ";

describe("arraysEqualQ", () => {
  test("returns true if the arrays are equal (array of bools)", () => {
    const arrayA = [true, false, false];
    const arrayB = [true, false, false];
    expect(arraysEqualQ(arrayA, arrayB)).toBe(true);
  });

  test("returns true if the arrays are equal", () => {
    const arrayA = [true, false, 1, undefined, null, "cat"];
    const arrayB = [true, false, 1, undefined, null, "cat"];
    expect(arraysEqualQ(arrayA, arrayB)).toBe(true);
  });

  test("returns false if the arrays are not equal", () => {
    const arrayA = [true, false, false];
    const arrayB = [true, true, false];
    expect(arraysEqualQ(arrayA, arrayB)).toBe(false);
  });

  test("throws an error if input is not an array", () => {
    const arrayA = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [true, false, false],
    ];
    const arrayB = {
      a: [
        [true, false, false],
        [false, false, true],
        [false, true, false],
        [true, true, false],
      ],
    };

    expect(() => arraysEqualQ(arrayA, arrayB)).toThrow(
      "arraysEqualQ: Inputs are not arrays",
    );
  });

  test("throws an error if inputs are different lengths", () => {
    const arrayA = [true, false, false];
    const arrayB = [true, false, false, false];

    expect(() => arraysEqualQ(arrayA, arrayB)).toThrow(
      "arraysEqualQ: Arrays are different lengths",
    );
  });
});

import {getNumericDiff} from "./getNumericDiff.js";

describe("getNumericDiff", () => {
  test("does normal subtraction on integers", () => {
    expect(getNumericDiff(4, 5)).toEqual(-1);

    expect(getNumericDiff(5, 4)).toEqual(1);
  });

  test("does expected human subtraction on decimals", () => {
    const numberA = 3.6;
    const numberB = 3.8;
    const unregulatedSubtraction = numberB - numberA;

    expect(getNumericDiff(numberB, numberA)).toEqual(0.2);

    expect(getNumericDiff(numberB, numberA)).not.toEqual(
      unregulatedSubtraction,
    );
  });

  test("retains sign", () => {
    expect(getNumericDiff(3.6, 3.8)).toEqual(-0.2);

    expect(getNumericDiff(3.6, 3.4)).toEqual(0.2);
  });

  test("drops terminal zeros", () => {
    const sum = getNumericDiff(3.8, 3.6);

    expect(sum).toEqual(0.2);

    expect(sum.toString()).toEqual("0.2");

    expect(sum.toString()).not.toEqual("0.20");
  });
});

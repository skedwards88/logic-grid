import {getNumericDiff} from "./getNumericDiff";

describe("getNumericDiff", () => {
  test("does normal subtraction on integers", () => {
    expect(getNumericDiff(4, 5)).toStrictEqual(-1);

    expect(getNumericDiff(5, 4)).toStrictEqual(1);
  });

  test("does expected human subtraction on decimals", () => {
    const numberA = 3.6;
    const numberB = 3.8;
    const unregulatedSubtraction = numberB - numberA;

    expect(getNumericDiff(numberB, numberA)).toStrictEqual(0.2);

    expect(getNumericDiff(numberB, numberA)).not.toStrictEqual(
      unregulatedSubtraction,
    );
  });

  test("retains sign", () => {
    expect(getNumericDiff(3.6, 3.8)).toStrictEqual(-0.2);

    expect(getNumericDiff(3.6, 3.4)).toStrictEqual(0.2);
  });

  test("drops terminal zeros", () => {
    const sum = getNumericDiff(3.8, 3.6);

    expect(sum).toStrictEqual(0.2);

    expect(sum.toString()).toStrictEqual("0.2");

    expect(sum.toString()).not.toStrictEqual("0.20");
  });
});

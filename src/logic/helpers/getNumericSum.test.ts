import {getNumericSum} from "./getNumericSum";

describe("getNumericSum", () => {
  test("does normal addition on integers", () => {
    expect(getNumericSum(4, 5)).toStrictEqual(9);

    expect(getNumericSum(5, 4)).toStrictEqual(9);
  });

  test("does expected human addition on decimals", () => {
    const numberA = 0.1;
    const numberB = 0.2;
    const unregulatedAddition = numberB + numberA;

    expect(getNumericSum(numberB, numberA)).toStrictEqual(0.3);

    expect(getNumericSum(numberB, numberA)).not.toStrictEqual(
      unregulatedAddition,
    );
  });

  test("drops terminal zeros", () => {
    const numberA = 0.1;
    const numberB = 0.2;
    const sum = getNumericSum(numberB, numberA);

    expect(sum).toStrictEqual(0.3);

    expect(sum.toString()).toStrictEqual("0.3");

    expect(sum.toString()).not.toStrictEqual("0.30");
  });
});

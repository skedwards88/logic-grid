import {getNumericSum} from "./getNumericSum.js";

describe("getNumericSum", () => {
  test("does normal addition on integers", () => {
    expect(getNumericSum(4, 5)).toEqual(9);

    expect(getNumericSum(5, 4)).toEqual(9);
  });

  test("does expected human addition on decimals", () => {
    const numberA = 0.1;
    const numberB = 0.2;
    const unregulatedAddition = numberB + numberA;

    expect(getNumericSum(numberB, numberA)).toEqual(0.3);

    expect(getNumericSum(numberB, numberA)).not.toEqual(unregulatedAddition);
  });

  test("drops terminal zeros", () => {
    const numberA = 0.1;
    const numberB = 0.2;
    const sum = getNumericSum(numberB, numberA);

    expect(sum).toEqual(0.3);

    expect(sum.toString()).toEqual("0.3");

    expect(sum.toString()).not.toEqual("0.30");
  });
});

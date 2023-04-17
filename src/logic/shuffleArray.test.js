// shuffle.test.js
import {shuffleArray} from "./shuffleArray";

describe("shuffleArray", () => {
  test("returns an array with the same length as the input", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...inputArray]);
    expect(shuffledArray.length).toBe(inputArray.length);
  });

  test("returns an array with the same elements as the input", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...inputArray]);
    expect(shuffledArray.sort()).toEqual(inputArray.sort());
  });

  test("should not return the same order as the input", () => {
    // this test can fail due to chance. Using a longer array to make this less likely.
    const inputArray = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const shuffledArray = shuffleArray([...inputArray]);
    expect(shuffledArray).not.toEqual(inputArray);
  });

  test("the input array is unchanged", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const inputArrayCopy = [...inputArray];
    const shuffledArray = shuffleArray(inputArray);
    expect(shuffledArray).not.toEqual(inputArray);
    expect(inputArrayCopy).toEqual(inputArray);
  });
});

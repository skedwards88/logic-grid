import {pickRandom, pickRandomIndex, pickRandoms} from "./pickRandom";

describe("pickRandom", () => {
  test("returns an element that was in the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomElement = pickRandom(inputArray);
    expect(inputArray).toContain(randomElement);
  });

  test("returns a random element from the input array", () => {
    const inputArray = [
      "act",
      "bat",
      "cat",
      "dog",
      "fish",
      "monkey",
      "red",
      "orange",
      "yellow",
      "green",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ];
    const numberOfIterations = 10000;
    const expectedDistribution = 1 / inputArray.length;
    let counts = inputArray.reduce((dict, key) => ({...dict, [key]: 0}), {});

    for (let i = 0; i < numberOfIterations; i++) {
      const item = pickRandom(inputArray);
      counts[item] = counts[item] + 1;
    }

    for (const key in counts) {
      const actualDistribution = counts[key] / numberOfIterations;
      expect(actualDistribution).toBeCloseTo(expectedDistribution, 1);
    }
  });
});

describe("pickRandoms", () => {
  test("returns n elements from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomElements = pickRandoms(inputArray, 3);

    expect(inputArray).toEqual(expect.arrayContaining(randomElements));
    expect(randomElements.length).toBe(3);
  });

  test("does not return more elements if the number of requested items exceeds the length of the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomElements = pickRandoms(inputArray, 30);

    expect(inputArray).toEqual(expect.arrayContaining(randomElements));
    expect(randomElements).toEqual(expect.arrayContaining(inputArray));
    expect(randomElements.length).toBe(inputArray.length);
  });

  test("returns random values", () => {
    const inputArray = [
      "act",
      "bat",
      "cat",
      "dog",
      "fish",
      "monkey",
      "red",
      "orange",
      "yellow",
      "green",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ];
    const numberOfItems = 3;
    const numberOfIterations = 1000;
    const expectedDistribution = 1 / inputArray.length;
    const counts = inputArray.reduce((dict, key) => ({...dict, [key]: 0}), {});

    for (let i = 0; i < numberOfIterations; i++) {
      const items = pickRandoms(inputArray, numberOfItems);
      for (const item of items) {
        counts[item] = counts[item] + 1;
      }
    }

    for (const key in counts) {
      const actualDistribution =
        counts[key] / (numberOfIterations * numberOfItems);
      expect(actualDistribution).toBeCloseTo(expectedDistribution, 1);
    }
  });
});

describe("pickRandomIndex", () => {
  test("returns an index from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomIndex = pickRandomIndex(inputArray);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThan(inputArray.length);
  });

  test("returns a random index from the input array", () => {
    const inputArray = [
      "act",
      "bat",
      "cat",
      "dog",
      "fish",
      "monkey",
      "red",
      "orange",
      "yellow",
      "green",
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
    ];
    const numberOfIterations = 10000;
    const expectedDistribution = 1 / inputArray.length;
    let counts = inputArray.reduce(
      (dict, key, index) => ({...dict, [index]: 0}),
      {},
    );

    for (let i = 0; i < numberOfIterations; i++) {
      const randomIndex = pickRandomIndex(inputArray);
      counts[randomIndex] = counts[randomIndex] + 1;
    }
    for (const key in counts) {
      const actualDistribution = counts[key] / numberOfIterations;
      expect(actualDistribution).toBeCloseTo(expectedDistribution, 1);
    }
  });
});

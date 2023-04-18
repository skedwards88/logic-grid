import {pickRandom, pickRandomIndex, pickRandoms} from "./pickRandom";

describe("pickRandom", () => {
  test("returns a random element from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomElement = pickRandom(inputArray);
    expect(inputArray).toContain(randomElement);
  });

  test("returns a random element from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const numberOfIterations = 1000;
    const expectedDistribution = 1 / inputArray.length;
    const counts = inputArray.reduce((dict, key) => ({...dict, [key]: 0}), {});

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
  test("returns n random elements from the input array", () => {
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

  test("pickRandoms returns random values", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
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
  test("returns a random index from the input array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const randomIndex = pickRandomIndex(inputArray);
    expect(randomIndex).toBeGreaterThanOrEqual(0);
    expect(randomIndex).toBeLessThan(inputArray.length);
  });

  test("returns a random index from the input array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const numIterations = 100000;
    const expectedDistribution = inputArray.map(
      () => numIterations / inputArray.length,
    );
    const observedDistribution = inputArray.map(() => 0);
    for (let i = 0; i < numIterations; i++) {
      const randomIndex = pickRandomIndex(inputArray);
      observedDistribution[randomIndex]++;
    }
    const chiSquared = observedDistribution.reduce((sum, observed, index) => {
      const expected = expectedDistribution[index];
      return sum + (observed - expected) ** 2 / expected;
    }, 0);
    const criticalValue = 11.07; // for 4 degrees of freedom and alpha = 0.05
    expect(chiSquared).toBeLessThan(criticalValue);
  });
});

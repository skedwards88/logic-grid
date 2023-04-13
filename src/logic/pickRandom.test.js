import { pickRandom, pickRandomIndex } from "./pickRandom";

describe("pickRandom", () => {
  test("returns a random element from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const randomElement = pickRandom(inputArray);
    expect(inputArray).toContain(randomElement);
  });

  test("returns a random element from the input array", () => {
    const inputArray = ["act", "bat", "cat", "dog", "fish"];
    const numIterations = 100000;
    const expectedDistribution = inputArray.map(
      () => numIterations / inputArray.length
    );
    const observedDistribution = inputArray.map(() => 0);
    for (let i = 0; i < numIterations; i++) {
      const randomElement = pickRandom(inputArray);
      observedDistribution[inputArray.indexOf(randomElement)]++;
    }
    const chiSquared = observedDistribution.reduce((sum, observed, index) => {
      const expected = expectedDistribution[index];
      return sum + (observed - expected) ** 2 / expected;
    }, 0);
    const criticalValue = 11.07; // for 4 degrees of freedom and alpha = 0.05
    expect(chiSquared).toBeLessThan(criticalValue);
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
      () => numIterations / inputArray.length
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

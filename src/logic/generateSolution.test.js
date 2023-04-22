import {generateSolution} from "./generateSolution";

describe("generateSolution", () => {
  test("given a list of category labels, chooses a set of combinations (same number of categories and items per category)", () => {
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
    ];
    const solution = generateSolution(labels);
    expect(solution.length).toBe(labels[0].length);
    for (const set of solution) {
      expect(set.length).toBe(labels.length);
    }
  });

  test("given a list of category labels, chooses a set of combinations (4 categories, 5 items per)", () => {
    const labels = [
      ["cat", "dog", "cow", "horse", "spider"],
      [1, 2, 3, 4, 5],
      ["red", "blue", "green", "orange", "yellow"],
      ["Tom", "Bob", "Jim", "Joe", "Abe"],
    ];
    const solution = generateSolution(labels);
    expect(solution.length).toBe(labels[0].length);
    for (const set of solution) {
      expect(set.length).toBe(labels.length);
    }
  });

  test("given a list of category labels, chooses a set of combinations (4 categories, 3 items per)", () => {
    const labels = [
      ["cat", "dog", "cow"],
      [1, 2, 3],
      ["red", "blue", "green"],
      ["Tom", "Bob", "Jim"],
    ];
    const solution = generateSolution(labels);
    expect(solution.length).toBe(labels[0].length);
    for (const set of solution) {
      expect(set.length).toBe(labels.length);
    }
  });
});

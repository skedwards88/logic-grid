import { puzzleSolvedQ } from "./puzzleSolvedQ.js";


describe('puzzleSolvedQ', () => {
  test('returns true when all items in all grids are not null', () => {
    const solutionMatrix = {
      1: {
        grid: [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ],
      },
      2: {
        grid: [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ],
      },
    };
    expect(puzzleSolvedQ(solutionMatrix)).toBe(true);
  });

  test('returns false when at least one item in any grid is null', () => {
    const solutionMatrix = {
      1: {
        grid: [
          [true, false, false],
          [false, null, false],
          [false, false, true],
        ],
      },
      2: {
        grid: [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ],
      },
    };
    expect(puzzleSolvedQ(solutionMatrix)).toBe(false);
  });
});
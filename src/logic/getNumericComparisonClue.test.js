import {getNumericComparisonClue} from "./getNumericComparisonClue";
import * as pickRandomModule from "./pickRandom";
import * as shuffleArrayModule from "./shuffleArray";

const solutionMatrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
};
const emptyDerivedMatrix = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "0v3": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
  "1v3": {
    rowLabels: [1, 2, 3, 4],
    colLabels: ["red", "blue", "green", "yellow"],
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ],
  },
};
describe("getNumericComparisonClue", () => {
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3); // itemBIndex
    jest.spyOn(shuffleArrayModule, 'shuffleArray').mockImplementation((arr) => arr);



    const expectedClue = "Colin is less than Meme";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();

  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1); // itemBIndex
    jest.spyOn(shuffleArrayModule, 'shuffleArray').mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Sarah";
    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).not.toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();

  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3); // itemBIndex
    jest.spyOn(shuffleArrayModule, 'shuffleArray').mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than yellow";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();

  });


  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1); // itemBIndex
    jest.spyOn(shuffleArrayModule, 'shuffleArray').mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than blue";
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(2);

    const newDerivedMatrix = clue.clueLogic(emptyDerivedMatrix);
    expect(newDerivedMatrix["0v3"]["grid"]).toEqual(
      emptyDerivedMatrix["0v3"]["grid"],
    );
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(
      emptyDerivedMatrix["0v1"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).not.toEqual(
      emptyDerivedMatrix["1v3"]["grid"],
    );
    expect(newDerivedMatrix["1v3"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();

  });

  test("returns a clue object with a writtenClue string and clueLogic function", () => {
    const clue = getNumericComparisonClue(solutionMatrix);

    expect(clue).toHaveProperty("writtenClue");
    expect(clue).toHaveProperty("clueLogic");
    expect(typeof clue.writtenClue).toBe("string");
    expect(typeof clue.clueLogic).toBe("function");
  });

  test("does not modify the solution matrix when generating the clue", () => {
    const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));
    const clue = getNumericComparisonClue(matrixCopy);
    expect(matrixCopy).toEqual(solutionMatrix);
  });

  test("does not modify the derived matrix when applying the clue", () => {
    const derivedCopy = JSON.parse(JSON.stringify(emptyDerivedMatrix));
    const clue = getNumericComparisonClue(solutionMatrix);
    const newDerived = clue.clueLogic(derivedCopy);

    expect(derivedCopy).toEqual(emptyDerivedMatrix);
    expect(newDerived).not.toEqual(emptyDerivedMatrix);
  });
});

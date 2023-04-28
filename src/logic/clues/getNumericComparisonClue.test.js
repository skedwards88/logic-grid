import {getNumericComparisonClue} from "./getNumericComparisonClue";
import * as pickRandomModule from "../helpers/pickRandom";
import * as shuffleArrayModule from "../helpers/shuffleArray";

describe("getNumericComparisonClue, evenly spaced and diff = 1", () => {
  const numericLabels = [1, 2, 3, 4];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    },
  };
  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Meme";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Sarah";
    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than yellow";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than blue";
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
    console.log("$$$$");
    console.log(clue.writtenClue);
    console.log(JSON.stringify(newDerivedMatrix["0v1"]["grid"]));
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

describe("getNumericComparisonClue, evenly spaced but diff > 1", () => {
  const numericLabels = [10, 20, 30, 40];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    },
  };
  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Meme";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Sarah";
    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than yellow";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than blue";
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
    console.log("$$$$");
    console.log(clue.writtenClue);
    console.log(JSON.stringify(newDerivedMatrix["0v1"]["grid"]));
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

describe("getNumericComparisonClue, not evenly spaced", () => {
  const numericLabels = [10, 15, 30, 40];
  const emptyDerivedMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    },
  };
  const solutionMatrix = {
    "0v1": {
      rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
      colLabels: numericLabels,
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
      rowLabels: numericLabels,
      colLabels: ["red", "blue", "green", "yellow"],
      grid: [
        [true, false, false, false],
        [false, true, false, false],
        [false, false, true, false],
        [false, false, false, true],
      ],
    },
  };
  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes)', () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Meme";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = "Colin is less than Sarah";
    const expectedGrid = [
      [null, null, null, false],
      [false, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than yellow";
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(undefined); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = "red is less than blue";
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, null, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [null, null, false, false],
      [null, null, null, null],
      [null, null, null, null],
      [false, false, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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
    console.log("$$$$");
    console.log(clue.writtenClue);
    console.log(JSON.stringify(newDerivedMatrix["0v1"]["grid"]));
    expect(newDerivedMatrix["0v1"]["grid"]).toEqual(expectedGrid);

    jest.restoreAllMocks();
  });

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of extremes, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(3) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr);

    const expectedClue = `Colin is ${mockedDiff} less than Meme`;
    const expectedGrid = [
      [true, false, false, false],
      [false, null, null, false],
      [false, null, null, false],
      [false, false, false, true],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 1)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[1]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 2)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[2]);

    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [null, false, null, null],
      [null, false, null, null],
      [false, null, null, null],
      [false, null, null, null],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

  test('returns a "numeric comparison" clue for a given solution matrix (using mocked random values, case of adjacents, swapped row vs column, known diff 3)', () => {
    const mockedDiff = Math.abs(numericLabels[0] - numericLabels[3]);
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(0) // itemAIndex
      .mockReturnValueOnce(1) // itemBIndex
      .mockReturnValueOnce(mockedDiff); // diff
    jest
      .spyOn(shuffleArrayModule, "shuffleArray")
      .mockImplementation((arr) => arr.reverse());

    const expectedClue = `red is ${mockedDiff} less than blue`;
    const expectedGrid = [
      [true, false, false, false],
      [false, false, null, null],
      [false, false, null, null],
      [false, true, false, false],
    ];

    const clue = getNumericComparisonClue(solutionMatrix);
    expect(clue.writtenClue).toBe(expectedClue);
    expect(pickRandomModule.pickRandom).toHaveBeenCalledTimes(3);

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

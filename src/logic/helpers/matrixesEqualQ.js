export function gridEqualQ(gridA, gridB) {
  if (!Array.isArray(gridA) || !Array.isArray(gridB)) return false;
  if (gridA.length !== gridB.length) return false;

  for (let i = 0; i < gridA.length; i++) {
    const innerArr1 = gridA[i];
    const innerArr2 = gridB[i];

    if (
      !Array.isArray(innerArr1) ||
      !Array.isArray(innerArr2) ||
      innerArr1.length !== innerArr2.length
    ) {
      return false;
    }

    for (let j = 0; j < innerArr1.length; j++) {
      if (innerArr1[j] !== innerArr2[j]) return false;
    }
  }

  return true;
}

export function matrixesEqualQ(matrixA, matrixB) {
  console.log("calling");
  // exit early if we got the exact same object
  if (matrixA === matrixB) return true;

  // exit early if we didn't get valid input
  if (
    typeof matrixA !== "object" ||
    typeof matrixB !== "object" ||
    !matrixA ||
    !matrixB
  )
    return false;
  // todo error instead

  // exit early if the matrixes don't have the same number of keys
  const matrixAKeys = Object.keys(matrixA);
  const matrixBKeys = Object.keys(matrixB);
  if (matrixAKeys.length !== matrixBKeys.length) return false;
  // todo error instead

  for (let key of matrixAKeys) {
    console.log(key);
    // return early if the other matrix doesn't include the key
    // todo error instead
    if (!matrixBKeys.includes(key)) return false;

    const matrixAGrid = matrixA[key].grid;
    const matrixBGrid = matrixB[key].grid;

    if (!gridEqualQ(matrixAGrid, matrixBGrid)) return false;
  }

  return true;
}

const dataStructure = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, false, false],
      [false, null, false, null],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  // ... other data
};

const dataStructure2 = {
  "0v1": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: [1, 2, 3, 4],
    grid: [
      [true, false, true, false],
      [false, null, false, null],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  "0v2": {
    rowLabels: ["Colin", "Sarah", "Fefe", "Meme"],
    colLabels: ["fly", "back", "breast", "free"],
    grid: [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ],
  },
  // ... other data
};

// const dataStructure2 = { ...dataStructure }; // This is a shallow copy, you can replace it with a deep copy if needed.

console.log(matrixesEqualQ(dataStructure, dataStructure2)); // This will output 'true' if the data structures are deeply equal.

export function arraysEqualQ(arrayA, arrayB) {
  if (!Array.isArray(arrayA) || !Array.isArray(arrayB)) {
    throw new Error("arraysEqualQ: Inputs are not arrays");
  }
  if (arrayA.length !== arrayB.length) {
    throw new Error("arraysEqualQ: Arrays are different lengths");
  }

  for (let index = 0; index < arrayA.length; index++) {
    if (arrayA[index] !== arrayB[index]) {
      return false;
    }
  }

  return true;
}

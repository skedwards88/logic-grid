export function puzzleSolvedQ(solutionMatrix) {
  for (const key in solutionMatrix) {
    const grid = solutionMatrix[key].grid;
    for (const row of grid) {
      for (const item of row) {
        if (item === null) {
          return false;
        }
      }
    }
  }
  return true;
}

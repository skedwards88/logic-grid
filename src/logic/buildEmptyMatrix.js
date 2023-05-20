export function buildEmptyMatrix(solutionMatrix) {
  const matrixCopy = JSON.parse(JSON.stringify(solutionMatrix));

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map((item) => null),
    );
    delete matrixCopy[key].rowDescriptionTemplates;
    delete matrixCopy[key].colDescriptionTemplates;
  }
  return matrixCopy;
}

import cloneDeep from "lodash.clonedeep";
export function buildEmptyMatrix(solutionMatrix) {
  const matrixCopy = cloneDeep(solutionMatrix);

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map(() => null),
    );
    delete matrixCopy[key].rowDescriptionTemplates;
    delete matrixCopy[key].columnDescriptionTemplates;
  }
  return matrixCopy;
}

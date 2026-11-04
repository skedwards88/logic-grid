import type {MatrixGrids} from "./generateSolutionMatrix";

export function buildEmptyMatrixGrids(
  solutionMatrixGrids: MatrixGrids,
): MatrixGrids {
  const matrixCopy = structuredClone(solutionMatrixGrids);

  for (const key in matrixCopy) {
    matrixCopy[key] = matrixCopy[key].map((row) => row.map(() => null));
  }
  return matrixCopy;
}

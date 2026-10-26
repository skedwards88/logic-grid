import cloneDeep from "lodash.clonedeep";

export type StringAxis = {
  kind: "string";
  labels: string[];
  displayLabels: string[];
  templates: {
    generateDescription: (value: string) => string;
    verb?: string;
  };
};

export type NumberAxis = {
  kind: "number";
  labels: number[];
  displayLabels: string[];
  templates: {
    generateDescription: (value: number) => string;
    generateDiffGreaterDescription: (value: number) => string;
    generateDiffLesserDescription: (value: number) => string;
    verb?: string;
  };
};

export type Axis = StringAxis | NumberAxis;

export type UnsolvedMatrix = {
  row: Axis;
  column: Axis;
  grid: (boolean | null)[][];
};

export type PuzzleMatrix = Record<string, UnsolvedMatrix>;

export function buildEmptyMatrix(solutionMatrix: PuzzleMatrix): PuzzleMatrix {
  const matrixCopy = cloneDeep(solutionMatrix);

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map(() => null),
    );
  }
  return matrixCopy;
}

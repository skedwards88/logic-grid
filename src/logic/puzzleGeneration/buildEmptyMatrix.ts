import cloneDeep from "lodash.clonedeep";

export type StringAxis = {
  kind: "string";
  labels: string[];
  templates: {
    generateDescription: (value: string) => string;
    verb?: string;
  };
};

export type NumberAxis = {
  kind: "number";
  labels: number[];
  templates: {
    generateDescription: (value: number) => string;
    generateDiffGreaterDescription: (value: number) => string;
    generateDiffLesserDescription: (value: number) => string;
    verb?: string;
  };
};

export type StringAxisWithDisplay = StringAxis & {
  displayLabels: string[];
};

export type NumberAxisWithDisplay = NumberAxis & {
  displayLabels: string[];
};

export type AxisWithDisplay = StringAxisWithDisplay | NumberAxisWithDisplay;

export type Axis = StringAxis | NumberAxis;

export type UnsolvedMatrix = {
  row: Axis;
  column: Axis;
  grid: (boolean | null)[][];
};

export type SolvedMatrix = {
  row: Axis;
  column: Axis;
  grid: boolean[][];
};

export type PuzzleMatrix = Record<string, UnsolvedMatrix>;
export type SolvedPuzzleMatrix = Record<string, SolvedMatrix>;

export function buildEmptyMatrix(solutionMatrix: PuzzleMatrix): PuzzleMatrix {
  const matrixCopy = cloneDeep(solutionMatrix);

  for (const key in matrixCopy) {
    matrixCopy[key].grid = matrixCopy[key].grid.map((row) =>
      row.map(() => null),
    );
  }
  return matrixCopy;
}

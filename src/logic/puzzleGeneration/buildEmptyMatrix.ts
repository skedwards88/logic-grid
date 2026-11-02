export type StringAxis = {
  kind: "string";
  values: string[];
  displayLabels: string[];
  templates: {
    generateDescription: (value: string) => string;
    verb?: string;
  };
};

export type NumberAxis = {
  kind: "number";
  values: number[];
  displayLabels: string[];
  templates: {
    generateDescription: (value: number) => string;
    generateDiffGreaterDescription: (value: number) => string;
    generateDiffLesserDescription: (value: number) => string;
    verb?: string;
  };
};

export type Axis = StringAxis | NumberAxis;

export type Grid = (boolean | null)[][];

export type Labels =
  | {
      values: string[];
      displayLabels: string[];
    }
  | {
      values: number[];
      displayLabels: string[];
    };

export type Templates =
  | {
      kind: "string";
      templates: {
        generateDescription: (value: string) => string;
        verb?: string;
      };
    }
  | {
      kind: "number";
      templates: {
        generateDescription: (value: number) => string;
        generateDiffGreaterDescription: (value: number) => string;
        generateDiffLesserDescription: (value: number) => string;
        verb?: string;
      };
    };

export type MatrixLabels = Record<
  string,
  {
    row: Labels;
    column: Labels;
  }
>;

export type MatrixTemplates = Record<
  string,
  {
    row: Templates;
    column: Templates;
  }
>;

export type MatrixGrids = Record<string, Grid>;

export function buildEmptyMatrixGrids(
  solutionMatrixGrids: MatrixGrids,
): MatrixGrids {
  const matrixCopy = structuredClone(solutionMatrixGrids);

  for (const key in matrixCopy) {
    matrixCopy[key] = matrixCopy[key].map((row) => row.map(() => null));
  }
  return matrixCopy;
}

import {
  type PuzzleMatrix,
  type TempBroadUnsolvedMatrix,
} from "../puzzleGeneration/buildEmptyMatrix";

const testDescription = (test: string | number): string => `${test}`;

const testTemplates = {
  description: testDescription,
  diffGreaterDescription: testDescription,
  diffLesserDescription: testDescription,
};

export function addTemplatesForTestMatrix(
  partialPuzzleMatrix: Record<
    string,
    Pick<TempBroadUnsolvedMatrix, "rowLabels" | "columnLabels" | "grid">
  >,
): PuzzleMatrix {
  return Object.fromEntries(
    Object.entries(partialPuzzleMatrix).map(([key, matrix]) => [
      key,
      {
        ...matrix,
        rowDescriptionTemplates: testTemplates,
        columnDescriptionTemplates: testTemplates,
      },
    ]),
  );
}

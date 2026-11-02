import {
  pickRandomItemFromArray,
  pickRandomIndexFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {
  type MatrixGrids,
  type MatrixLabels,
  type MatrixTemplates,
} from "../puzzleGeneration/buildEmptyMatrix";

export type NotClue = {
  writtenClue: string;
  crossedOff: boolean;
  clueType: "not";
  clueParameters: {
    itemA: string | number;
    itemB: string | number;
  };
};

// Generates a "not" clue
// e.g. "Colin is not blue"
export function getNotClue({
  solvedMatrixGrids,
  matrixLabels,
  matrixTemplates,
}: {
  solvedMatrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
  matrixTemplates: MatrixTemplates;
}): NotClue {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandomItemFromArray(Object.keys(solvedMatrixGrids));
  const columnLabels = matrixLabels[solutionKey].column.labels;
  const rowLabels = matrixLabels[solutionKey].row.labels;
  const grid = solvedMatrixGrids[solutionKey];

  // Choose a random row label (e.g. 'Colin')
  const rowIndex = pickRandomIndexFromArray(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // choose any of the falses from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const columnIndex = pickRandomItemFromArray(falseIndexes);

  const columnItem = columnLabels[columnIndex];

  // Overkill but I didn't find a better way to satisfy TS
  const rowDescription =
    matrixTemplates[solutionKey].row.kind === "number"
      ? matrixTemplates[solutionKey].row.templates.generateDescription(
          rowItem as number,
        )
      : matrixTemplates[solutionKey].row.templates.generateDescription(
          rowItem as string,
        );

  const columnDescription =
    matrixTemplates[solutionKey].column.kind === "number"
      ? matrixTemplates[solutionKey].column.templates.generateDescription(
          columnItem as number,
        )
      : matrixTemplates[solutionKey].column.templates.generateDescription(
          columnItem as string,
        );

  const [leadingDescription, trailingDescription] = shuffleArray([
    rowDescription,
    columnDescription,
  ]);
  let writtenClue = `${leadingDescription} is not ${trailingDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue,
    crossedOff: false,
    clueType: "not",
    clueParameters: {
      itemA: rowItem,
      itemB: columnItem,
    },
  };
}

import {
  pickRandomItemFromArray,
  pickRandomIndexFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import type {
  MatrixGrids,
  MatrixLabels,
  MatrixTemplates,
} from "../puzzleGeneration/generateSolutionMatrix";
import {generateTSHappyDescription} from "../helpers/generateTSHappyDescription";

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
  const columnLabels = matrixLabels[solutionKey].column.values;
  const rowLabels = matrixLabels[solutionKey].row.values;
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

  const rowDescription = generateTSHappyDescription(
    matrixTemplates[solutionKey].row,
    rowItem,
  );
  const columnDescription = generateTSHappyDescription(
    matrixTemplates[solutionKey].column,
    columnItem,
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

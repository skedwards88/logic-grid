import {
  pickRandomItemFromArray,
  pickRandomIndexFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {type PuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

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
export function getNotClue(solutionMatrix: PuzzleMatrix): NotClue {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandomItemFromArray(Object.keys(solutionMatrix));
  const columnLabels = solutionMatrix[solutionKey].column.labels;
  const rowLabels = solutionMatrix[solutionKey].row.labels;
  const grid = solutionMatrix[solutionKey].grid;

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
    solutionMatrix[solutionKey].row.kind === "number"
      ? solutionMatrix[solutionKey].row.templates.generateDescription(
          rowItem as number,
        )
      : solutionMatrix[solutionKey].row.templates.generateDescription(
          rowItem as string,
        );

  const columnDescription =
    solutionMatrix[solutionKey].column.kind === "number"
      ? solutionMatrix[solutionKey].column.templates.generateDescription(
          columnItem as number,
        )
      : solutionMatrix[solutionKey].column.templates.generateDescription(
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

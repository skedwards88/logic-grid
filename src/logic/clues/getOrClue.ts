import {
  pickRandomItemFromArray,
  pickRandomIndexFromArray,
} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {type SolvedPuzzleMatrix} from "../puzzleGeneration/buildEmptyMatrix";

export type OrClue = {
  writtenClue: string;
  crossedOff: boolean;
  clueType: "or";
  clueParameters: {
    itemA: string | number;
    orItems: [string | number, string | number];
    allItems: (string | number)[];
  };
};

// Generates an "or" clue
// e.g. "Colin is red or blue"
// which equates to "Colin is not green or yellow"
export function getOrClue(solutionMatrix: SolvedPuzzleMatrix): OrClue {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandomItemFromArray(Object.keys(solutionMatrix));
  const columnLabels = solutionMatrix[solutionKey].columnLabels;
  const rowLabels = solutionMatrix[solutionKey].rowLabels;
  const grid = solutionMatrix[solutionKey].grid;

  // Choose a random row label (e.g. 'Colin')
  const rowIndex = pickRandomIndexFromArray(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // get the 'true' from that row
  const columnIndexTrue = grid[rowIndex].indexOf(true);
  const columnItemTrue = columnLabels[columnIndexTrue];

  // choose any of the 'false's from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const columnIndexFalse = pickRandomItemFromArray(falseIndexes);
  const columnItemFalse = columnLabels[columnIndexFalse];

  const leadingDescription =
    solutionMatrix[solutionKey].rowDescriptionTemplates.description(rowItem);
  const trailingDescriptionTrue =
    solutionMatrix[solutionKey].columnDescriptionTemplates.description(
      columnItemTrue,
    );
  const trailingDescriptionFalse =
    solutionMatrix[solutionKey].columnDescriptionTemplates.description(
      columnItemFalse,
    );
  const [trailingDescriptionA, trailingDescriptionB] = shuffleArray([
    trailingDescriptionTrue,
    trailingDescriptionFalse,
  ]);
  let writtenClue = `${leadingDescription} is either ${trailingDescriptionA} or ${trailingDescriptionB}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue,
    crossedOff: false,
    clueType: "or",
    clueParameters: {
      itemA: rowItem,
      orItems: [columnItemTrue, columnItemFalse],
      allItems: columnLabels,
    },
  };
}

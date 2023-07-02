import { pickRandom, pickRandomIndex } from "../helpers/pickRandom.js";
import { shuffleArray } from "../helpers/shuffleArray.js";

// Generates a "not" clue
// e.g. "Colin is not blue"
export function getNotClue(solutionMatrix) {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandom(Object.keys(solutionMatrix));
  const columnLabels = solutionMatrix[solutionKey].columnLabels;
  const rowLabels = solutionMatrix[solutionKey].rowLabels;
  const grid = solutionMatrix[solutionKey].grid;

  // Choose a random row label (e.g. 'Colin')
  const rowIndex = pickRandomIndex(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // choose any of the falses from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const columnIndex = pickRandom(falseIndexes);

  const columnItem = columnLabels[columnIndex];

  const rowDescription =
    solutionMatrix[solutionKey].rowDescriptionTemplates.description(rowItem);
  const columnDescription =
    solutionMatrix[solutionKey].columnDescriptionTemplates.description(columnItem);
  const [leadingDescription, trailingDescription] = shuffleArray([
    rowDescription,
    columnDescription,
  ]);
  let writtenClue = `${leadingDescription} is not ${trailingDescription}.`;
  writtenClue = writtenClue.charAt(0).toUpperCase() + writtenClue.slice(1);

  return {
    writtenClue: writtenClue,
    clueType: "not",
    clueParameters: {
      itemA: rowItem,
      itemB: columnItem,
    },
  };
}

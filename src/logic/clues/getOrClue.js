import {pickRandom, pickRandomIndex} from "../helpers/pickRandom.js";

// Generates an "or" clue
// e.g. "Colin is red or blue"
// which equates to "Colin is not green or yellow"
export function getOrClue(solutionMatrix) {
  // choose a random grid in the solution matrix
  const solutionKey = pickRandom(Object.keys(solutionMatrix));
  const colLabels = solutionMatrix[solutionKey].colLabels;
  const rowLabels = solutionMatrix[solutionKey].rowLabels;
  const grid = solutionMatrix[solutionKey].grid;

  // Choose a random row label (e.g. 'Colin') // todo later randomize row vs col?
  const rowIndex = pickRandomIndex(rowLabels);
  const rowItem = rowLabels[rowIndex];

  // get the 'true' from that row
  const colIndexTrue = grid[rowIndex].indexOf(true);
  const colItemTrue = colLabels[colIndexTrue];

  // choose any of the falses from that row
  const falseIndexes = grid[rowIndex]
    .map((value, index) => (value ? null : index))
    .filter((index) => index !== null);
  const colIndexFalse = pickRandom(falseIndexes);
  const colItemFalse = colLabels[colIndexFalse];

  const leadingDescription = solutionMatrix[
    solutionKey
  ].rowDescriptionTemplates.leadingDescription.replace("VALUE", rowItem);
  const trailingDescriptionTrue = solutionMatrix[
    solutionKey
  ].colDescriptionTemplates.trailingDescription.replace("VALUE", colItemTrue);
  const trailingDescriptionFalse = solutionMatrix[
    solutionKey
  ].colDescriptionTemplates.trailingDescription.replace("VALUE", colItemFalse);
  const writtenClue = `${leadingDescription} is ${trailingDescriptionTrue} or ${trailingDescriptionFalse}.`; //todo should randomize so the correct value isn't always first

  return {
    writtenClue: writtenClue,
    clueType: "or",
    clueParameters: {
      colLabels,
      colIndexTrue,
      colIndexFalse,
      rowItem,
    },
  };
}


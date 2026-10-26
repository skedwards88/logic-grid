import cloneDeep from "lodash.clonedeep";
import {puzzleSolvedQ} from "../puzzleSolvedQ";
import {type Clue, getUsefulClue} from "./getUsefulClue";
import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import {chooseCategories} from "./chooseCategories";
import {generateSolutionMatrix} from "./generateSolutionMatrix";
import {buildEmptyMatrix, type PuzzleMatrix} from "./buildEmptyMatrix";
import {removeRedundantClues} from "./removeRedundantClues";

export function generatePuzzle(
  numCategories: number,
  numItemsPerCategory: number,
): {
  clues: Clue[];
  derivedMatrix: PuzzleMatrix;
} {
  const categoryLabelsAndTemplates = chooseCategories(
    numCategories,
    numItemsPerCategory,
  );
  const solutionMatrix = generateSolutionMatrix(categoryLabelsAndTemplates);
  const emptyMatrix = buildEmptyMatrix(solutionMatrix);

  const includeCrossCategoryClues = numCategories > 2;
  const includeNumericClues = categoryLabelsAndTemplates
    .map((i) => i.labels)
    .some((i) => typeof i[0] === "number");

  const clues: Clue[] = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrix = cloneDeep(emptyMatrix);

  while (!puzzleIsSolved) {
    ({clue, newDerivedMatrix} = getUsefulClue(
      solutionMatrix,
      newDerivedMatrix,
      includeCrossCategoryClues,
      includeNumericClues,
    ));
    clues.push(clue);

    newDerivedMatrix = applyCluesAdNauseam(clues, newDerivedMatrix);
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);

  return {
    clues: nonRedundantClues,
    derivedMatrix: emptyMatrix,
  };
}

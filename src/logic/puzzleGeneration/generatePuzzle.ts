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
  matrixRowLabels: (string | number)[][];
  matrixColumnLabels: (string | number)[][];
} {
  const categoryLabelsAndTemplates = chooseCategories(
    numCategories,
    numItemsPerCategory,
  );
  const solutionMatrix = generateSolutionMatrix(categoryLabelsAndTemplates);
  const emptyMatrix = buildEmptyMatrix(solutionMatrix);

  // the computer just cares about one category vs another (but doesn't care which is a row vs column)
  // but humans generally make a matrix where it does matter which category is the row vs which is the column
  // pull out the labels to avoid some convoluted calculations later
  const matrixColumnInfo = categoryLabelsAndTemplates.slice(
    1,
    categoryLabelsAndTemplates.length,
  );
  const matrixRowInfo = [
    categoryLabelsAndTemplates[0],
    ...categoryLabelsAndTemplates
      .slice(2, categoryLabelsAndTemplates.length)
      .reverse(),
  ];
  const matrixColumnLabels = matrixColumnInfo.map((i) => i.displayLabels);
  const matrixRowLabels = matrixRowInfo.map((i) => i.displayLabels);

  const includeCrossCategoryClues = numCategories > 2;
  const includeNumericClues = categoryLabelsAndTemplates
    .map((i) => i.labels)
    .some((i) => typeof i[0] === "number");

  let clues: Clue[] = [];
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
    clues = [...clues, clue];

    newDerivedMatrix = applyCluesAdNauseam(clues, newDerivedMatrix);
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  const nonRedundantClues = removeRedundantClues(clues, emptyMatrix);

  return {
    clues: nonRedundantClues,
    derivedMatrix: emptyMatrix,
    matrixRowLabels,
    matrixColumnLabels,
  };
}

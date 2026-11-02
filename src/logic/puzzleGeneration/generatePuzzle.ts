import {puzzleSolvedQ} from "../puzzleSolvedQ";
import {type Clue, getUsefulClue} from "./getUsefulClue";
import {applyCluesAdNauseam} from "./applyCluesAdNauseam";
import {chooseCategories} from "./chooseCategories";
import {generateSolutionMatrix} from "./generateSolutionMatrix";
import {
  buildEmptyMatrixGrids,
  type MatrixGrids,
  type MatrixLabels,
} from "./buildEmptyMatrixGrids";
import {removeRedundantClues} from "./removeRedundantClues";

export function generatePuzzle(
  numCategories: number,
  numItemsPerCategory: number,
): {
  clues: Clue[];
  matrixGrids: MatrixGrids;
  matrixLabels: MatrixLabels;
} {
  const categoryLabelsAndTemplates = chooseCategories(
    numCategories,
    numItemsPerCategory,
  );
  const {solvedMatrixGrids, matrixLabels, matrixTemplates} =
    generateSolutionMatrix(categoryLabelsAndTemplates);
  const emptyMatrixGrids = buildEmptyMatrixGrids(solvedMatrixGrids);

  const includeCrossCategoryClues = numCategories > 2;
  const includeNumericClues = categoryLabelsAndTemplates
    .map((i) => i.values)
    .some((i) => typeof i[0] === "number");

  const clues: Clue[] = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrixGrids = structuredClone(emptyMatrixGrids);

  while (!puzzleIsSolved) {
    ({clue, newDerivedMatrixGrids} = getUsefulClue({
      solvedMatrixGrids,
      derivedMatrixGrids: newDerivedMatrixGrids,
      matrixLabels,
      matrixTemplates,
      includeCrossCategoryClues,
      includeNumericClues,
    }));
    clues.push(clue);

    newDerivedMatrixGrids = applyCluesAdNauseam({
      clues,
      matrixGrids: newDerivedMatrixGrids,
      matrixLabels,
    });
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrixGrids);
  }

  const nonRedundantClues = removeRedundantClues({
    clues,
    emptyMatrixGrids,
    matrixLabels,
  });

  return {
    clues: nonRedundantClues,
    matrixGrids: emptyMatrixGrids,
    matrixLabels,
  };
}

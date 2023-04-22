import {puzzleSolvedQ} from "./helpers/puzzleSolvedQ.js";
import {getUsefulClue} from "./getUsefulClue.js";
import {applyCluesAdNauseam} from "./helpers/applyCluesAdNauseam.js";
import {chooseCategories} from "./chooseCategories.js";
import {generateSolutionMatrix} from "./generateSolutionMatrix.js";
import {buildEmptyMatrix} from "./buildEmptyMatrix.js";

function generatePuzzle(numCats, numItemsPerCat) {
  const categoryLabels = chooseCategories(numCats, numItemsPerCat);
  const solutionMatrix = generateSolutionMatrix(categoryLabels);
  const derivedMatrix = buildEmptyMatrix(categoryLabels);

  let clues = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrix = derivedMatrix;
  let count = 0;

  while (!puzzleIsSolved && count < 100) {
    //todo remove count
    console.log(count);
    count++;
    ({clue, newDerivedMatrix} = getUsefulClue(
      solutionMatrix,
      newDerivedMatrix,
    ));
    clues = [...clues, clue];

    newDerivedMatrix = applyCluesAdNauseam(clues, newDerivedMatrix);
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  console.log(clues.map((clue) => clue.writtenClue).join("\n"));
}

generatePuzzle(4, 5);

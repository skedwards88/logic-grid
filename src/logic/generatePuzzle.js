import { puzzleSolvedQ } from "./puzzleSolvedQ.js";
import { getUsefulClue } from "./getUsefulClue.js";

const categories = [
  ["Colin", "Sarah", "Fefe", "Meme"],
  [1, 2, 3, 4],
  ["fly", "back", "breast", "free"],
  ["red", "blue", "green", "yellow"],
];

function generateSolution(categories) {
  // todo randomize later
  let solution = categories.map((i, index) => [
    categories[0][index],
    categories[1][index],
    categories[2][index],
    categories[3][index],
  ]);

  const numCats = categories.length;
  let solutionMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {

      const rowLabels = categories[catIndex];
      const colLabels = categories[vsIndex];

      let grid = []
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        let row = []
        for (let colIndex = 0; colIndex < colLabels.length; colIndex++) {
          if (solution.some((solutionEntry) => solutionEntry.includes(rowLabels[rowIndex]) && solutionEntry.includes(colLabels[colIndex]))) {
            row = [...row, true]
          } else {
            row = [...row, false]
          }
        }
        grid = [...grid, row]
      }

      solutionMatrix[`${catIndex}v${vsIndex}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  console.log(JSON.stringify(solutionMatrix))
  return solutionMatrix
}

function buildDerivedMatrix(categories) {
  const numItems = categories[0].length;
  const numCats = categories.length;
  let derivedMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
      const grid = Array.from({ length: numItems }, () =>
        Array.from({ length: numItems }, () => null)
      );
      const rowLabels = categories[catIndex];
      const colLabels = categories[vsIndex];
      derivedMatrix[`${catIndex}v${vsIndex}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return derivedMatrix
}

function generatePuzzle(categories) {
  const solutionMatrix = generateSolution(categories);
  const derivedMatrix = buildDerivedMatrix(categories);

  console.log('******')
  console.log(JSON.stringify(solutionMatrix))
  console.log('******')
  let clues = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrix = derivedMatrix;
  let count = 0;

  while (!puzzleIsSolved && count < 100) {
    count++;
    //todo this works, but as the puzzle gets more solved, it is less likely that a random clue is helpful
    // maybe adding more clue types will help
    // but may also need to make the code smarter to have a more targeted search
    ({ clue, newDerivedMatrix } = getUsefulClue(solutionMatrix, newDerivedMatrix));
    clues = [...clues, clue];
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  console.log(count);
  console.log(JSON.stringify(newDerivedMatrix));
  console.log(clues.map((clue) => clue.writtenClue).join("\n"));
}

generatePuzzle(categories);

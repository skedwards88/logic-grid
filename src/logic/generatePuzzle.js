import {puzzleSolvedQ} from "./helpers/puzzleSolvedQ.js";
import {getUsefulClue} from "./getUsefulClue.js";

const allCategories = {
  // todo later add type, display name, checks to make sure that don't have cats that are too similar?
  firstName: ["Colin", "Sarah", "Fefe", "Meme"],
  order: [1, 2, 3, 4],
  stroke: ["fly", "back", "breast", "free"],
  color: ["red", "blue", "green", "yellow"],
};

function chooseCategoryLabels(numCats) {
  return Object.keys(allCategories).slice(0, numCats); // todo make this get random cats
}

function generateSolutionN(categories) {
  let solutions = [];
  for (
    let solutionIndex = 0;
    solutionIndex < categories.length;
    solutionIndex++
  ) {
    let solution = [];
    for (
      let categoryIndex = 0;
      categoryIndex < categories.length;
      categoryIndex++
    ) {
      solution = [...solution, categories[categoryIndex][solutionIndex]]; // todo randomize solution
    }
    solutions = [...solutions, solution];
  }

  return solutions;
}

function generateSolution(categories) {
  let solution = generateSolutionN(categories);

  const numCats = categories.length;
  let solutionMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
      const rowLabels = categories[catIndex];
      const colLabels = categories[vsIndex];

      let grid = [];
      for (let rowIndex = 0; rowIndex < rowLabels.length; rowIndex++) {
        let row = [];
        for (let colIndex = 0; colIndex < colLabels.length; colIndex++) {
          if (
            solution.some(
              (solutionEntry) =>
                solutionEntry.includes(rowLabels[rowIndex]) &&
                solutionEntry.includes(colLabels[colIndex]),
            )
          ) {
            row = [...row, true];
          } else {
            row = [...row, false];
          }
        }
        grid = [...grid, row];
      }

      solutionMatrix[`${catIndex}v${vsIndex}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return solutionMatrix;
}

function buildDerivedMatrix(categories) {
  const numItems = categories[0].length;
  const numCats = categories.length;
  let derivedMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
      const grid = Array.from({length: numItems}, () =>
        Array.from({length: numItems}, () => null),
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
  return derivedMatrix;
}

function generatePuzzle(numCats) {
  const categoryLabels = chooseCategoryLabels(numCats);
  const categories = categoryLabels.map((label) => allCategories[label]);
  const solutionMatrix = generateSolution(categories);
  const derivedMatrix = buildDerivedMatrix(categories);

  let clues = [];
  let puzzleIsSolved = false;
  let clue;
  let newDerivedMatrix = derivedMatrix;
  let count = 0;

  while (!puzzleIsSolved && count < 100) {
    console.log(count);
    count++;
    //todo this works, but as the puzzle gets more solved, it is less likely that a random clue is helpful
    // maybe adding more clue types will help
    // but may also need to make the code smarter to have a more targeted search
    ({clue, newDerivedMatrix} = getUsefulClue(
      solutionMatrix,
      newDerivedMatrix,
    ));
    clues = [...clues, clue];

    // reapply clues after each round // todo change this to 1)continue until the matrix doesn't change 2) maybe only reapply the clues that could change (add a return value to the clue to do this)
    for (let clueIndex = 0; clueIndex < clues.length; clueIndex++) {
      newDerivedMatrix = clue.clueLogic(newDerivedMatrix);
    }
    puzzleIsSolved = puzzleSolvedQ(newDerivedMatrix);
  }

  console.log(count);
  console.log(JSON.stringify(newDerivedMatrix));
  console.log(clues.map((clue) => clue.writtenClue).join("\n"));
}

generatePuzzle(4);

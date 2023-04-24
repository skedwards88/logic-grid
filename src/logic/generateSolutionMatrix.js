import {generateSolution} from "./generateSolution.js";

export function generateSolutionMatrix(categoryLabels) {
  let solution = generateSolution(categoryLabels);

  const numCats = categoryLabels.length;
  let solutionMatrix = {};

  for (let categoryIndexA = 0; categoryIndexA < numCats; categoryIndexA++) {
    for (
      let categoryIndexB = categoryIndexA + 1;
      categoryIndexB < numCats;
      categoryIndexB++
    ) {
      const rowLabels = categoryLabels[categoryIndexA];
      const colLabels = categoryLabels[categoryIndexB];

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

      solutionMatrix[`category${categoryIndexA}_category${categoryIndexB}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return solutionMatrix;
}

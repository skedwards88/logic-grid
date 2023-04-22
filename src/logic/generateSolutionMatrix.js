import {generateSolution} from "./generateSolution.js";

export function generateSolutionMatrix(categoryLabels) {
  let solution = generateSolution(categoryLabels);

  const numCats = categoryLabels.length;
  let solutionMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
      const rowLabels = categoryLabels[catIndex];
      const colLabels = categoryLabels[vsIndex];

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

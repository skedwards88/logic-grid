import {shuffleArray} from "@skedwards88/word_logic";

// given the lists of labels (e.g. [[a,b,c,d],[1,2,3,4],[w, x,y,z]])
// combine them into a "solution" (e.g. [[a,1,w],[b,2,x],[c,4,z],[d,3,y]])
export function generateSolution(
  categoryLabels: (string | number)[][],
): (string | number)[][] {
  const numCategories = categoryLabels.length;
  const numItemsPerCategory = categoryLabels[0].length;

  const shuffledCategoryLabels = categoryLabels.map((labels) =>
    shuffleArray(labels),
  );

  let solutions: (string | number)[][] = [];
  for (
    let solutionIndex = 0;
    solutionIndex < numItemsPerCategory;
    solutionIndex++
  ) {
    let solution: (string | number)[] = [];
    for (
      let categoryIndex = 0;
      categoryIndex < numCategories;
      categoryIndex++
    ) {
      solution = [
        ...solution,
        shuffledCategoryLabels[categoryIndex][solutionIndex],
      ];
    }
    solutions = [...solutions, solution];
  }

  return solutions;
}

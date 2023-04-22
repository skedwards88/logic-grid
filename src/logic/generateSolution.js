export function generateSolution(categoryLabels) {
  // given the lists of labels (e.g. [[a,b,c,d],[1,2,3,4],[w, x,y,z]])
  // combine them into a "solution" (e.g. [[a,1,w],[b,2,x],[c,4,z],[d,3,y]])
  const numCats = categoryLabels.length;
  const numItemsPerCat = categoryLabels[0].length;

  let solutions = [];
  for (let solutionIndex = 0; solutionIndex < numItemsPerCat; solutionIndex++) {
    let solution = [];
    for (let categoryIndex = 0; categoryIndex < numCats; categoryIndex++) {
      solution = [...solution, categoryLabels[categoryIndex][solutionIndex]]; // todo randomize solution
    }
    solutions = [...solutions, solution];
  }

  return solutions;
}

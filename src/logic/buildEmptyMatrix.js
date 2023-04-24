export function buildEmptyMatrix(categoryLabels) {
  const numItems = categoryLabels[0].length;
  const numCats = categoryLabels.length;
  let derivedMatrix = {};

  for (let categoryIndexA = 0; categoryIndexA < numCats; categoryIndexA++) {
    for (
      let categoryIndexB = categoryIndexA + 1;
      categoryIndexB < numCats;
      categoryIndexB++
    ) {
      const grid = Array.from({length: numItems}, () =>
        Array.from({length: numItems}, () => null),
      );
      const rowLabels = categoryLabels[categoryIndexA];
      const colLabels = categoryLabels[categoryIndexB];
      derivedMatrix[`category${categoryIndexA}_category${categoryIndexB}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return derivedMatrix;
}

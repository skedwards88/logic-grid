export function buildEmptyMatrix(categoryLabels) {
  const numItems = categoryLabels[0].length;
  const numCats = categoryLabels.length;
  let derivedMatrix = {};

  for (let catIndex = 0; catIndex < numCats; catIndex++) {
    for (let vsIndex = catIndex + 1; vsIndex < numCats; vsIndex++) {
      const grid = Array.from({length: numItems}, () =>
        Array.from({length: numItems}, () => null),
      );
      const rowLabels = categoryLabels[catIndex];
      const colLabels = categoryLabels[vsIndex];
      derivedMatrix[`${catIndex}v${vsIndex}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return derivedMatrix;
}

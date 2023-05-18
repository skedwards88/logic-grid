export function buildEmptyMatrix(categoryLabelsAndTemplates) {
  const numItems = categoryLabelsAndTemplates[0].labels.length;
  const numCats = categoryLabelsAndTemplates.length;
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
      const rowLabels = categoryLabelsAndTemplates[categoryIndexA].labels;
        categoryLabelsAndTemplates[categoryIndexA].descriptionTemplates;
      const colLabels = categoryLabelsAndTemplates[categoryIndexB].labels;
        categoryLabelsAndTemplates[categoryIndexB].descriptionTemplates;

      derivedMatrix[`category${categoryIndexA}_category${categoryIndexB}`] = {
        rowLabels: rowLabels,
        colLabels: colLabels,
        grid: grid,
      };
    }
  }
  return derivedMatrix;
}

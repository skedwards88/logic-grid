import {allCategories} from "./allCategories.js";
import {pickRandom} from "./helpers/pickRandom.js";

export function chooseCategories(numCats, numItemsPerCat) {
  // returns a list of category labels and description templates

  const categorySet = pickRandom(allCategories);

  // todo ensure that all categories have at least numItemsPerCat
  const categoryNames = Object.keys(categorySet).slice(0, numCats); // todo shuffle first to get random + add test for randomness

  let categoryLabelsAndTemplates = [];
  for (const categoryName of categoryNames) {
    const possibleValues = categorySet[categoryName].values;
    const selectedValues = possibleValues.slice(0, numItemsPerCat); //todo shuffle first to get random  + add test for randomness
    const categoryInfo = {
      labels: selectedValues,
      descriptionTemplates: categorySet[categoryName].descriptionTemplates,
    };
    categoryLabelsAndTemplates = [...categoryLabelsAndTemplates, categoryInfo];
  }

  return categoryLabelsAndTemplates;
}

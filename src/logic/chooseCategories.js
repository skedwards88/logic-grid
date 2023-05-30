import {allCategories} from "./allCategories.js";
import {pickRandom} from "./helpers/pickRandom.js";
import {shuffleArray} from "./helpers/shuffleArray.js";

export function chooseCategories(numCats, numItemsPerCat) {
  // returns a list of category labels and description templates

  const categorySet = pickRandom(allCategories);

  const categoryNames = shuffleArray(Object.keys(categorySet)).slice(
    0,
    numCats,
  );

  let categoryLabelsAndTemplates = [];
  for (const categoryName of categoryNames) {
    const possibleValues = shuffleArray(categorySet[categoryName].values);
    const selectedValues = possibleValues.slice(0, numItemsPerCat);
    // sort the values to make more user friendly
    // note: the numeric clues also assume that the numeric labels are sorted
    typeof selectedValues[0] === "number"
      ? selectedValues.sort((a, b) => a - b)
      : selectedValues.sort();
    const categoryInfo = {
      labels: selectedValues,
      displayLabels: categorySet[categoryName].display
        ? selectedValues.map((value) =>
            categorySet[categoryName].display.replace("VALUE", value),
          )
        : selectedValues,
      descriptionTemplates: categorySet[categoryName].descriptionTemplates,
    };
    categoryLabelsAndTemplates = [...categoryLabelsAndTemplates, categoryInfo];
  }
  return categoryLabelsAndTemplates;
}

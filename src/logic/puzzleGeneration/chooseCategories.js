import {allCategories} from "./allCategories.js";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {sortLabels} from "../helpers/sortLabels.js";

export function chooseCategories(numCats, numItemsPerCat) {
  // returns a list of category labels and description templates

  let categorySet = pickRandomItemFromArray(allCategories);

  // If we have more categories than we need,
  // omit the "first name" category
  // to prevent this common category from feeling overused
  if (categorySet.length > numCats) {
    categorySet = categorySet.filter(
      (category) => !category.values.includes("Aaron"),
    );
  }

  const categories = shuffleArray(categorySet).slice(0, numCats);

  let categoryLabelsAndTemplates = [];
  for (const category of categories) {
    const possibleValues = shuffleArray(category.values);
    const selectedValues = possibleValues.slice(0, numItemsPerCat);
    // sort the values to make more user friendly
    // note: the numeric clues assume that the numeric labels are sorted
    const sortedValues = sortLabels(selectedValues);
    const categoryInfo = {
      labels: sortedValues,
      displayLabels: category.display
        ? sortedValues.map((value) => category.display(value))
        : sortedValues,
      descriptionTemplates: category.descriptionTemplates,
    };
    categoryLabelsAndTemplates = [...categoryLabelsAndTemplates, categoryInfo];
  }
  return categoryLabelsAndTemplates;
}

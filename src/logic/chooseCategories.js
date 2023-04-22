import {allCategories} from "./allCategories.js";

export function chooseCategories(numCats, numItemsPerCat) {
  // returns a list of category labels
  // e.g. [[a,b,c],[1,2,3],[w,y,x]]

  // todo ensure that all categories have at least numItemsPerCat
  const categoryNames = Object.keys(allCategories).slice(0, numCats); // todo shuffle first to get random + add test for randomness

  let categoryLabels = [];
  for (const categoryLabel of categoryNames) {
    const possibleValues = allCategories[categoryLabel];
    const selectedValues = possibleValues.slice(0, numItemsPerCat); //todo shuffle first to get random  + add test for randomness
    categoryLabels = [...categoryLabels, selectedValues];
  }

  return categoryLabels;
}

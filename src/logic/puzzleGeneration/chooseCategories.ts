import {allCategories} from "./allCategories";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {sortLabels} from "../helpers/sortLabels";
import {type AxisWithDisplay} from "./buildEmptyMatrix";

// returns a list of category labels and description templates
export function chooseCategories(
  numCategories: number,
  numItemsPerCategory: number,
): AxisWithDisplay[] {
  let categorySet = pickRandomItemFromArray(allCategories);

  // If we have more categories than we need,
  // omit the "first name" category
  // to prevent this common category from feeling overused
  if (categorySet.length > numCategories) {
    categorySet = categorySet.filter(
      (category) => !(category.values as (string | number)[]).includes("Aaron"),
    );
  }

  const categories = shuffleArray(categorySet).slice(0, numCategories);

  let categoryLabelsAndTemplates: AxisWithDisplay[] = [];

  for (const category of categories) {
    const possibleValues = shuffleArray(category.values);

    const selectedValues = possibleValues.slice(0, numItemsPerCategory);

    // sort the values to make more user friendly
    // note: the numeric clues assume that the numeric labels are sorted
    const sortedValues = sortLabels(selectedValues);

    const categoryInfo: AxisWithDisplay =
      category.kind === "number"
        ? {
            kind: category.kind,
            labels: sortedValues as number[],
            displayLabels: (sortedValues as number[]).map((value) =>
              category.generateDisplayLabels
                ? category.generateDisplayLabels(value)
                : String(value),
            ),
            templates: category.templates,
          }
        : {
            kind: category.kind,
            labels: sortedValues as string[],
            displayLabels: (sortedValues as string[]).map((value) =>
              category.generateDisplayLabels
                ? category.generateDisplayLabels(value)
                : value,
            ),
            templates: category.templates,
          };

    categoryLabelsAndTemplates = [...categoryLabelsAndTemplates, categoryInfo];
  }
  return categoryLabelsAndTemplates;
}

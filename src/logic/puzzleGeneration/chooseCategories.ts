import {allCategories} from "./allCategories";
import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {shuffleArray} from "@skedwards88/word_logic";
import {sortValues} from "../helpers/sortValues";
import type {
  NumberLabels,
  NumberTemplates,
  StringLabels,
  StringTemplates,
} from "./generateSolutionMatrix";

type StringAxis = StringLabels & StringTemplates;

type NumberAxis = NumberLabels & NumberTemplates;

export type Axis = StringAxis | NumberAxis;

// returns a list of category labels and description templates
export function chooseCategories(
  numCategories: number,
  numItemsPerCategory: number,
): Axis[] {
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

  const categoryLabelsAndTemplates: Axis[] = [];

  for (const category of categories) {
    const possibleValues = shuffleArray(category.values);

    const selectedValues = possibleValues.slice(0, numItemsPerCategory);

    // sort the values to make more user friendly
    // note: the numeric clues assume that the numeric labels are sorted
    const sortedValues = sortValues(selectedValues);

    // Overkill but I didn't find a better way to satisfy TS
    let categoryInfo: Axis;
    if (
      category.kind === "number" &&
      sortedValues.every((value) => typeof value === "number")
    ) {
      categoryInfo = {
        kind: category.kind,
        values: sortedValues,
        displayLabels: sortedValues.map(
          (value) => category.generateDisplayLabels?.(value) ?? String(value),
        ),
        templates: category.templates,
      };
    } else if (
      category.kind === "string" &&
      sortedValues.every((value) => typeof value === "string")
    ) {
      categoryInfo = {
        kind: category.kind,
        values: sortedValues,
        displayLabels: sortedValues.map(
          (value) => category.generateDisplayLabels?.(value) ?? value,
        ),
        templates: category.templates,
      };
    } else {
      throw new Error(
        `Category info not set due to mismatch between kind ${category.kind} and values ${JSON.stringify(sortedValues)}`,
      );
    }

    categoryLabelsAndTemplates.push(categoryInfo);
  }
  return categoryLabelsAndTemplates;
}

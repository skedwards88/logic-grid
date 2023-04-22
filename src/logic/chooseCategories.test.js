import {chooseCategories} from "./chooseCategories";

describe("chooseCategories", () => {
  test("gets the specified number of categories with the specified number of items per category", () => {
    const numCategories = 3;
    const numItems = 3;
    const categories = chooseCategories(numCategories, numItems);
    expect(categories.length).toBe(numCategories);
    for (const category of categories) {
      expect(category.length).toBe(numItems);
    }
  });
});

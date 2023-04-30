import {chooseCategories} from "./chooseCategories";
import * as pickRandomModule from "./helpers/pickRandom.js";

const mockedCategories = {
  NAME: {
    values: ["Abe", "Bob", "Colin", "Dan", "Eddie"],
    descriptionTemplates: {
      leadingDescription: "VALUE's car",
      trailingDescription: "VALUE's car",
    },
  },
  COLOR: {
    values: ["red", "orange", "blue", "green", "yellow"],
    descriptionTemplates: {
      leadingDescription: "The VALUE car",
      trailingDescription: "the VALUE car",
    },
  },
  MODEL: {
    values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
    descriptionTemplates: {
      leadingDescription: "The VALUE",
      trailingDescription: "the VALUE",
    },
  },
  AGE: {
    values: [1, 2, 3, 4, 5],
    descriptionTemplates: {
      leadingDescription: "The VALUE year old car",
      trailingDescription: "VALUE years old",
      diffGreaterDescription: "VALUE years older",
      diffLesserDescription: "VALUE years younger",
    },
  },
};

describe("chooseCategories", () => {
  test("gets the specified number of categories with the specified number of items per category, mocked values", () => {
    jest
      .spyOn(pickRandomModule, "pickRandom")
      .mockReturnValueOnce(mockedCategories);

    const numCategories = 4;
    const numItems = 3;
    const categories = chooseCategories(numCategories, numItems);
    expect(categories.length).toBe(numCategories);
    for (const category of categories) {
      expect(category.labels.length).toBe(numItems);
      expect(category.descriptionTemplates);

      expect(category.descriptionTemplates).toHaveProperty(
        "leadingDescription",
      );
      expect(category.descriptionTemplates).toHaveProperty(
        "trailingDescription",
      );
      if (typeof category.labels[0] === "number") {
        expect(category.descriptionTemplates).toHaveProperty(
          "diffGreaterDescription",
        );
        expect(category.descriptionTemplates).toHaveProperty(
          "diffLesserDescription",
        );
      }
    }
    jest.restoreAllMocks();
  });

  test("gets the specified number of categories with the specified number of items per category, not mocked values", () => {
    const numCategories = 4;
    const numItems = 3;
    const categories = chooseCategories(numCategories, numItems);
    expect(categories.length).toBe(numCategories);
    for (const category of categories) {
      expect(category.labels.length).toBe(numItems);
      expect(category.descriptionTemplates).toHaveProperty(
        "leadingDescription",
      );
      expect(category.descriptionTemplates).toHaveProperty(
        "trailingDescription",
      );
      if (typeof category.labels[0] === "number") {
        expect(category.descriptionTemplates).toHaveProperty(
          "diffGreaterDescription",
        );
        expect(category.descriptionTemplates).toHaveProperty(
          "diffLesserDescription",
        );
      }
    }
  });
});

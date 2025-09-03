jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual("@skedwards88/word_logic");
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
  };
});

import {pickRandomItemFromArray} from "@skedwards88/word_logic";
import {chooseCategories} from "./chooseCategories";

afterEach(() => {
  jest.clearAllMocks();
  pickRandomItemFromArray.mockImplementation(
    jest.requireActual("@skedwards88/word_logic").pickRandomItemFromArray,
  );
});

const mockedCategories = [
  {
    values: ["Abe", "Bob", "Colin", "Dan", "Eddie"],
    descriptionTemplates: {
      description: (value) => `${value}'s car`,
    },
  },
  {
    values: ["red", "orange", "blue", "green", "yellow"],
    descriptionTemplates: {
      description: (value) => `the ${value} car`,
    },
  },
  {
    values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
    descriptionTemplates: {
      description: (value) => `the ${value}`,
    },
  },
  {
    values: [1, 2, 3, 4, 5],
    descriptionTemplates: {
      description: (value) => `${value} years old`,
      diffGreaterDescription: (value) => `${value} years older`,
      diffLesserDescription: (value) => `${value} years younger`,
    },
  },
];

describe("chooseCategories", () => {
  test("gets the specified number of categories with the specified number of items per category, mocked values", () => {
    pickRandomItemFromArray.mockReturnValueOnce(mockedCategories);

    const numCategories = 4;
    const numItems = 3;
    const categories = chooseCategories(numCategories, numItems);
    expect(categories.length).toBe(numCategories);
    for (const category of categories) {
      expect(category.labels.length).toBe(numItems);
      expect(category.descriptionTemplates);

      expect(category.descriptionTemplates).toHaveProperty("description");
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
      expect(category.descriptionTemplates).toHaveProperty("description");
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

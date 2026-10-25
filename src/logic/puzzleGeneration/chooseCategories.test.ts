import * as wordLogic from "@skedwards88/word_logic";
import {chooseCategories} from "./chooseCategories";
import type {NumberCategory, StringCategory} from "./allCategories";

jest.mock("@skedwards88/word_logic", () => {
  const actual = jest.requireActual<typeof wordLogic>(
    "@skedwards88/word_logic",
  );
  return {
    ...actual,
    // mockable fns that still behave like the real ones by default
    pickRandomItemFromArray: jest.fn(actual.pickRandomItemFromArray),
  };
});

const mockedWordLogic = jest.mocked(wordLogic);
const actualWordLogic = jest.requireActual<typeof wordLogic>(
  "@skedwards88/word_logic",
);

afterEach(() => {
  jest.clearAllMocks();
  mockedWordLogic.pickRandomItemFromArray.mockImplementation(
    actualWordLogic.pickRandomItemFromArray,
  );
});

const mockedCategories: (NumberCategory | StringCategory)[] = [
  {
    kind: "string",
    values: ["Abe", "Bob", "Colin", "Dan", "Eddie"],
    templates: {
      generateDescription: (value) => `${value}'s car`,
    },
  },
  {
    kind: "string",
    values: ["red", "orange", "blue", "green", "yellow"],
    templates: {
      generateDescription: (value) => `the ${value} car`,
    },
  },
  {
    kind: "string",
    values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
    templates: {
      generateDescription: (value) => `the ${value}`,
    },
  },
  {
    kind: "number",
    values: [1, 2, 3, 4, 5],
    templates: {
      generateDescription: (value) => `${value} years old`,
      generateDiffGreaterDescription: (value) => `${value} years older`,
      generateDiffLesserDescription: (value) => `${value} years younger`,
    },
  },
];

describe("chooseCategories", () => {
  test("gets the specified number of categories with the specified number of items per category, mocked values", () => {
    mockedWordLogic.pickRandomItemFromArray.mockReturnValueOnce(
      mockedCategories,
    );

    const numCategories = 4;
    const numItems = 3;
    const categories = chooseCategories(numCategories, numItems);
    expect(categories.length).toBe(numCategories);
    for (const category of categories) {
      expect(category.labels.length).toBe(numItems);

      expect(category.templates).toHaveProperty("generateDescription");
    }

    for (const numericCategory of categories.filter(
      (category) => category.kind === "number",
    )) {
      expect(numericCategory.templates).toHaveProperty(
        "generateDiffGreaterDescription",
      );
      expect(numericCategory.templates).toHaveProperty(
        "generateDiffLesserDescription",
      );
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
      expect(category.templates).toHaveProperty("generateDescription");
    }

    for (const numericCategory of categories.filter(
      (category) => category.kind === "number",
    )) {
      expect(numericCategory.templates).toHaveProperty(
        "generateDiffGreaterDescription",
      );
      expect(numericCategory.templates).toHaveProperty(
        "generateDiffLesserDescription",
      );
    }
  });
});

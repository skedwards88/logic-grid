export const allCategories = [
  {
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
  },
];

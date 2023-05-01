export const allCategories = [
  {
    AGE: {
      values: [1, 2, 3, 4, 5],
      descriptionTemplates: {
        leadingDescription: "The VALUE year old car",
        trailingDescription: "VALUE years old",
        diffGreaterDescription: "VALUE years older",
        diffLesserDescription: "VALUE years younger",
      },
    },
    COLOR: {
      values: ["red", "orange", "blue", "green", "yellow"],
      descriptionTemplates: {
        leadingDescription: "The VALUE car",
        trailingDescription: "the VALUE car",
      },
    },
    NAME: {
      values: ["Abe", "Bob", "Colin", "Dan", "Eddie"],
      descriptionTemplates: {
        leadingDescription: "VALUE's car",
        trailingDescription: "VALUE's car",
      },
    },
    MODEL: {
      values: ["Ford", "BMW", "Honda", "Mercedes", "Kia"],
      descriptionTemplates: {
        leadingDescription: "The VALUE",
        trailingDescription: "the VALUE",
      },
    },
  },
];

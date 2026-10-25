import type {Axis} from "../puzzleGeneration/buildEmptyMatrix";

export const genericTestDescription = (test: string | number): string =>
  `generic ${test}`;

export const genericStringTemplates = {
  generateDescription: genericTestDescription,
};

export const genericNumberTemplates = {
  generateDescription: genericTestDescription,
  generateDiffGreaterDescription: genericTestDescription,
  generateDiffLesserDescription: genericTestDescription,
};

export function populateSparseTestEntry(labels: string[] | number[]): Axis {
  if (labels.every((label) => typeof label === "number")) {
    return {
      labels,
      kind: "number",
      templates: genericNumberTemplates,
    };
  } else {
    return {
      labels,
      kind: "string",
      templates: genericStringTemplates,
    };
  }
}

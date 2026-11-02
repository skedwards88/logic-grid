import type {Labels, Templates} from "../puzzleGeneration/buildEmptyMatrix";

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

export function populateSparseTestEntryLabels(
  labels: string[] | number[],
): Labels {
  if (labels.every((label) => typeof label === "number")) {
    return {
      labels,
      displayLabels: labels.map((l) => l.toString()),
    };
  } else {
    return {
      labels,
      displayLabels: labels,
    };
  }
}

export function populateSparseTestEntryTemplates(
  labels: string[] | number[],
): Templates {
  if (labels.every((label) => typeof label === "number")) {
    return {
      kind: "number",
      templates: genericNumberTemplates,
    };
  } else {
    return {
      kind: "string",
      templates: genericStringTemplates,
    };
  }
}

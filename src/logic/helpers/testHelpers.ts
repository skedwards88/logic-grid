import type {
  Labels,
  Templates,
} from "../puzzleGeneration/buildEmptyMatrixGrids";

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
  values: string[] | number[],
): Labels {
  if (values.every((value) => typeof value === "number")) {
    return {
      values,
      displayLabels: values.map((l) => l.toString()),
    };
  } else {
    return {
      values,
      displayLabels: values,
    };
  }
}

export function populateSparseTestEntryTemplates(
  values: string[] | number[],
): Templates {
  if (values.every((value) => typeof value === "number")) {
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

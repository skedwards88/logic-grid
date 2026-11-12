import type {Templates} from "../puzzleGeneration/generateSolutionMatrix";

// Overkill but I didn't find a better way to satisfy TS
export function generateTSHappyDescription(
  templates: Templates,
  item: string | number,
): string {
  if (templates.kind === "number" && typeof item === "number") {
    return templates.templates.generateDescription(item);
  }

  if (templates.kind === "string" && typeof item === "string") {
    return templates.templates.generateDescription(item);
  }

  throw new Error(
    `Item type (${typeof item}) doesn't match row kind "${templates.kind}"`,
  );
}

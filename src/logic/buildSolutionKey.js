export function buildSolutionKey(categoryIndexA, categoryIndexB) {
  return categoryIndexA < categoryIndexB
  ? `${categoryIndexA}v${categoryIndexB}`
  : `${categoryIndexB}v${categoryIndexA}`;
}
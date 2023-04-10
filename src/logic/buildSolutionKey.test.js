import { buildSolutionKey } from './buildSolutionKey';

describe('buildSolutionKey', () => {
  test('returns a solution key for two given category indices', () => {
    const categoryIndexA = 1;
    const categoryIndexB = 2;
    const expectedSolutionKey = '1v2';
    expect(buildSolutionKey(categoryIndexA, categoryIndexB)).toBe(expectedSolutionKey);
  });

  test('returns a solution key for two given category indices in reverse order', () => {
    const categoryIndexA = 2;
    const categoryIndexB = 1;
    const expectedSolutionKey = '1v2';
    expect(buildSolutionKey(categoryIndexA, categoryIndexB)).toBe(expectedSolutionKey);
  });
});
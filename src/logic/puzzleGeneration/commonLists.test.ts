import {firstNames} from "./commonLists";

describe("common lists", () => {
  test("list of first names includes Aaron", () => {
    expect(firstNames).toContain("Aaron");
  });
});

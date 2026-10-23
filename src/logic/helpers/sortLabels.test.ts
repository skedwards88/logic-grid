import {sortLabels} from "./sortLabels";

describe("sortLabels", () => {
  test("sort numbers", () => {
    expect(sortLabels([99, 10, 1, 11, 12, 21, 89])).toStrictEqual([
      1, 10, 11, 12, 21, 89, 99,
    ]);
  });
  test("sort months", () => {
    expect(
      sortLabels(["February", "April", "March", "August", "May", "January"]),
    ).toStrictEqual(["January", "February", "March", "April", "May", "August"]);
  });
  test("sort days", () => {
    expect(
      sortLabels(["Monday", "Sunday", "Saturday", "Wednesday"]),
    ).toStrictEqual(["Monday", "Wednesday", "Saturday", "Sunday"]);
  });

  test("sort other stuff", () => {
    expect(sortLabels([1, "June", 2, "dog", "Dog", 10, 11, 12])).toStrictEqual([
      1,
      2,
      10,
      11,
      12,
      "dog",
      "Dog",
      "June",
    ]);
  });
});

import {monthsInOrder, daysInOrder} from "../puzzleGeneration/commonLists";

type Sorted<A extends readonly unknown[]> = A extends readonly (infer E)[]
  ? E[]
  : never;

export function sortValues<A extends readonly unknown[]>(values: A): Sorted<A>;
export function sortValues(values: readonly unknown[]): unknown[] {
  const copy = [...values];

  if (copy.every((x): x is number => typeof x === "number")) {
    return copy.sort((a, b) => a - b);
  }

  for (const orderedList of [daysInOrder, monthsInOrder]) {
    if (
      copy.every(
        (x): x is string => typeof x === "string" && orderedList.includes(x),
      )
    ) {
      return copy.sort(
        (a, b) => orderedList.indexOf(a) - orderedList.indexOf(b),
      );
    }
  }

  return copy.sort((a, b) =>
    String(a).localeCompare(String(b), undefined, {numeric: true}),
  );
}

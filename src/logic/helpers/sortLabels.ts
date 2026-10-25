export const daysInOrder: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const monthsInOrder = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Sorted<A extends readonly unknown[]> = A extends readonly (infer E)[]
  ? E[]
  : never;

export function sortLabels<A extends readonly unknown[]>(labels: A): Sorted<A>;
export function sortLabels(labels: readonly unknown[]): unknown[] {
  const copy = [...labels];

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

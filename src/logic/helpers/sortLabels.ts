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

export function sortLabels<T>(labels: T[]): T[] {
  const copy = [...labels];

  if (copy.every((x) => typeof x === "number")) {
    return copy.sort((a, b) => a - b);
  }

  for (const orderedList of [daysInOrder, monthsInOrder]) {
    if (copy.every((x) => typeof x === "string" && orderedList.includes(x))) {
      return copy.sort(
        (a, b) =>
          orderedList.indexOf(a as string) - orderedList.indexOf(b as string),
      );
    }
  }

  return copy.sort((a, b) =>
    String(a).localeCompare(String(b), undefined, {numeric: true}),
  );
}

export function sortLabels(labels) {
  labels = [...labels];

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const monthOrder = [
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

  if (typeof labels[0] === "number") {
    return labels.sort((a, b) => a - b);
  }
  if (dayOrder.includes(labels[0])) {
    return labels.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }
  if (monthOrder.includes(labels[0])) {
    return labels.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
  } else {
    return labels.sort();
  }
}